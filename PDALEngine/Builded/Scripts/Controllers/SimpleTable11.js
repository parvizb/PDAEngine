/// <reference path="../../Res/toolkit.js" />
var SimpleTable11=new Object();
var currentButton;
SimpleTable11.sendFiles=  function()
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
            SimpleTable11.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=SimpleTable11");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


SimpleTable11.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(SimpleTable11.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='SimpleTable11';
    Entity.Parameters=new Array();
    ScallerAjax('ScallerSubmit',Entity,function(data){
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
SimpleTable11.Validate= function()
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


SimpleTable11.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(SimpleTable11.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=SimpleTable11.Serach;
    var Entity=new Object();
    Entity.PageName='SimpleTable11';
    Entity.Parameters=new Array();
     
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.records= data.records;
        
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



SimpleTable11.InsertRecord=function()
{
    var temp=new Object();
    temp.RowState='Added';
    temp.selected = false;
    temp.rndId = Math.round(Math.random() * 99999999999999);
        currentScope.records.push(temp);
    currentScope.$apply();
                                            
}

SimpleTable11.Save_Validate=function()
{
    Validator.ClearErrors();
                                                                                                                                    for (var l=0;l<currentScope.records.length;l++)
    {
        var r=currentScope.records[l];

        if(r.RowState !='Added'){
    continue;
}
   
Validator.CheckEmpty('cityTitle_' + r.rndId,'',r.viewIndex+1);
   
Validator.CheckEmpty('CITYPop_' + r.rndId,'',r.viewIndex+1);
}
    for (var l=0;l<currentScope.records.length;l++)
    {
        var r=currentScope.records[l];

        if(r.RowState !='Changed'){
    continue;
}
   
Validator.CheckEmpty('cityId_' + r.rndId,'شهر',r.viewIndex+1);
   
Validator.CheckEmpty('cityTitle_' + r.rndId,'',r.viewIndex+1);
   
Validator.CheckEmpty('CITYPop_' + r.rndId,'',r.viewIndex+1);
}
    for (var l=0;l<currentScope.records.length;l++)
    {
        var r=currentScope.records[l];

        if(r.RowState !='Deleted'){
    continue;
}
   
Validator.CheckEmpty('cityId_' + r.rndId,'شهر',r.viewIndex+1);
}
if (Messager.errors.length!=0)
{
    Validator.ShowErrors();
    return false;
}
return true;
}
SimpleTable11.Save=function()
{ 
    if(  SimpleTable11.Save_Validate()==false)
    {
        return ;
    }
    var DataPass=new Array();
        var t=new Array();
    var  informationRecords=new Array()
    var NullFix=new Array();
    NullFix.push(toInput('fake',Para('fake')));
    informationRecords.push(NullFix);
    for (var l=0;l<currentScope.records.length;l++)
{
    var r=currentScope.records[l];

    if(r.RowState !='Added'){
    continue;
}
var rec=new Array();//hi


rec.push(toInput('cityTitle', ( r['cityTitle']===undefined ? "": r['cityTitle'])  ));

rec.push(toInput('CITYPop', ( r['CITYPop']===undefined ? "": r['CITYPop'])  ));
informationRecords.push(rec);
}

if(currentScope.DeletedRows!==undefined)
{
    for (var l=0;l<currentScope.DeletedRows.length;l++)
    {
        var r=currentScope.DeletedRows[l];

     
                if(r.RowState !='Added'){
            continue;
        }
                var rec=new Array();//hi
                                rec.push(toInput('cityTitle', ( r['cityTitle']===undefined ? "": r['cityTitle'])  ));
                                        rec.push(toInput('CITYPop', ( r['CITYPop']===undefined ? "": r['CITYPop'])  ));
                informationRecords.push(rec);
}
}
t.push(informationRecords);
DataPass.push(t);
    var t=new Array();
    var  informationRecords=new Array()
    var NullFix=new Array();
    NullFix.push(toInput('fake',Para('fake')));
    informationRecords.push(NullFix);
    for (var l=0;l<currentScope.records.length;l++)
{
    var r=currentScope.records[l];

    if(r.RowState !='Changed'){
    continue;
}
var rec=new Array();//hi


rec.push(toInput('cityId', ( r['cityId']===undefined ? "": r['cityId'])  ));

rec.push(toInput('cityTitle', ( r['cityTitle']===undefined ? "": r['cityTitle'])  ));

rec.push(toInput('CITYPop', ( r['CITYPop']===undefined ? "": r['CITYPop'])  ));
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
                                rec.push(toInput('cityId', ( r['cityId']===undefined ? "": r['cityId'])  ));
                                        rec.push(toInput('cityTitle', ( r['cityTitle']===undefined ? "": r['cityTitle'])  ));
                                        rec.push(toInput('CITYPop', ( r['CITYPop']===undefined ? "": r['CITYPop'])  ));
                informationRecords.push(rec);
}
}
t.push(informationRecords);
DataPass.push(t);
    var t=new Array();
    var  informationRecords=new Array()
    var NullFix=new Array();
    NullFix.push(toInput('fake',Para('fake')));
    informationRecords.push(NullFix);
    for (var l=0;l<currentScope.records.length;l++)
{
    var r=currentScope.records[l];

    if(r.RowState !='Deleted'){
    continue;
}
var rec=new Array();//hi


rec.push(toInput('cityId', ( r['cityId']===undefined ? "": r['cityId'])  ));
informationRecords.push(rec);
}

if(currentScope.DeletedRows!==undefined)
{
    for (var l=0;l<currentScope.DeletedRows.length;l++)
    {
        var r=currentScope.DeletedRows[l];

     
                if(r.RowState !='Deleted'){
            continue;
        }
                var rec=new Array();//hi
                                rec.push(toInput('cityId', ( r['cityId']===undefined ? "": r['cityId'])  ));
                informationRecords.push(rec);
}
}
t.push(informationRecords);
DataPass.push(t);
var Enity=new Object();
Enity.PageName='SimpleTable11';
Enity.CommandName='Save';
Enity.records=DataPass;
ScallerAjax('BatchCommand',Enity,function(data){
        Messager.ShowMessage('اطلاعات', data.Message );
 
     
  
 

    Messager.ShowMessage('اطلاعات', data.Message);
    if(JsEventInterface.AfterOkReqSubmit!=null)
    {
        JsEventInterface.AfterOkReqSubmit(Entity,data);
    }
    if(data.code==0)
    {
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
