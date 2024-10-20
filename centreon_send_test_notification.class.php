<?php

/*
 * Copyright 2005-2020 Centreon
 * Centreon is developed by : Julien Mathis and Romain Le Merlus under
 * GPL Licence 2.0.
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation ; either version 2 of the License.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program; if not, see <htcommand://www.gnu.org/licenses>.
 *
 * Linking this program statically or dynamically with other modules is making a
 * combined work based on this program. Thus, the terms and conditions of the GNU
 * General Public License cover the whole combination.
 *
 * As a special exception, the copyright holders of this program give Centreon
 * permission to link this program with independent modules to produce an executable,
 * regardless of the license terms of these independent modules, and to copy and
 * distribute the resulting executable under terms of Centreon choice, provided that
 * Centreon also meet, for each linked independent module, the terms  and conditions
 * of the license of that module. An independent module is a module which is not
 * derived from this program. If you modify this program, you may extend this
 * exception to your version of the program, but you are not obliged to do so. If you
 * do not wish to do so, delete this exception statement from your version.
 *
 * For more information : command@centreon.com
 *
 */


require_once _CENTREON_PATH_ . "/www/class/centreonDB.class.php";
require_once __DIR__ . "/centreon_configuration_objects.class.php";

class CentreonSendTestNotification extends CentreonConfigurationObjects
{
    /**
     * CentreonConfigurationCommand constructor.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @return array
     * @throws Exception
     * @throws RestBadRequestException
     */
 
    public function postexecuteNotification()
        {
        $json = file_get_contents('php://input');
        // Converts it into a PHP object 
        $json_data = json_decode($json, true);
        $host_name = print_r($json_data[0]['host_name'], true);
        $service_name = print_r($json_data[1]['service_name'], true);
        //select nagios_server_id from ns_host_relation where host_host_id in (select host_id from host where host_name = "65786_host");
        $queryCommand_get_pollerId = 'SELECT nagios_server_id ' .
                'FROM ns_host_relation ' .
                'WHERE host_host_id ' .
                'IN (SELECT host_id from host where host_name = :host_name)';

        $stmt6 = $this->pearDB->prepare($queryCommand_get_pollerId);
        $stmt6->bindParam(':host_name', $host_name, PDO::PARAM_STR);
        $stmt6->execute();
        $host_poller_id = $stmt6->fetch();
        //select command_file from cfg_nagios where nagios_server_id = 1;
        $queryCommand_get_command_file = 'SELECT command_file ' . 
                'FROM cfg_nagios ' .
                'WHERE nagios_server_id = :nagios_server_id';
        $stmt2 = $this->pearDB->prepare($queryCommand_get_command_file);
        $stmt2->bindParam(':nagios_server_id', $host_poller_id['nagios_server_id'], PDO::PARAM_STR);
        $stmt2->execute();
        $command_file_path=$stmt2->fetch();


        $url = "http://localhost:8085/api/nodes/".$host_poller_id['nagios_server_id']."/core/action/command";
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $headers = array(
                "Accept: application/json",
        "Content-Type: application/json",
        );
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        $command = 'echo  "['.time().'] SEND_CUSTOM_SVC_NOTIFICATION;'.$service_name.';'.$host_name.';1;Test de notification;Ceci est un test de notification depuis le GUI." > '.$command_file_path['command_file'];
        $command = json_encode($command);
        $data = <<<DATA
                [{"command": $command}]
        DATA;
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        $json_curl_data = curl_exec($curl);
        curl_close($curl);
        $obj_resp = json_decode($json_curl_data);
        $obj_resp->poller_id=$host_poller_id['nagios_server_id'];
        $json_resp = json_encode($obj_resp);
        return $json_resp;
}

    public function getgetlogCommand(){
        $token = $this->arguments['token_id'];
        $poller_id = $this->arguments['poller_id'];
        $url = "http://localhost:8085/api/nodes/".$poller_id."/log/".$token;
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $headers = array(
            "Accept: application/json"
        );
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        $resp = curl_exec($curl);
        curl_close($curl);
    return $resp;
    }

}
