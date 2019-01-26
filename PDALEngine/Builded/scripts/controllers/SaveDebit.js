/// <reference path="../../Res/toolkit.js" />



var SaveDebit=new Object();

var currentButton;
SaveDebit.sendFiles=  function()
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
            SaveDebit.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=SaveDebit");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


SaveDebit.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(SaveDebit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='SaveDebit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('Per_Id',$('#txtSaveDebitPer_Id').val()));
    
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
SaveDebit.Validate= function()
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


SaveDebit.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(SaveDebit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=SaveDebit.Serach;
    var Entity=new Object();
    Entity.PageName='SaveDebit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('Per_Id',$('#txtSaveDebitPer_Id').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.SaveDebitrecords= data.records;
          
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.SaveDebitrecords= data.records;
                  
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



SaveDebit.Save_Validate=function()
{
    Validator.ClearErrors();
                                    Validator.CheckRegSelect2('txtSaveDebitPer_Id','');
                                    if(typeof ( currentScope.SaveDebitrecords)!="undefined") {
    for (var l=0;l<currentScope.SaveDebitrecords.length;l++)
{
    var r=currentScope.SaveDebitrecords[l];

        if(r.selected == false){
      continue;
}
}
}
if(typeof ( currentScope.SaveDebitrecords)!="undefined") {
for(var l=0;l<currentScope.SaveDebitrecords.length;l++)
{ 
    var record=currentScope.SaveDebitrecords[l];
    
}
}





if (Messager.errors.length!=0)
{
    Validator.ShowErrors();
    return false;
}
return true;
}
SaveDebit.Save=function()
{ 
    if(  SaveDebit.Save_Validate()==false)
    {
        return ;
    }
    var DataPass=new Array();
      
    var t=new Array();
    var  informationRecords=new Array()
    var NullFix=new Array();
    NullFix.push(toInput('fake','NULL'));
    informationRecords.push(NullFix);
    for (var l=0;l<currentScope.SaveDebitrecords.length;l++)
{
    var r=currentScope.SaveDebitrecords[l];

        if(r.selected == false){
      continue;
}
var rec=new Array();//hi


rec.push(toInput('Per_Id',Para('Per_Id')));

rec.push(toInput('Wine_id', ( r['Wine_id']===undefined ? "": r['Wine_id'])  ));
informationRecords.push(rec);
}

if(currentScope.DeletedRows!==undefined)
{
    for (var l=0;l<currentScope.DeletedRows.length;l++)
    {
        var r=currentScope.DeletedRows[l];

     
                var rec=new Array();//hi
                        rec.push(toInput('Per_Id',Para('Per_Id')));
                                                rec.push(toInput('Wine_id', ( r['Wine_id']===undefined ? "": r['Wine_id'])  ));
                informationRecords.push(rec);
}
}
t.push(informationRecords);
DataPass.push(t);
var Enity=new Object();
Enity.PageName='SaveDebit';
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

