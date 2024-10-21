# centreon_send_test_notification_from_gui

!!!!only for tests at the moment!!!!

Allow you to test notification from GUI on existing host/service in resources status page.
![image](https://github.com/user-attachments/assets/02191ac9-898b-4b2a-9a00-147d5b2e7d64)
![image](https://github.com/user-attachments/assets/cb3e84b8-d6a5-4f94-a37b-918ea1ac83cb)
![image](https://github.com/user-attachments/assets/b44ab6d6-5644-4469-9c97-b115059c405a)





It is using gorgone api to send centengine external commands on a cenfigured poller.
source : 
[SEND_CUSTOM_HOST_NOTIFICATION](https://assets.nagios.com/downloads/nagioscore/docs/externalcmds/cmdinfo.php?command_id=134)
[SEND_CUSTOM_SVC_NOTIFICATION](https://assets.nagios.com/downloads/nagioscore/docs/externalcmds/cmdinfo.php?command_id=135)

/var/log/centreon-gorgone/gorgone.log (on the Central) : 
````
2024-10-21 17:45:13 - DEBUG - [core] Message received internal - [PUTLOG] [b88496470b06941939e609595859b7aad196036c96c2ee7796b26e6a1d02178665c691248ef2be02b4af708fa4535e24c87d77b4ba944db516040adecaf88faf] [] {"code":0,"etime":1729532712,"token":"b88496470b06941939e609595859b7aad196036c96c2ee7796b26e6a1d02178665c691248ef2be02b4af708fa4535e24c87d77b4ba944db516040adecaf88faf","data":{"metadata":null,"command":"echo  \"[1729532712] SEND_CUSTOM_HOST_NOTIFICATION;avea-central-2210-env-test;1;Test de notification;Ceci est un test de notification depuis le GUI.\" > /var/lib/centreon-engine/rw/centengine-toto.cmd","message":"command has started"},"instant":null}
2024-10-21 17:45:13 - DEBUG - [core] Message received internal - [PUTLOG] [b88496470b06941939e609595859b7aad196036c96c2ee7796b26e6a1d02178665c691248ef2be02b4af708fa4535e24c87d77b4ba944db516040adecaf88faf] [] {"code":100,"token":"b88496470b06941939e609595859b7aad196036c96c2ee7796b26e6a1d02178665c691248ef2be02b4af708fa4535e24c87d77b4ba944db516040adecaf88faf","etime":1729532713,"data":{"metadata":null,"result":{"exit_code":0,"stdout":""},"command":"echo  \"[1729532712] SEND_CUSTOM_HOST_NOTIFICATION;avea-central-2210-env-test;1;Test de notification;Ceci est un test de notification depuis le GUI.\" > /var/lib/centreon-engine/rw/centengine-toto.cmd","metrics":{"duration":1,"start":1729532712,"end":1729532713},"message":"command has finished successfully"},"instant":null}
````

/var/log/centreon-engine/centengine.log (on the concerned poller) :
````
[2024-10-21T17:45:13.536+00:00] [external_command] [info] [968] EXTERNAL COMMAND: SEND_CUSTOM_HOST_NOTIFICATION;avea-central-2210-env-test;1;Test de notification;Ceci est un test de notification depuis le GUI.
````
