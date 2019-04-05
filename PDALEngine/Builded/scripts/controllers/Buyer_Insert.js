/// <reference path="../../Res/toolkit.js" />



var Buyer_Insert=new Object();

var currentButton;
Buyer_Insert.sendFiles=  function()
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
            Buyer_Insert.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=Buyer_Insert");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


Buyer_Insert.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(Buyer_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='Buyer_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('fristName',$('#txtBuyer_InsertfristName').val()));
    
                    Entity.Parameters.push( toInput('lastName',$('#txtBuyer_InsertlastName').val()));
    
                    Entity.Parameters.push( toInput('address',$('#txtBuyer_Insertaddress').val()));
    
                    Entity.Parameters.push( toInput('moblile',$('#txtBuyer_Insertmoblile').val()));
    
                    Entity.Parameters.push( toInput('ejraPrice',$('#txtBuyer_InsertejraPrice').val()));
    
                    Entity.Parameters.push( toInput('rehanPrice',$('#txtBuyer_InsertrehanPrice').val()));
    
                    Entity.Parameters.push( toInput('sellPrice',$('#txtBuyer_InsertsellPrice').val()));
    
                    Entity.Parameters.push( toInput('size',$('#txtBuyer_Insertsize').val()));
    
                    Entity.Parameters.push( toInput('floor',$('#txtBuyer_Insertfloor').val()));
    
                    Entity.Parameters.push( toInput('typeBuild',$('#txtBuyer_InserttypeBuild').val()));
    
                    Entity.Parameters.push( toInput('elev',$('#txtBuyer_Insertelev').val()));
    
                    Entity.Parameters.push( toInput('gazkesh',$('#txtBuyer_Insertgazkesh').val()));
    
                    Entity.Parameters.push( toInput('parking',$('#txtBuyer_Insertparking').val()));
    
                    Entity.Parameters.push( toInput('buildYear',$('#txtBuyer_InsertbuildYear').val()));
    
                    Entity.Parameters.push( toInput('comment',$('#txtBuyer_Insertcomment').val()));
    
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
Buyer_Insert.Validate= function()
{
    Validator.ClearErrors();
        
                                Validator.CheckEmpty('txtBuyer_InsertfristName','نام');
                                                                                            
                                Validator.CheckEmpty('txtBuyer_InsertlastName','نام خانوادگی');
                                                                                            
                                Validator.CheckEmpty('txtBuyer_Insertaddress','آدرس');
                                                                                            
                                Validator.CheckEmpty('txtBuyer_Insertmoblile','تلفن همراه');
                                                                                            
                                                        Validator.CheckRegInteger('txtBuyer_InsertejraPrice','مبلغ اجاره');
                                                            
                                                        Validator.CheckRegInteger('txtBuyer_InsertrehanPrice','مبلغ رهن');
                                                            
                                                        Validator.CheckRegInteger('txtBuyer_InsertsellPrice','مبلغ فروش');
                                                            
                                                        Validator.CheckRegInteger('txtBuyer_Insertsize','متراژ');
                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                        Validator.CheckRegInteger('txtBuyer_InsertbuildYear','سال ساخت؟');
                                                                                                                Validator.CheckStringLength('txtBuyer_InsertbuildYear','سال ساخت؟',4);
                                                    
        
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


Buyer_Insert.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(Buyer_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=Buyer_Insert.Serach;
    var Entity=new Object();
    Entity.PageName='Buyer_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('fristName',$('#txtBuyer_InsertfristName').val()));
    
                    Entity.Parameters.push( toInput('lastName',$('#txtBuyer_InsertlastName').val()));
    
                    Entity.Parameters.push( toInput('address',$('#txtBuyer_Insertaddress').val()));
    
                    Entity.Parameters.push( toInput('moblile',$('#txtBuyer_Insertmoblile').val()));
    
                    Entity.Parameters.push( toInput('ejraPrice',$('#txtBuyer_InsertejraPrice').val()));
    
                    Entity.Parameters.push( toInput('rehanPrice',$('#txtBuyer_InsertrehanPrice').val()));
    
                    Entity.Parameters.push( toInput('sellPrice',$('#txtBuyer_InsertsellPrice').val()));
    
                    Entity.Parameters.push( toInput('size',$('#txtBuyer_Insertsize').val()));
    
                    Entity.Parameters.push( toInput('floor',$('#txtBuyer_Insertfloor').val()));
    
                    Entity.Parameters.push( toInput('typeBuild',$('#txtBuyer_InserttypeBuild').val()));
    
                    Entity.Parameters.push( toInput('elev',$('#txtBuyer_Insertelev').val()));
    
                    Entity.Parameters.push( toInput('gazkesh',$('#txtBuyer_Insertgazkesh').val()));
    
                    Entity.Parameters.push( toInput('parking',$('#txtBuyer_Insertparking').val()));
    
                    Entity.Parameters.push( toInput('buildYear',$('#txtBuyer_InsertbuildYear').val()));
    
                    Entity.Parameters.push( toInput('comment',$('#txtBuyer_Insertcomment').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.Buyer_Insertrecords= data.records;
        setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.Buyer_Insertrecords= data.records;
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




