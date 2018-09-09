/// <reference path="../../Res/toolkit.js" />



var BankCheckOptDetail=new Object();

var currentButton;
BankCheckOptDetail.sendFiles=  function()
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
            BankCheckOptDetail.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=BankCheckOptDetail");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


BankCheckOptDetail.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(BankCheckOptDetail.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='BankCheckOptDetail';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('BankCheckId',routeParams.BankCheckId ));
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
BankCheckOptDetail.Validate= function()
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


BankCheckOptDetail.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(BankCheckOptDetail.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=BankCheckOptDetail.Serach;
    var Entity=new Object();
    Entity.PageName='BankCheckOptDetail';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('BankCheckId',routeParams.BankCheckId ));
 
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.BankCheckOptDetailrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.BankCheckOptDetailrecords= data.records;
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



BankCheckOptDetail.Save_Validate=function()
{
    Validator.ClearErrors();
                                                    for (var l=0;l<currentScope.BankCheckOptDetailrecords.length;l++)
    {
        var r=currentScope.BankCheckOptDetailrecords[l];

        if(r.RowState !='Changed'){
    continue;
}
Validator.CheckRegDate('OptDate_' + r.rndId,'',r.viewIndex+1);
}

for(var l=0;l<currentScope.BankCheckOptDetailrecords.length;l++)
{ 
    var record=currentScope.BankCheckOptDetailrecords[l];
    
}






if (Messager.errors.length!=0)
{
    Validator.ShowErrors();
    return false;
}
return true;
}
BankCheckOptDetail.Save=function()
{ 
    if(  BankCheckOptDetail.Save_Validate()==false)
    {
        return ;
    }
    var DataPass=new Array();
        var t=new Array();
    var  informationRecords=new Array()
    var NullFix=new Array();
    NullFix.push(toInput('fake',Para('fake')));
    informationRecords.push(NullFix);
    for (var l=0;l<currentScope.BankCheckOptDetailrecords.length;l++)
{
    var r=currentScope.BankCheckOptDetailrecords[l];

    if(r.RowState !='Changed'){
    continue;
}
var rec=new Array();//hi


rec.push(toInput('BankCheckOptId', ( r['BankCheckOptId']===undefined ? "": r['BankCheckOptId'])  ));

rec.push(toInput('OptDate', ( r['OptDate']===undefined ? "": r['OptDate'])  ));

rec.push(toInput('OptDescr', ( r['OptDescr']===undefined ? "": r['OptDescr'])  ));
informationRecords.push(rec);
}

if(currentScope.DeletedRows!==undefined)
{
    for (var l=0;l<currentScope.DeletedRows.length;l++)
    {
        var r=currentScope.DeletedRows[l];

     
                if(r.RowState !='Changed'){
            continue;
        }
                var rec=new Array();//hi
                                rec.push(toInput('BankCheckOptId', ( r['BankCheckOptId']===undefined ? "": r['BankCheckOptId'])  ));
                                        rec.push(toInput('OptDate', ( r['OptDate']===undefined ? "": r['OptDate'])  ));
                                        rec.push(toInput('OptDescr', ( r['OptDescr']===undefined ? "": r['OptDescr'])  ));
                informationRecords.push(rec);
}
}
t.push(informationRecords);
DataPass.push(t);
var Enity=new Object();
Enity.PageName='BankCheckOptDetail';
Enity.CommandName='Save';
Enity.records=DataPass;
ScallerAjax('BatchCommand',Enity,function(data){

    
    Messager.ShowMessage('اطلاعات', data.Message );
 
     
  
 

    Messager.ShowMessage('اطلاعات', data.Message);
    if(JsEventInterface.AfterOkReqSubmit!=null)
    {
        JsEventInterface.AfterOkReqSubmit(Entity,data);
    }
    ///you are asl
    if(data.code==0)
    {
        window.returnValue=data.retrunValue;




                                BackPage();
                 
         
     
                        BackPage();
                 
         
    }
    $(obj).attr('disabled',false);
    return;
},function(data)
{
    $(obj).attr('disabled',false);
    return;
});
console.log(JSON.stringify(Enity));
}

