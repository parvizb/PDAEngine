/// <reference path="../../Res/toolkit.js" />
var getment_Insert=new Object();
var currentButton;
getment_Insert.sendFiles=  function()
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
            getment_Insert.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=getment_Insert");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


getment_Insert.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(getment_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='getment_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('get_amount',$('#txtget_amount').val()));
    
                    Entity.Parameters.push( toInput('get_discount',$('#txtget_discount').val()));
    
                    Entity.Parameters.push( toInput('cus_acc_id',$('#txtcus_acc_id').val()));
    
                    Entity.Parameters.push( toInput('acc_id',$('#txtacc_id').val()));
    
                    Entity.Parameters.push( toInput('get_date',$('#txtget_date').val()));
    
                    Entity.Parameters.push( toInput('descr',$('#txtdescr').val()));
    
                    Entity.Parameters.push( toInput('total',$('#txttotal').val()));
    
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
getment_Insert.Validate= function()
{
    Validator.ClearErrors();
        
                                                        Validator.CheckRegInteger('txtget_amount','مبلغ دریافتی');
                                                            
                                                        Validator.CheckRegInteger('txtget_discount','تخفیف دریافتی');
                                                            
                                                        Validator.CheckRegSelect2('txtcus_acc_id','شناسه مشتری');
                                    
                                                        Validator.CheckRegSelect2('txtacc_id','کد حساب');
                                    
                                                                        Validator.CheckRegDate('txtget_date','تاریخ');
                                    
            
        
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


getment_Insert.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(getment_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=getment_Insert.Serach;
    var Entity=new Object();
    Entity.PageName='getment_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('get_amount',$('#txtget_amount').val()));
    
                    Entity.Parameters.push( toInput('get_discount',$('#txtget_discount').val()));
    
                    Entity.Parameters.push( toInput('cus_acc_id',$('#txtcus_acc_id').val()));
    
                    Entity.Parameters.push( toInput('acc_id',$('#txtacc_id').val()));
    
                    Entity.Parameters.push( toInput('get_date',$('#txtget_date').val()));
    
                    Entity.Parameters.push( toInput('descr',$('#txtdescr').val()));
    
                    Entity.Parameters.push( toInput('total',$('#txttotal').val()));
    
         
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





