/// <reference path="../../Res/toolkit.js" />



var customer_Edit=new Object();

var currentButton;
customer_Edit.sendFiles=  function()
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
            customer_Edit.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=customer_Edit");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


customer_Edit.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(customer_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='customer_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('cus_acc_id',routeParams.cus_acc_id ));
            Entity.Parameters.push( toInput('cus_fname',$('#txtcustomer_Editcus_fname').val()));
    
                    Entity.Parameters.push( toInput('cus_lname',$('#txtcustomer_Editcus_lname').val()));
    
                    Entity.Parameters.push( toInput('cus_addr',$('#txtcustomer_Editcus_addr').val()));
    
                    Entity.Parameters.push( toInput('cus_phone',$('#txtcustomer_Editcus_phone').val()));
    
                    Entity.Parameters.push( toInput('cus_mobile',$('#txtcustomer_Editcus_mobile').val()));
    
                    Entity.Parameters.push( toInput('cus_group_id',$('#txtcustomer_Editcus_group_id').val()));
    
                    Entity.Parameters.push( toInput('cus_descr',$('#txtcustomer_Editcus_descr').val()));
    
                    Entity.Parameters.push( toInput('cus_remainBefore',$('#txtcustomer_Editcus_remainBefore').val()));
    
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
customer_Edit.Validate= function()
{
    Validator.ClearErrors();
        
            
                                Validator.CheckEmpty('txtcustomer_Editcus_fname','نام');
                                                                                            
                                Validator.CheckEmpty('txtcustomer_Editcus_lname','نام خانوادگی');
                                                                                            
                                Validator.CheckEmpty('txtcustomer_Editcus_addr','آدرس');
                                                                                            
                                Validator.CheckEmpty('txtcustomer_Editcus_phone','شماره تلفن');
                                                                                            
                                Validator.CheckEmpty('txtcustomer_Editcus_mobile','شماره همراه');
                                                                                            
                                                        Validator.CheckRegSelect2('txtcustomer_Editcus_group_id','گروه مشتریان');
                                    
            
        
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


customer_Edit.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(customer_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=customer_Edit.Serach;
    var Entity=new Object();
    Entity.PageName='customer_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('cus_acc_id',routeParams.cus_acc_id ));
            Entity.Parameters.push( toInput('cus_fname',$('#txtcustomer_Editcus_fname').val()));
    
                    Entity.Parameters.push( toInput('cus_lname',$('#txtcustomer_Editcus_lname').val()));
    
                    Entity.Parameters.push( toInput('cus_addr',$('#txtcustomer_Editcus_addr').val()));
    
                    Entity.Parameters.push( toInput('cus_phone',$('#txtcustomer_Editcus_phone').val()));
    
                    Entity.Parameters.push( toInput('cus_mobile',$('#txtcustomer_Editcus_mobile').val()));
    
                    Entity.Parameters.push( toInput('cus_group_id',$('#txtcustomer_Editcus_group_id').val()));
    
                    Entity.Parameters.push( toInput('cus_descr',$('#txtcustomer_Editcus_descr').val()));
    
                    Entity.Parameters.push( toInput('cus_remainBefore',$('#txtcustomer_Editcus_remainBefore').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.customer_Editrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.customer_Editrecords= data.records;
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
customer_Edit.InitStartValues=function(){
    var Entity=new Object();
    Entity.PageName='customer_Edit';
    Entity.Parameters=new Array();
            Entity.Parameters.push( toInput('cus_acc_id',routeParams.cus_acc_id));
   
TableViewAjax('getStartValueFromServer',Entity,function(data){
    if( data.records.length!=0)
    {
     
                                $('#txtcustomer_Editcus_fname').val(data.records[0].cus_fname);

                $('#txtcustomer_Editcus_lname').val(data.records[0].cus_lname);

                $('#txtcustomer_Editcus_addr').val(data.records[0].cus_addr);

                $('#txtcustomer_Editcus_phone').val(data.records[0].cus_phone);

                $('#txtcustomer_Editcus_mobile').val(data.records[0].cus_mobile);

                
        var o=document.createElement('option');
        o.value=data.records[0].cus_group_id;
        o.innerHTML= data.records[0].cus_group_id_title ;
        cus_group_id.append(o);
        cus_group_id.val(data.records[0].cus_group_id  ) .trigger('change');

                $('#txtcustomer_Editcus_descr').val(data.records[0].cus_descr);

                
$('#txtcustomer_Editcus_remainBefore').val(ShowAsMoney( data.records[0].cus_remainBefore));

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




