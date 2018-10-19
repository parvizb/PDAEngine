/// <reference path="../../Res/toolkit.js" />



var MoveAcc_Serach=new Object();

var currentButton;
MoveAcc_Serach.sendFiles=  function()
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
            MoveAcc_Serach.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=MoveAcc_Serach");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


MoveAcc_Serach.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(MoveAcc_Serach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='MoveAcc_Serach';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('moveAccId',$('#txtMoveAcc_SerachmoveAccId').val()));
    
                    Entity.Parameters.push( toInput('startDate',$('#txtMoveAcc_SerachstartDate').val()));
    
                    Entity.Parameters.push( toInput('endDate',$('#txtMoveAcc_SerachendDate').val()));
    
                    Entity.Parameters.push( toInput('sourceAcc',$('#txtMoveAcc_SerachsourceAcc').val()));
    
                    Entity.Parameters.push( toInput('DestAcc',$('#txtMoveAcc_SerachDestAcc').val()));
    
                    Entity.Parameters.push( toInput('Startamount',$('#txtMoveAcc_SerachStartamount').val()));
    
                    Entity.Parameters.push( toInput('Endamount',$('#txtMoveAcc_SerachEndamount').val()));
    
                    Entity.Parameters.push( toInput('Descr',$('#txtMoveAcc_SerachDescr').val()));
    
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
MoveAcc_Serach.Validate= function()
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


MoveAcc_Serach.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(MoveAcc_Serach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=MoveAcc_Serach.Serach;
    var Entity=new Object();
    Entity.PageName='MoveAcc_Serach';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('moveAccId',$('#txtMoveAcc_SerachmoveAccId').val()));
    
                    Entity.Parameters.push( toInput('startDate',$('#txtMoveAcc_SerachstartDate').val()));
    
                    Entity.Parameters.push( toInput('endDate',$('#txtMoveAcc_SerachendDate').val()));
    
                    Entity.Parameters.push( toInput('sourceAcc',$('#txtMoveAcc_SerachsourceAcc').val()));
    
                    Entity.Parameters.push( toInput('DestAcc',$('#txtMoveAcc_SerachDestAcc').val()));
    
                    Entity.Parameters.push( toInput('Startamount',$('#txtMoveAcc_SerachStartamount').val()));
    
                    Entity.Parameters.push( toInput('Endamount',$('#txtMoveAcc_SerachEndamount').val()));
    
                    Entity.Parameters.push( toInput('Descr',$('#txtMoveAcc_SerachDescr').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.MoveAcc_Serachrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.MoveAcc_Serachrecords= data.records;
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




