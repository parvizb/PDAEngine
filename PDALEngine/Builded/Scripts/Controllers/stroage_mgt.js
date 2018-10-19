﻿/// <reference path="../../Res/toolkit.js" />



var stroage_mgt=new Object();

var currentButton;
stroage_mgt.sendFiles=  function()
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
            stroage_mgt.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=stroage_mgt");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


stroage_mgt.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(stroage_mgt.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='stroage_mgt';
    Entity.Parameters=new Array();
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
stroage_mgt.Validate= function()
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


stroage_mgt.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(stroage_mgt.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=stroage_mgt.Serach;
    var Entity=new Object();
    Entity.PageName='stroage_mgt';
    Entity.Parameters=new Array();
     
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.stroage_mgtrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.stroage_mgtrecords= data.records;
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


stroage_mgt.InsertRecord=function()
{
    var temp=new Object();
    temp.RowState='Added';
    temp.selected = false;
    temp.rndId = Math.round(Math.random() * 99999999999999);
        currentScope.stroage_mgtrecords.push(temp);
    currentScope.$apply();
                                                    
}

stroage_mgt.Save_Validate=function()
{
    Validator.ClearErrors();
                                                                                                                                                                    if(typeof ( currentScope.stroage_mgtrecords)!="undefined") {
    for (var l=0;l<currentScope.stroage_mgtrecords.length;l++)
{
    var r=currentScope.stroage_mgtrecords[l];

    if(r.RowState !='Added'){
    continue;
}
   
Validator.CheckEmpty('storage_name_' + r.rndId,'عنوان',r.viewIndex+1);
   
Validator.CheckEmpty('addr_' + r.rndId,'آدرس',r.viewIndex+1);
   
Validator.CheckEmpty('graud_name_' + r.rndId,'مسئول انبار',r.viewIndex+1);
}
}
    if(typeof ( currentScope.stroage_mgtrecords)!="undefined") {
    for (var l=0;l<currentScope.stroage_mgtrecords.length;l++)
{
    var r=currentScope.stroage_mgtrecords[l];

    if(r.RowState !='Changed'){
    continue;
}
   
Validator.CheckEmpty('id_stroage_' + r.rndId,'کد انبار',r.viewIndex+1);
   
Validator.CheckEmpty('storage_name_' + r.rndId,'عنوان',r.viewIndex+1);
   
Validator.CheckEmpty('addr_' + r.rndId,'آدرس',r.viewIndex+1);
   
Validator.CheckEmpty('graud_name_' + r.rndId,'مسئول انبار',r.viewIndex+1);
}
}
    if(typeof ( currentScope.stroage_mgtrecords)!="undefined") {
    for (var l=0;l<currentScope.stroage_mgtrecords.length;l++)
{
    var r=currentScope.stroage_mgtrecords[l];

    if(r.RowState !='Deleted'){
    continue;
}
   
Validator.CheckEmpty('id_stroage_' + r.rndId,'کد انبار',r.viewIndex+1);
}
}
if(typeof ( currentScope.stroage_mgtrecords)!="undefined") {
for(var l=0;l<currentScope.stroage_mgtrecords.length;l++)
{ 
    var record=currentScope.stroage_mgtrecords[l];
    
}
}





if (Messager.errors.length!=0)
{
    Validator.ShowErrors();
    return false;
}
return true;
}
stroage_mgt.Save=function()
{ 
    if(  stroage_mgt.Save_Validate()==false)
    {
        return ;
    }
    var DataPass=new Array();
      
    var t=new Array();
    var  informationRecords=new Array()
    var NullFix=new Array();
    NullFix.push(toInput('fake','NULL'));
    informationRecords.push(NullFix);
    for (var l=0;l<currentScope.stroage_mgtrecords.length;l++)
{
    var r=currentScope.stroage_mgtrecords[l];

    if(r.RowState !='Added'){
    continue;
}
var rec=new Array();//hi


rec.push(toInput('storage_name', ( r['storage_name']===undefined ? "": r['storage_name'])  ));

rec.push(toInput('addr', ( r['addr']===undefined ? "": r['addr'])  ));

rec.push(toInput('graud_name', ( r['graud_name']===undefined ? "": r['graud_name'])  ));
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
                                rec.push(toInput('storage_name', ( r['storage_name']===undefined ? "": r['storage_name'])  ));
                                        rec.push(toInput('addr', ( r['addr']===undefined ? "": r['addr'])  ));
                                        rec.push(toInput('graud_name', ( r['graud_name']===undefined ? "": r['graud_name'])  ));
                informationRecords.push(rec);
}
}
t.push(informationRecords);
DataPass.push(t);
  
    var t=new Array();
    var  informationRecords=new Array()
    var NullFix=new Array();
    NullFix.push(toInput('fake','NULL'));
    informationRecords.push(NullFix);
    for (var l=0;l<currentScope.stroage_mgtrecords.length;l++)
{
    var r=currentScope.stroage_mgtrecords[l];

    if(r.RowState !='Changed'){
    continue;
}
var rec=new Array();//hi


rec.push(toInput('id_stroage', ( r['id_stroage']===undefined ? "": r['id_stroage'])  ));

rec.push(toInput('storage_name', ( r['storage_name']===undefined ? "": r['storage_name'])  ));

rec.push(toInput('addr', ( r['addr']===undefined ? "": r['addr'])  ));

rec.push(toInput('graud_name', ( r['graud_name']===undefined ? "": r['graud_name'])  ));
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
                                rec.push(toInput('id_stroage', ( r['id_stroage']===undefined ? "": r['id_stroage'])  ));
                                        rec.push(toInput('storage_name', ( r['storage_name']===undefined ? "": r['storage_name'])  ));
                                        rec.push(toInput('addr', ( r['addr']===undefined ? "": r['addr'])  ));
                                        rec.push(toInput('graud_name', ( r['graud_name']===undefined ? "": r['graud_name'])  ));
                informationRecords.push(rec);
}
}
t.push(informationRecords);
DataPass.push(t);
  
    var t=new Array();
    var  informationRecords=new Array()
    var NullFix=new Array();
    NullFix.push(toInput('fake','NULL'));
    informationRecords.push(NullFix);
    for (var l=0;l<currentScope.stroage_mgtrecords.length;l++)
{
    var r=currentScope.stroage_mgtrecords[l];

    if(r.RowState !='Deleted'){
    continue;
}
var rec=new Array();//hi


rec.push(toInput('id_stroage', ( r['id_stroage']===undefined ? "": r['id_stroage'])  ));
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
                                rec.push(toInput('id_stroage', ( r['id_stroage']===undefined ? "": r['id_stroage'])  ));
                informationRecords.push(rec);
}
}
t.push(informationRecords);
DataPass.push(t);
var Enity=new Object();
Enity.PageName='stroage_mgt';
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

