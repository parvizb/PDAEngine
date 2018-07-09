/// <reference path="../../Res/toolkit.js" />
var User_Edit=new Object();
var currentButton;
User_Edit.sendFiles=  function()
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
            User_Edit.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=User_Edit");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


User_Edit.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(User_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='User_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('UserId',routeParams.UserId ));
            Entity.Parameters.push( toInput('Fname',$('#txtFname').val()));
    
                    Entity.Parameters.push( toInput('Lname',$('#txtLname').val()));
    
                    Entity.Parameters.push( toInput('address',$('#txtaddress').val()));
    
                    Entity.Parameters.push( toInput('phone',$('#txtphone').val()));
    
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
User_Edit.Validate= function()
{
    Validator.ClearErrors();
        
            
                                Validator.CheckEmpty('txtFname','نام');
                                                                                            
                                Validator.CheckEmpty('txtLname','نام خانوادگی');
                                                                                            
                                Validator.CheckEmpty('txtaddress','آدرس');
                                                                                            
                                Validator.CheckEmpty('txtphone','شماره تماس');
                                                                                        
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


User_Edit.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(User_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=User_Edit.Serach;
    var Entity=new Object();
    Entity.PageName='User_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('UserId',routeParams.UserId ));
            Entity.Parameters.push( toInput('Fname',$('#txtFname').val()));
    
                    Entity.Parameters.push( toInput('Lname',$('#txtLname').val()));
    
                    Entity.Parameters.push( toInput('address',$('#txtaddress').val()));
    
                    Entity.Parameters.push( toInput('phone',$('#txtphone').val()));
    
         
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

User_Edit.InitStartValues=function(){
    var Entity=new Object();
    Entity.PageName='User_Edit';
    Entity.Parameters=new Array();
            Entity.Parameters.push( toInput('UserId',routeParams.UserId));
   
TableViewAjax('getStartValueFromServer',Entity,function(data){
    if( data.records.length!=0)
    {
     
                                $('#txtFname').val(data.records[0].Fname);

                $('#txtLname').val(data.records[0].Lname);

                $('#txtaddress').val(data.records[0].address);

                $('#txtphone').val(data.records[0].phone);

}
else
{
    Validator.ClearErrors ();
    Messager.ShowMessage('خطا', 'رکورد مورد نظر یافت نشد');
    BackPage();
}
                
currentScope.$apply();
return;
          
},function(data)
{
    return;

});

}




