# centreon_send_test_notification_from_gui

!!!!only for tests at the moment!!!!

Allow you to test notification from GUI on existing host/service in resources status page.
![image](https://github.com/user-attachments/assets/8e34ff68-201e-4149-a056-1b4aa7087b8a)


It is using gorgone api to send centengine external commands on a cenfigured poller.
source : 
[SEND_CUSTOM_HOST_NOTIFICATION](https://assets.nagios.com/downloads/nagioscore/docs/externalcmds/cmdinfo.php?command_id=134)
[SEND_CUSTOM_SVC_NOTIFICATION](https://assets.nagios.com/downloads/nagioscore/docs/externalcmds/cmdinfo.php?command_id=135)

/var/log/centreon-gorgone/gorgone.log (on the Central)
````
2024-10-21 17:26:02 - DEBUG - [httpserver] internal message: [COMMAND] [8bb91ec765845097afb4814d44a7bd72b8183bc7c2d5d27f73f53ef075969b52748b3c25011ee84668d8d88c501bf32a0fd4ca9666d7b513d3f71ef5d7ee0f85] [1] {"variables":[],"parameters":{},"content":[{"command":"echo  \"[1729531562] SEND_CUSTOM_SVC_NOTIFICATION;avea-central-2210-env-test;null;1;Test de notification;Ceci est un test de notification depuis le GUI.\" > /var/lib/centreon-engine/rw/centengine-toto.cmd"}]}
````

/var/log/centreon-engine/centengine.log (on the concerned polleur)
