﻿/// <reference path="../../Res/toolkit.js" />



var Seller_Serach=new Object();

var currentButton;
Seller_Serach.sendFiles=  function()
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
            Seller_Serach.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=Seller_Serach");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


Seller_Serach.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(Seller_Serach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='Seller_Serach';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('SellerId',$('#txtSeller_SerachSellerId').val()));
    
                    Entity.Parameters.push( toInput('fristName',$('#txtSeller_SerachfristName').val()));
    
                    Entity.Parameters.push( toInput('lastName',$('#txtSeller_SerachlastName').val()));
    
                    Entity.Parameters.push( toInput('address',$('#txtSeller_Serachaddress').val()));
    
                    Entity.Parameters.push( toInput('moblile',$('#txtSeller_Serachmoblile').val()));
    
                    Entity.Parameters.push( toInput('ejraPriceStart',$('#txtSeller_SerachejraPriceStart').val()));
    
                    Entity.Parameters.push( toInput('ejraPriceEnd',$('#txtSeller_SerachejraPriceEnd').val()));
    
                    Entity.Parameters.push( toInput('rehanPriceStart',$('#txtSeller_SerachrehanPriceStart').val()));
    
                    Entity.Parameters.push( toInput('rehanPriceEnd',$('#txtSeller_SerachrehanPriceEnd').val()));
    
                    Entity.Parameters.push( toInput('sellPricestart',$('#txtSeller_SerachsellPricestart').val()));
    
                    Entity.Parameters.push( toInput('sellPriceend',$('#txtSeller_SerachsellPriceend').val()));
    
                    Entity.Parameters.push( toInput('sizeStart',$('#txtSeller_SerachsizeStart').val()));
    
                    Entity.Parameters.push( toInput('sizeEnd',$('#txtSeller_SerachsizeEnd').val()));
    
                    Entity.Parameters.push( toInput('floor',$('#txtSeller_Serachfloor').val()));
    
                    Entity.Parameters.push( toInput('typeBuild',$('#txtSeller_SerachtypeBuild').val()));
    
                    Entity.Parameters.push( toInput('countOfUnits',$('#txtSeller_SerachcountOfUnits').val()));
    
                    Entity.Parameters.push( toInput('elev',$('#txtSeller_Serachelev').val()));
    
                    Entity.Parameters.push( toInput('gazkesh',$('#txtSeller_Serachgazkesh').val()));
    
                    Entity.Parameters.push( toInput('parking',$('#txtSeller_Serachparking').val()));
    
                    Entity.Parameters.push( toInput('buildYear',$('#txtSeller_SerachbuildYear').val()));
    
                    Entity.Parameters.push( toInput('comment',$('#txtSeller_Serachcomment').val()));
    
        ScallerAjax('ScallerSubmit',Entity,function(data){
        Messager.ShowMessage('اطلاعات', data.Message  );
        
  
 

  
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
Seller_Serach.Validate= function()
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


Seller_Serach.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(Seller_Serach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=Seller_Serach.Serach;
    var Entity=new Object();
    Entity.PageName='Seller_Serach';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('SellerId',$('#txtSeller_SerachSellerId').val()));
    
                    Entity.Parameters.push( toInput('fristName',$('#txtSeller_SerachfristName').val()));
    
                    Entity.Parameters.push( toInput('lastName',$('#txtSeller_SerachlastName').val()));
    
                    Entity.Parameters.push( toInput('address',$('#txtSeller_Serachaddress').val()));
    
                    Entity.Parameters.push( toInput('moblile',$('#txtSeller_Serachmoblile').val()));
    
                    Entity.Parameters.push( toInput('ejraPriceStart',$('#txtSeller_SerachejraPriceStart').val()));
    
                    Entity.Parameters.push( toInput('ejraPriceEnd',$('#txtSeller_SerachejraPriceEnd').val()));
    
                    Entity.Parameters.push( toInput('rehanPriceStart',$('#txtSeller_SerachrehanPriceStart').val()));
    
                    Entity.Parameters.push( toInput('rehanPriceEnd',$('#txtSeller_SerachrehanPriceEnd').val()));
    
                    Entity.Parameters.push( toInput('sellPricestart',$('#txtSeller_SerachsellPricestart').val()));
    
                    Entity.Parameters.push( toInput('sellPriceend',$('#txtSeller_SerachsellPriceend').val()));
    
                    Entity.Parameters.push( toInput('sizeStart',$('#txtSeller_SerachsizeStart').val()));
    
                    Entity.Parameters.push( toInput('sizeEnd',$('#txtSeller_SerachsizeEnd').val()));
    
                    Entity.Parameters.push( toInput('floor',$('#txtSeller_Serachfloor').val()));
    
                    Entity.Parameters.push( toInput('typeBuild',$('#txtSeller_SerachtypeBuild').val()));
    
                    Entity.Parameters.push( toInput('countOfUnits',$('#txtSeller_SerachcountOfUnits').val()));
    
                    Entity.Parameters.push( toInput('elev',$('#txtSeller_Serachelev').val()));
    
                    Entity.Parameters.push( toInput('gazkesh',$('#txtSeller_Serachgazkesh').val()));
    
                    Entity.Parameters.push( toInput('parking',$('#txtSeller_Serachparking').val()));
    
                    Entity.Parameters.push( toInput('buildYear',$('#txtSeller_SerachbuildYear').val()));
    
                    Entity.Parameters.push( toInput('comment',$('#txtSeller_Serachcomment').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.Seller_Serachrecords= data.records;
          
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.Seller_Serachrecords= data.records;
                  
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




