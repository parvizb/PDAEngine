/// <reference path="../../Res/toolkit.js" />
var BankCheck_Serach=new Object();
var currentButton;
BankCheck_Serach.sendFiles=  function()
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
            BankCheck_Serach.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=BankCheck_Serach");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


BankCheck_Serach.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(BankCheck_Serach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='BankCheck_Serach';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('BankCheckId',$('#txtBankCheckId').val()));
    
                    Entity.Parameters.push( toInput('SerailCheck',$('#txtSerailCheck').val()));
    
                    Entity.Parameters.push( toInput('startdate',$('#txtstartdate').val()));
    
                    Entity.Parameters.push( toInput('enddate',$('#txtenddate').val()));
    
                    Entity.Parameters.push( toInput('BackAccID',$('#txtBackAccID').val()));
    
                    Entity.Parameters.push( toInput('Startamount',$('#txtStartamount').val()));
    
                    Entity.Parameters.push( toInput('endamount',$('#txtendamount').val()));
    
                    Entity.Parameters.push( toInput('CheckType',$('#txtCheckType').val()));
    
                    Entity.Parameters.push( toInput('CusAccId',$('#txtCusAccId').val()));
    
                    Entity.Parameters.push( toInput('bankName',$('#txtbankName').val()));
    
                    Entity.Parameters.push( toInput('bankBranch',$('#txtbankBranch').val()));
    
                    Entity.Parameters.push( toInput('bankAccNo',$('#txtbankAccNo').val()));
    
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
BankCheck_Serach.Validate= function()
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


BankCheck_Serach.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(BankCheck_Serach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=BankCheck_Serach.Serach;
    var Entity=new Object();
    Entity.PageName='BankCheck_Serach';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('BankCheckId',$('#txtBankCheckId').val()));
    
                    Entity.Parameters.push( toInput('SerailCheck',$('#txtSerailCheck').val()));
    
                    Entity.Parameters.push( toInput('startdate',$('#txtstartdate').val()));
    
                    Entity.Parameters.push( toInput('enddate',$('#txtenddate').val()));
    
                    Entity.Parameters.push( toInput('BackAccID',$('#txtBackAccID').val()));
    
                    Entity.Parameters.push( toInput('Startamount',$('#txtStartamount').val()));
    
                    Entity.Parameters.push( toInput('endamount',$('#txtendamount').val()));
    
                    Entity.Parameters.push( toInput('CheckType',$('#txtCheckType').val()));
    
                    Entity.Parameters.push( toInput('CusAccId',$('#txtCusAccId').val()));
    
                    Entity.Parameters.push( toInput('bankName',$('#txtbankName').val()));
    
                    Entity.Parameters.push( toInput('bankBranch',$('#txtbankBranch').val()));
    
                    Entity.Parameters.push( toInput('bankAccNo',$('#txtbankAccNo').val()));
    
         
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





