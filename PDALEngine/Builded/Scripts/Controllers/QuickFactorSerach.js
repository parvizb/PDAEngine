/// <reference path="../../Res/toolkit.js" />



var QuickFactorSerach=new Object();

var currentButton;
QuickFactorSerach.sendFiles=  function()
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
            QuickFactorSerach.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=QuickFactorSerach");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


QuickFactorSerach.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(QuickFactorSerach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='QuickFactorSerach';
    Entity.Parameters=new Array();
    ScallerAjax('ScallerSubmit',Entity,function(data){

        targetElement.value=data.retrunValue;
        
  
 

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
QuickFactorSerach.Validate= function()
{
    Validator.ClearErrors();
    
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


QuickFactorSerach.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(QuickFactorSerach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=QuickFactorSerach.Serach;
    var Entity=new Object();
    Entity.PageName='QuickFactorSerach';
    Entity.Parameters=new Array();
     
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.QuickFactorSerachrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.QuickFactorSerachrecords= data.records;
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
    QuickFactorSerach.Scaler=function(namePara)
    {
        var d = getDailOpen();
        targetElement   = document.getElementById('txt' + ( window.pageName) + namePara);
        var s=document.querySelector('#pincQuickFactorSerach');
        angular.element(s).scope(currentScope);
        $("#mdlQuickFactorSerach").modal('show');
        SetupDlgScope();

    }
    QuickFactorSerach.SerachMode=function(namePara,fun)
    {
        var d = getDailOpen();
        targetElement   = document.getElementById('txt' + ( window.pageName) + namePara);
        var s=document.querySelector('#pincQuickFactorSerach');
         dlgScope= angular.element(s).scope();
        $("#mdlQuickFactorSerach").modal('show');
        OkDailogSelect=fun;
        SetupDlgScope();
    }
    QuickFactorSerach.SerachAndPutValue=function(namePara,colName)
    {
        var d = getDailOpen();
        targetElement   = document.getElementById('txt' + ( window.pageName) + namePara);
        var s=document.querySelector('#pincQuickFactorSerach');
        dlgScope= angular.element(s).scope();
        $("#mdlQuickFactorSerach").modal('show');
        OkDailogSelect=function(d){targetElement.value=SelectableRow[colName]};

        SetupDlgScope();
        
        
    }
 
}




