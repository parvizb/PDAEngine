﻿/// <reference path="../../Res/toolkit.js" />



var GenCradax=new Object();

var currentButton;
GenCradax.sendFiles=  function()
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
            GenCradax.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=GenCradax");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


GenCradax.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(GenCradax.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='GenCradax';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('idstuff',$('#txtGenCradaxidstuff').val()));
    
                    Entity.Parameters.push( toInput('BCount',$('#txtGenCradaxBCount').val()));
    
                    Entity.Parameters.push( toInput('id_stragoe',$('#txtGenCradaxid_stragoe').val()));
    
                    Entity.Parameters.push( toInput('startdate',$('#txtGenCradaxstartdate').val()));
    
                    Entity.Parameters.push( toInput('enddate',$('#txtGenCradaxenddate').val()));
    
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
GenCradax.Validate= function()
{
    Validator.ClearErrors();
        
                                                        Validator.CheckRegSelect2('txtGenCradaxidstuff','کالا');
                                    
                                                                            
                                                        Validator.CheckRegSelect2('txtGenCradaxid_stragoe','انبار');
                                    
                                                                        Validator.CheckRegDate('txtGenCradaxstartdate','از تاریخ ');
                                    
                                                                        Validator.CheckRegDate('txtGenCradaxenddate','تا تاریخ');
                                
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


GenCradax.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(GenCradax.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=GenCradax.Serach;
    var Entity=new Object();
    Entity.PageName='GenCradax';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('idstuff',$('#txtGenCradaxidstuff').val()));
    
                    Entity.Parameters.push( toInput('BCount',$('#txtGenCradaxBCount').val()));
    
                    Entity.Parameters.push( toInput('id_stragoe',$('#txtGenCradaxid_stragoe').val()));
    
                    Entity.Parameters.push( toInput('startdate',$('#txtGenCradaxstartdate').val()));
    
                    Entity.Parameters.push( toInput('enddate',$('#txtGenCradaxenddate').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.GenCradaxrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.GenCradaxrecords= data.records;
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




