/// <reference path="../../Res/toolkit.js" />
var moveStorage_Edit=new Object();
var currentButton;
moveStorage_Edit.sendFiles=  function()
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
            moveStorage_Edit.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=moveStorage_Edit");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


moveStorage_Edit.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(moveStorage_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='moveStorage_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('moveStorageId',routeParams.moveStorageId ));
            Entity.Parameters.push( toInput('sourceMoveId',$('#txtsourceMoveId').val()));
    
                    Entity.Parameters.push( toInput('DestMoveId',$('#txtDestMoveId').val()));
    
                    Entity.Parameters.push( toInput('moveDate',$('#txtmoveDate').val()));
    
                    Entity.Parameters.push( toInput('inNumber',$('#txtinNumber').val()));
    
                    Entity.Parameters.push( toInput('outNumber',$('#txtoutNumber').val()));
    
                    Entity.Parameters.push( toInput('descr',$('#txtdescr').val()));
    
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
moveStorage_Edit.Validate= function()
{
    Validator.ClearErrors();
        
            
                                                        Validator.CheckRegSelect2('txtsourceMoveId','انبار مبدا');
                                    
                                                        Validator.CheckRegSelect2('txtDestMoveId','انبار مقصد');
                                    
                                                                        Validator.CheckRegDate('txtmoveDate','تاریخ انتقال');
                                    
            
            
        
    if(Messager.errors.length!=0)
    {
        Validator.ShowErrors();
        return false ;
    }
        if (!( Para('sourceMoveId')!=Para('DestMoveId') ))
    {
        Messager.errors.push('انبار مبدا و مقصد نبایستی یکی باشد');
    }
    
    if(Messager.errors.length!=0)
    {

        Validator.ShowErrors();
        return false ;
    }


    return Messager.errors.length==0;
}


moveStorage_Edit.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(moveStorage_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=moveStorage_Edit.Serach;
    var Entity=new Object();
    Entity.PageName='moveStorage_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('moveStorageId',routeParams.moveStorageId ));
            Entity.Parameters.push( toInput('sourceMoveId',$('#txtsourceMoveId').val()));
    
                    Entity.Parameters.push( toInput('DestMoveId',$('#txtDestMoveId').val()));
    
                    Entity.Parameters.push( toInput('moveDate',$('#txtmoveDate').val()));
    
                    Entity.Parameters.push( toInput('inNumber',$('#txtinNumber').val()));
    
                    Entity.Parameters.push( toInput('outNumber',$('#txtoutNumber').val()));
    
                    Entity.Parameters.push( toInput('descr',$('#txtdescr').val()));
    
         
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

moveStorage_Edit.InitStartValues=function(){
    var Entity=new Object();
    Entity.PageName='moveStorage_Edit';
    Entity.Parameters=new Array();
            Entity.Parameters.push( toInput('moveStorageId',routeParams.moveStorageId));
   
TableViewAjax('getStartValueFromServer',Entity,function(data){
    if( data.records.length!=0)
    {
     
                                
        var o=document.createElement('option');
        o.value=data.records[0].sourceMoveId;
        o.innerHTML= data.records[0].sourceMoveIdTitle ;
        sourceMoveId.append(o);
        sourceMoveId.val(data.records[0].sourceMoveId  ) .trigger('change');

                
        var o=document.createElement('option');
        o.value=data.records[0].DestMoveId;
        o.innerHTML= data.records[0].DestMoveIdTitle ;
        DestMoveId.append(o);
        DestMoveId.val(data.records[0].DestMoveId  ) .trigger('change');

                $('#txtmoveDate').val(data.records[0].moveDate);

                $('#txtinNumber').val(data.records[0].inNumber);

                $('#txtoutNumber').val(data.records[0].outNumber);

                $('#txtdescr').val(data.records[0].descr);

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




