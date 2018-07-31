﻿/// <reference path="../../Res/toolkit.js" />
var ServiceFactor_Insert=new Object();
var currentButton;
ServiceFactor_Insert.sendFiles=  function()
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
            ServiceFactor_Insert.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=ServiceFactor_Insert");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


ServiceFactor_Insert.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(ServiceFactor_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='ServiceFactor_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('GetOrProdive',$('#txtGetOrProdive').val()));
    
                    Entity.Parameters.push( toInput('CusAccId',$('#txtCusAccId').val()));
    
                    Entity.Parameters.push( toInput('ServiceId',$('#txtServiceId').val()));
    
                    Entity.Parameters.push( toInput('Cost',$('#txtCost').val()));
    
                    Entity.Parameters.push( toInput('Adding',$('#txtAdding').val()));
    
                    Entity.Parameters.push( toInput('FactorNumber',$('#txtFactorNumber').val()));
    
                    Entity.Parameters.push( toInput('ServiceDate',$('#txtServiceDate').val()));
    
                    Entity.Parameters.push( toInput('Descr',$('#txtDescr').val()));
    
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
ServiceFactor_Insert.Validate= function()
{
    Validator.ClearErrors();
        
                                                                            
                                                        Validator.CheckRegSelect2('txtCusAccId','مشتری');
                                    
                                                        Validator.CheckRegSelect2('txtServiceId','کد خدمت');
                                    
                                                        Validator.CheckRegInteger('txtCost','هزینه');
                                                            
            
            
                                                                        Validator.CheckRegDate('txtServiceDate','تاریخ ارائه');
                                    
        
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


ServiceFactor_Insert.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(ServiceFactor_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=ServiceFactor_Insert.Serach;
    var Entity=new Object();
    Entity.PageName='ServiceFactor_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('GetOrProdive',$('#txtGetOrProdive').val()));
    
                    Entity.Parameters.push( toInput('CusAccId',$('#txtCusAccId').val()));
    
                    Entity.Parameters.push( toInput('ServiceId',$('#txtServiceId').val()));
    
                    Entity.Parameters.push( toInput('Cost',$('#txtCost').val()));
    
                    Entity.Parameters.push( toInput('Adding',$('#txtAdding').val()));
    
                    Entity.Parameters.push( toInput('FactorNumber',$('#txtFactorNumber').val()));
    
                    Entity.Parameters.push( toInput('ServiceDate',$('#txtServiceDate').val()));
    
                    Entity.Parameters.push( toInput('Descr',$('#txtDescr').val()));
    
         
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





