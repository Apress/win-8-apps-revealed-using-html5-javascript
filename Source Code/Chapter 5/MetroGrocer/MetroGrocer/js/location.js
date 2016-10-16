/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />
(function () {
    "use strict";

    var currentPromise;
    var tracking = false;

    function trackLocation() {
        currentPromise = new WinJS.Promise(function (complete) {
            var geo = new Windows.Devices.Geolocation.Geolocator();
            if (geo) {
                geo.getGeopositionAsync().then(function (position) {
                    WinJS.xhr({
                        url: "http://nominatim.openstreetmap.org"
                            + "/reverse?format=json&lat="
                            + position.coordinate.latitude
                            + "&lon=" + position.coordinate.longitude

                    }).then(function (data) {
                        var dataObject = JSON.parse(data.response);
                        if (dataObject.address.road) {
                            var date = new Date();
                            var time = date.getHours() + ":" + date.getMinutes()
                                + ":" + date.getSeconds();
                            document.getElementById("geo").innerText =
                                dataObject.address.road + " (" + time + ")";
                        }
                    });
                });
            }
            complete();
        });

        currentPromise.then(function () {
            if (tracking) {
                setTimeout(trackLocation, 5000);
            }
        });
    }

    WinJS.Namespace.define("Location", {
        startTracking: function () {
            tracking = true;
            trackLocation();
        },

        stopTracking: function () {
            tracking = false;
            return currentPromise;
        }
    });
})();