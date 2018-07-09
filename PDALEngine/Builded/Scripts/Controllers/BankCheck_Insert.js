﻿/// <reference path="../../Res/toolkit.js" />
var BankCheck_Insert=new Object();
var currentButton;
BankCheck_Insert.sendFiles=  function()
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
            BankCheck_Insert.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=BankCheck_Insert");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


BankCheck_Insert.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(BankCheck_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='BankCheck_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('SerailCheck',$('#txtSerailCheck').val()));
    
                    Entity.Parameters.push( toInput('CheckType',$('#txtCheckType').val()));
    
                    Entity.Parameters.push( toInput('BankPayDate',$('#txtBankPayDate').val()));
    
                    Entity.Parameters.push( toInput('BankGetmentDate',$('#txtBankGetmentDate').val()));
    
                    Entity.Parameters.push( toInput('BackAccID',$('#txtBackAccID').val()));
    
                    Entity.Parameters.push( toInput('amount',$('#txtamount').val()));
    
                    Entity.Parameters.push( toInput('CusAccId',$('#txtCusAccId').val()));
    
                    Entity.Parameters.push( toInput('Descr',$('#txtDescr').val()));
    
                    Entity.Parameters.push( toInput('bankName',$('#txtbankName').val()));
    
                    Entity.Parameters.push( toInput('bankBranch',$('#txtbankBranch').val()));
    
                    Entity.Parameters.push( toInput('bankAccNo',$('#txtbankAccNo').val()));
    
                    Entity.Parameters.push( toInput('oldCheck',$('#txtoldCheck').val()));
    
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
BankCheck_Insert.Validate= function()
{
    Validator.ClearErrors();
        
                                Validator.CheckEmpty('txtSerailCheck','سریال چک');
                                                                                            
                                                                            
                                                                        Validator.CheckRegDate('txtBankPayDate','تاریخ موعد چک');
                                    
                                                                        Validator.CheckRegDate('txtBankGetmentDate','تاریخ تحویل');
                                    
            if (Para('CheckType')=='0') {
                                                        Validator.CheckRegSelect2('txtBackAccID','حساب بانک');
                            }
                
                                                        Validator.CheckRegInteger('txtamount','مبلغ');
                                                            
                                                        Validator.CheckRegSelect2('txtCusAccId','مشتری');
                                    
            
            if (Para('CheckType')=='1') {
                                Validator.CheckEmpty('txtbankName','نام بانک');
                                                                                    }
                
            if (Para('CheckType')=='1') {
                                Validator.CheckEmpty('txtbankBranch','نام شعبه');
                                                                                    }
                
            if (Para('CheckType')=='1') {
                                Validator.CheckEmpty('txtbankAccNo','شماره حساب');
                                                                                    }
                
                                                                        
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


BankCheck_Insert.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(BankCheck_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=BankCheck_Insert.Serach;
    var Entity=new Object();
    Entity.PageName='BankCheck_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('SerailCheck',$('#txtSerailCheck').val()));
    
                    Entity.Parameters.push( toInput('CheckType',$('#txtCheckType').val()));
    
                    Entity.Parameters.push( toInput('BankPayDate',$('#txtBankPayDate').val()));
    
                    Entity.Parameters.push( toInput('BankGetmentDate',$('#txtBankGetmentDate').val()));
    
                    Entity.Parameters.push( toInput('BackAccID',$('#txtBackAccID').val()));
    
                    Entity.Parameters.push( toInput('amount',$('#txtamount').val()));
    
                    Entity.Parameters.push( toInput('CusAccId',$('#txtCusAccId').val()));
    
                    Entity.Parameters.push( toInput('Descr',$('#txtDescr').val()));
    
                    Entity.Parameters.push( toInput('bankName',$('#txtbankName').val()));
    
                    Entity.Parameters.push( toInput('bankBranch',$('#txtbankBranch').val()));
    
                    Entity.Parameters.push( toInput('bankAccNo',$('#txtbankAccNo').val()));
    
                    Entity.Parameters.push( toInput('oldCheck',$('#txtoldCheck').val()));
    
         
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





