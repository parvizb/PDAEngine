/// <reference path="../../Res/toolkit.js" />



var ShowStuffSummery=new Object();

var currentButton;
ShowStuffSummery.sendFiles=  function()
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
            ShowStuffSummery.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=ShowStuffSummery");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


ShowStuffSummery.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(ShowStuffSummery.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='ShowStuffSummery';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('id_factory',$('#txtShowStuffSummeryid_factory').val()));
    
                    Entity.Parameters.push( toInput('id_product',$('#txtShowStuffSummeryid_product').val()));
    
                    Entity.Parameters.push( toInput('stuff_name',$('#txtShowStuffSummerystuff_name').val()));
    
                    Entity.Parameters.push( toInput('startdate',$('#txtShowStuffSummerystartdate').val()));
    
                    Entity.Parameters.push( toInput('enddate',$('#txtShowStuffSummeryenddate').val()));
    
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
ShowStuffSummery.Validate= function()
{
    Validator.ClearErrors();
        
            
            
            
                                                                        Validator.CheckRegDate('txtShowStuffSummerystartdate','از تاریخ');
                                    
                                                                        Validator.CheckRegDate('txtShowStuffSummeryenddate','تا تاریخ');
                                
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


ShowStuffSummery.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(ShowStuffSummery.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=ShowStuffSummery.Serach;
    var Entity=new Object();
    Entity.PageName='ShowStuffSummery';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('id_factory',$('#txtShowStuffSummeryid_factory').val()));
    
                    Entity.Parameters.push( toInput('id_product',$('#txtShowStuffSummeryid_product').val()));
    
                    Entity.Parameters.push( toInput('stuff_name',$('#txtShowStuffSummerystuff_name').val()));
    
                    Entity.Parameters.push( toInput('startdate',$('#txtShowStuffSummerystartdate').val()));
    
                    Entity.Parameters.push( toInput('enddate',$('#txtShowStuffSummeryenddate').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.ShowStuffSummeryrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.ShowStuffSummeryrecords= data.records;
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




