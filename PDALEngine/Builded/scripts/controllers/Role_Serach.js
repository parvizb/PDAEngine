﻿/// <reference path="../../Res/toolkit.js" />



var Role_Serach=new Object();

var currentButton;
Role_Serach.sendFiles=  function()
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
            Role_Serach.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=Role_Serach");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


Role_Serach.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(Role_Serach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='Role_Serach';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('RoleId',$('#txtRole_SerachRoleId').val()));
    
                    Entity.Parameters.push( toInput('RoleName',$('#txtRole_SerachRoleName').val()));
    
                    Entity.Parameters.push( toInput('RoleDescr',$('#txtRole_SerachRoleDescr').val()));
    
        ScallerAjax('ScallerSubmit',Entity,function(data){
        Messager.ShowMessage('اطلاعات', data.Message  );
        
  
 

  
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
Role_Serach.Validate= function()
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


Role_Serach.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(Role_Serach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=Role_Serach.Serach;
    var Entity=new Object();
    Entity.PageName='Role_Serach';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('RoleId',$('#txtRole_SerachRoleId').val()));
    
                    Entity.Parameters.push( toInput('RoleName',$('#txtRole_SerachRoleName').val()));
    
                    Entity.Parameters.push( toInput('RoleDescr',$('#txtRole_SerachRoleDescr').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.Role_Serachrecords= data.records;
          
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.Role_Serachrecords= data.records;
                  
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




