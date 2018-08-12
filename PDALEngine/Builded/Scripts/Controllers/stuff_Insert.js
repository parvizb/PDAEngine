﻿/// <reference path="../../Res/toolkit.js" />



var stuff_Insert=new Object();

var currentButton;
stuff_Insert.sendFiles=  function()
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
            stuff_Insert.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=stuff_Insert");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


stuff_Insert.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(stuff_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='stuff_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('id_factory',$('#txtstuff_Insertid_factory').val()));
    
                    Entity.Parameters.push( toInput('id_product',$('#txtstuff_Insertid_product').val()));
    
                    Entity.Parameters.push( toInput('stuff_name',$('#txtstuff_Insertstuff_name').val()));
    
                    Entity.Parameters.push( toInput('unit_id',$('#txtstuff_Insertunit_id').val()));
    
                    Entity.Parameters.push( toInput('unitbox_id',$('#txtstuff_Insertunitbox_id').val()));
    
                    Entity.Parameters.push( toInput('boxcount',$('#txtstuff_Insertboxcount').val()));
    
                    Entity.Parameters.push( toInput('price',$('#txtstuff_Insertprice').val()));
    
                    Entity.Parameters.push( toInput('descr',$('#txtstuff_Insertdescr').val()));
    
                    Entity.Parameters.push( toInput('includeaddingBill',$('#txtstuff_InsertincludeaddingBill').val()));
    
        ScallerAjax('ScallerSubmit',Entity,function(data){

        targetElement.value=data.retrunValue;
        
  
 

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
stuff_Insert.Validate= function()
{
    Validator.ClearErrors();
        
                                                        Validator.CheckRegSelect2('txtstuff_Insertid_factory','کارخانه');
                                    
                                                        Validator.CheckRegSelect2('txtstuff_Insertid_product','نوع کالا');
                                    
                                Validator.CheckEmpty('txtstuff_Insertstuff_name','عنوان');
                                                                                            
                                                        Validator.CheckRegSelect2('txtstuff_Insertunit_id','شناسه واحد');
                                    
                                                        Validator.CheckRegSelect2('txtstuff_Insertunitbox_id','واحد کلی');
                                    
                                                        Validator.CheckRegInteger('txtstuff_Insertboxcount','تعداد کل به جز');
                                                            
                                                        Validator.CheckRegInteger('txtstuff_Insertprice','قیمت');
                                                            
            
        
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


stuff_Insert.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(stuff_Insert.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=stuff_Insert.Serach;
    var Entity=new Object();
    Entity.PageName='stuff_Insert';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('id_factory',$('#txtstuff_Insertid_factory').val()));
    
                    Entity.Parameters.push( toInput('id_product',$('#txtstuff_Insertid_product').val()));
    
                    Entity.Parameters.push( toInput('stuff_name',$('#txtstuff_Insertstuff_name').val()));
    
                    Entity.Parameters.push( toInput('unit_id',$('#txtstuff_Insertunit_id').val()));
    
                    Entity.Parameters.push( toInput('unitbox_id',$('#txtstuff_Insertunitbox_id').val()));
    
                    Entity.Parameters.push( toInput('boxcount',$('#txtstuff_Insertboxcount').val()));
    
                    Entity.Parameters.push( toInput('price',$('#txtstuff_Insertprice').val()));
    
                    Entity.Parameters.push( toInput('descr',$('#txtstuff_Insertdescr').val()));
    
                    Entity.Parameters.push( toInput('includeaddingBill',$('#txtstuff_InsertincludeaddingBill').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.stuff_Insertrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.stuff_Insertrecords= data.records;
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




