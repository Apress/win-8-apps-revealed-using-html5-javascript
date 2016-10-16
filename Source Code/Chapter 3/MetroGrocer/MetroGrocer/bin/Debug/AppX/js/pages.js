/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />

(function () {
    "use strict";

    WinJS.UI.Pages.define("/html/noselection.html", {
        ready: function (targetElement) {
            numberCount.innerText = ViewModel.UserData.getItems().length;
        }
    });

    WinJS.UI.Pages.define("/html/storeDetail.html", {
        ready: function (targetElement) {
            ViewModel.State.bind("selectedItemIndex", function (newValue) {

                noStoreSelectionContainer.style.display = (newValue != -1 ? "none" : "");
                storeSelectionContainer.style.display = (newValue == -1 ? "none" : "");

                if (newValue != -1) {
                    var store = ViewModel.UserData.getItems().getAt(newValue).store;
                    var url = "http://" + store.replace(" ", "") + ".com";
                    document.getElementById("storeFrame").src = url;
                }
            });
        }
    })

})();
