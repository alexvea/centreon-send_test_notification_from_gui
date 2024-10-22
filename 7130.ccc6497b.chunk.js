var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "http://code.jquery.com/jquery-2.2.1.min.js";

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = handler;
    script.onload = handler;

    // Fire the loading
    head.appendChild(script);

    function handler(){
    }

document.addEventListener("click", someListener);

function someListener(event){
    var element = event.target;
    if(document.querySelector('[data-testid="NotificationsActiveIcon"]>path') == element || document.querySelector('[data-testid="NotificationsActiveIcon"]') == element){
        myScript();
    }
}
function loopGetLog(url,data) {
        var interval_milliseconds = 2000;
        var t = 0;
        var dots = "";
        let interval = setInterval(function() { // this code is executed every 2500 milliseconds:
        $.get(url, function(data, status){
                var obj_log = jQuery.parseJSON(data);
                if (obj_log.message === "Logs found") { 
                        console.log("log found");
                        console.log(obj_log);
                        switch (obj_log.data.length) {
                                case 1:
                                  var cmd_log = jQuery.parseJSON(obj_log.data[0].data);
                                  $('[data-testid="NotificationsActiveIcon"]>path').attr("d", "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z");
                                  $('[data-testid="NotificationsActiveIcon"]').css({ fill: '#ff0000' });
                                  $('[data-testid="NotificationsActiveIcon"]').attr("titre", "Notification sent by Gorgone" );
                                  clearInterval(interval);
                                  break;
                                case 4:
                                  var cmd_log = jQuery.parseJSON(obj_log.data[2].data);
                                  $('[data-testid="NotificationsActiveIcon"]>path').attr("d", "M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z");
                                  $('[data-testid="NotificationsActiveIcon"]').css({ fill: '#008000' });
                                  clearInterval(interval);
                                  break;
                                case 2:
                                  t = t + (interval_milliseconds/1000)
                                  var cmd_log = jQuery.parseJSON(obj_log.data[0].data);
                                  var cmd_log2 = jQuery.parseJSON(obj_log.data[1].data);
                                default:
                                  
                        }
                } else {
                        console.log("Logs not found");
                };
        });

    }, interval_milliseconds);
}






function myScript() {
        var Bouton = document.querySelector('[data-testid="NotificationsActiveIcon"]');
        if (Bouton !== null ) {
                var Resources=document.querySelector(".css-16c9gkf-resourceNameContainer");
                if (typeof Resources !== 'undefined' && Resources !== null)  {
                var ArrayResources = Resources.innerText.split('\n');
                switch(Resources.innerText.split('\n').length) {
                        case 1:
                        var service_name = null;
                        var host_name = ArrayResources[0];
                        break;
                        case 3:
                        var service_name = ArrayResources[0];
                        var host_name = ArrayResources[2];
                        break;
                }
                var url_execute = "/centreon/include/common/webServices/rest/internal.php?object=centreon_send_test_notification&action=executeNotification"
                var url_get_log = "/centreon/include/common/webServices/rest/internal.php?object=centreon_send_test_notification&action=getlogCommand&token_id="
                var data = "{\"host_name\": \""+host_name+"\",\"service_name\": \""+service_name+"\"}";
                $.post(url_execute, data, function(data, status){
                var obj = jQuery.parseJSON(data);
                console.log("token: " + obj.token + "\nStatus: " + status);
                if (typeof(obj.token) === "string" ) {
                        $('[data-testid="NotificationsActiveIcon"]>path').attr("d", "M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z");

                        $('[data-testid="NotificationsActiveIcon"]').css({ fill: '#000000' });
                        loopGetLog(url_get_log+obj.token+"&poller_id="+obj.poller_id);
                        console.log("token exist, check log");
                }else{
                };
        });
        }
        }
}
