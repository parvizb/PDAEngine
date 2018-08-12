/// <reference path="../../Res/toolkit.js" />



var MoveAcc_Edit=new Object();

var currentButton;
MoveAcc_Edit.sendFiles=  function()
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
            MoveAcc_Edit.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=MoveAcc_Edit");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


MoveAcc_Edit.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if(MoveAcc_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
        var Entity=new Object();
    Entity.PageName='MoveAcc_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('moveAccId',routeParams.moveAccId ));
            Entity.Parameters.push( toInput('moveDate',$('#txtMoveAcc_EditmoveDate').val()));
    
                    Entity.Parameters.push( toInput('sourceAcc',$('#txtMoveAcc_EditsourceAcc').val()));
    
                    Entity.Parameters.push( toInput('DestAcc',$('#txtMoveAcc_EditDestAcc').val()));
    
                    Entity.Parameters.push( toInput('amount',$('#txtMoveAcc_Editamount').val()));
    
                    Entity.Parameters.push( toInput('Descr',$('#txtMoveAcc_EditDescr').val()));
    
                    Entity.Parameters.push( toInput('moveCost',$('#txtMoveAcc_EditmoveCost').val()));
    
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
MoveAcc_Edit.Validate= function()
{
    Validator.ClearErrors();
        
            
                                                                        Validator.CheckRegDate('txtMoveAcc_EditmoveDate','تاریخ انتقال');
                                    
                                                        Validator.CheckRegSelect2('txtMoveAcc_EditsourceAcc','حساب مبدا');
                                    
                                                        Validator.CheckRegSelect2('txtMoveAcc_EditDestAcc','حساب مقصد');
                                    
            
            
                                                        Validator.CheckRegInteger('txtMoveAcc_EditmoveCost','هزینه انتقال');
                                                        
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


MoveAcc_Edit.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(MoveAcc_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=MoveAcc_Edit.Serach;
    var Entity=new Object();
    Entity.PageName='MoveAcc_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('moveAccId',routeParams.moveAccId ));
            Entity.Parameters.push( toInput('moveDate',$('#txtMoveAcc_EditmoveDate').val()));
    
                    Entity.Parameters.push( toInput('sourceAcc',$('#txtMoveAcc_EditsourceAcc').val()));
    
                    Entity.Parameters.push( toInput('DestAcc',$('#txtMoveAcc_EditDestAcc').val()));
    
                    Entity.Parameters.push( toInput('amount',$('#txtMoveAcc_Editamount').val()));
    
                    Entity.Parameters.push( toInput('Descr',$('#txtMoveAcc_EditDescr').val()));
    
                    Entity.Parameters.push( toInput('moveCost',$('#txtMoveAcc_EditmoveCost').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.MoveAcc_Editrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.MoveAcc_Editrecords= data.records;
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
MoveAcc_Edit.InitStartValues=function(){
    var Entity=new Object();
    Entity.PageName='MoveAcc_Edit';
    Entity.Parameters=new Array();
            Entity.Parameters.push( toInput('moveAccId',routeParams.moveAccId));
   
TableViewAjax('getStartValueFromServer',Entity,function(data){
    if( data.records.length!=0)
    {
     
                                $('#txtMoveAcc_EditmoveDate').val(data.records[0].moveDate);

                
        var o=document.createElement('option');
        o.value=data.records[0].sourceAcc;
        o.innerHTML= data.records[0].sourceAccTitle ;
        sourceAcc.append(o);
        sourceAcc.val(data.records[0].sourceAcc  ) .trigger('change');

                
        var o=document.createElement('option');
        o.value=data.records[0].DestAcc;
        o.innerHTML= data.records[0].DestAccTitle ;
        DestAcc.append(o);
        DestAcc.val(data.records[0].DestAcc  ) .trigger('change');

                
$('#txtMoveAcc_Editamount').val(ShowAsMoney( data.records[0].amount));

                $('#txtMoveAcc_EditDescr').val(data.records[0].Descr);

                
$('#txtMoveAcc_EditmoveCost').val(ShowAsMoney( data.records[0].moveCost));

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




