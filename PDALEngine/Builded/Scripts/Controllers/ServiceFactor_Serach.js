/// <reference path="../../Res/toolkit.js" />



var ServiceFactor_Serach=new Object();

var currentButton;
ServiceFactor_Serach.sendFiles=  function()
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
            ServiceFactor_Serach.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=ServiceFactor_Serach");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


ServiceFactor_Serach.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(ServiceFactor_Serach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='ServiceFactor_Serach';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('ServiceFactorId',$('#txtServiceFactor_SerachServiceFactorId').val()));
    
                    Entity.Parameters.push( toInput('GetOrProdive',$('#txtServiceFactor_SerachGetOrProdive').val()));
    
                    Entity.Parameters.push( toInput('CusAccId',$('#txtServiceFactor_SerachCusAccId').val()));
    
                    Entity.Parameters.push( toInput('ServiceId',$('#txtServiceFactor_SerachServiceId').val()));
    
                    Entity.Parameters.push( toInput('FactorNumber',$('#txtServiceFactor_SerachFactorNumber').val()));
    
                    Entity.Parameters.push( toInput('startdate',$('#txtServiceFactor_Serachstartdate').val()));
    
                    Entity.Parameters.push( toInput('enddate',$('#txtServiceFactor_Serachenddate').val()));
    
                    Entity.Parameters.push( toInput('Descr',$('#txtServiceFactor_SerachDescr').val()));
    
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
ServiceFactor_Serach.Validate= function()
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


ServiceFactor_Serach.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(ServiceFactor_Serach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=ServiceFactor_Serach.Serach;
    var Entity=new Object();
    Entity.PageName='ServiceFactor_Serach';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('ServiceFactorId',$('#txtServiceFactor_SerachServiceFactorId').val()));
    
                    Entity.Parameters.push( toInput('GetOrProdive',$('#txtServiceFactor_SerachGetOrProdive').val()));
    
                    Entity.Parameters.push( toInput('CusAccId',$('#txtServiceFactor_SerachCusAccId').val()));
    
                    Entity.Parameters.push( toInput('ServiceId',$('#txtServiceFactor_SerachServiceId').val()));
    
                    Entity.Parameters.push( toInput('FactorNumber',$('#txtServiceFactor_SerachFactorNumber').val()));
    
                    Entity.Parameters.push( toInput('startdate',$('#txtServiceFactor_Serachstartdate').val()));
    
                    Entity.Parameters.push( toInput('enddate',$('#txtServiceFactor_Serachenddate').val()));
    
                    Entity.Parameters.push( toInput('Descr',$('#txtServiceFactor_SerachDescr').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.ServiceFactor_Serachrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.ServiceFactor_Serachrecords= data.records;
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




