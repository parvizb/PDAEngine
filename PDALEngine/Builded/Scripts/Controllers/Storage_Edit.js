/// <reference path="../../Res/toolkit.js" />
var Storage_Edit=new Object();
var currentButton;
Storage_Edit.sendFiles=  function()
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
            Storage_Edit.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=Storage_Edit");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


   Storage_Edit.Submit= function(obj)
   {
       currentButton=obj;
       $(obj).attr('disabled',true);
       if(Storage_Edit.Validate()==false)
       {
           $(obj).attr('disabled',false);
           return ;
       }
              var Entity=new Object();
       Entity.PageName='Storage_Edit';
       Entity.Parameters=new Array();
              Entity.Parameters.push( toInput('StroageId',routeParams.StroageId ));
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
Storage_Edit.Validate= function()
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

Storage_Edit.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(Storage_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=Storage_Edit.Serach;
    var Entity=new Object();
    Entity.PageName='Storage_Edit';
    Entity.Parameters=new Array();
    Entity.Parameters.push( toInput('StroageId',routeParams.StroageId ));
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


Storage_Edit.InitStartValues=function(){
var Entity=new Object();
Entity.PageName='Storage_Edit';
Entity.Parameters=new Array();
Entity.Parameters.push( toInput('StroageId',routeParams.StroageId));
   
TableViewAjax('getStartValueFromServer',Entity,function(data){
    if( data.records.length!=0)
    {
     
            $('#txtStraogeName').val(data.records[0].StraogeName);

            $('#txtstroageMosaul').val(data.records[0].stroageMosaul);

            $('#txtaddress').val(data.records[0].address);

}
else
{
    Validator.ClearErrors ();
    Messager.ShowMessage('خطا', 'رکورد مورد نظر یافت نشد');
    BackPage();
}
                
           
return;
          
},function(data)
{
    return;

});

}

///Hi ...
///
