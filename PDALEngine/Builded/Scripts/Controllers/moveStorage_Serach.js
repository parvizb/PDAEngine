/// <reference path="../../Res/toolkit.js" />



var moveStorage_Serach=new Object();

var currentButton;
moveStorage_Serach.sendFiles=  function()
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
            moveStorage_Serach.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=moveStorage_Serach");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


moveStorage_Serach.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(moveStorage_Serach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='moveStorage_Serach';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('moveStorageId',$('#txtmoveStorage_SerachmoveStorageId').val()));
    
                    Entity.Parameters.push( toInput('sourceMoveId',$('#txtmoveStorage_SerachsourceMoveId').val()));
    
                    Entity.Parameters.push( toInput('DestMoveId',$('#txtmoveStorage_SerachDestMoveId').val()));
    
                    Entity.Parameters.push( toInput('startdate',$('#txtmoveStorage_Serachstartdate').val()));
    
                    Entity.Parameters.push( toInput('enddate',$('#txtmoveStorage_Serachenddate').val()));
    
                    Entity.Parameters.push( toInput('inNumber',$('#txtmoveStorage_SerachinNumber').val()));
    
                    Entity.Parameters.push( toInput('outNumber',$('#txtmoveStorage_SerachoutNumber').val()));
    
                    Entity.Parameters.push( toInput('descr',$('#txtmoveStorage_Serachdescr').val()));
    
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
moveStorage_Serach.Validate= function()
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


moveStorage_Serach.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(moveStorage_Serach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=moveStorage_Serach.Serach;
    var Entity=new Object();
    Entity.PageName='moveStorage_Serach';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('moveStorageId',$('#txtmoveStorage_SerachmoveStorageId').val()));
    
                    Entity.Parameters.push( toInput('sourceMoveId',$('#txtmoveStorage_SerachsourceMoveId').val()));
    
                    Entity.Parameters.push( toInput('DestMoveId',$('#txtmoveStorage_SerachDestMoveId').val()));
    
                    Entity.Parameters.push( toInput('startdate',$('#txtmoveStorage_Serachstartdate').val()));
    
                    Entity.Parameters.push( toInput('enddate',$('#txtmoveStorage_Serachenddate').val()));
    
                    Entity.Parameters.push( toInput('inNumber',$('#txtmoveStorage_SerachinNumber').val()));
    
                    Entity.Parameters.push( toInput('outNumber',$('#txtmoveStorage_SerachoutNumber').val()));
    
                    Entity.Parameters.push( toInput('descr',$('#txtmoveStorage_Serachdescr').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.moveStorage_Serachrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.moveStorage_Serachrecords= data.records;
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




