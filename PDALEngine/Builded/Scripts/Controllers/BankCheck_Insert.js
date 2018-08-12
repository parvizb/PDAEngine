/// <reference path="../../Res/toolkit.js" />



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
                Entity.Parameters.push( toInput('SerailCheck',$('#txtBankCheck_InsertSerailCheck').val()));
    
                    Entity.Parameters.push( toInput('CheckType',$('#txtBankCheck_InsertCheckType').val()));
    
                    Entity.Parameters.push( toInput('BankPayDate',$('#txtBankCheck_InsertBankPayDate').val()));
    
                    Entity.Parameters.push( toInput('BankGetmentDate',$('#txtBankCheck_InsertBankGetmentDate').val()));
    
                    Entity.Parameters.push( toInput('BackAccID',$('#txtBankCheck_InsertBackAccID').val()));
    
                    Entity.Parameters.push( toInput('amount',$('#txtBankCheck_Insertamount').val()));
    
                    Entity.Parameters.push( toInput('CusAccId',$('#txtBankCheck_InsertCusAccId').val()));
    
                    Entity.Parameters.push( toInput('Descr',$('#txtBankCheck_InsertDescr').val()));
    
                    Entity.Parameters.push( toInput('bankName',$('#txtBankCheck_InsertbankName').val()));
    
                    Entity.Parameters.push( toInput('bankBranch',$('#txtBankCheck_InsertbankBranch').val()));
    
                    Entity.Parameters.push( toInput('bankAccNo',$('#txtBankCheck_InsertbankAccNo').val()));
    
                    Entity.Parameters.push( toInput('oldCheck',$('#txtBankCheck_InsertoldCheck').val()));
    
        ScallerAjax('ScallerSubmit',Entity,function(data){

        targetElement.value=data.retrunValue;
        
  
 

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
        
                                Validator.CheckEmpty('txtBankCheck_InsertSerailCheck','سریال چک');
                                                                                            
                                                                            
                                                                        Validator.CheckRegDate('txtBankCheck_InsertBankPayDate','تاریخ موعد چک');
                                    
                                                                        Validator.CheckRegDate('txtBankCheck_InsertBankGetmentDate','تاریخ تحویل');
                                    
            if (Para('CheckType')=='0') {
                                                        Validator.CheckRegSelect2('txtBankCheck_InsertBackAccID','حساب بانک');
                            }
                
                                                        Validator.CheckRegInteger('txtBankCheck_Insertamount','مبلغ');
                                                            
                                                        Validator.CheckRegSelect2('txtBankCheck_InsertCusAccId','مشتری');
                                    
            
            if (Para('CheckType')=='1') {
                                Validator.CheckEmpty('txtBankCheck_InsertbankName','نام بانک');
                                                                                    }
                
            if (Para('CheckType')=='1') {
                                Validator.CheckEmpty('txtBankCheck_InsertbankBranch','نام شعبه');
                                                                                    }
                
            if (Para('CheckType')=='1') {
                                Validator.CheckEmpty('txtBankCheck_InsertbankAccNo','شماره حساب');
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
                Entity.Parameters.push( toInput('SerailCheck',$('#txtBankCheck_InsertSerailCheck').val()));
    
                    Entity.Parameters.push( toInput('CheckType',$('#txtBankCheck_InsertCheckType').val()));
    
                    Entity.Parameters.push( toInput('BankPayDate',$('#txtBankCheck_InsertBankPayDate').val()));
    
                    Entity.Parameters.push( toInput('BankGetmentDate',$('#txtBankCheck_InsertBankGetmentDate').val()));
    
                    Entity.Parameters.push( toInput('BackAccID',$('#txtBankCheck_InsertBackAccID').val()));
    
                    Entity.Parameters.push( toInput('amount',$('#txtBankCheck_Insertamount').val()));
    
                    Entity.Parameters.push( toInput('CusAccId',$('#txtBankCheck_InsertCusAccId').val()));
    
                    Entity.Parameters.push( toInput('Descr',$('#txtBankCheck_InsertDescr').val()));
    
                    Entity.Parameters.push( toInput('bankName',$('#txtBankCheck_InsertbankName').val()));
    
                    Entity.Parameters.push( toInput('bankBranch',$('#txtBankCheck_InsertbankBranch').val()));
    
                    Entity.Parameters.push( toInput('bankAccNo',$('#txtBankCheck_InsertbankAccNo').val()));
    
                    Entity.Parameters.push( toInput('oldCheck',$('#txtBankCheck_InsertoldCheck').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.BankCheck_Insertrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.BankCheck_Insertrecords= data.records;
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




