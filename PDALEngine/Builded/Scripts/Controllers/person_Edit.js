/// <reference path="../../Res/toolkit.js" />



var Person_Edit=new Object();

var currentButton;
Person_Edit.sendFiles=  function()
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
            Person_Edit.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=Person_Edit");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


Person_Edit.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(Person_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='Person_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('PerId',routeParams.PerId ));
            Entity.Parameters.push( toInput('FristName',$('#txtPerson_EditFristName').val()));
    
                    Entity.Parameters.push( toInput('LastName',$('#txtPerson_EditLastName').val()));
    
                    Entity.Parameters.push( toInput('UnitId',$('#txtPerson_EditUnitId').val()));
    
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
Person_Edit.Validate= function()
{
    Validator.ClearErrors();
        
            
                                Validator.CheckEmpty('txtPerson_EditFristName','نام ');
                                                                                            
                                Validator.CheckEmpty('txtPerson_EditLastName','نام خانوادگی');
                                                                                            
                                                        Validator.CheckRegSelect2('txtPerson_EditUnitId','کد واحد');
                                
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


Person_Edit.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(Person_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=Person_Edit.Serach;
    var Entity=new Object();
    Entity.PageName='Person_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('PerId',routeParams.PerId ));
            Entity.Parameters.push( toInput('FristName',$('#txtPerson_EditFristName').val()));
    
                    Entity.Parameters.push( toInput('LastName',$('#txtPerson_EditLastName').val()));
    
                    Entity.Parameters.push( toInput('UnitId',$('#txtPerson_EditUnitId').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.Person_Editrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.Person_Editrecords= data.records;
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
Person_Edit.InitStartValues=function(){
    var Entity=new Object();
    Entity.PageName='Person_Edit';
    Entity.Parameters=new Array();
            Entity.Parameters.push( toInput('PerId',routeParams.PerId));
   
TableViewAjax('getStartValueFromServer',Entity,function(data){
    if( data.records.length!=0)
    {
     
                                $('#txtPerson_EditFristName').val(data.records[0].FristName);

                $('#txtPerson_EditLastName').val(data.records[0].LastName);

                
        
Select2AjaxDirect('Person_Edit','UnitId',data.records[0].UnitId,'txtPerson_EditUnitId');


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




