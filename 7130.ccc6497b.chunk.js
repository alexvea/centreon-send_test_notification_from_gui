[...]
//document.querySelector('[data-testid="NotificationsActiveIcon"]').addEventListener("click", myScript);
document.addEventListener("click", myScript);
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
                fetch(url_execute, {
                        method: "POST",
                        body: JSON.stringify({
                        host_name: host_name,
                        service_name: service_name,
                }),
                headers: {
                        "Content-type": "application/json; charset=UTF-8"
                }
        });
        }
        }
}
