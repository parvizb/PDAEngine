/// <reference path="../../Res/toolkit.js" />



var ShowOptMgt=new Object();

var currentButton;
ShowOptMgt.sendFiles=  function()
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
            ShowOptMgt.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=ShowOptMgt");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


ShowOptMgt.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(ShowOptMgt.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='ShowOptMgt';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('startdate',$('#txtShowOptMgtstartdate').val()));
    
                    Entity.Parameters.push( toInput('enddate',$('#txtShowOptMgtenddate').val()));
    
                    Entity.Parameters.push( toInput('cusid',$('#txtShowOptMgtcusid').val()));
    
                    Entity.Parameters.push( toInput('accid',$('#txtShowOptMgtaccid').val()));
    
                    Entity.Parameters.push( toInput('startamount',$('#txtShowOptMgtstartamount').val()));
    
                    Entity.Parameters.push( toInput('endamount',$('#txtShowOptMgtendamount').val()));
    
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
ShowOptMgt.Validate= function()
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


ShowOptMgt.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(ShowOptMgt.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=ShowOptMgt.Serach;
    var Entity=new Object();
    Entity.PageName='ShowOptMgt';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('startdate',$('#txtShowOptMgtstartdate').val()));
    
                    Entity.Parameters.push( toInput('enddate',$('#txtShowOptMgtenddate').val()));
    
                    Entity.Parameters.push( toInput('cusid',$('#txtShowOptMgtcusid').val()));
    
                    Entity.Parameters.push( toInput('accid',$('#txtShowOptMgtaccid').val()));
    
                    Entity.Parameters.push( toInput('startamount',$('#txtShowOptMgtstartamount').val()));
    
                    Entity.Parameters.push( toInput('endamount',$('#txtShowOptMgtendamount').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.ShowOptMgtrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.ShowOptMgtrecords= data.records;
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




