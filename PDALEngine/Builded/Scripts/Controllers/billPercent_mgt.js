/// <reference path="../../Res/toolkit.js" />



var billPercent_mgt=new Object();

var currentButton;
billPercent_mgt.sendFiles=  function()
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
            billPercent_mgt.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=billPercent_mgt");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


billPercent_mgt.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(billPercent_mgt.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='billPercent_mgt';
    Entity.Parameters=new Array();
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
billPercent_mgt.Validate= function()
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


billPercent_mgt.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(billPercent_mgt.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=billPercent_mgt.Serach;
    var Entity=new Object();
    Entity.PageName='billPercent_mgt';
    Entity.Parameters=new Array();
     
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.billPercent_mgtrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.billPercent_mgtrecords= data.records;
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


billPercent_mgt.InsertRecord=function()
{
    var temp=new Object();
    temp.RowState='Added';
    temp.selected = false;
    temp.rndId = Math.round(Math.random() * 99999999999999);
        currentScope.billPercent_mgtrecords.push(temp);
    currentScope.$apply();
                                                    
}

billPercent_mgt.Save_Validate=function()
{
    Validator.ClearErrors();
                                                                                                                                                    for (var l=0;l<currentScope.billPercent_mgtrecords.length;l++)
    {
        var r=currentScope.billPercent_mgtrecords[l];

        if(r.RowState !='Added'){
    continue;
}
Validator.CheckRegDate('startdate_' + r.rndId,'از تاریخ',r.viewIndex+1);
Validator.CheckRegDate('enddate_' + r.rndId,'تا تاریخ',r.viewIndex+1);
Validator.CheckRegFloat('percent_' + r.rndId,'درصد',r.viewIndex+1);
}
    for (var l=0;l<currentScope.billPercent_mgtrecords.length;l++)
    {
        var r=currentScope.billPercent_mgtrecords[l];

        if(r.RowState !='Changed'){
    continue;
}
Validator.CheckRegDate('startdate_' + r.rndId,'از تاریخ',r.viewIndex+1);
Validator.CheckRegDate('enddate_' + r.rndId,'تا تاریخ',r.viewIndex+1);
Validator.CheckRegFloat('percent_' + r.rndId,'درصد',r.viewIndex+1);
}
    for (var l=0;l<currentScope.billPercent_mgtrecords.length;l++)
    {
        var r=currentScope.billPercent_mgtrecords[l];

        if(r.RowState !='Deleted'){
    continue;
}
}

for(var l=0;l<currentScope.billPercent_mgtrecords.length;l++)
{ 
    var record=currentScope.billPercent_mgtrecords[l];
    
}






if (Messager.errors.length!=0)
{
    Validator.ShowErrors();
    return false;
}
return true;
}
billPercent_mgt.Save=function()
{ 
    if(  billPercent_mgt.Save_Validate()==false)
    {
        return ;
    }
    var DataPass=new Array();
        var t=new Array();
    var  informationRecords=new Array()
    var NullFix=new Array();
    NullFix.push(toInput('fake',Para('fake')));
    informationRecords.push(NullFix);
    for (var l=0;l<currentScope.billPercent_mgtrecords.length;l++)
{
    var r=currentScope.billPercent_mgtrecords[l];

    if(r.RowState !='Added'){
    continue;
}
var rec=new Array();//hi


rec.push(toInput('startdate', ( r['startdate']===undefined ? "": r['startdate'])  ));

rec.push(toInput('enddate', ( r['enddate']===undefined ? "": r['enddate'])  ));

rec.push(toInput('percent', ( r['percent']===undefined ? "": r['percent'])  ));
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
                                rec.push(toInput('startdate', ( r['startdate']===undefined ? "": r['startdate'])  ));
                                        rec.push(toInput('enddate', ( r['enddate']===undefined ? "": r['enddate'])  ));
                                        rec.push(toInput('percent', ( r['percent']===undefined ? "": r['percent'])  ));
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
    for (var l=0;l<currentScope.billPercent_mgtrecords.length;l++)
{
    var r=currentScope.billPercent_mgtrecords[l];

    if(r.RowState !='Changed'){
    continue;
}
var rec=new Array();//hi


rec.push(toInput('BillId', ( r['BillId']===undefined ? "": r['BillId'])  ));

rec.push(toInput('startdate', ( r['startdate']===undefined ? "": r['startdate'])  ));

rec.push(toInput('enddate', ( r['enddate']===undefined ? "": r['enddate'])  ));

rec.push(toInput('percent', ( r['percent']===undefined ? "": r['percent'])  ));
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
                                rec.push(toInput('BillId', ( r['BillId']===undefined ? "": r['BillId'])  ));
                                        rec.push(toInput('startdate', ( r['startdate']===undefined ? "": r['startdate'])  ));
                                        rec.push(toInput('enddate', ( r['enddate']===undefined ? "": r['enddate'])  ));
                                        rec.push(toInput('percent', ( r['percent']===undefined ? "": r['percent'])  ));
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
    for (var l=0;l<currentScope.billPercent_mgtrecords.length;l++)
{
    var r=currentScope.billPercent_mgtrecords[l];

    if(r.RowState !='Deleted'){
    continue;
}
var rec=new Array();//hi


rec.push(toInput('BillId', ( r['BillId']===undefined ? "": r['BillId'])  ));
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
                                rec.push(toInput('BillId', ( r['BillId']===undefined ? "": r['BillId'])  ));
                informationRecords.push(rec);
}
}
t.push(informationRecords);
DataPass.push(t);
var Enity=new Object();
Enity.PageName='billPercent_mgt';
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

