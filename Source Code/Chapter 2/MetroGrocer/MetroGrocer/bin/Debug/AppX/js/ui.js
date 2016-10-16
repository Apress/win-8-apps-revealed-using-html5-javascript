/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />

(function () {
    "use strict";

    WinJS.Namespace.define("UI.List", {
        displayListItems: function () {

            WinJS.Utilities.empty(itemBody);

            var list = ViewModel.UserData.getItems();

            for (var i = 0; i < list.length; i++) {
                itemTemplate.winControl.render(list.getAt(i), itemBody);
            }

            WinJS.Utilities.children(itemBody).listen("click", function (e) {
                ViewModel.State.selectedItemIndex = this.rowIndex - 1;
                WinJS.Utilities.children(itemBody).removeClass("selected");
                WinJS.Utilities.addClass(this, "selected");
            });
        },

        setupListEvents: function () {
            var eventTypes = ["itemchanged", "iteminserted", "itemmoved", "itemremoved"];
            var itemsList = ViewModel.UserData.getItems();
            eventTypes.forEach(function (type) {
                itemsList.addEventListener(type, UI.List.displayListItems);
            });
        },
    });
})();
