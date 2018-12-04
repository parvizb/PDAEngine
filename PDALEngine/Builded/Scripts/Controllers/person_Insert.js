/// <reference path="../../Res/toolkit.js" />



var Person_Insert=new Object();

var currentButton;
Person_Insert.sendFiles=  function()
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
            Person_Insert.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=Person_Insert");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


Person_Insert.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(Person_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='Person_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('PerId',$('#txtPerson_InsertPerId').val()));
    
                    Entity.Parameters.push( toInput('FristName',$('#txtPerson_InsertFristName').val()));
    
                    Entity.Parameters.push( toInput('LastName',$('#txtPerson_InsertLastName').val()));
    
                    Entity.Parameters.push( toInput('UnitId',$('#txtPerson_InsertUnitId').val()));
    
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
Person_Insert.Validate= function()
{
    Validator.ClearErrors();
        
                                                        Validator.CheckRegInteger('txtPerson_InsertPerId','شماره پرسنلی');
                                                            
                                Validator.CheckEmpty('txtPerson_InsertFristName','نام ');
                                                                                            
                                Validator.CheckEmpty('txtPerson_InsertLastName','نام خانوادگی');
                                                                                            
                                                        Validator.CheckRegSelect2('txtPerson_InsertUnitId','کد واحد');
                                
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


Person_Insert.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(Person_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=Person_Insert.Serach;
    var Entity=new Object();
    Entity.PageName='Person_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('PerId',$('#txtPerson_InsertPerId').val()));
    
                    Entity.Parameters.push( toInput('FristName',$('#txtPerson_InsertFristName').val()));
    
                    Entity.Parameters.push( toInput('LastName',$('#txtPerson_InsertLastName').val()));
    
                    Entity.Parameters.push( toInput('UnitId',$('#txtPerson_InsertUnitId').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.Person_Insertrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.Person_Insertrecords= data.records;
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




