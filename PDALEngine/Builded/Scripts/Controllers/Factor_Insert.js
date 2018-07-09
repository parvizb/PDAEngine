﻿/// <reference path="../../Res/toolkit.js" />
var Factor_Insert=new Object();
var currentButton;
Factor_Insert.sendFiles=  function()
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
            Factor_Insert.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=Factor_Insert");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


Factor_Insert.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(Factor_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='Factor_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('FactoryNumber',$('#txtFactoryNumber').val()));
    
                    Entity.Parameters.push( toInput('CusAccId',$('#txtCusAccId').val()));
    
                    Entity.Parameters.push( toInput('FactoryDate',$('#txtFactoryDate').val()));
    
                    Entity.Parameters.push( toInput('FactoryGetDate',$('#txtFactoryGetDate').val()));
    
                    Entity.Parameters.push( toInput('id_stroage',$('#txtid_stroage').val()));
    
                    Entity.Parameters.push( toInput('FactoryType',$('#txtFactoryType').val()));
    
                    Entity.Parameters.push( toInput('Descr',$('#txtDescr').val()));
    
                    Entity.Parameters.push( toInput('totalFactory',$('#txttotalFactory').val()));
    
                    Entity.Parameters.push( toInput('totalDiscount',$('#txttotalDiscount').val()));
    
                    Entity.Parameters.push( toInput('totalBill',$('#txttotalBill').val()));
    
                    Entity.Parameters.push( toInput('totalMoveCost',$('#txttotalMoveCost').val()));
    
                    Entity.Parameters.push( toInput('totalPayable',$('#txttotalPayable').val()));
    
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
Factor_Insert.Validate= function()
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


Factor_Insert.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(Factor_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=Factor_Insert.Serach;
    var Entity=new Object();
    Entity.PageName='Factor_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('FactoryNumber',$('#txtFactoryNumber').val()));
    
                    Entity.Parameters.push( toInput('CusAccId',$('#txtCusAccId').val()));
    
                    Entity.Parameters.push( toInput('FactoryDate',$('#txtFactoryDate').val()));
    
                    Entity.Parameters.push( toInput('FactoryGetDate',$('#txtFactoryGetDate').val()));
    
                    Entity.Parameters.push( toInput('id_stroage',$('#txtid_stroage').val()));
    
                    Entity.Parameters.push( toInput('FactoryType',$('#txtFactoryType').val()));
    
                    Entity.Parameters.push( toInput('Descr',$('#txtDescr').val()));
    
                    Entity.Parameters.push( toInput('totalFactory',$('#txttotalFactory').val()));
    
                    Entity.Parameters.push( toInput('totalDiscount',$('#txttotalDiscount').val()));
    
                    Entity.Parameters.push( toInput('totalBill',$('#txttotalBill').val()));
    
                    Entity.Parameters.push( toInput('totalMoveCost',$('#txttotalMoveCost').val()));
    
                    Entity.Parameters.push( toInput('totalPayable',$('#txttotalPayable').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.records= data.records;
    setTimeout(StoreCache, 200);
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



Factor_Insert.InsertRecord=function()
{
    var temp=new Object();
    temp.RowState='Added';
    temp.selected = false;
    temp.rndId = Math.round(Math.random() * 99999999999999);
        temp.stuffId='-1';
        temp.BoxCount='1';
        temp.stuffPrice='1';
        temp.Count='1';
        temp.BCount='1';
        currentScope.records.push(temp);
    currentScope.$apply();
               
    $('#stuffId_' +temp.rndId).each (function() {$(this).val($(this).attr('valc')) });
                                                                    
}

Factor_Insert.Save_Validate=function()
{
    Validator.ClearErrors();
                                    Validator.CheckRegSelect2('txtCusAccId','شناسه مشتری');
                                            Validator.CheckRegSelect2('txtid_stroage','کد انبار');
                                            Validator.CheckRegDate('txtFactoryDate','تاریخ  فاکتور');
                                                Validator.CheckEmpty('txtFactoryType','نوع فاکتور');
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
Validator.CheckRegSelect2('stuffId_' + r.rndId,'کالا',r.viewIndex+1);
Validator.CheckRegFloat('stuffCount_' + r.rndId,'تعداد جز',r.viewIndex+1);
Validator.CheckRegFloat('stuffPrice_' + r.rndId,'فی',r.viewIndex+1);
}


for(var l=0;l<currentScope.records.length;l++)
{ 
    var record=currentScope.records[l];
            if (!( Num(record.stuffCount)>0 ))
    {
        Messager.errors.push('ردیف '  + (l+1).toString() + ':تعداد نمی تواند از یک کمتر باشد');
    }
    
    
}






if (Messager.errors.length!=0)
{
    Validator.ShowErrors();
    return false;
}
return true;
}
Factor_Insert.Save=function()
{ 
    if(  Factor_Insert.Save_Validate()==false)
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
        rec.push(toInput('CusAccId',Para('CusAccId')));
            //YOU ARE ASL
        rec.push(toInput('id_stroage',Para('id_stroage')));
            //YOU ARE ASL
        rec.push(toInput('FactoryNumber',Para('FactoryNumber')));
            //YOU ARE ASL
        rec.push(toInput('FactoryDate',Para('FactoryDate')));
            //YOU ARE ASL
        rec.push(toInput('FactoryGetDate',Para('FactoryGetDate')));
            //YOU ARE ASL
        rec.push(toInput('FactoryType',Para('FactoryType')));
            //YOU ARE ASL
        rec.push(toInput('Descr',Para('Descr')));
            //YOU ARE ASL
        rec.push(toInput('totalFactory',Para('totalFactory')));
            //YOU ARE ASL
        rec.push(toInput('totalDiscount',Para('totalDiscount')));
            //YOU ARE ASL
        rec.push(toInput('totalPayable',Para('totalPayable')));
            //YOU ARE ASL
        rec.push(toInput('totalBill',Para('totalBill')));
            //YOU ARE ASL
        rec.push(toInput('totalMoveCost',Para('totalMoveCost')));
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



rec.push(toInput('stuffId', ( r['stuffId']===undefined ? "": r['stuffId'])  ));

rec.push(toInput('stuffCount', ( r['stuffCount']===undefined ? "": r['stuffCount'])  ));

rec.push(toInput('stuffPrice', ( r['stuffPrice']===undefined ? "": r['stuffPrice'])  ));

rec.push(toInput('stuffTotal', ( r['total']===undefined ? "": r['total'])  ));

rec.push(toInput('stuffDiscount', ( r['stuffDiscount']===undefined ? "": r['stuffDiscount'])  ));

rec.push(toInput('stuffAdding', ( r['stuffAdding']===undefined ? "": r['stuffAdding'])  ));
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
                                                        rec.push(toInput('stuffId', ( r['stuffId']===undefined ? "": r['stuffId'])  ));
                                        rec.push(toInput('stuffCount', ( r['stuffCount']===undefined ? "": r['stuffCount'])  ));
                                        rec.push(toInput('stuffPrice', ( r['stuffPrice']===undefined ? "": r['stuffPrice'])  ));
                                        rec.push(toInput('stuffTotal', ( r['total']===undefined ? "": r['total'])  ));
                                        rec.push(toInput('stuffDiscount', ( r['stuffDiscount']===undefined ? "": r['stuffDiscount'])  ));
                                        rec.push(toInput('stuffAdding', ( r['stuffAdding']===undefined ? "": r['stuffAdding'])  ));
                informationRecords.push(rec);
}
}
t.push(informationRecords);
DataPass.push(t);
var Enity=new Object();
Enity.PageName='Factor_Insert';
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

