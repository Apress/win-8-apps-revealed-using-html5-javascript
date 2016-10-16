/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />

(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/itemDetail/itemDetail.html", {
        ready: function (targetElement) {

            var selectedIndex = ViewModel.State.selectedItemIndex;
            var selectedItem = ViewModel.UserData.getItems().getAt(selectedIndex);

            itemInput.value = selectedItem.item;
            quantityInput.value = selectedItem.quantity;

            WinJS.Utilities.empty(storeSelect);
            var list = ViewModel.UserData.getStores();

            list.forEach(function (item) {
                var newOption = document.createElement("option");
                newOption.text = item;
                if (selectedItem.store == item) {
                    newOption.selected = true;
                }
                storeSelect.add(newOption);
            });

            WinJS.Utilities.query('#itemEditor input, #itemEditor select')
                .listen("change", function () {

                ViewModel.UserData.getItems().setAt(selectedIndex, {
                    item: itemInput.value,
                    quantity: quantityInput.value,
                    store: storeSelect.value
                });
            });
        }
    })
})();
