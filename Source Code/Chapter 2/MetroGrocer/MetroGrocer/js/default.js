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
        });
    }


    function performRestore(e) {
        // TODO
    }

    function performSuspend(e) {
        // TODO
    }
})();
