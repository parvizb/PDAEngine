/// <reference path="../../Res/toolkit.js" />


var sp_Request_SelectRow = new Object();
sp_Request_SelectRow.Submit = function () {
    if (sp_Request_SelectRow.Validate() == false) {
        return;

    }

    var Entity = new Object();
    Entity.PageName = 'sp_Request_SelectRow';
    if (JsEventInterface.BeforeSubmit != null) {
        JsEventInterface.BeforeSubmit(Entity);
    }
    Entity.Parameters = new Array();

    Entity.Parameters.push(toInput('Req_Id', routeParams.Req_Id));

    Entity.Parameters.push(toInput('req_min_Sup', $('#txtreq_min_Sup').val()));


    Entity.Parameters.push(toInput('Req_max_sup', $('#txtReq_max_sup').val()));

    if (JsEventInterface.AfterSubmit != null) {
        JsEventInterface.AfterSubmit(Entity);
    }
    ScallerAjax('ScallerSubmit', Entity, function (data) {
        if (JsEventInterface.BeforeOkReqSubmit != null) {
            JsEventInterface.BeforeOkReqSubmit(Entity, data);
        }
        Messager.ShowMessage('اطلاعات', data.Message);
        if (JsEventInterface.AfterOkReqSubmit != null) {
            JsEventInterface.AfterOkReqSubmit(Entity, data);
        }
        BackPage();
        return;

    }, function (data) {
        return;

    });
};
sp_Request_SelectRow.Validate = function () {
    if (JsEventInterface.beforeValidate != null) {
        JsEventInterface.beforeValidate('sp_Request_SelectRow');

    }
    Validator.ClearErrors();




    if (JsEventInterface.afterVaildate != null) {
        JsEventInterface.afterVaildate('sp_Request_SelectRow');

    }



    if (Messager.errors.length != 0) {

        Validator.ShowErrors();
        return false;
    }
    if (Messager.errors.length != 0) {

        Validator.ShowErrors();
        return false;
    }


    return Messager.errors.length == 0;
}

sp_Request_SelectRow.Serach = function () {
    window.CurrentSerachMethod = sp_Request_SelectRow.Serach;
    var Entity = new Object();
    Entity.PageName = 'sp_Request_SelectRow';
    Entity.Parameters = new Array();
    Entity.Parameters.push(toInput('Req_Id', routeParams.Req_Id));
    Entity.Parameters.push(toInput('req_min_Sup', $('#txtreq_min_Sup').val()));
    Entity.Parameters.push(toInput('Req_max_sup', $('#txtReq_max_sup').val()));


    TableViewAjax('getTableViewRecords', Entity, function (data) {

        currentScope.records = data.records;
        currentScope.$apply(function () { });
        NormalResult();
        return;

    }, function (data) {
        return;

    });


}


