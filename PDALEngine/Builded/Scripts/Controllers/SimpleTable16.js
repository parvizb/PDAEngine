﻿/// <reference path="../../Res/toolkit.js" />



var SimpleTable16=new Object();

var currentButton;
SimpleTable16.sendFiles=  function()
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
            SimpleTable16.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=SimpleTable16");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


SimpleTable16.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(SimpleTable16.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='SimpleTable16';
    Entity.Parameters=new Array();
    ScallerAjax('ScallerSubmit',Entity,function(data){

        if(targetElement!=null)
    {
        targetElement.value=data.retrunValue;
    }
        
  
 

  
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
SimpleTable16.Validate= function()
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


SimpleTable16.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(SimpleTable16.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=SimpleTable16.Serach;
    var Entity=new Object();
    Entity.PageName='SimpleTable16';
    Entity.Parameters=new Array();
     
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.SimpleTable16records= data.records;
          
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.SimpleTable16records= data.records;
                  
        dlgScope.$apply(function(){});

    }
            for(var l=0;l<currentScope.SimpleTable16records.length;l++)
{ 
    var record=currentScope.SimpleTable16records[l];
    if(Num(record.CITYPop)>15000)
    {
        currentScope.SimpleTable16records[l].selected=true;
        $('#selected_' + currentScope.SimpleTable16records[l].rndId).attr('checked',true);
}
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




