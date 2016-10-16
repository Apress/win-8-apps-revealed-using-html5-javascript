/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />

(function () {
    "use strict";

    WinJS.Namespace.define("Search", {

        searchAndSelect: function (searchTerm) {
            var searchTerm = searchTerm.toLowerCase();
            var items = ViewModel.UserData.getItems();
            var matchedIndex = -1;

            for (var i = 0 ; i < items.length; i++) {
                if (items.getAt(i).item.toLowerCase().indexOf(searchTerm) > -1) {
                    matchedIndex = i;
                    break;
                }
            }
            ViewModel.State.selectedItemIndex = matchedIndex;
        }
    });
})();
