/// <reference path="../../Res/toolkit.js" />



var QuickFactorInsert=new Object();

var currentButton;
QuickFactorInsert.sendFiles=  function()
{
    var data = new FormData();
 
                $('#loadingBar').show();
    $('#fileStatus').show();
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
            var progress = Math.round(evt.loaded * 100 / evt.total);
            $('#progessStatus').css('width'  , progress + '%');
            $('#progessStatus').attr('aria-valuenow'  , progress *2);
        }
    }, false);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200 ) {
            window.fileUploaded=true;
            $('#loadingBar').hide();
            $('#fileStatus').hide();
            QuickFactorInsert.Submit(currentButton);
        } else {
            if((xhr.status==500) && (xhr.readyState == 4))
            {
                $('#fileStatus').hide();
                $('#loadingBar').hide();
                var dos=document.createElement("s");
                dos.innerHTML=xhr.responseText;
                 
                alert("خطا در ارسال فایل ها" +  dos.getElementsByTagName("title")[0].innerHTML );
                    
            }
         
        }
    };
    xhr.open('POST', "Home/SendFiles?PageName=QuickFactorInsert");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


QuickFactorInsert.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(QuickFactorInsert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='QuickFactorInsert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('factory_name',$('#txtQuickFactorInsertfactory_name').val()));
    
        ScallerAjax('ScallerSubmit',Entity,function(data){

        if(targetElement!=null)
    {
        targetElement.value=data.retrunValue;
    }
        
  
 

    Messager.ShowMessage('اطلاعات', data.Message);
    if(JsEventInterface.AfterOkReqSubmit!=null)
    {
        JsEventInterface.AfterOkReqSubmit(Entity,data);
    }
 
                                BackPage();
                         
         
     
  


    $(obj).attr('disabled',false);
    return;
       
},function(data)
{
    $(obj).attr('disabled',false);
    return;

});
};
QuickFactorInsert.Validate= function()
{
    Validator.ClearErrors();
        
                                Validator.CheckEmpty('txtQuickFactorInsertfactory_name','عنوان');
                                                                                        
    if(Messager.errors.length!=0)
    {
        Validator.ShowErrors();
        return false ;
    }
    
    if(Messager.errors.length!=0)
    {

        Validator.ShowErrors();
        return false ;
    }


    return Messager.errors.length==0;
}


QuickFactorInsert.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(QuickFactorInsert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=QuickFactorInsert.Serach;
    var Entity=new Object();
    Entity.PageName='QuickFactorInsert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('factory_name',$('#txtQuickFactorInsertfactory_name').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.QuickFactorInsertrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.QuickFactorInsertrecords= data.records;
        dlgScope.$apply(function(){});

    }
        $('[type="Select2Ajax"]').each(function(){
        $(this).val($(this).attr('valc'));

    });
    NormalResult();
        
    $(obj).attr('disabled',false);
    return;
          
},function(data)
{
    $(obj).attr('disabled',false);
    return;

});


}
window.targetElement=null;
{
    QuickFactorInsert.Scaler=function(namePara)
    {
        var d = getDailOpen();
        targetElement   = document.getElementById('txt' + ( window.pageName) + namePara);
        var s=document.querySelector('#pincQuickFactorInsert');
        angular.element(s).scope(currentScope);
        $("#mdlQuickFactorInsert").modal('show');
        SetupDlgScope();

    }
    QuickFactorInsert.SerachMode=function(namePara,fun)
    {
        var d = getDailOpen();
        targetElement   = document.getElementById('txt' + ( window.pageName) + namePara);
        var s=document.querySelector('#pincQuickFactorInsert');
         dlgScope= angular.element(s).scope();
        $("#mdlQuickFactorInsert").modal('show');
        OkDailogSelect=fun;
        SetupDlgScope();
    }
    QuickFactorInsert.SerachAndPutValue=function(namePara,colName)
    {
        var d = getDailOpen();
        targetElement   = document.getElementById('txt' + ( window.pageName) + namePara);
        var s=document.querySelector('#pincQuickFactorInsert');
        dlgScope= angular.element(s).scope();
        $("#mdlQuickFactorInsert").modal('show');
        OkDailogSelect=function(d){targetElement.value=SelectableRow[colName]};

        SetupDlgScope();
        
        
    }
 
}




