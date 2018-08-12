/// <reference path="../../Res/toolkit.js" />



var getment_Serach=new Object();

var currentButton;
getment_Serach.sendFiles=  function()
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
            getment_Serach.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=getment_Serach");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


getment_Serach.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(getment_Serach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='getment_Serach';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('getment_id',$('#txtgetment_Serachgetment_id').val()));
    
                    Entity.Parameters.push( toInput('get_amount',$('#txtgetment_Serachget_amount').val()));
    
                    Entity.Parameters.push( toInput('get_discount',$('#txtgetment_Serachget_discount').val()));
    
                    Entity.Parameters.push( toInput('cus_acc_id',$('#txtgetment_Serachcus_acc_id').val()));
    
                    Entity.Parameters.push( toInput('acc_id',$('#txtgetment_Serachacc_id').val()));
    
                    Entity.Parameters.push( toInput('startdate',$('#txtgetment_Serachstartdate').val()));
    
                    Entity.Parameters.push( toInput('enddate',$('#txtgetment_Serachenddate').val()));
    
                    Entity.Parameters.push( toInput('descr',$('#txtgetment_Serachdescr').val()));
    
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
getment_Serach.Validate= function()
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


getment_Serach.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(getment_Serach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=getment_Serach.Serach;
    var Entity=new Object();
    Entity.PageName='getment_Serach';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('getment_id',$('#txtgetment_Serachgetment_id').val()));
    
                    Entity.Parameters.push( toInput('get_amount',$('#txtgetment_Serachget_amount').val()));
    
                    Entity.Parameters.push( toInput('get_discount',$('#txtgetment_Serachget_discount').val()));
    
                    Entity.Parameters.push( toInput('cus_acc_id',$('#txtgetment_Serachcus_acc_id').val()));
    
                    Entity.Parameters.push( toInput('acc_id',$('#txtgetment_Serachacc_id').val()));
    
                    Entity.Parameters.push( toInput('startdate',$('#txtgetment_Serachstartdate').val()));
    
                    Entity.Parameters.push( toInput('enddate',$('#txtgetment_Serachenddate').val()));
    
                    Entity.Parameters.push( toInput('descr',$('#txtgetment_Serachdescr').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.getment_Serachrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.getment_Serachrecords= data.records;
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




