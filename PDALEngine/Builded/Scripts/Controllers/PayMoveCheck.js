/// <reference path="../../Res/toolkit.js" />



var PayMoveCheck=new Object();

var currentButton;
PayMoveCheck.sendFiles=  function()
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
            PayMoveCheck.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=PayMoveCheck");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


PayMoveCheck.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(PayMoveCheck.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='PayMoveCheck';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('bankCheckId',routeParams.bankCheckId ));
                    Entity.Parameters.push( toInput('OptDate',$('#txtPayMoveCheckOptDate').val()));
    
                    Entity.Parameters.push( toInput('OptDescr',$('#txtPayMoveCheckOptDescr').val()));
    
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
PayMoveCheck.Validate= function()
{
    Validator.ClearErrors();
        
            
            
                                                                        Validator.CheckRegDate('txtPayMoveCheckOptDate','تاریخ وصول');
                                    
        
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


PayMoveCheck.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(PayMoveCheck.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=PayMoveCheck.Serach;
    var Entity=new Object();
    Entity.PageName='PayMoveCheck';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('bankCheckId',routeParams.bankCheckId ));
                    Entity.Parameters.push( toInput('OptDate',$('#txtPayMoveCheckOptDate').val()));
    
                    Entity.Parameters.push( toInput('OptDescr',$('#txtPayMoveCheckOptDescr').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.PayMoveCheckrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.PayMoveCheckrecords= data.records;
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




