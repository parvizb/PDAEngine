/// <reference path="../../Res/toolkit.js" />
var SimpleTable17=new Object();
var currentButton;
SimpleTable17.sendFiles=  function()
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
            SimpleTable17.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=SimpleTable17");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


   SimpleTable17.Submit= function(obj)
   {
       currentButton=obj;
       $(obj).attr('disabled',true);
       if(SimpleTable17.Validate()==false)
       {
           $(obj).attr('disabled',false);
           return ;
       }
              var Entity=new Object();
       Entity.PageName='SimpleTable17';
       Entity.Parameters=new Array();
       Entity.Parameters.push( toInput('PerId',$('#txtPerId').val()));

              Entity.Parameters.push( toInput('DateSave',$('#txtDateSave').val()));

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
SimpleTable17.Validate= function()
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

SimpleTable17.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(SimpleTable17.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=SimpleTable17.Serach;
    var Entity=new Object();
    Entity.PageName='SimpleTable17';
    Entity.Parameters=new Array();
    Entity.Parameters.push( toInput('PerId',$('#txtPerId').val()));

    Entity.Parameters.push( toInput('DateSave',$('#txtDateSave').val()));

 
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



SimpleTable17.InsertRecord=function()
{
    var temp=new Object();
    temp.RowState='Added';
    temp.selected = false;
    temp.rndId = Math.round(Math.random() * 99999999999999);
        currentScope.records.push(temp);
    currentScope.$apply();
               
    $('#cityid_' +temp.rndId).each (function() {$(this).val($(this).attr('valc')) });
                    
}
///Hi ...
///
SimpleTable17.Save_Validate=function()
{
Validator.ClearErrors();
Validator.CheckRegSelect2('txtPerId','شخص');
Validator.CheckRegDate('txtDateSave','تاریخ ثبت');
for (var l=0;l<currentScope.records.length;l++)
{
    var r=currentScope.records[l];

    if(r.selected == true){
      continue;
     }
}
for (var l=0;l<currentScope.records.length;l++)
{
    var r=currentScope.records[l];

   if(r.RowState !='Added'){
     continue;
   }
    Validator.CheckRegSelect2('cityid_' + r.rndId,'کد شهر',r.viewIndex+1);
}
    if (Messager.errors.length!=0)
    {
        Validator.ShowErrors();
        return false;
    }
    return true;
}
SimpleTable17.Save=function()
{ 
    if(  SimpleTable17.Save_Validate()==false)
    {
        return ;
    }
    var DataPass=new Array();
    var t=new Array();
    var  informationRecords=new Array()
    var NullFix=new Array();
    NullFix.push(toInput('fake',Para('fake')));
    informationRecords.push(NullFix);
    var rec=new Array();//hi
    //YOU ARE ASL
    rec.push(toInput('PerId',Para('PerId')));
    //YOU ARE ASL
    rec.push(toInput('DateSave',Para('DateSave')));
    informationRecords.push(rec);
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

if(r.RowState !='Added'){
    continue;
}
var rec=new Array();//hi



rec.push(toInput('cityid', ( r['cityid']===undefined ? "": r['cityid'])  ));
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
            rec.push(toInput('cityid', ( r['cityid']===undefined ? "": r['cityid'])  ));
            informationRecords.push(rec);
        }
    }
    t.push(informationRecords);
    DataPass.push(t);
        var Enity=new Object();
        Enity.PageName='SimpleTable17';
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
