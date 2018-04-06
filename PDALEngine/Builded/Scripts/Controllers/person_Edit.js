/// <reference path="../../Res/toolkit.js" />
var person_Edit=new Object();
var currentButton;
person_Edit.sendFiles=  function()
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
            person_Edit.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName=person_Edit");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


   person_Edit.Submit= function(obj)
   {
       currentButton=obj;
       $(obj).attr('disabled',true);
       if(person_Edit.Validate()==false)
       {
           $(obj).attr('disabled',false);
           return ;
       }
              var Entity=new Object();
       Entity.PageName='person_Edit';
       Entity.Parameters=new Array();
              Entity.Parameters.push( toInput('id',routeParams.id ));
       Entity.Parameters.push( toInput('name',$('#txtname').val()));

              Entity.Parameters.push( toInput('grade',$('#txtgrade').val()));

              Entity.Parameters.push( toInput('cityid',$('#txtcityid').val()));

              Entity.Parameters.push( toInput('sextype',$('#txtsextype').val()));

              Entity.Parameters.push( toInput('salaryBase',$('#txtsalaryBase').val()));

              Entity.Parameters.push( toInput('examResult',$('#txtexamResult').val()));

              Entity.Parameters.push( toInput('dateBrith',$('#txtdateBrith').val()));

              Entity.Parameters.push( toInput('startTime',$('#txtstartTime').val()));

              Entity.Parameters.push( toInput('smailBio',$('#txtsmailBio').val()));

              Entity.Parameters.push( toInput('smailHtml',$('#txtsmailHtml').val()));

              Entity.Parameters.push( toInput('favColor',$('#txtfavColor').val()));

              Entity.Parameters.push( toInput('picImage',$('#txtpicImage').val()));

              Entity.Parameters.push( toInput('isBroken',$('#txtisBroken').val()));

               ScallerAjax('ScallerSubmit',Entity,function(data){
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
person_Edit.Validate= function()
{
    Validator.ClearErrors();
        
    
    Validator.CheckEmpty('txtname','');
    
    
    Validator.CheckRegInteger('txtcityid','شهر');
    
    
    Validator.CheckRegInteger('txtsalaryBase','حقوق پایه');
    
    Validator.CheckRegFloat('txtexamResult','نمره آزمون');
    
    Validator.CheckRegDate('txtdateBrith','تاریخ تولد');
    
    Validator.CheckEmpty('txtstartTime','ساعت شروع کار');
    
    Validator.CheckEmpty('txtsmailBio','خلاصه زندگی ');
    
    Validator.CheckEmpty('txtsmailHtml','سایر توضیحات');
    
    Validator.CheckEmpty('txtfavColor','رنگ مورد علاقه');
    
    Validator.CheckEmpty('txtpicImage','تصویر پرسنلی');
    

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

person_Edit.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if(person_Edit.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod=person_Edit.Serach;
    var Entity=new Object();
    Entity.PageName='person_Edit';
    Entity.Parameters=new Array();
    Entity.Parameters.push( toInput('id',routeParams.id ));
    Entity.Parameters.push( toInput('name',$('#txtname').val()));

    Entity.Parameters.push( toInput('grade',$('#txtgrade').val()));

    Entity.Parameters.push( toInput('cityid',$('#txtcityid').val()));

    Entity.Parameters.push( toInput('sextype',$('#txtsextype').val()));

    Entity.Parameters.push( toInput('salaryBase',$('#txtsalaryBase').val()));

    Entity.Parameters.push( toInput('examResult',$('#txtexamResult').val()));

    Entity.Parameters.push( toInput('dateBrith',$('#txtdateBrith').val()));

    Entity.Parameters.push( toInput('startTime',$('#txtstartTime').val()));

    Entity.Parameters.push( toInput('smailBio',$('#txtsmailBio').val()));

    Entity.Parameters.push( toInput('smailHtml',$('#txtsmailHtml').val()));

    Entity.Parameters.push( toInput('favColor',$('#txtfavColor').val()));

    Entity.Parameters.push( toInput('picImage',$('#txtpicImage').val()));

    Entity.Parameters.push( toInput('isBroken',$('#txtisBroken').val()));

 
    TableViewAjax('getTableViewRecords',Entity,function(data){
          
        currentScope.records= data.records;
        
        currentScope.$apply(function(){});
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


person_Edit.InitStartValues=function(){
var Entity=new Object();
Entity.PageName='person_Edit';
Entity.Parameters=new Array();
Entity.Parameters.push( toInput('id',routeParams.id));
   
TableViewAjax('getStartValueFromServer',Entity,function(data){
    if( data.records.length!=0)
    {
     
            $('#txtname').val(data.records[0].name);

            $('#txtgrade').val(data.records[0].grade);

            $('#txtcityid').val(data.records[0].cityid);

            $('#txtsextype').val(data.records[0].sextype);

            $('#txtsalaryBase').val(data.records[0].salaryBase);

            $('#txtexamResult').val(data.records[0].examResult);

            $('#txtdateBrith').val(data.records[0].dateBrith);

            $('#txtstartTime').val(data.records[0].startTime);

            $('#txtsmailBio').val(data.records[0].smailBio);

            $('#txtsmailHtml').val(data.records[0].smailHtml);

            $('#txtfavColor').val(data.records[0].favColor);

            $('#txtpicImage').val(data.records[0].picImage);

            $('#txtisBroken').val(data.records[0].isBroken);

}
else
{
    Validator.ClearErrors ();
    Messager.ShowMessage('خطا', 'رکورد مورد نظر یافت نشد');
    BackPage();
}
                
           
return;
          
},function(data)
{
    return;

});

}

///Hi ...
///
