sap.ui.define([
    "sap/suite/ui/generic/template/extensionAPI/extensionAPI",
    "sap/m/MessageBox",
],
function (ExtensionAPI,MessageBox){
    "use strict";

    const Const_ButtonDisableMessageId = "moovi.zmocbaseusuario::sap.suite.ui.generic.template.ObjectPage.view.Details::ZMOCCDS_C_USERS--action::cds_zmocsd_c_users.cds_zmocsd_c_users_Entities::setInactive";

    return {
        onInit: function (oEvent) {
            ExtensionAPI.getExtensionAPIPromise(this.getView()).then(function (oExtensionAPI) {
                oExtensionAPI.attachPageDataLoaded(function (event) {
                    var sPath = event.context.sPath,
                        oData = event.context.getModel().getProperty(sPath),
                        that = this,
                        oButton = this.byId( Const_ButtonDisableMessageId );
                        oButton.setVisible(false); 
        
                    if (oData.Isnew == false) {
                        MessageBox.success(oData.Fullname + ',\n' + this._i18n().getText('infoMsg'), {
                            actions: MessageBox.Action.OK,
                            title: this._i18n().getText('bemVindo'),
                            emphasizedAction: MessageBox.Action.OK,
                            onClose: function (sAction) {
                                that.byId( Const_ButtonDisableMessageId ).firePress();
                            }
                        });
                    }
                     else {
                         oButton.setVisible(false);
                     }
                }.bind(this));
            }.bind(this))
        },
        
        _i18n: function () {
            return this.getView().getModel('i18n').getResourceBundle();
        }
    };
});