/// <reference path="../../Res/toolkit.js" />



var Buyer_Edit=new Object();

var currentButton;
Buyer_Edit.sendFiles=  function()
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
            Buyer_Edit.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=Buyer_Edit");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


Buyer_Edit.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(Buyer_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='Buyer_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('BuyerId',routeParams.BuyerId ));
            Entity.Parameters.push( toInput('fristName',$('#txtBuyer_EditfristName').val()));
    
                    Entity.Parameters.push( toInput('lastName',$('#txtBuyer_EditlastName').val()));
    
                    Entity.Parameters.push( toInput('address',$('#txtBuyer_Editaddress').val()));
    
                    Entity.Parameters.push( toInput('moblile',$('#txtBuyer_Editmoblile').val()));
    
                    Entity.Parameters.push( toInput('ejraPrice',$('#txtBuyer_EditejraPrice').val()));
    
                    Entity.Parameters.push( toInput('rehanPrice',$('#txtBuyer_EditrehanPrice').val()));
    
                    Entity.Parameters.push( toInput('sellPrice',$('#txtBuyer_EditsellPrice').val()));
    
                    Entity.Parameters.push( toInput('size',$('#txtBuyer_Editsize').val()));
    
                    Entity.Parameters.push( toInput('floor',$('#txtBuyer_Editfloor').val()));
    
                    Entity.Parameters.push( toInput('typeBuild',$('#txtBuyer_EdittypeBuild').val()));
    
                    Entity.Parameters.push( toInput('elev',$('#txtBuyer_Editelev').val()));
    
                    Entity.Parameters.push( toInput('gazkesh',$('#txtBuyer_Editgazkesh').val()));
    
                    Entity.Parameters.push( toInput('parking',$('#txtBuyer_Editparking').val()));
    
                    Entity.Parameters.push( toInput('buildYear',$('#txtBuyer_EditbuildYear').val()));
    
                    Entity.Parameters.push( toInput('comment',$('#txtBuyer_Editcomment').val()));
    
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
Buyer_Edit.Validate= function()
{
    Validator.ClearErrors();
        
            
                                Validator.CheckEmpty('txtBuyer_EditfristName','نام');
                                                                                            
                                Validator.CheckEmpty('txtBuyer_EditlastName','نام خانوادگی');
                                                                                            
                                Validator.CheckEmpty('txtBuyer_Editaddress','آدرس');
                                                                                            
                                Validator.CheckEmpty('txtBuyer_Editmoblile','تلفن همراه');
                                                                                            
                                                        Validator.CheckRegInteger('txtBuyer_EditejraPrice','مبلغ اجاره');
                                                            
                                                        Validator.CheckRegInteger('txtBuyer_EditrehanPrice','مبلغ رهن');
                                                            
                                                        Validator.CheckRegInteger('txtBuyer_EditsellPrice','مبلغ فروش');
                                                            
                                                        Validator.CheckRegInteger('txtBuyer_Editsize','متراژ');
                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                        Validator.CheckRegInteger('txtBuyer_EditbuildYear','سال ساخت؟');
                                                                                                                Validator.CheckStringLength('txtBuyer_EditbuildYear','سال ساخت؟',4);
                                                    
        
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


Buyer_Edit.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(Buyer_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=Buyer_Edit.Serach;
    var Entity=new Object();
    Entity.PageName='Buyer_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('BuyerId',routeParams.BuyerId ));
            Entity.Parameters.push( toInput('fristName',$('#txtBuyer_EditfristName').val()));
    
                    Entity.Parameters.push( toInput('lastName',$('#txtBuyer_EditlastName').val()));
    
                    Entity.Parameters.push( toInput('address',$('#txtBuyer_Editaddress').val()));
    
                    Entity.Parameters.push( toInput('moblile',$('#txtBuyer_Editmoblile').val()));
    
                    Entity.Parameters.push( toInput('ejraPrice',$('#txtBuyer_EditejraPrice').val()));
    
                    Entity.Parameters.push( toInput('rehanPrice',$('#txtBuyer_EditrehanPrice').val()));
    
                    Entity.Parameters.push( toInput('sellPrice',$('#txtBuyer_EditsellPrice').val()));
    
                    Entity.Parameters.push( toInput('size',$('#txtBuyer_Editsize').val()));
    
                    Entity.Parameters.push( toInput('floor',$('#txtBuyer_Editfloor').val()));
    
                    Entity.Parameters.push( toInput('typeBuild',$('#txtBuyer_EdittypeBuild').val()));
    
                    Entity.Parameters.push( toInput('elev',$('#txtBuyer_Editelev').val()));
    
                    Entity.Parameters.push( toInput('gazkesh',$('#txtBuyer_Editgazkesh').val()));
    
                    Entity.Parameters.push( toInput('parking',$('#txtBuyer_Editparking').val()));
    
                    Entity.Parameters.push( toInput('buildYear',$('#txtBuyer_EditbuildYear').val()));
    
                    Entity.Parameters.push( toInput('comment',$('#txtBuyer_Editcomment').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.Buyer_Editrecords= data.records;
        setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.Buyer_Editrecords= data.records;
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
Buyer_Edit.InitStartValues=function(){
    var Entity=new Object();
    Entity.PageName='Buyer_Edit';
    Entity.Parameters=new Array();
            Entity.Parameters.push( toInput('BuyerId',routeParams.BuyerId));
   
TableViewAjax('getStartValueFromServer',Entity,function(data){
    if( data.records.length!=0)
    {
     
                                        
$('#txtBuyer_EditfristName').val(data.records[0].fristName);

                        
$('#txtBuyer_EditlastName').val(data.records[0].lastName);

                        
$('#txtBuyer_Editaddress').val(data.records[0].address);

                        
$('#txtBuyer_Editmoblile').val(data.records[0].moblile);

                        
$('#txtBuyer_EditejraPrice').val(ShowAsMoney( data.records[0].ejraPrice));

                        
$('#txtBuyer_EditrehanPrice').val(ShowAsMoney( data.records[0].rehanPrice));

                        
$('#txtBuyer_EditsellPrice').val(ShowAsMoney( data.records[0].sellPrice));

                        
$('#txtBuyer_Editsize').val(data.records[0].size);

                        
$('#txtBuyer_Editfloor').val(data.records[0].floor);

                        
$('#txtBuyer_EdittypeBuild').val(data.records[0].typeBuild);

                        
$('#txtBuyer_Editelev').val(data.records[0].elev);

                        
$('#txtBuyer_Editgazkesh').val(data.records[0].gazkesh);

                        
$('#txtBuyer_Editparking').val(data.records[0].parking);

                        
$('#txtBuyer_EditbuildYear').val(data.records[0].buildYear);

                        
$('#txtBuyer_Editcomment').val(data.records[0].comment);

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




