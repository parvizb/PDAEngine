/// <reference path="../../Res/toolkit.js" />



var workshop_Insert=new Object();

var currentButton;
workshop_Insert.sendFiles=  function()
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
            workshop_Insert.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=workshop_Insert");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


workshop_Insert.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(workshop_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='workshop_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('wrkShpId',$('#txtworkshop_InsertwrkShpId').val()));
    
                    Entity.Parameters.push( toInput('wrkShapeName',$('#txtworkshop_InsertwrkShapeName').val()));
    
                    Entity.Parameters.push( toInput('wrkShpConId',$('#txtworkshop_InsertwrkShpConId').val()));
    
                    Entity.Parameters.push( toInput('address',$('#txtworkshop_Insertaddress').val()));
    
                    Entity.Parameters.push( toInput('bldName',$('#txtworkshop_InsertbldName').val()));
    
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
workshop_Insert.Validate= function()
{
    Validator.ClearErrors();
        
                                Validator.CheckEmpty('txtworkshop_InsertwrkShpId','کد کارگاه');
                                                                                                                                Validator.CheckStringLength('txtworkshop_InsertwrkShpId','کد کارگاه',10);
                                                                            
                                Validator.CheckEmpty('txtworkshop_InsertwrkShapeName','عنوان کارگاه');
                                                                                            
                                Validator.CheckEmpty('txtworkshop_InsertwrkShpConId','ردیف پیمان');
                                                                                                                                Validator.CheckStringLength('txtworkshop_InsertwrkShpConId','ردیف پیمان',3);
                                                                            
                                Validator.CheckEmpty('txtworkshop_Insertaddress','آدرس کارگاه');
                                                                                            
                                Validator.CheckEmpty('txtworkshop_InsertbldName','نام کارفرما');
                                                                                        
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


workshop_Insert.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(workshop_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=workshop_Insert.Serach;
    var Entity=new Object();
    Entity.PageName='workshop_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('wrkShpId',$('#txtworkshop_InsertwrkShpId').val()));
    
                    Entity.Parameters.push( toInput('wrkShapeName',$('#txtworkshop_InsertwrkShapeName').val()));
    
                    Entity.Parameters.push( toInput('wrkShpConId',$('#txtworkshop_InsertwrkShpConId').val()));
    
                    Entity.Parameters.push( toInput('address',$('#txtworkshop_Insertaddress').val()));
    
                    Entity.Parameters.push( toInput('bldName',$('#txtworkshop_InsertbldName').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.workshop_Insertrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.workshop_Insertrecords= data.records;
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




