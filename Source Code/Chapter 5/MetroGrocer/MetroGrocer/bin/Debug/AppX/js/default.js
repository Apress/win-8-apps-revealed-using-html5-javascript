(function () {
    "use strict";

    Windows.UI.WebUI.WebUIApplication.addEventListener("activated", function (e) {
        var actNS = Windows.ApplicationModel.Activation;

        if (e.previousExecutionState == actNS.ApplicationExecutionState.notRunning) {
            performInitialSetup(e);
        }

        if (e.kind == actNS.ActivationKind.search) {
            Search.searchAndSelect(e.queryText);
        }
    });

    Windows.UI.WebUI.WebUIApplication.addEventListener("resuming", performResume);
    Windows.UI.WebUI.WebUIApplication.addEventListener("suspending", performSuspend);

    function performInitialSetup(e) {
        WinJS.UI.processAll().then(function () {
            UI.List.displayListItems();
            UI.List.setupListEvents();
            UI.AppBar.setupButtons();
            UI.Flyouts.setupAddItemFlyout();

            ViewModel.State.bind("selectedItemIndex", function (newValue) {
                WinJS.Utilities.empty(itemDetailTarget)
                var url = newValue == -1 ? "/html/noSelection.html" :
                    "/pages/itemDetail/itemDetail.html"
                WinJS.UI.Pages.render(url, itemDetailTarget);
            });

            WinJS.UI.Pages.render("/html/storeDetail.html", storeDetailTarget);

            function setOrientationClass() {
                if (Windows.UI.ViewManagement.ApplicationView.value == Windows.UI.ViewManagement.ApplicationViewState.fullScreenPortrait) {
                    WinJS.Utilities.addClass(contentGrid, "flex");
                } else {
                    WinJS.Utilities.removeClass(contentGrid, "flex");
                }
            };
            window.addEventListener("resize", setOrientationClass);
            setOrientationClass();

            unsnapButton.addEventListener("click", function (e) {
                Windows.UI.ViewManagement.ApplicationView.tryUnsnap();
            });

            //Tiles.sendTileUpdate();
            //Tiles.sendBadgeUpdate();

            Location.startTracking();
        });
    }

    function performResume(e) {
        Location.startTracking();
    }

    function performSuspend(e) {
        var promise = Location.stopTracking();
        if (promise) {
            var deferral = e.suspendingOperation.getDeferral();
            promise.then(function () {
                deferral.complete();
            });
        }
    }
})();
