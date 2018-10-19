/// <reference path="../../Res/toolkit.js" />



var BankCheck_Edit=new Object();

var currentButton;
BankCheck_Edit.sendFiles=  function()
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
            BankCheck_Edit.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=BankCheck_Edit");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


BankCheck_Edit.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(BankCheck_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='BankCheck_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('BankCheckId',routeParams.BankCheckId ));
            Entity.Parameters.push( toInput('SerailCheck',$('#txtBankCheck_EditSerailCheck').val()));
    
                    Entity.Parameters.push( toInput('CheckType',$('#txtBankCheck_EditCheckType').val()));
    
                    Entity.Parameters.push( toInput('BankPayDate',$('#txtBankCheck_EditBankPayDate').val()));
    
                    Entity.Parameters.push( toInput('BankGetmentDate',$('#txtBankCheck_EditBankGetmentDate').val()));
    
                    Entity.Parameters.push( toInput('BackAccID',$('#txtBankCheck_EditBackAccID').val()));
    
                    Entity.Parameters.push( toInput('amount',$('#txtBankCheck_Editamount').val()));
    
                    Entity.Parameters.push( toInput('CusAccId',$('#txtBankCheck_EditCusAccId').val()));
    
                    Entity.Parameters.push( toInput('Descr',$('#txtBankCheck_EditDescr').val()));
    
                    Entity.Parameters.push( toInput('bankName',$('#txtBankCheck_EditbankName').val()));
    
                    Entity.Parameters.push( toInput('bankBranch',$('#txtBankCheck_EditbankBranch').val()));
    
                    Entity.Parameters.push( toInput('bankAccNo',$('#txtBankCheck_EditbankAccNo').val()));
    
                    Entity.Parameters.push( toInput('oldCheck',$('#txtBankCheck_EditoldCheck').val()));
    
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
BankCheck_Edit.Validate= function()
{
    Validator.ClearErrors();
        
            
                                Validator.CheckEmpty('txtBankCheck_EditSerailCheck','سریال چک');
                                                                                            
                                                                            
                                                                        Validator.CheckRegDate('txtBankCheck_EditBankPayDate','تاریخ موعد چک');
                                    
                                                                        Validator.CheckRegDate('txtBankCheck_EditBankGetmentDate','تاریخ تحویل');
                                    
            if (Para('CheckType')=='0') {
                                                        Validator.CheckRegSelect2('txtBankCheck_EditBackAccID','حساب بانک');
                            }
                
                                                        Validator.CheckRegInteger('txtBankCheck_Editamount','مبلغ');
                                                            
                                                        Validator.CheckRegSelect2('txtBankCheck_EditCusAccId','مشتری');
                                    
            
            if (Para('CheckType')=='1') {
                                Validator.CheckEmpty('txtBankCheck_EditbankName','نام بانک');
                                                                                    }
                
            if (Para('CheckType')=='1') {
                                Validator.CheckEmpty('txtBankCheck_EditbankBranch','نام شعبه');
                                                                                    }
                
            if (Para('CheckType')=='1') {
                                Validator.CheckEmpty('txtBankCheck_EditbankAccNo','شماره حساب');
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


BankCheck_Edit.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(BankCheck_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=BankCheck_Edit.Serach;
    var Entity=new Object();
    Entity.PageName='BankCheck_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('BankCheckId',routeParams.BankCheckId ));
            Entity.Parameters.push( toInput('SerailCheck',$('#txtBankCheck_EditSerailCheck').val()));
    
                    Entity.Parameters.push( toInput('CheckType',$('#txtBankCheck_EditCheckType').val()));
    
                    Entity.Parameters.push( toInput('BankPayDate',$('#txtBankCheck_EditBankPayDate').val()));
    
                    Entity.Parameters.push( toInput('BankGetmentDate',$('#txtBankCheck_EditBankGetmentDate').val()));
    
                    Entity.Parameters.push( toInput('BackAccID',$('#txtBankCheck_EditBackAccID').val()));
    
                    Entity.Parameters.push( toInput('amount',$('#txtBankCheck_Editamount').val()));
    
                    Entity.Parameters.push( toInput('CusAccId',$('#txtBankCheck_EditCusAccId').val()));
    
                    Entity.Parameters.push( toInput('Descr',$('#txtBankCheck_EditDescr').val()));
    
                    Entity.Parameters.push( toInput('bankName',$('#txtBankCheck_EditbankName').val()));
    
                    Entity.Parameters.push( toInput('bankBranch',$('#txtBankCheck_EditbankBranch').val()));
    
                    Entity.Parameters.push( toInput('bankAccNo',$('#txtBankCheck_EditbankAccNo').val()));
    
                    Entity.Parameters.push( toInput('oldCheck',$('#txtBankCheck_EditoldCheck').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.BankCheck_Editrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.BankCheck_Editrecords= data.records;
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
BankCheck_Edit.InitStartValues=function(){
    var Entity=new Object();
    Entity.PageName='BankCheck_Edit';
    Entity.Parameters=new Array();
            Entity.Parameters.push( toInput('BankCheckId',routeParams.BankCheckId));
   
TableViewAjax('getStartValueFromServer',Entity,function(data){
    if( data.records.length!=0)
    {
     
                                $('#txtBankCheck_EditSerailCheck').val(data.records[0].SerailCheck);

                $('#txtBankCheck_EditCheckType').val(data.records[0].CheckType);

                $('#txtBankCheck_EditBankPayDate').val(data.records[0].BankPayDate);

                $('#txtBankCheck_EditBankGetmentDate').val(data.records[0].BankGetmentDate);

                
        var o=document.createElement('option');
        o.value=data.records[0].BackAccID;
        o.innerHTML= data.records[0].BankAccName ;
        BackAccID.append(o);
        BackAccID.val(data.records[0].BackAccID  ) .trigger('change');

                
$('#txtBankCheck_Editamount').val(ShowAsMoney( data.records[0].amount));

                
        var o=document.createElement('option');
        o.value=data.records[0].CusAccId;
        o.innerHTML= data.records[0].CusAccId_title ;
        CusAccId.append(o);
        CusAccId.val(data.records[0].CusAccId  ) .trigger('change');

                $('#txtBankCheck_EditDescr').val(data.records[0].Descr);

                $('#txtBankCheck_EditbankName').val(data.records[0].bankName);

                $('#txtBankCheck_EditbankBranch').val(data.records[0].bankBranch);

                $('#txtBankCheck_EditbankAccNo').val(data.records[0].bankAccNo);

                $('#txtBankCheck_EditoldCheck').val(data.records[0].oldCheck);

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




