/// <reference path="../../Res/toolkit.js" />



var payment_Edit=new Object();

var currentButton;
payment_Edit.sendFiles=  function()
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
            payment_Edit.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=payment_Edit");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


payment_Edit.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(payment_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='payment_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('payment_id',routeParams.payment_id ));
            Entity.Parameters.push( toInput('payment_amount',$('#txtpayment_Editpayment_amount').val()));
    
                    Entity.Parameters.push( toInput('cus_id',$('#txtpayment_Editcus_id').val()));
    
                    Entity.Parameters.push( toInput('dis_amount',$('#txtpayment_Editdis_amount').val()));
    
                    Entity.Parameters.push( toInput('payment_Date',$('#txtpayment_Editpayment_Date').val()));
    
                    Entity.Parameters.push( toInput('descr',$('#txtpayment_Editdescr').val()));
    
                    Entity.Parameters.push( toInput('total',$('#txtpayment_Edittotal').val()));
    
                    Entity.Parameters.push( toInput('acc_id',$('#txtpayment_Editacc_id').val()));
    
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
payment_Edit.Validate= function()
{
    Validator.ClearErrors();
        
            
                                                        Validator.CheckRegInteger('txtpayment_Editpayment_amount','مبلغ پرداختی');
                                                            
                                                        Validator.CheckRegSelect2('txtpayment_Editcus_id','کد مشتری ');
                                    
            
                                                                        Validator.CheckRegDate('txtpayment_Editpayment_Date','تاریخ پرداخت');
                                    
            
            
                                                        Validator.CheckRegSelect2('txtpayment_Editacc_id','کد حساب محل پرداخت ');
                                
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


payment_Edit.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(payment_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=payment_Edit.Serach;
    var Entity=new Object();
    Entity.PageName='payment_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('payment_id',routeParams.payment_id ));
            Entity.Parameters.push( toInput('payment_amount',$('#txtpayment_Editpayment_amount').val()));
    
                    Entity.Parameters.push( toInput('cus_id',$('#txtpayment_Editcus_id').val()));
    
                    Entity.Parameters.push( toInput('dis_amount',$('#txtpayment_Editdis_amount').val()));
    
                    Entity.Parameters.push( toInput('payment_Date',$('#txtpayment_Editpayment_Date').val()));
    
                    Entity.Parameters.push( toInput('descr',$('#txtpayment_Editdescr').val()));
    
                    Entity.Parameters.push( toInput('total',$('#txtpayment_Edittotal').val()));
    
                    Entity.Parameters.push( toInput('acc_id',$('#txtpayment_Editacc_id').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.payment_Editrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.payment_Editrecords= data.records;
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
payment_Edit.InitStartValues=function(){
    var Entity=new Object();
    Entity.PageName='payment_Edit';
    Entity.Parameters=new Array();
            Entity.Parameters.push( toInput('payment_id',routeParams.payment_id));
   
TableViewAjax('getStartValueFromServer',Entity,function(data){
    if( data.records.length!=0)
    {
     
                                
$('#txtpayment_Editpayment_amount').val(ShowAsMoney( data.records[0].payment_amount));

                
        

        var o=document.createElement('option');
        o.value=data.records[0].cus_id;
        o.innerHTML= data.records[0].cus_id_title ;
        cus_id.append(o);
        cus_id.val(data.records[0].cus_id  ) .trigger('change');


                
$('#txtpayment_Editdis_amount').val(ShowAsMoney( data.records[0].dis_amount));

                $('#txtpayment_Editpayment_Date').val(data.records[0].payment_Date);

                $('#txtpayment_Editdescr').val(data.records[0].descr);

                        
        

        var o=document.createElement('option');
        o.value=data.records[0].acc_id;
        o.innerHTML= data.records[0].acc_name ;
        acc_id.append(o);
        acc_id.val(data.records[0].acc_id  ) .trigger('change');


}
else
{
    Validator.ClearErrors ();
    Messager.ShowMessage('خطا', 'رکورد مورد نظر یافت نشد');
    BackPage();
}
                
currentScope.$apply();
return;
          
},function(data)
{
    return;

});

}




