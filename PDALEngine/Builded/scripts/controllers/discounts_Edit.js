/// <reference path="../../Res/toolkit.js" />



var discounts_Edit=new Object();

var currentButton;
discounts_Edit.sendFiles=  function()
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
            discounts_Edit.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=discounts_Edit");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


discounts_Edit.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(discounts_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='discounts_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('disc_for_bi_id',routeParams.disc_for_bi_id ));
            Entity.Parameters.push( toInput('disc_amount',$('#txtdiscounts_Editdisc_amount').val()));
    
                    Entity.Parameters.push( toInput('disc_reason',$('#txtdiscounts_Editdisc_reason').val()));
    
                    Entity.Parameters.push( toInput('disc_comment',$('#txtdiscounts_Editdisc_comment').val()));
    
                    Entity.Parameters.push( toInput('dis_date',$('#txtdiscounts_Editdis_date').val()));
    
                    Entity.Parameters.push( toInput('wine_id',$('#txtdiscounts_Editwine_id').val()));
    
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
discounts_Edit.Validate= function()
{
    Validator.ClearErrors();
        
            
                                                        Validator.CheckRegInteger('txtdiscounts_Editdisc_amount','مقدار تخفیف');
                                                            
                                                                            
            
                                                                        Validator.CheckRegDate('txtdiscounts_Editdis_date','تاریخ تخفیف');
                                    
                                                        Validator.CheckRegSelect2('txtdiscounts_Editwine_id','کد انشعاب');
                                
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


discounts_Edit.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(discounts_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=discounts_Edit.Serach;
    var Entity=new Object();
    Entity.PageName='discounts_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('disc_for_bi_id',routeParams.disc_for_bi_id ));
            Entity.Parameters.push( toInput('disc_amount',$('#txtdiscounts_Editdisc_amount').val()));
    
                    Entity.Parameters.push( toInput('disc_reason',$('#txtdiscounts_Editdisc_reason').val()));
    
                    Entity.Parameters.push( toInput('disc_comment',$('#txtdiscounts_Editdisc_comment').val()));
    
                    Entity.Parameters.push( toInput('dis_date',$('#txtdiscounts_Editdis_date').val()));
    
                    Entity.Parameters.push( toInput('wine_id',$('#txtdiscounts_Editwine_id').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.discounts_Editrecords= data.records;
        setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.discounts_Editrecords= data.records;
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
discounts_Edit.InitStartValues=function(){
    var Entity=new Object();
    Entity.PageName='discounts_Edit';
    Entity.Parameters=new Array();
            Entity.Parameters.push( toInput('disc_for_bi_id',routeParams.disc_for_bi_id));
   
TableViewAjax('getStartValueFromServer',Entity,function(data){
    if( data.records.length!=0)
    {
     
                                        
$('#txtdiscounts_Editdisc_amount').val(ShowAsMoney( data.records[0].disc_amount));

                        
$('#txtdiscounts_Editdisc_reason').val(data.records[0].disc_reason);

                        
$('#txtdiscounts_Editdisc_comment').val(data.records[0].disc_comment);

                        
$('#txtdiscounts_Editdis_date').val(data.records[0].dis_date);

                        
        
Select2AjaxDirect('discounts_Edit','wine_id',data.records[0].wine_id,'txtdiscounts_Editwine_id');


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




