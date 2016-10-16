/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />
(function () {
    "use strict";

    WinJS.Namespace.define("Tiles", {

        sendBadgeUpdate: function () {

            var itemCount = ViewModel.UserData.getItems().length;

            var tn = Windows.UI.Notifications;
            var templateType = itemCount ? tn.BadgeTemplateType.badgeGlyph
                : tn.BadgeTemplateType.badgeNumber;

            var badgeXml = tn.BadgeUpdateManager.getTemplateContent(templateType);
            var badgeAttribute = badgeXml.getElementsByTagName("badge")[0];
            badgeAttribute.setAttribute("value",
                itemCount > 3 ? "alert" : itemCount);

            for (var i = 0; i < 5; i++) {
                var badgeNotification = new tn.BadgeNotification(badgeXml);
                tn.BadgeUpdateManager.createBadgeUpdaterForApplication()
                    .update(badgeNotification);
            }
        },

        sendTileUpdate: function () {
            var storeCounter = { count: 0 };
            ViewModel.UserData.getItems().forEach(function (listItem) {
                if (!storeCounter[listItem.store]) {
                    storeCounter[listItem.store] = true;
                    storeCounter.count++;
                }
            });

            var tn = Windows.UI.Notifications;
            var squareXmlFragment = tn.TileUpdateManager
                .getTemplateContent(tn.TileTemplateType.tileSquareText03);
            var wideXmlFragment = tn.TileUpdateManager
                .getTemplateContent(tn.TileTemplateType.tileWideBlockAndText01);

            var squareTextNodes = squareXmlFragment.getElementsByTagName("text");
            var wideTextNodes = wideXmlFragment.getElementsByTagName("text");
            var items = ViewModel.UserData.getItems();

            for (var i = 0; i < squareTextNodes.length; i++) {
                var listItem = items.getAt(i);
                if (listItem) {
                    squareTextNodes[i].innerText = listItem.item;
                    wideTextNodes[i].innerText = listItem.item + " (" + listItem.store + ")";
                }
            }

            wideTextNodes[4].innerText = storeCounter.count;
            wideTextNodes[5].innerText = "Stores";

            var wideBindingElement = wideXmlFragment.getElementsByTagName("binding")[0];
            var importedNode = squareXmlFragment.importNode(wideBindingElement, true);
            var squareVisualElement = squareXmlFragment.getElementsByTagName("visual")[0];
            squareVisualElement.appendChild(importedNode);

            for (var i = 0; i < 5; i++) {
                tn.TileUpdateManager.createTileUpdaterForApplication()
                    .update(new tn.TileNotification(squareXmlFragment))
            }
        }
    });

    var eventTypes = ["itemchanged", "iteminserted", "itemmoved", "itemremoved"];
    var itemsList = ViewModel.UserData.getItems();
    eventTypes.forEach(function (type) {
        itemsList.addEventListener(type, function (e) {
            Tiles.sendTileUpdate();
            Tiles.sendBadgeUpdate();
        });
    });
})();
