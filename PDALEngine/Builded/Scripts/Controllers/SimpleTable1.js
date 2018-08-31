/// <reference path="../../Res/toolkit.js" />



var SimpleTable1=new Object();

var currentButton;
SimpleTable1.sendFiles=  function()
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
            SimpleTable1.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=SimpleTable1");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


SimpleTable1.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(SimpleTable1.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='SimpleTable1';
    Entity.Parameters=new Array();
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
SimpleTable1.Validate= function()
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


SimpleTable1.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(SimpleTable1.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=SimpleTable1.Serach;
    var Entity=new Object();
    Entity.PageName='SimpleTable1';
    Entity.Parameters=new Array();
     
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.SimpleTable1records= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.SimpleTable1records= data.records;
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




