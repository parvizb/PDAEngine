/// <reference path="../../Res/toolkit.js" />



var getment_Edit=new Object();

var currentButton;
getment_Edit.sendFiles=  function()
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
            getment_Edit.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=getment_Edit");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


getment_Edit.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(getment_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='getment_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('getment_id',routeParams.getment_id ));
            Entity.Parameters.push( toInput('get_amount',$('#txtgetment_Editget_amount').val()));
    
                    Entity.Parameters.push( toInput('get_discount',$('#txtgetment_Editget_discount').val()));
    
                    Entity.Parameters.push( toInput('cus_acc_id',$('#txtgetment_Editcus_acc_id').val()));
    
                    Entity.Parameters.push( toInput('acc_id',$('#txtgetment_Editacc_id').val()));
    
                    Entity.Parameters.push( toInput('get_date',$('#txtgetment_Editget_date').val()));
    
                    Entity.Parameters.push( toInput('descr',$('#txtgetment_Editdescr').val()));
    
                    Entity.Parameters.push( toInput('total',$('#txtgetment_Edittotal').val()));
    
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
getment_Edit.Validate= function()
{
    Validator.ClearErrors();
        
            
                                                        Validator.CheckRegInteger('txtgetment_Editget_amount','مبلغ دریافتی');
                                                            
                                                        Validator.CheckRegInteger('txtgetment_Editget_discount','تخفیف دریافتی');
                                                            
                                                        Validator.CheckRegSelect2('txtgetment_Editcus_acc_id','شناسه مشتری');
                                    
                                                        Validator.CheckRegSelect2('txtgetment_Editacc_id','کد حساب');
                                    
                                                                        Validator.CheckRegDate('txtgetment_Editget_date','تاریخ');
                                    
            
        
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


getment_Edit.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(getment_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=getment_Edit.Serach;
    var Entity=new Object();
    Entity.PageName='getment_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('getment_id',routeParams.getment_id ));
            Entity.Parameters.push( toInput('get_amount',$('#txtgetment_Editget_amount').val()));
    
                    Entity.Parameters.push( toInput('get_discount',$('#txtgetment_Editget_discount').val()));
    
                    Entity.Parameters.push( toInput('cus_acc_id',$('#txtgetment_Editcus_acc_id').val()));
    
                    Entity.Parameters.push( toInput('acc_id',$('#txtgetment_Editacc_id').val()));
    
                    Entity.Parameters.push( toInput('get_date',$('#txtgetment_Editget_date').val()));
    
                    Entity.Parameters.push( toInput('descr',$('#txtgetment_Editdescr').val()));
    
                    Entity.Parameters.push( toInput('total',$('#txtgetment_Edittotal').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.getment_Editrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.getment_Editrecords= data.records;
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
getment_Edit.InitStartValues=function(){
    var Entity=new Object();
    Entity.PageName='getment_Edit';
    Entity.Parameters=new Array();
            Entity.Parameters.push( toInput('getment_id',routeParams.getment_id));
   
TableViewAjax('getStartValueFromServer',Entity,function(data){
    if( data.records.length!=0)
    {
     
                                
$('#txtgetment_Editget_amount').val(ShowAsMoney( data.records[0].get_amount));

                
$('#txtgetment_Editget_discount').val(ShowAsMoney( data.records[0].get_discount));

                
        var o=document.createElement('option');
        o.value=data.records[0].cus_acc_id;
        o.innerHTML= data.records[0].cus_acc_id_title ;
        cus_acc_id.append(o);
        cus_acc_id.val(data.records[0].cus_acc_id  ) .trigger('change');

                
        var o=document.createElement('option');
        o.value=data.records[0].acc_id;
        o.innerHTML= data.records[0].acc_name ;
        acc_id.append(o);
        acc_id.val(data.records[0].acc_id  ) .trigger('change');

                $('#txtgetment_Editget_date').val(data.records[0].get_date);

                $('#txtgetment_Editdescr').val(data.records[0].descr);

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




