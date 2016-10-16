/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />

(function () {
    "use strict";

    WinJS.Namespace.define("UI.Flyouts", {
        setupAddItemFlyout: function () {
            WinJS.Utilities.empty(stores);
            var list = ViewModel.UserData.getStores();
            list.forEach(function (item) {
                var newOption = document.createElement("option");
                newOption.text = item;
                stores.add(newOption);
            });

            addItemButton.addEventListener("click", function () {
                ViewModel.UserData.addItem(groceryItem.value, quantity.value,
                    stores.value);
                addItemFlyout.winControl.hide();
                appBar.winControl.hide();
            });
        }
    });

    WinJS.Namespace.define("UI.AppBar", {
        setupButtons: function () {
            ViewModel.State.bind("selectedItemIndex", function (newValue, oldValue) {
                done.disabled = (newValue == -1);
            });

            done.addEventListener("click", function (e) {
                var selectedIndex = ViewModel.State.selectedItemIndex;
                ViewModel.UserData.getItems().splice(selectedIndex, 1);
                ViewModel.State.selectedItemIndex = -1;
            });
        }
    });

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
