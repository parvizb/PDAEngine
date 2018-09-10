/// <reference path="../../Res/toolkit.js" />



var moveDetail_mgt=new Object();

var currentButton;
moveDetail_mgt.sendFiles=  function()
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
            moveDetail_mgt.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=moveDetail_mgt");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


moveDetail_mgt.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(moveDetail_mgt.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='moveDetail_mgt';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('moveStorageId',routeParams.moveStorageId ));
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
moveDetail_mgt.Validate= function()
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


moveDetail_mgt.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(moveDetail_mgt.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=moveDetail_mgt.Serach;
    var Entity=new Object();
    Entity.PageName='moveDetail_mgt';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('moveStorageId',routeParams.moveStorageId ));
 
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.moveDetail_mgtrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.moveDetail_mgtrecords= data.records;
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


moveDetail_mgt.InsertRecord=function()
{
    var temp=new Object();
    temp.RowState='Added';
    temp.selected = false;
    temp.rndId = Math.round(Math.random() * 99999999999999);
        currentScope.moveDetail_mgtrecords.push(temp);
    currentScope.$apply();
                       
    $('#stuffid_' +temp.rndId).each (function() {$(this).val($(this).attr('valc')) });
                                            
}

moveDetail_mgt.Save_Validate=function()
{
    Validator.ClearErrors();
                                                                                                                                                            for (var l=0;l<currentScope.moveDetail_mgtrecords.length;l++)
    {
        var r=currentScope.moveDetail_mgtrecords[l];

        if(r.RowState !='Added'){
    continue;
}
   
Validator.CheckEmpty('stuffid_' + r.rndId,'کالا',r.viewIndex+1);
   
Validator.CheckEmpty('count_' + r.rndId,'تعداد',r.viewIndex+1);
}
    for (var l=0;l<currentScope.moveDetail_mgtrecords.length;l++)
    {
        var r=currentScope.moveDetail_mgtrecords[l];

        if(r.RowState !='Changed'){
    continue;
}
   
Validator.CheckEmpty('mSDid_' + r.rndId,'شناسه ریز',r.viewIndex+1);
   
Validator.CheckEmpty('stuffid_' + r.rndId,'کالا',r.viewIndex+1);
Validator.CheckRegFloat('count_' + r.rndId,'تعداد',r.viewIndex+1);
}
    for (var l=0;l<currentScope.moveDetail_mgtrecords.length;l++)
    {
        var r=currentScope.moveDetail_mgtrecords[l];

        if(r.RowState !='Deleted'){
    continue;
}
}

for(var l=0;l<currentScope.moveDetail_mgtrecords.length;l++)
{ 
    var record=currentScope.moveDetail_mgtrecords[l];
    
}






if (Messager.errors.length!=0)
{
    Validator.ShowErrors();
    return false;
}
return true;
}
moveDetail_mgt.Save=function()
{ 
    if(  moveDetail_mgt.Save_Validate()==false)
    {
        return ;
    }
    var DataPass=new Array();
        var t=new Array();
    var  informationRecords=new Array()
    var NullFix=new Array();
    NullFix.push(toInput('fake','NULL'));
    informationRecords.push(NullFix);
    for (var l=0;l<currentScope.moveDetail_mgtrecords.length;l++)
{
    var r=currentScope.moveDetail_mgtrecords[l];

    if(r.RowState !='Added'){
    continue;
}
var rec=new Array();//hi


rec.push(toInput('stuffid', ( r['stuffid']===undefined ? "": r['stuffid'])  ));

rec.push(toInput('count', ( r['count']===undefined ? "": r['count'])  ));

rec.push(toInput('descr', ( r['descr']===undefined ? "": r['descr'])  ));

rec.push(toInput('moveStorageId', routeParams.moveStorageId  ) );
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
                                rec.push(toInput('stuffid', ( r['stuffid']===undefined ? "": r['stuffid'])  ));
                                        rec.push(toInput('count', ( r['count']===undefined ? "": r['count'])  ));
                                        rec.push(toInput('descr', ( r['descr']===undefined ? "": r['descr'])  ));
                                                rec.push(toInput('moveStorageId', routeParams.moveStorageId  ) );
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
    for (var l=0;l<currentScope.moveDetail_mgtrecords.length;l++)
{
    var r=currentScope.moveDetail_mgtrecords[l];

    if(r.RowState !='Changed'){
    continue;
}
var rec=new Array();//hi


rec.push(toInput('mSDid', ( r['mSDid']===undefined ? "": r['mSDid'])  ));

rec.push(toInput('stuffid', ( r['stuffid']===undefined ? "": r['stuffid'])  ));

rec.push(toInput('count', ( r['count']===undefined ? "": r['count'])  ));

rec.push(toInput('descr', ( r['descr']===undefined ? "": r['descr'])  ));

rec.push(toInput('moveStorageId', routeParams.moveStorageId  ) );
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
                                rec.push(toInput('mSDid', ( r['mSDid']===undefined ? "": r['mSDid'])  ));
                                        rec.push(toInput('stuffid', ( r['stuffid']===undefined ? "": r['stuffid'])  ));
                                        rec.push(toInput('count', ( r['count']===undefined ? "": r['count'])  ));
                                        rec.push(toInput('descr', ( r['descr']===undefined ? "": r['descr'])  ));
                                                rec.push(toInput('moveStorageId', routeParams.moveStorageId  ) );
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
    for (var l=0;l<currentScope.moveDetail_mgtrecords.length;l++)
{
    var r=currentScope.moveDetail_mgtrecords[l];

    if(r.RowState !='Deleted'){
    continue;
}
var rec=new Array();//hi


rec.push(toInput('mSDid', ( r['mSDid']===undefined ? "": r['mSDid'])  ));
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
                                rec.push(toInput('mSDid', ( r['mSDid']===undefined ? "": r['mSDid'])  ));
                informationRecords.push(rec);
}
}
t.push(informationRecords);
DataPass.push(t);
var Enity=new Object();
Enity.PageName='moveDetail_mgt';
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

