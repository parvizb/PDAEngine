/// <reference path="../../Res/toolkit.js" />



var workshop_Serach=new Object();

var currentButton;
workshop_Serach.sendFiles=  function()
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
            workshop_Serach.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=workshop_Serach");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


workshop_Serach.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(workshop_Serach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='workshop_Serach';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('workshopId',$('#txtworkshop_SerachworkshopId').val()));
    
                    Entity.Parameters.push( toInput('wrkShpId',$('#txtworkshop_SerachwrkShpId').val()));
    
                    Entity.Parameters.push( toInput('wrkShapeName',$('#txtworkshop_SerachwrkShapeName').val()));
    
                    Entity.Parameters.push( toInput('wrkShpConId',$('#txtworkshop_SerachwrkShpConId').val()));
    
                    Entity.Parameters.push( toInput('address',$('#txtworkshop_Serachaddress').val()));
    
                    Entity.Parameters.push( toInput('bldName',$('#txtworkshop_SerachbldName').val()));
    
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
workshop_Serach.Validate= function()
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


workshop_Serach.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(workshop_Serach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=workshop_Serach.Serach;
    var Entity=new Object();
    Entity.PageName='workshop_Serach';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('workshopId',$('#txtworkshop_SerachworkshopId').val()));
    
                    Entity.Parameters.push( toInput('wrkShpId',$('#txtworkshop_SerachwrkShpId').val()));
    
                    Entity.Parameters.push( toInput('wrkShapeName',$('#txtworkshop_SerachwrkShapeName').val()));
    
                    Entity.Parameters.push( toInput('wrkShpConId',$('#txtworkshop_SerachwrkShpConId').val()));
    
                    Entity.Parameters.push( toInput('address',$('#txtworkshop_Serachaddress').val()));
    
                    Entity.Parameters.push( toInput('bldName',$('#txtworkshop_SerachbldName').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.workshop_Serachrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.workshop_Serachrecords= data.records;
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




