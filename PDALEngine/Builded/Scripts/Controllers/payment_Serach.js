﻿/// <reference path="../../Res/toolkit.js" />
var payment_Serach=new Object();
var currentButton;
payment_Serach.sendFiles=  function()
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
            payment_Serach.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=payment_Serach");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


payment_Serach.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(payment_Serach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='payment_Serach';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('payment_id',$('#txtpayment_id').val()));
    
                    Entity.Parameters.push( toInput('payment_amount',$('#txtpayment_amount').val()));
    
                    Entity.Parameters.push( toInput('cus_id',$('#txtcus_id').val()));
    
                    Entity.Parameters.push( toInput('dis_amount',$('#txtdis_amount').val()));
    
                    Entity.Parameters.push( toInput('payment_Date_start',$('#txtpayment_Date_start').val()));
    
                    Entity.Parameters.push( toInput('payment_Date_end',$('#txtpayment_Date_end').val()));
    
                    Entity.Parameters.push( toInput('descr',$('#txtdescr').val()));
    
                    Entity.Parameters.push( toInput('acc_id',$('#txtacc_id').val()));
    
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
payment_Serach.Validate= function()
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


payment_Serach.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(payment_Serach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=payment_Serach.Serach;
    var Entity=new Object();
    Entity.PageName='payment_Serach';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('payment_id',$('#txtpayment_id').val()));
    
                    Entity.Parameters.push( toInput('payment_amount',$('#txtpayment_amount').val()));
    
                    Entity.Parameters.push( toInput('cus_id',$('#txtcus_id').val()));
    
                    Entity.Parameters.push( toInput('dis_amount',$('#txtdis_amount').val()));
    
                    Entity.Parameters.push( toInput('payment_Date_start',$('#txtpayment_Date_start').val()));
    
                    Entity.Parameters.push( toInput('payment_Date_end',$('#txtpayment_Date_end').val()));
    
                    Entity.Parameters.push( toInput('descr',$('#txtdescr').val()));
    
                    Entity.Parameters.push( toInput('acc_id',$('#txtacc_id').val()));
    
         
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




