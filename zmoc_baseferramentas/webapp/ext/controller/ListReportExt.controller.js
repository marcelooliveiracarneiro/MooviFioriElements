sap.ui.define([
    "sap/ui/core/Fragment",
    "sap/m/MessageToast"
], function(Fragment,MessageToast) {
    'use strict';

    return {
        sPath: "",

        onEdit: function(oEvent) {
            //MessageToast.show("Custom handler invoked.");
            this._getSelectedRow();
            if(this._getModel("modelView").getProperty("/Toolsid") != undefined) {
                this._getValueHelpRequest();
            }
        },
        _getModel: function(sModel) {
            return this.getView().getModel(sModel);
        },
        _getSelectedRow: function() {
            this.sPath = this.getView().byId("listReport").getTable().getSelectedContextPaths()[0];
            
            this._getModel("modelView").setProperty("/Toolsid", this._getModel().getProperty(this.sPath + "/Toolsid") );
            this._getModel("modelView").setProperty("/Toolname",this._getModel().getProperty(this.sPath+"/Toolname"));
        },
        _getValueHelpRequest: function(){
            var oView = this.getView();
            this.sPath = this.getView().byId("listReport").getTable().getSelectedContextPaths()[0];

            if (!this._pValueHelpDialog) {
                this._pValueHelpDialog = Fragment.load({
                    id: oView.getId(),
                    name: "moovi.zmocbaseferramentas.fragment.DialogEdit",
                    controller: this
                }).then(function (oValueHelpDialog){
                    oView.addDependent(oValueHelpDialog);
                    return oValueHelpDialog;
                });
            }
            this._pValueHelpDialog.then(function(oValueHelpDialog){
                oValueHelpDialog.open();
            }.bind(this));
        },
        onSave: function(){
            this._getModel().setProperty(this.sPath + "/Toolname", this._getModel("modelView").getProperty("/Toolname"));

            this._getModel().submitChanges();
            this._getModel().refresh();

            this.onClose();
        },
        onClose: function(){
            this.oDialog = this.getView().byId("ListDialog");
            this.oDialog.close();
        }
    };
});