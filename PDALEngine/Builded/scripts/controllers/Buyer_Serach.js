/// <reference path="../../Res/toolkit.js" />



var Buyer_Serach=new Object();

var currentButton;
Buyer_Serach.sendFiles=  function()
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
            Buyer_Serach.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=Buyer_Serach");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


Buyer_Serach.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(Buyer_Serach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='Buyer_Serach';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('BuyerId',$('#txtBuyer_SerachBuyerId').val()));
    
                    Entity.Parameters.push( toInput('fristName',$('#txtBuyer_SerachfristName').val()));
    
                    Entity.Parameters.push( toInput('lastName',$('#txtBuyer_SerachlastName').val()));
    
                    Entity.Parameters.push( toInput('address',$('#txtBuyer_Serachaddress').val()));
    
                    Entity.Parameters.push( toInput('moblile',$('#txtBuyer_Serachmoblile').val()));
    
                    Entity.Parameters.push( toInput('ejraPriceStart',$('#txtBuyer_SerachejraPriceStart').val()));
    
                    Entity.Parameters.push( toInput('ejraPriceEnd',$('#txtBuyer_SerachejraPriceEnd').val()));
    
                    Entity.Parameters.push( toInput('rehanPriceStart',$('#txtBuyer_SerachrehanPriceStart').val()));
    
                    Entity.Parameters.push( toInput('rehanPriceEnd',$('#txtBuyer_SerachrehanPriceEnd').val()));
    
                    Entity.Parameters.push( toInput('sellPricestart',$('#txtBuyer_SerachsellPricestart').val()));
    
                    Entity.Parameters.push( toInput('sellPriceend',$('#txtBuyer_SerachsellPriceend').val()));
    
                    Entity.Parameters.push( toInput('sizeStart',$('#txtBuyer_SerachsizeStart').val()));
    
                    Entity.Parameters.push( toInput('sizeEnd',$('#txtBuyer_SerachsizeEnd').val()));
    
                    Entity.Parameters.push( toInput('floor',$('#txtBuyer_Serachfloor').val()));
    
                    Entity.Parameters.push( toInput('typeBuild',$('#txtBuyer_SerachtypeBuild').val()));
    
                    Entity.Parameters.push( toInput('elev',$('#txtBuyer_Serachelev').val()));
    
                    Entity.Parameters.push( toInput('gazkesh',$('#txtBuyer_Serachgazkesh').val()));
    
                    Entity.Parameters.push( toInput('parking',$('#txtBuyer_Serachparking').val()));
    
                    Entity.Parameters.push( toInput('buildYear',$('#txtBuyer_SerachbuildYear').val()));
    
                    Entity.Parameters.push( toInput('comment',$('#txtBuyer_Serachcomment').val()));
    
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
Buyer_Serach.Validate= function()
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


Buyer_Serach.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(Buyer_Serach.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=Buyer_Serach.Serach;
    var Entity=new Object();
    Entity.PageName='Buyer_Serach';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('BuyerId',$('#txtBuyer_SerachBuyerId').val()));
    
                    Entity.Parameters.push( toInput('fristName',$('#txtBuyer_SerachfristName').val()));
    
                    Entity.Parameters.push( toInput('lastName',$('#txtBuyer_SerachlastName').val()));
    
                    Entity.Parameters.push( toInput('address',$('#txtBuyer_Serachaddress').val()));
    
                    Entity.Parameters.push( toInput('moblile',$('#txtBuyer_Serachmoblile').val()));
    
                    Entity.Parameters.push( toInput('ejraPriceStart',$('#txtBuyer_SerachejraPriceStart').val()));
    
                    Entity.Parameters.push( toInput('ejraPriceEnd',$('#txtBuyer_SerachejraPriceEnd').val()));
    
                    Entity.Parameters.push( toInput('rehanPriceStart',$('#txtBuyer_SerachrehanPriceStart').val()));
    
                    Entity.Parameters.push( toInput('rehanPriceEnd',$('#txtBuyer_SerachrehanPriceEnd').val()));
    
                    Entity.Parameters.push( toInput('sellPricestart',$('#txtBuyer_SerachsellPricestart').val()));
    
                    Entity.Parameters.push( toInput('sellPriceend',$('#txtBuyer_SerachsellPriceend').val()));
    
                    Entity.Parameters.push( toInput('sizeStart',$('#txtBuyer_SerachsizeStart').val()));
    
                    Entity.Parameters.push( toInput('sizeEnd',$('#txtBuyer_SerachsizeEnd').val()));
    
                    Entity.Parameters.push( toInput('floor',$('#txtBuyer_Serachfloor').val()));
    
                    Entity.Parameters.push( toInput('typeBuild',$('#txtBuyer_SerachtypeBuild').val()));
    
                    Entity.Parameters.push( toInput('elev',$('#txtBuyer_Serachelev').val()));
    
                    Entity.Parameters.push( toInput('gazkesh',$('#txtBuyer_Serachgazkesh').val()));
    
                    Entity.Parameters.push( toInput('parking',$('#txtBuyer_Serachparking').val()));
    
                    Entity.Parameters.push( toInput('buildYear',$('#txtBuyer_SerachbuildYear').val()));
    
                    Entity.Parameters.push( toInput('comment',$('#txtBuyer_Serachcomment').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.Buyer_Serachrecords= data.records;
          
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.Buyer_Serachrecords= data.records;
                  
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




