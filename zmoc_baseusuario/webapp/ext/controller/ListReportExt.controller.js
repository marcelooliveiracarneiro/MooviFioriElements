sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        onInitSmartFilterBarExtension: function(oEvent) {
            //var sUser = "MVMCARNEIRO", 
            var sUser = sap.ushell.Container.getService("UserInfo").getId(),
            oDefaultFilter = {
                "Userid" : sUser
            };
            this.byId( "listReportFilter" ).setFilterData(oDefaultFilter);
            this.byId("listReportFilter").determineFilterItemByName("Userid").setVisibleInFilterBar(false);
        } 
    };
});