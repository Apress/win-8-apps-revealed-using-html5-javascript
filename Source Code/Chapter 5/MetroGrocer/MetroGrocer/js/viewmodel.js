/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />

(function () {
    "use strict";

    var shoppingItemsList = new WinJS.Binding.List();
    var preferredStoresList = new WinJS.Binding.List();

    WinJS.Namespace.define("ViewModel", {
        UserData: WinJS.Binding.as({
            homeZipCode: null,

            getStores: function () {
                return preferredStoresList;
            },

            addStore: function (newStore) {
                preferredStoresList.push(newStore);
            },

            getItems: function () {
                return shoppingItemsList;
            },

            addItem: function (newName, newQuantity, newStore) {
                shoppingItemsList.push({
                    item: newName,
                    quantity: newQuantity,
                    store: newStore
                });
            }
        }), 

        State: WinJS.Binding.as({
            selectedItemIndex: -1
        })
    });


    ViewModel.UserData.homeZipCode = "NY 10118";

    ViewModel.UserData.addStore("Whole Foods");
    ViewModel.UserData.addStore("Kroger");
    ViewModel.UserData.addStore("Costco");
    ViewModel.UserData.addStore("Walmart");

    ViewModel.UserData.addItem("Apples", 4, "Whole Foods");
    ViewModel.UserData.addItem("Hotdogs", 12, "Costco");
    ViewModel.UserData.addItem("Soda", "4 pack", "Costco");
})();
