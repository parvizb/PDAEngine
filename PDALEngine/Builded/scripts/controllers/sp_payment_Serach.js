/// <reference path="../../Res/toolkit.js" />



var sp_payment_Serach=new Object();

var currentButton;
sp_payment_Serach.sendFiles=  function()
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
            sp_payment_Serach.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=sp_payment_Serach");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


sp_payment_Serach.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(sp_payment_Serach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='sp_payment_Serach';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('pay_id',$('#txtsp_payment_Serachpay_id').val()));
    
                    Entity.Parameters.push( toInput('startdate',$('#txtsp_payment_Serachstartdate').val()));
    
                    Entity.Parameters.push( toInput('enddate',$('#txtsp_payment_Serachenddate').val()));
    
                    Entity.Parameters.push( toInput('sub_id',$('#txtsp_payment_Serachsub_id').val()));
    
                    Entity.Parameters.push( toInput('pay_amount',$('#txtsp_payment_Serachpay_amount').val()));
    
                    Entity.Parameters.push( toInput('pay_comment',$('#txtsp_payment_Serachpay_comment').val()));
    
                    Entity.Parameters.push( toInput('wine_id',$('#txtsp_payment_Serachwine_id').val()));
    
                    Entity.Parameters.push( toInput('startprice',$('#txtsp_payment_Serachstartprice').val()));
    
                    Entity.Parameters.push( toInput('endprice',$('#txtsp_payment_Serachendprice').val()));
    
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
sp_payment_Serach.Validate= function()
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


sp_payment_Serach.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(sp_payment_Serach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=sp_payment_Serach.Serach;
    var Entity=new Object();
    Entity.PageName='sp_payment_Serach';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('pay_id',$('#txtsp_payment_Serachpay_id').val()));
    
                    Entity.Parameters.push( toInput('startdate',$('#txtsp_payment_Serachstartdate').val()));
    
                    Entity.Parameters.push( toInput('enddate',$('#txtsp_payment_Serachenddate').val()));
    
                    Entity.Parameters.push( toInput('sub_id',$('#txtsp_payment_Serachsub_id').val()));
    
                    Entity.Parameters.push( toInput('pay_amount',$('#txtsp_payment_Serachpay_amount').val()));
    
                    Entity.Parameters.push( toInput('pay_comment',$('#txtsp_payment_Serachpay_comment').val()));
    
                    Entity.Parameters.push( toInput('wine_id',$('#txtsp_payment_Serachwine_id').val()));
    
                    Entity.Parameters.push( toInput('startprice',$('#txtsp_payment_Serachstartprice').val()));
    
                    Entity.Parameters.push( toInput('endprice',$('#txtsp_payment_Serachendprice').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.sp_payment_Serachrecords= data.records;
          
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.sp_payment_Serachrecords= data.records;
                  
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




