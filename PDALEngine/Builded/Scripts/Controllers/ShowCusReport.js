/// <reference path="../../Res/toolkit.js" />
var ShowCusReport=new Object();
var currentButton;
ShowCusReport.sendFiles=  function()
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
            ShowCusReport.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=ShowCusReport");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


ShowCusReport.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(ShowCusReport.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='ShowCusReport';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('Idcus',$('#txtIdcus').val()));
    
                    Entity.Parameters.push( toInput('startdate',$('#txtstartdate').val()));
    
                    Entity.Parameters.push( toInput('enddate',$('#txtenddate').val()));
    
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
ShowCusReport.Validate= function()
{
    Validator.ClearErrors();
        
                                                        Validator.CheckRegSelect2('txtIdcus','کد مشتری');
                                    
                                                                        Validator.CheckRegDate('txtstartdate','از تاریخ');
                                    
                                                                        Validator.CheckRegDate('txtenddate','تا تاریخ');
                                
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


ShowCusReport.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(ShowCusReport.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=ShowCusReport.Serach;
    var Entity=new Object();
    Entity.PageName='ShowCusReport';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('Idcus',$('#txtIdcus').val()));
    
                    Entity.Parameters.push( toInput('startdate',$('#txtstartdate').val()));
    
                    Entity.Parameters.push( toInput('enddate',$('#txtenddate').val()));
    
         
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





