/// <reference path="../../Res/toolkit.js" />
var customer_Insert=new Object();
var currentButton;
customer_Insert.sendFiles=  function()
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
            customer_Insert.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=customer_Insert");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


customer_Insert.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(customer_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='customer_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('cus_fname',$('#txtcus_fname').val()));
    
                    Entity.Parameters.push( toInput('cus_lname',$('#txtcus_lname').val()));
    
                    Entity.Parameters.push( toInput('cus_addr',$('#txtcus_addr').val()));
    
                    Entity.Parameters.push( toInput('cus_phone',$('#txtcus_phone').val()));
    
                    Entity.Parameters.push( toInput('cus_mobile',$('#txtcus_mobile').val()));
    
                    Entity.Parameters.push( toInput('cus_group_id',$('#txtcus_group_id').val()));
    
                    Entity.Parameters.push( toInput('cus_descr',$('#txtcus_descr').val()));
    
                    Entity.Parameters.push( toInput('cus_remainBefore',$('#txtcus_remainBefore').val()));
    
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
customer_Insert.Validate= function()
{
    Validator.ClearErrors();
        
                                Validator.CheckEmpty('txtcus_fname','نام');
                                                                                            
                                Validator.CheckEmpty('txtcus_lname','نام خانوادگی');
                                                                                            
                                                                            
                                Validator.CheckEmpty('txtcus_phone','شماره تلفن');
                                                                                            
                                Validator.CheckEmpty('txtcus_mobile','شماره همراه');
                                                                                            
                                                        Validator.CheckRegSelect2('txtcus_group_id','گروه مشتریان');
                                    
            
        
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


customer_Insert.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(customer_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=customer_Insert.Serach;
    var Entity=new Object();
    Entity.PageName='customer_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('cus_fname',$('#txtcus_fname').val()));
    
                    Entity.Parameters.push( toInput('cus_lname',$('#txtcus_lname').val()));
    
                    Entity.Parameters.push( toInput('cus_addr',$('#txtcus_addr').val()));
    
                    Entity.Parameters.push( toInput('cus_phone',$('#txtcus_phone').val()));
    
                    Entity.Parameters.push( toInput('cus_mobile',$('#txtcus_mobile').val()));
    
                    Entity.Parameters.push( toInput('cus_group_id',$('#txtcus_group_id').val()));
    
                    Entity.Parameters.push( toInput('cus_descr',$('#txtcus_descr').val()));
    
                    Entity.Parameters.push( toInput('cus_remainBefore',$('#txtcus_remainBefore').val()));
    
         
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





