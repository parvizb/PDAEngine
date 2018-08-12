﻿/// <reference path="../../Res/toolkit.js" />



var setAvable=new Object();

var currentButton;
setAvable.sendFiles=  function()
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
            setAvable.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=setAvable");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


setAvable.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(setAvable.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='setAvable';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('id_St',routeParams.id_St ));
            Entity.Parameters.push( toInput('id_stD',$('#txtsetAvableid_stD').val()));
    
                    Entity.Parameters.push( toInput('st_named',$('#txtsetAvablest_named').val()));
    
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
setAvable.Validate= function()
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


setAvable.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(setAvable.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=setAvable.Serach;
    var Entity=new Object();
    Entity.PageName='setAvable';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('id_St',routeParams.id_St ));
            Entity.Parameters.push( toInput('id_stD',$('#txtsetAvableid_stD').val()));
    
                    Entity.Parameters.push( toInput('st_named',$('#txtsetAvablest_named').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.setAvablerecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.setAvablerecords= data.records;
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



setAvable.Save_Validate=function()
{
    Validator.ClearErrors();
                                                                    for (var l=0;l<currentScope.setAvablerecords.length;l++)
    {
        var r=currentScope.setAvablerecords[l];

        if(r.RowState !='Changed'){
    continue;
}
Validator.CheckRegFloat('realCount_' + r.rndId,'تعداد',r.viewIndex+1);
Validator.CheckRegFloat('price_' + r.rndId,'ارزش فی',r.viewIndex+1);
}

for(var l=0;l<currentScope.setAvablerecords.length;l++)
{ 
    var record=currentScope.setAvablerecords[l];
    
}






if (Messager.errors.length!=0)
{
    Validator.ShowErrors();
    return false;
}
return true;
}
setAvable.Save=function()
{ 
    if(  setAvable.Save_Validate()==false)
    {
        return ;
    }
    var DataPass=new Array();
        var t=new Array();
    var  informationRecords=new Array()
    var NullFix=new Array();
    NullFix.push(toInput('fake',Para('fake')));
    informationRecords.push(NullFix);
    for (var l=0;l<currentScope.setAvablerecords.length;l++)
{
    var r=currentScope.setAvablerecords[l];

    if(r.RowState !='Changed'){
    continue;
}
var rec=new Array();//hi


rec.push(toInput('id_st', routeParams.id_St  ) );

rec.push(toInput('id_stuff', ( r['id_stuff']===undefined ? "": r['id_stuff'])  ));

rec.push(toInput('realCount', ( r['realCount']===undefined ? "": r['realCount'])  ));

rec.push(toInput('price', ( r['price']===undefined ? "": r['price'])  ));
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
                                        rec.push(toInput('id_st', routeParams.id_St  ) );
                        rec.push(toInput('id_stuff', ( r['id_stuff']===undefined ? "": r['id_stuff'])  ));
                                        rec.push(toInput('realCount', ( r['realCount']===undefined ? "": r['realCount'])  ));
                                        rec.push(toInput('price', ( r['price']===undefined ? "": r['price'])  ));
                informationRecords.push(rec);
}
}
t.push(informationRecords);
DataPass.push(t);
var Enity=new Object();
Enity.PageName='setAvable';
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

