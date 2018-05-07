﻿/// <reference path="../../Res/toolkit.js" />
var factory_mgt=new Object();
var currentButton;
factory_mgt.sendFiles=  function()
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
            factory_mgt.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=factory_mgt");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


   factory_mgt.Submit= function(obj)
   {
       currentButton=obj;
       $(obj).attr('disabled',true);
       if(factory_mgt.Validate()==false)
       {
           $(obj).attr('disabled',false);
           return ;
       }
              var Entity=new Object();
       Entity.PageName='factory_mgt';
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
factory_mgt.Validate= function()
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

factory_mgt.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(factory_mgt.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=factory_mgt.Serach;
    var Entity=new Object();
    Entity.PageName='factory_mgt';
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



factory_mgt.InsertRecord=function()
{
    var temp=new Object();
    temp.RowState='Added';
    temp.selected = false;
    temp.rndId = Math.round(Math.random() * 99999999999999);
        currentScope.records.push(temp);
    currentScope.$apply();
                                    
}
///Hi ...
///
factory_mgt.Save_Validate=function()
{
Validator.ClearErrors();
for (var l=0;l<currentScope.records.length;l++)
{
    var r=currentScope.records[l];

   if(r.RowState !='Added'){
     continue;
   }
   
    Validator.CheckEmpty('FactoryName_' + r.rndId,'عنوان',r.viewIndex+1);
}
for (var l=0;l<currentScope.records.length;l++)
{
    var r=currentScope.records[l];

   if(r.RowState !='Changed'){
     continue;
   }
   
    Validator.CheckEmpty('FactoryId_' + r.rndId,'شناسه',r.viewIndex+1);
   
    Validator.CheckEmpty('FactoryName_' + r.rndId,'عنوان',r.viewIndex+1);
}
for (var l=0;l<currentScope.records.length;l++)
{
    var r=currentScope.records[l];

   if(r.RowState !='Deleted'){
     continue;
   }
   
    Validator.CheckEmpty('FactoryId_' + r.rndId,'شناسه',r.viewIndex+1);
}
    if (Messager.errors.length!=0)
    {
        Validator.ShowErrors();
        return false;
    }
    return true;
}
factory_mgt.Save=function()
{ 
    if(  factory_mgt.Save_Validate()==false)
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


rec.push(toInput('FactoryName', ( r['FactoryName']===undefined ? "": r['FactoryName'])  ));
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
            rec.push(toInput('FactoryName', ( r['FactoryName']===undefined ? "": r['FactoryName'])  ));
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


rec.push(toInput('FactoryId', ( r['FactoryId']===undefined ? "": r['FactoryId'])  ));

rec.push(toInput('FactoryName', ( r['FactoryName']===undefined ? "": r['FactoryName'])  ));
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
            rec.push(toInput('FactoryId', ( r['FactoryId']===undefined ? "": r['FactoryId'])  ));
            rec.push(toInput('FactoryName', ( r['FactoryName']===undefined ? "": r['FactoryName'])  ));
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


rec.push(toInput('FactoryId', ( r['FactoryId']===undefined ? "": r['FactoryId'])  ));
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
            rec.push(toInput('FactoryId', ( r['FactoryId']===undefined ? "": r['FactoryId'])  ));
            informationRecords.push(rec);
        }
    }
    t.push(informationRecords);
    DataPass.push(t);
        var Enity=new Object();
        Enity.PageName='factory_mgt';
        Enity.CommandName='Save';
        Enity.records=DataPass;
        ScallerAjax('BatchCommand',Enity,function(data){
            Messager.ShowMessage('اطلاعات', data.Message);
            if(JsEventInterface.AfterOkReqSubmit!=null)
            {
                JsEventInterface.AfterOkReqSubmit(Entity,data);
            }
            if(data.code==0)
            {
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