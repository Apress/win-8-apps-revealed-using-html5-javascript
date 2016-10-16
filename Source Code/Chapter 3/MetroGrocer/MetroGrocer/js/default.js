(function () {
    "use strict";

    var app = WinJS.Application;

    app.onactivated = function (eventObject) {
        if (eventObject.detail.kind ===
            Windows.ApplicationModel.Activation.ActivationKind.launch) {

            if (eventObject.detail.previousExecutionState !==
              Windows.ApplicationModel.Activation.ApplicationExecutionState.terminated) {
                performInitialSetup(eventObject);
            } else {
                performRestore(eventObject);
            }
            WinJS.UI.processAll();
        }
    };

    app.oncheckpoint = function (eventObject) {
        performSuspend(eventObject);
    };
    app.start();

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
        });
    }

    function performRestore(e) {
        // TODO
    }

    function performSuspend(e) {
        // TODO
    }
})();
