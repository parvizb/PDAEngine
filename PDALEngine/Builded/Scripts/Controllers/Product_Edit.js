﻿/// <reference path="../../Res/toolkit.js" />
var Product_Edit=new Object();
var currentButton;
Product_Edit.sendFiles=  function()
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
            Product_Edit.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=Product_Edit");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


   Product_Edit.Submit= function(obj)
   {
       currentButton=obj;
       $(obj).attr('disabled',true);
       if(Product_Edit.Validate()==false)
       {
           $(obj).attr('disabled',false);
           return ;
       }
              var Entity=new Object();
       Entity.PageName='Product_Edit';
       Entity.Parameters=new Array();
              Entity.Parameters.push( toInput('ProductId',routeParams.ProductId ));
       Entity.Parameters.push( toInput('ProductName',$('#txtProductName').val()));

              Entity.Parameters.push( toInput('ProductTypeId',$('#txtProductTypeId').val()));

              Entity.Parameters.push( toInput('UnitId',$('#txtUnitId').val()));

              Entity.Parameters.push( toInput('UnitBoxId',$('#txtUnitBoxId').val()));

              Entity.Parameters.push( toInput('FactoryId',$('#txtFactoryId').val()));

              Entity.Parameters.push( toInput('UnitBoxCount',$('#txtUnitBoxCount').val()));

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
Product_Edit.Validate= function()
{
    Validator.ClearErrors();
        
    
    Validator.CheckEmpty('txtProductName','عنوان کالا');
    
    Validator.CheckRegInteger('txtProductTypeId','شناسه نوع کالا');
    
    Validator.CheckRegInteger('txtUnitId','واحد جز');
    
    Validator.CheckRegInteger('txtUnitBoxId','واحد کل');
    
    Validator.CheckRegInteger('txtFactoryId','شناسه');
    
    Validator.CheckRegInteger('txtUnitBoxCount','تعداد جز');

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

Product_Edit.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(Product_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=Product_Edit.Serach;
    var Entity=new Object();
    Entity.PageName='Product_Edit';
    Entity.Parameters=new Array();
    Entity.Parameters.push( toInput('ProductId',routeParams.ProductId ));
    Entity.Parameters.push( toInput('ProductName',$('#txtProductName').val()));

    Entity.Parameters.push( toInput('ProductTypeId',$('#txtProductTypeId').val()));

    Entity.Parameters.push( toInput('UnitId',$('#txtUnitId').val()));

    Entity.Parameters.push( toInput('UnitBoxId',$('#txtUnitBoxId').val()));

    Entity.Parameters.push( toInput('FactoryId',$('#txtFactoryId').val()));

    Entity.Parameters.push( toInput('UnitBoxCount',$('#txtUnitBoxCount').val()));

 
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


Product_Edit.InitStartValues=function(){
var Entity=new Object();
Entity.PageName='Product_Edit';
Entity.Parameters=new Array();
Entity.Parameters.push( toInput('ProductId',routeParams.ProductId));
   
TableViewAjax('getStartValueFromServer',Entity,function(data){
    if( data.records.length!=0)
    {
     
            $('#txtProductName').val(data.records[0].ProductName);

            $('#txtProductTypeId').val(data.records[0].ProductTypeId);

            $('#txtUnitId').val(data.records[0].UnitId);

            $('#txtUnitBoxId').val(data.records[0].UnitBoxId);

            $('#txtFactoryId').val(data.records[0].FactoryId);

            $('#txtUnitBoxCount').val(data.records[0].UnitBoxCount);

}
else
{
    Validator.ClearErrors ();
    Messager.ShowMessage('خطا', 'رکورد مورد نظر یافت نشد');
    BackPage();
}
                
           
return;
          
},function(data)
{
    return;

});

}

///Hi ...
///