/// <reference path="../../Res/toolkit.js" />



var ServiceFactor_Edit=new Object();

var currentButton;
ServiceFactor_Edit.sendFiles=  function()
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
            ServiceFactor_Edit.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=ServiceFactor_Edit");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


ServiceFactor_Edit.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(ServiceFactor_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='ServiceFactor_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('ServiceFactorId',routeParams.ServiceFactorId ));
            Entity.Parameters.push( toInput('GetOrProdive',$('#txtServiceFactor_EditGetOrProdive').val()));
    
                    Entity.Parameters.push( toInput('CusAccId',$('#txtServiceFactor_EditCusAccId').val()));
    
                    Entity.Parameters.push( toInput('ServiceId',$('#txtServiceFactor_EditServiceId').val()));
    
                    Entity.Parameters.push( toInput('Cost',$('#txtServiceFactor_EditCost').val()));
    
                    Entity.Parameters.push( toInput('Adding',$('#txtServiceFactor_EditAdding').val()));
    
                    Entity.Parameters.push( toInput('FactorNumber',$('#txtServiceFactor_EditFactorNumber').val()));
    
                    Entity.Parameters.push( toInput('ServiceDate',$('#txtServiceFactor_EditServiceDate').val()));
    
                    Entity.Parameters.push( toInput('Descr',$('#txtServiceFactor_EditDescr').val()));
    
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
ServiceFactor_Edit.Validate= function()
{
    Validator.ClearErrors();
        
            
                                                                            
                                                        Validator.CheckRegSelect2('txtServiceFactor_EditCusAccId','مشتری');
                                    
                                                        Validator.CheckRegSelect2('txtServiceFactor_EditServiceId','کد خدمت');
                                    
                                                        Validator.CheckRegInteger('txtServiceFactor_EditCost','هزینه');
                                                            
            
            
                                                                        Validator.CheckRegDate('txtServiceFactor_EditServiceDate','تاریخ ارائه');
                                    
        
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


ServiceFactor_Edit.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(ServiceFactor_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=ServiceFactor_Edit.Serach;
    var Entity=new Object();
    Entity.PageName='ServiceFactor_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('ServiceFactorId',routeParams.ServiceFactorId ));
            Entity.Parameters.push( toInput('GetOrProdive',$('#txtServiceFactor_EditGetOrProdive').val()));
    
                    Entity.Parameters.push( toInput('CusAccId',$('#txtServiceFactor_EditCusAccId').val()));
    
                    Entity.Parameters.push( toInput('ServiceId',$('#txtServiceFactor_EditServiceId').val()));
    
                    Entity.Parameters.push( toInput('Cost',$('#txtServiceFactor_EditCost').val()));
    
                    Entity.Parameters.push( toInput('Adding',$('#txtServiceFactor_EditAdding').val()));
    
                    Entity.Parameters.push( toInput('FactorNumber',$('#txtServiceFactor_EditFactorNumber').val()));
    
                    Entity.Parameters.push( toInput('ServiceDate',$('#txtServiceFactor_EditServiceDate').val()));
    
                    Entity.Parameters.push( toInput('Descr',$('#txtServiceFactor_EditDescr').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.ServiceFactor_Editrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.ServiceFactor_Editrecords= data.records;
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
ServiceFactor_Edit.InitStartValues=function(){
    var Entity=new Object();
    Entity.PageName='ServiceFactor_Edit';
    Entity.Parameters=new Array();
            Entity.Parameters.push( toInput('ServiceFactorId',routeParams.ServiceFactorId));
   
TableViewAjax('getStartValueFromServer',Entity,function(data){
    if( data.records.length!=0)
    {
     
                                $('#txtServiceFactor_EditGetOrProdive').val(data.records[0].GetOrProdive);

                
        var o=document.createElement('option');
        o.value=data.records[0].CusAccId;
        o.innerHTML= data.records[0].CusAccIdTitle ;
        CusAccId.append(o);
        CusAccId.val(data.records[0].CusAccId  ) .trigger('change');

                
        var o=document.createElement('option');
        o.value=data.records[0].ServiceId;
        o.innerHTML= data.records[0].ServiceTitle ;
        ServiceId.append(o);
        ServiceId.val(data.records[0].ServiceId  ) .trigger('change');

                
$('#txtServiceFactor_EditCost').val(ShowAsMoney( data.records[0].Cost));

                
$('#txtServiceFactor_EditAdding').val(ShowAsMoney( data.records[0].Adding));

                $('#txtServiceFactor_EditFactorNumber').val(data.records[0].FactorNumber);

                $('#txtServiceFactor_EditServiceDate').val(data.records[0].ServiceDate);

                $('#txtServiceFactor_EditDescr').val(data.records[0].Descr);

}
else
{
    Validator.ClearErrors ();
    Messager.ShowMessage('خطا', 'رکورد مورد نظر یافت نشد');
    BackPage();
}
                
currentScope.$apply();
return;
          
},function(data)
{
    return;

});

}




