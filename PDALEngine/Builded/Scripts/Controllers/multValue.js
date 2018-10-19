/// <reference path="../../Res/toolkit.js" />



var multValue=new Object();

var currentButton;
multValue.sendFiles=  function()
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
            multValue.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=multValue");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


multValue.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(multValue.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='multValue';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('CusAccId',$('#txtmultValueCusAccId').val()));
    
                    Entity.Parameters.push( toInput('factory_name',$('#txtmultValuefactory_name').val()));
    
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
multValue.Validate= function()
{
    Validator.ClearErrors();
        
                                                                            
                                Validator.CheckEmpty('txtmultValuefactory_name','عنوان');
                                                                                        
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


multValue.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(multValue.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=multValue.Serach;
    var Entity=new Object();
    Entity.PageName='multValue';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('CusAccId',$('#txtmultValueCusAccId').val()));
    
                    Entity.Parameters.push( toInput('factory_name',$('#txtmultValuefactory_name').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.multValuerecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.multValuerecords= data.records;
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



multValue.ss_Validate=function()
{
    Validator.ClearErrors();
                                    if(typeof ( currentScope.multValuerecords)!="undefined") {
    for (var l=0;l<currentScope.multValuerecords.length;l++)
{
    var r=currentScope.multValuerecords[l];

        if(r.selected == true){
      continue;
}
}
}
if(typeof ( currentScope.multValuerecords)!="undefined") {
for(var l=0;l<currentScope.multValuerecords.length;l++)
{ 
    var record=currentScope.multValuerecords[l];
    
}
}





if (Messager.errors.length!=0)
{
    Validator.ShowErrors();
    return false;
}
return true;
}
multValue.ss=function()
{ 
    if(  multValue.ss_Validate()==false)
    {
        return ;
    }
    var DataPass=new Array();
      
    var t=new Array();
    var  informationRecords=new Array()
    var NullFix=new Array();
    NullFix.push(toInput('fake','NULL'));
    informationRecords.push(NullFix);
    var arr=$('#txtmultValueCusAccId').val();
for (var l=0;l<arr.length;l++)
{
    var rec=new Array();//hi
    var r=arr[l];

var rec=new Array();//hi com


rec.push(toInput('CusAccId', ( r)));

rec.push(toInput('factory_name',Para('factory_name')));
informationRecords.push(rec);


}
t.push(informationRecords);
DataPass.push(t);
var Enity=new Object();
Enity.PageName='multValue';
Enity.CommandName='ss';
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

