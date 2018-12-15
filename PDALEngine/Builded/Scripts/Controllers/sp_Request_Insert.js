/// <reference path="../../Res/toolkit.js" />



var sp_Request_Insert=new Object();

var currentButton;
sp_Request_Insert.sendFiles=  function()
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
            sp_Request_Insert.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=sp_Request_Insert");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


sp_Request_Insert.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(sp_Request_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='sp_Request_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('Req_fName',$('#txtsp_Request_InsertReq_fName').val()));
    
                    Entity.Parameters.push( toInput('Req_lname',$('#txtsp_Request_InsertReq_lname').val()));
    
                    Entity.Parameters.push( toInput('Req_cu_isReal', $('#txtsp_Request_InsertReq_cu_isReal').val()) );
  
    
                    Entity.Parameters.push( toInput('Req_target_Sup',$('#txtsp_Request_InsertReq_target_Sup').val()));
    
                    Entity.Parameters.push( toInput('req_min_Sup',$('#txtsp_Request_Insertreq_min_Sup').val()));
    
                    Entity.Parameters.push( toInput('Req_max_sup',$('#txtsp_Request_InsertReq_max_sup').val()));
    
                    Entity.Parameters.push( toInput('Req_tar_push',$('#txtsp_Request_InsertReq_tar_push').val()));
    
                    Entity.Parameters.push( toInput('req_etDate',$('#txtsp_Request_Insertreq_etDate').val()));
    
                    Entity.Parameters.push( toInput('req_stDate',$('#txtsp_Request_Insertreq_stDate').val()));
    
                            Entity.Parameters.push( toInput('emailToNot',$('#txtsp_Request_InsertemailToNot').val()));
    
                    Entity.Parameters.push( toInput('mobileToNot',$('#txtsp_Request_InsertmobileToNot').val()));
    
                    Entity.Parameters.push( toInput('bussCode',$('#txtsp_Request_InsertbussCode').val()));
    
                    Entity.Parameters.push( toInput('natCode',$('#txtsp_Request_InsertnatCode').val()));
    
                            Entity.Parameters.push( toInput('Req_subbreif',$('#txtsp_Request_InsertReq_subbreif').val()));
    
                    Entity.Parameters.push( toInput('Req_place_dewater',$('#txtsp_Request_InsertReq_place_dewater').val()));
    
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
sp_Request_Insert.Validate= function()
{
    Validator.ClearErrors();
        
                                Validator.CheckEmpty('txtsp_Request_InsertReq_fName','نام ');
                                                                                            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
        
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


sp_Request_Insert.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(sp_Request_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=sp_Request_Insert.Serach;
    var Entity=new Object();
    Entity.PageName='sp_Request_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('Req_fName',$('#txtsp_Request_InsertReq_fName').val()));
    
                    Entity.Parameters.push( toInput('Req_lname',$('#txtsp_Request_InsertReq_lname').val()));
    
                    Entity.Parameters.push( toInput('Req_cu_isReal',$('#txtsp_Request_InsertReq_cu_isReal').val()));
    
                    Entity.Parameters.push( toInput('Req_target_Sup',$('#txtsp_Request_InsertReq_target_Sup').val()));
    
                    Entity.Parameters.push( toInput('req_min_Sup',$('#txtsp_Request_Insertreq_min_Sup').val()));
    
                    Entity.Parameters.push( toInput('Req_max_sup',$('#txtsp_Request_InsertReq_max_sup').val()));
    
                    Entity.Parameters.push( toInput('Req_tar_push',$('#txtsp_Request_InsertReq_tar_push').val()));
    
                    Entity.Parameters.push( toInput('req_etDate',$('#txtsp_Request_Insertreq_etDate').val()));
    
                    Entity.Parameters.push( toInput('req_stDate',$('#txtsp_Request_Insertreq_stDate').val()));
    
                            Entity.Parameters.push( toInput('emailToNot',$('#txtsp_Request_InsertemailToNot').val()));
    
                    Entity.Parameters.push( toInput('mobileToNot',$('#txtsp_Request_InsertmobileToNot').val()));
    
                    Entity.Parameters.push( toInput('bussCode',$('#txtsp_Request_InsertbussCode').val()));
    
                    Entity.Parameters.push( toInput('natCode',$('#txtsp_Request_InsertnatCode').val()));
    
                            Entity.Parameters.push( toInput('Req_subbreif',$('#txtsp_Request_InsertReq_subbreif').val()));
    
                    Entity.Parameters.push( toInput('Req_place_dewater',$('#txtsp_Request_InsertReq_place_dewater').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.sp_Request_Insertrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.sp_Request_Insertrecords= data.records;
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




