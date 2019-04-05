/// <reference path="../../Res/toolkit.js" />



var Seller_Edit=new Object();

var currentButton;
Seller_Edit.sendFiles=  function()
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
            Seller_Edit.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=Seller_Edit");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


Seller_Edit.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(Seller_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='Seller_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('SellerId',routeParams.SellerId ));
            Entity.Parameters.push( toInput('fristName',$('#txtSeller_EditfristName').val()));
    
                    Entity.Parameters.push( toInput('lastName',$('#txtSeller_EditlastName').val()));
    
                    Entity.Parameters.push( toInput('address',$('#txtSeller_Editaddress').val()));
    
                    Entity.Parameters.push( toInput('moblile',$('#txtSeller_Editmoblile').val()));
    
                    Entity.Parameters.push( toInput('ejraPrice',$('#txtSeller_EditejraPrice').val()));
    
                    Entity.Parameters.push( toInput('rehanPrice',$('#txtSeller_EditrehanPrice').val()));
    
                    Entity.Parameters.push( toInput('sellPrice',$('#txtSeller_EditsellPrice').val()));
    
                    Entity.Parameters.push( toInput('size',$('#txtSeller_Editsize').val()));
    
                    Entity.Parameters.push( toInput('floor',$('#txtSeller_Editfloor').val()));
    
                    Entity.Parameters.push( toInput('typeBuild',$('#txtSeller_EdittypeBuild').val()));
    
                    Entity.Parameters.push( toInput('countOfUnits',$('#txtSeller_EditcountOfUnits').val()));
    
                    Entity.Parameters.push( toInput('elev',$('#txtSeller_Editelev').val()));
    
                    Entity.Parameters.push( toInput('gazkesh',$('#txtSeller_Editgazkesh').val()));
    
                    Entity.Parameters.push( toInput('parking',$('#txtSeller_Editparking').val()));
    
                    Entity.Parameters.push( toInput('buildYear',$('#txtSeller_EditbuildYear').val()));
    
                    Entity.Parameters.push( toInput('comment',$('#txtSeller_Editcomment').val()));
    
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
Seller_Edit.Validate= function()
{
    Validator.ClearErrors();
        
            
                                Validator.CheckEmpty('txtSeller_EditfristName','نام');
                                                                                            
                                Validator.CheckEmpty('txtSeller_EditlastName','نام خانوادگی');
                                                                                            
                                Validator.CheckEmpty('txtSeller_Editaddress','آدرس');
                                                                                            
                                Validator.CheckEmpty('txtSeller_Editmoblile','تلفن همراه');
                                                                                            
                                                        Validator.CheckRegInteger('txtSeller_EditejraPrice','مبلغ اجاره');
                                                            
                                                        Validator.CheckRegInteger('txtSeller_EditrehanPrice','مبلغ رهن');
                                                            
                                                        Validator.CheckRegInteger('txtSeller_EditsellPrice','مبلغ فروش');
                                                            
                                                        Validator.CheckRegInteger('txtSeller_Editsize','متراژ');
                                                            
                                                                            
                                                                            
                                                        Validator.CheckRegInteger('txtSeller_EditcountOfUnits','تعداد واحد ها');
                                                            
                                                                            
                                                                            
                                                                            
                                                        Validator.CheckRegInteger('txtSeller_EditbuildYear','سال ساخت؟');
                                                                                                                Validator.CheckStringLength('txtSeller_EditbuildYear','سال ساخت؟',4);
                                                    
        
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


Seller_Edit.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(Seller_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=Seller_Edit.Serach;
    var Entity=new Object();
    Entity.PageName='Seller_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('SellerId',routeParams.SellerId ));
            Entity.Parameters.push( toInput('fristName',$('#txtSeller_EditfristName').val()));
    
                    Entity.Parameters.push( toInput('lastName',$('#txtSeller_EditlastName').val()));
    
                    Entity.Parameters.push( toInput('address',$('#txtSeller_Editaddress').val()));
    
                    Entity.Parameters.push( toInput('moblile',$('#txtSeller_Editmoblile').val()));
    
                    Entity.Parameters.push( toInput('ejraPrice',$('#txtSeller_EditejraPrice').val()));
    
                    Entity.Parameters.push( toInput('rehanPrice',$('#txtSeller_EditrehanPrice').val()));
    
                    Entity.Parameters.push( toInput('sellPrice',$('#txtSeller_EditsellPrice').val()));
    
                    Entity.Parameters.push( toInput('size',$('#txtSeller_Editsize').val()));
    
                    Entity.Parameters.push( toInput('floor',$('#txtSeller_Editfloor').val()));
    
                    Entity.Parameters.push( toInput('typeBuild',$('#txtSeller_EdittypeBuild').val()));
    
                    Entity.Parameters.push( toInput('countOfUnits',$('#txtSeller_EditcountOfUnits').val()));
    
                    Entity.Parameters.push( toInput('elev',$('#txtSeller_Editelev').val()));
    
                    Entity.Parameters.push( toInput('gazkesh',$('#txtSeller_Editgazkesh').val()));
    
                    Entity.Parameters.push( toInput('parking',$('#txtSeller_Editparking').val()));
    
                    Entity.Parameters.push( toInput('buildYear',$('#txtSeller_EditbuildYear').val()));
    
                    Entity.Parameters.push( toInput('comment',$('#txtSeller_Editcomment').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.Seller_Editrecords= data.records;
        setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.Seller_Editrecords= data.records;
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
Seller_Edit.InitStartValues=function(){
    var Entity=new Object();
    Entity.PageName='Seller_Edit';
    Entity.Parameters=new Array();
            Entity.Parameters.push( toInput('SellerId',routeParams.SellerId));
   
TableViewAjax('getStartValueFromServer',Entity,function(data){
    if( data.records.length!=0)
    {
     
                                        
$('#txtSeller_EditfristName').val(data.records[0].fristName);

                        
$('#txtSeller_EditlastName').val(data.records[0].lastName);

                        
$('#txtSeller_Editaddress').val(data.records[0].address);

                        
$('#txtSeller_Editmoblile').val(data.records[0].moblile);

                        
$('#txtSeller_EditejraPrice').val(ShowAsMoney( data.records[0].ejraPrice));

                        
$('#txtSeller_EditrehanPrice').val(ShowAsMoney( data.records[0].rehanPrice));

                        
$('#txtSeller_EditsellPrice').val(ShowAsMoney( data.records[0].sellPrice));

                        
$('#txtSeller_Editsize').val(data.records[0].size);

                        
$('#txtSeller_Editfloor').val(data.records[0].floor);

                        
$('#txtSeller_EdittypeBuild').val(data.records[0].typeBuild);

                        
$('#txtSeller_EditcountOfUnits').val(data.records[0].countOfUnits);

                        
$('#txtSeller_Editelev').val(data.records[0].elev);

                        
$('#txtSeller_Editgazkesh').val(data.records[0].gazkesh);

                        
$('#txtSeller_Editparking').val(data.records[0].parking);

                        
$('#txtSeller_EditbuildYear').val(data.records[0].buildYear);

                        
$('#txtSeller_Editcomment').val(data.records[0].comment);

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




