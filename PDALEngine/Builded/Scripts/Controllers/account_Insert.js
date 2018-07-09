/// <reference path="../../Res/toolkit.js" />
var account_Insert=new Object();
var currentButton;
account_Insert.sendFiles=  function()
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
            account_Insert.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=account_Insert");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


account_Insert.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(account_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='account_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('acc_name',$('#txtacc_name').val()));
    
                    Entity.Parameters.push( toInput('acc_position',$('#txtacc_position').val()));
    
                    Entity.Parameters.push( toInput('acc_startValue',$('#txtacc_startValue').val()));
    
                    Entity.Parameters.push( toInput('acc_descr',$('#txtacc_descr').val()));
    
                    Entity.Parameters.push( toInput('acc_code',$('#txtacc_code').val()));
    
                    Entity.Parameters.push( toInput('acc_brch',$('#txtacc_brch').val()));
    
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
account_Insert.Validate= function()
{
    Validator.ClearErrors();
        
                                Validator.CheckEmpty('txtacc_name','عنوان حساب');
                                                                                            
                                Validator.CheckEmpty('txtacc_position','محل حساب');
                                                                                            
            
                                                                            
                                Validator.CheckEmpty('txtacc_code','شماره حساب');
                                                                                            
                                Validator.CheckEmpty('txtacc_brch','شعبه حساب');
                                                                                        
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


account_Insert.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(account_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=account_Insert.Serach;
    var Entity=new Object();
    Entity.PageName='account_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('acc_name',$('#txtacc_name').val()));
    
                    Entity.Parameters.push( toInput('acc_position',$('#txtacc_position').val()));
    
                    Entity.Parameters.push( toInput('acc_startValue',$('#txtacc_startValue').val()));
    
                    Entity.Parameters.push( toInput('acc_descr',$('#txtacc_descr').val()));
    
                    Entity.Parameters.push( toInput('acc_code',$('#txtacc_code').val()));
    
                    Entity.Parameters.push( toInput('acc_brch',$('#txtacc_brch').val()));
    
         
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





