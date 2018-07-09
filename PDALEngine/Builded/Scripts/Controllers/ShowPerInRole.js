/// <reference path="../../Res/toolkit.js" />
var ShowPerInRole=new Object();
var currentButton;
ShowPerInRole.sendFiles=  function()
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
            ShowPerInRole.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=ShowPerInRole");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


ShowPerInRole.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(ShowPerInRole.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='ShowPerInRole';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('RoleId',routeParams.RoleId ));
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
ShowPerInRole.Validate= function()
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


ShowPerInRole.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(ShowPerInRole.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=ShowPerInRole.Serach;
    var Entity=new Object();
    Entity.PageName='ShowPerInRole';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('RoleId',routeParams.RoleId ));
 
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.records= data.records;
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
            for(var l=0;l<currentScope.records.length;l++)
    { 
        var record=currentScope.records[l];
        if((record.p=='1'))
        {
            currentScope.records[l].selected=true;
            $('#selected_' + currentScope.records[l].rndId).attr('checked',true);
        }
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




ShowPerInRole.Save_Validate=function()
{
    Validator.ClearErrors();
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

                if(r.selected == false){
      continue;
}
}

for(var l=0;l<currentScope.records.length;l++)
{ 
    var record=currentScope.records[l];
    
}






if (Messager.errors.length!=0)
{
    Validator.ShowErrors();
    return false;
}
return true;
}
ShowPerInRole.Save=function()
{ 
    if(  ShowPerInRole.Save_Validate()==false)
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
            rec.push(toInput('RoleId', routeParams.RoleId  ) );
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

        if(r.selected == false){
      continue;
}
var rec=new Array();//hi


rec.push(toInput('RoleId', routeParams.RoleId  ) );

rec.push(toInput('PerId', ( r['PerId']===undefined ? "": r['PerId'])  ));
informationRecords.push(rec);
}

if(currentScope.DeletedRows!==undefined)
{
    for (var l=0;l<currentScope.DeletedRows.length;l++)
    {
        var r=currentScope.DeletedRows[l];

     
                var rec=new Array();//hi
                                        rec.push(toInput('RoleId', routeParams.RoleId  ) );
                        rec.push(toInput('PerId', ( r['PerId']===undefined ? "": r['PerId'])  ));
                informationRecords.push(rec);
}
}
t.push(informationRecords);
DataPass.push(t);
var Enity=new Object();
Enity.PageName='ShowPerInRole';
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

