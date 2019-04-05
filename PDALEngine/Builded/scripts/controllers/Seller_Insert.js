/// <reference path="../../Res/toolkit.js" />



var Seller_Insert=new Object();

var currentButton;
Seller_Insert.sendFiles=  function()
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
            Seller_Insert.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=Seller_Insert");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


Seller_Insert.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(Seller_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='Seller_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('fristName',$('#txtSeller_InsertfristName').val()));
    
                    Entity.Parameters.push( toInput('lastName',$('#txtSeller_InsertlastName').val()));
    
                    Entity.Parameters.push( toInput('address',$('#txtSeller_Insertaddress').val()));
    
                    Entity.Parameters.push( toInput('moblile',$('#txtSeller_Insertmoblile').val()));
    
                    Entity.Parameters.push( toInput('ejraPrice',$('#txtSeller_InsertejraPrice').val()));
    
                    Entity.Parameters.push( toInput('rehanPrice',$('#txtSeller_InsertrehanPrice').val()));
    
                    Entity.Parameters.push( toInput('sellPrice',$('#txtSeller_InsertsellPrice').val()));
    
                    Entity.Parameters.push( toInput('size',$('#txtSeller_Insertsize').val()));
    
                    Entity.Parameters.push( toInput('floor',$('#txtSeller_Insertfloor').val()));
    
                    Entity.Parameters.push( toInput('typeBuild',$('#txtSeller_InserttypeBuild').val()));
    
                    Entity.Parameters.push( toInput('countOfUnits',$('#txtSeller_InsertcountOfUnits').val()));
    
                    Entity.Parameters.push( toInput('elev',$('#txtSeller_Insertelev').val()));
    
                    Entity.Parameters.push( toInput('gazkesh',$('#txtSeller_Insertgazkesh').val()));
    
                    Entity.Parameters.push( toInput('parking',$('#txtSeller_Insertparking').val()));
    
                    Entity.Parameters.push( toInput('buildYear',$('#txtSeller_InsertbuildYear').val()));
    
                    Entity.Parameters.push( toInput('comment',$('#txtSeller_Insertcomment').val()));
    
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
Seller_Insert.Validate= function()
{
    Validator.ClearErrors();
        
                                Validator.CheckEmpty('txtSeller_InsertfristName','نام');
                                                                                            
                                Validator.CheckEmpty('txtSeller_InsertlastName','نام خانوادگی');
                                                                                            
                                Validator.CheckEmpty('txtSeller_Insertaddress','آدرس');
                                                                                            
                                Validator.CheckEmpty('txtSeller_Insertmoblile','تلفن همراه');
                                                                                            
                                                        Validator.CheckRegInteger('txtSeller_InsertejraPrice','مبلغ اجاره');
                                                            
                                                        Validator.CheckRegInteger('txtSeller_InsertrehanPrice','مبلغ رهن');
                                                            
                                                        Validator.CheckRegInteger('txtSeller_InsertsellPrice','مبلغ فروش');
                                                            
                                                        Validator.CheckRegInteger('txtSeller_Insertsize','متراژ');
                                                            
                                                                            
                                                                            
                                                        Validator.CheckRegInteger('txtSeller_InsertcountOfUnits','تعداد واحد ها');
                                                            
                                                                            
                                                                            
                                                                            
                                                        Validator.CheckRegInteger('txtSeller_InsertbuildYear','سال ساخت؟');
                                                                                                                Validator.CheckStringLength('txtSeller_InsertbuildYear','سال ساخت؟',4);
                                                    
        
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


Seller_Insert.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(Seller_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=Seller_Insert.Serach;
    var Entity=new Object();
    Entity.PageName='Seller_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('fristName',$('#txtSeller_InsertfristName').val()));
    
                    Entity.Parameters.push( toInput('lastName',$('#txtSeller_InsertlastName').val()));
    
                    Entity.Parameters.push( toInput('address',$('#txtSeller_Insertaddress').val()));
    
                    Entity.Parameters.push( toInput('moblile',$('#txtSeller_Insertmoblile').val()));
    
                    Entity.Parameters.push( toInput('ejraPrice',$('#txtSeller_InsertejraPrice').val()));
    
                    Entity.Parameters.push( toInput('rehanPrice',$('#txtSeller_InsertrehanPrice').val()));
    
                    Entity.Parameters.push( toInput('sellPrice',$('#txtSeller_InsertsellPrice').val()));
    
                    Entity.Parameters.push( toInput('size',$('#txtSeller_Insertsize').val()));
    
                    Entity.Parameters.push( toInput('floor',$('#txtSeller_Insertfloor').val()));
    
                    Entity.Parameters.push( toInput('typeBuild',$('#txtSeller_InserttypeBuild').val()));
    
                    Entity.Parameters.push( toInput('countOfUnits',$('#txtSeller_InsertcountOfUnits').val()));
    
                    Entity.Parameters.push( toInput('elev',$('#txtSeller_Insertelev').val()));
    
                    Entity.Parameters.push( toInput('gazkesh',$('#txtSeller_Insertgazkesh').val()));
    
                    Entity.Parameters.push( toInput('parking',$('#txtSeller_Insertparking').val()));
    
                    Entity.Parameters.push( toInput('buildYear',$('#txtSeller_InsertbuildYear').val()));
    
                    Entity.Parameters.push( toInput('comment',$('#txtSeller_Insertcomment').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.Seller_Insertrecords= data.records;
        setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.Seller_Insertrecords= data.records;
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




