/// <reference path="../../Res/toolkit.js" />



var workshop_Edit=new Object();

var currentButton;
workshop_Edit.sendFiles=  function()
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
            workshop_Edit.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=workshop_Edit");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


workshop_Edit.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(workshop_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='workshop_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('workshopId',routeParams.workshopId ));
            Entity.Parameters.push( toInput('wrkShpId',$('#txtworkshop_EditwrkShpId').val()));
    
                    Entity.Parameters.push( toInput('wrkShapeName',$('#txtworkshop_EditwrkShapeName').val()));
    
                    Entity.Parameters.push( toInput('wrkShpConId',$('#txtworkshop_EditwrkShpConId').val()));
    
                    Entity.Parameters.push( toInput('address',$('#txtworkshop_Editaddress').val()));
    
                    Entity.Parameters.push( toInput('bldName',$('#txtworkshop_EditbldName').val()));
    
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
workshop_Edit.Validate= function()
{
    Validator.ClearErrors();
        
            
                                                Validator.CheckStringLength('txtworkshop_EditwrkShpId','کد کارگاه',10);
                                                                                                Validator.CheckEmpty('txtworkshop_EditwrkShpId','کد کارگاه');
                                                                                            
                                Validator.CheckEmpty('txtworkshop_EditwrkShapeName','عنوان کارگاه');
                                                                                            
                                                Validator.CheckStringLength('txtworkshop_EditwrkShpConId','ردیف پیمان',3);
                                                                                                Validator.CheckEmpty('txtworkshop_EditwrkShpConId','ردیف پیمان');
                                                                                            
                                Validator.CheckEmpty('txtworkshop_Editaddress','آدرس کارگاه');
                                                                                            
                                Validator.CheckEmpty('txtworkshop_EditbldName','نام کارفرما');
                                                                                        
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


workshop_Edit.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(workshop_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=workshop_Edit.Serach;
    var Entity=new Object();
    Entity.PageName='workshop_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('workshopId',routeParams.workshopId ));
            Entity.Parameters.push( toInput('wrkShpId',$('#txtworkshop_EditwrkShpId').val()));
    
                    Entity.Parameters.push( toInput('wrkShapeName',$('#txtworkshop_EditwrkShapeName').val()));
    
                    Entity.Parameters.push( toInput('wrkShpConId',$('#txtworkshop_EditwrkShpConId').val()));
    
                    Entity.Parameters.push( toInput('address',$('#txtworkshop_Editaddress').val()));
    
                    Entity.Parameters.push( toInput('bldName',$('#txtworkshop_EditbldName').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.workshop_Editrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.workshop_Editrecords= data.records;
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
workshop_Edit.InitStartValues=function(){
    var Entity=new Object();
    Entity.PageName='workshop_Edit';
    Entity.Parameters=new Array();
            Entity.Parameters.push( toInput('workshopId',routeParams.workshopId));
   
TableViewAjax('getStartValueFromServer',Entity,function(data){
    if( data.records.length!=0)
    {
     
                                $('#txtworkshop_EditwrkShpId').val(data.records[0].wrkShpId);

                $('#txtworkshop_EditwrkShapeName').val(data.records[0].wrkShapeName);

                $('#txtworkshop_EditwrkShpConId').val(data.records[0].wrkShpConId);

                $('#txtworkshop_Editaddress').val(data.records[0].address);

                $('#txtworkshop_EditbldName').val(data.records[0].bldName);

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




