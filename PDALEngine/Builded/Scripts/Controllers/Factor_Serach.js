/// <reference path="../../Res/toolkit.js" />
var Factor_Serach=new Object();
var currentButton;
Factor_Serach.sendFiles=  function()
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
            Factor_Serach.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=Factor_Serach");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


Factor_Serach.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(Factor_Serach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='Factor_Serach';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('FactoryId',$('#txtFactoryId').val()));
    
                    Entity.Parameters.push( toInput('FactoryNumber',$('#txtFactoryNumber').val()));
    
                    Entity.Parameters.push( toInput('CusAccId',$('#txtCusAccId').val()));
    
                    Entity.Parameters.push( toInput('startdate',$('#txtstartdate').val()));
    
                    Entity.Parameters.push( toInput('enddate',$('#txtenddate').val()));
    
                    Entity.Parameters.push( toInput('FactoryType',$('#txtFactoryType').val()));
    
                    Entity.Parameters.push( toInput('Descr',$('#txtDescr').val()));
    
                    Entity.Parameters.push( toInput('totalFactory',$('#txttotalFactory').val()));
    
                    Entity.Parameters.push( toInput('totalDiscount',$('#txttotalDiscount').val()));
    
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
Factor_Serach.Validate= function()
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


Factor_Serach.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(Factor_Serach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=Factor_Serach.Serach;
    var Entity=new Object();
    Entity.PageName='Factor_Serach';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('FactoryId',$('#txtFactoryId').val()));
    
                    Entity.Parameters.push( toInput('FactoryNumber',$('#txtFactoryNumber').val()));
    
                    Entity.Parameters.push( toInput('CusAccId',$('#txtCusAccId').val()));
    
                    Entity.Parameters.push( toInput('startdate',$('#txtstartdate').val()));
    
                    Entity.Parameters.push( toInput('enddate',$('#txtenddate').val()));
    
                    Entity.Parameters.push( toInput('FactoryType',$('#txtFactoryType').val()));
    
                    Entity.Parameters.push( toInput('Descr',$('#txtDescr').val()));
    
                    Entity.Parameters.push( toInput('totalFactory',$('#txttotalFactory').val()));
    
                    Entity.Parameters.push( toInput('totalDiscount',$('#txttotalDiscount').val()));
    
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





