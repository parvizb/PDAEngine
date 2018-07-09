﻿/// <reference path="../../Res/toolkit.js" />
var MoveToAccBank=new Object();
var currentButton;
MoveToAccBank.sendFiles=  function()
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
            MoveToAccBank.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=MoveToAccBank");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


MoveToAccBank.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(MoveToAccBank.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='MoveToAccBank';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('bankCheckId',routeParams.bankCheckId ));
                    Entity.Parameters.push( toInput('OptDate',$('#txtOptDate').val()));
    
                    Entity.Parameters.push( toInput('AccId',$('#txtAccId').val()));
    
                    Entity.Parameters.push( toInput('OptDescr',$('#txtOptDescr').val()));
    
        ScallerAjax('ScallerSubmit',Entity,function(data){

        Messager.ShowMessage('اطلاعات', data.Message );
 
     
  
 

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
MoveToAccBank.Validate= function()
{
    Validator.ClearErrors();
        
            
            
                                                                        Validator.CheckRegDate('txtOptDate','تاریخ وصول');
                                    
                                                        Validator.CheckRegSelect2('txtAccId','حساب جهت وصول');
                                    
        
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


MoveToAccBank.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(MoveToAccBank.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=MoveToAccBank.Serach;
    var Entity=new Object();
    Entity.PageName='MoveToAccBank';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('bankCheckId',routeParams.bankCheckId ));
                    Entity.Parameters.push( toInput('OptDate',$('#txtOptDate').val()));
    
                    Entity.Parameters.push( toInput('AccId',$('#txtAccId').val()));
    
                    Entity.Parameters.push( toInput('OptDescr',$('#txtOptDescr').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.records= data.records;
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
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





