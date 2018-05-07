/// <reference path="../../Res/toolkit.js" />
var Storage_Insert=new Object();
var currentButton;
Storage_Insert.sendFiles=  function()
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
            Storage_Insert.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=Storage_Insert");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


   Storage_Insert.Submit= function(obj)
   {
       currentButton=obj;
       $(obj).attr('disabled',true);
       if(Storage_Insert.Validate()==false)
       {
           $(obj).attr('disabled',false);
           return ;
       }
              var Entity=new Object();
       Entity.PageName='Storage_Insert';
       Entity.Parameters=new Array();
       Entity.Parameters.push( toInput('StraogeName',$('#txtStraogeName').val()));

              Entity.Parameters.push( toInput('stroageMosaul',$('#txtstroageMosaul').val()));

              Entity.Parameters.push( toInput('address',$('#txtaddress').val()));

               ScallerAjax('ScallerSubmit',Entity,function(data){
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
Storage_Insert.Validate= function()
{
    Validator.ClearErrors();
        
    Validator.CheckEmpty('txtStraogeName','عنوان');
    
    Validator.CheckEmpty('txtstroageMosaul','مسئول انبار');
    

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

Storage_Insert.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(Storage_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=Storage_Insert.Serach;
    var Entity=new Object();
    Entity.PageName='Storage_Insert';
    Entity.Parameters=new Array();
    Entity.Parameters.push( toInput('StraogeName',$('#txtStraogeName').val()));

    Entity.Parameters.push( toInput('stroageMosaul',$('#txtstroageMosaul').val()));

    Entity.Parameters.push( toInput('address',$('#txtaddress').val()));

 
    TableViewAjax('getTableViewRecords',Entity,function(data){
          
        currentScope.records= data.records;
        
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



///Hi ...
///
