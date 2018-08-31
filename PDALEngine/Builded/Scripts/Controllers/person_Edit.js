/// <reference path="../../Res/toolkit.js" />



var person_Edit=new Object();

var currentButton;
person_Edit.sendFiles=  function()
{
    var data = new FormData();
 
                                                                                                                    var tmp=$('#txtperson_EditpicImage')[0];
    if(tmp.files.length>0){
        data.append('picImage', tmp.files[0]);
    }
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
        {
           
        if(window.fileUploaded!=true)
        {
            person_Edit.sendFiles();
            return ;
        }


    }
        var Entity=new Object();
    Entity.PageName='person_Edit';
    Entity.Parameters=new Array();
                Entity.Parameters.push( toInput('id',routeParams.id ));
            Entity.Parameters.push( toInput('name',$('#txtperson_Editname').val()));
    
                    Entity.Parameters.push( toInput('grade',$('#txtperson_Editgrade').val()));
    
                    Entity.Parameters.push( toInput('cityid',$('#txtperson_Editcityid').val()));
    
                    Entity.Parameters.push( toInput('sextype',$('#txtperson_Editsextype').val()));
    
                    Entity.Parameters.push( toInput('salaryBase',$('#txtperson_EditsalaryBase').val()));
    
                    Entity.Parameters.push( toInput('examResult',$('#txtperson_EditexamResult').val()));
    
                    Entity.Parameters.push( toInput('dateBrith',$('#txtperson_EditdateBrith').val()));
    
                    Entity.Parameters.push( toInput('startTime',$('#txtperson_EditstartTime').val()));
    
                    Entity.Parameters.push( toInput('smailBio',$('#txtperson_EditsmailBio').val()));
    
                    Entity.Parameters.push( toInput('smailHtml',tinymce.editors['txtperson_EditsmailHtml'].contentDocument.body.innerHTML));
    
                    Entity.Parameters.push( toInput('favColor',$('#txtperson_EditfavColor').val()));
    
                    Entity.Parameters.push( toInput('oldImage',$('#txtperson_EditoldImage').val()));
    
                    Entity.Parameters.push( toInput('picImage',$('#txtperson_EditpicImage').val()));
    
                    Entity.Parameters.push( toInput('isBroken', $('#txtperson_EditisBroken').val()) );
  
    
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
person_Edit.Validate= function()
{
    Validator.ClearErrors();
        
            
                                Validator.CheckEmpty('txtperson_Editname','نام');
                                                                                            
                                                                            
                                                        Validator.CheckRegSelect2('txtperson_Editcityid','شهر');
                                    
                                                                            
                                                        Validator.CheckRegInteger('txtperson_EditsalaryBase','حقوق پایه');
                                                            
                                                Validator.CheckRegFloat('txtperson_EditexamResult','نمره آزمون');
                                                            
                                                                        Validator.CheckRegDate('txtperson_EditdateBrith','تاریخ تولد');
                                    
                                Validator.CheckEmpty('txtperson_EditstartTime','ساعت شروع کار');
                                                                                            
                                Validator.CheckEmpty('txtperson_EditsmailBio','خلاصه زندگی ');
                                                                                            
                                                                            
                                                                            
                var tmp=$('#txtperson_EditpicImage')[0];
            if(tmp.files.length>0)
    {
        var ex=tmp.files[0].name;
        ex=ex.substring(ex.lastIndexOf('.')+1);
        ex=ex.toLowerCase();
        var isCommit=false;
        var cc=new Array();
                isCommit=cc.indexOf(ex)!=-1;
        if(isCommit==false)
        {
            Messager.errors.push(' پسوند فایل در کادر تصویر پرسنلی  مجاز نیست پسوند های مجاز  ' + JSON.stringify(cc));
  

        }
    }
        
            
                                                                        
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
            Entity.Parameters.push( toInput('name',$('#txtperson_Editname').val()));
    
                    Entity.Parameters.push( toInput('grade',$('#txtperson_Editgrade').val()));
    
                    Entity.Parameters.push( toInput('cityid',$('#txtperson_Editcityid').val()));
    
                    Entity.Parameters.push( toInput('sextype',$('#txtperson_Editsextype').val()));
    
                    Entity.Parameters.push( toInput('salaryBase',$('#txtperson_EditsalaryBase').val()));
    
                    Entity.Parameters.push( toInput('examResult',$('#txtperson_EditexamResult').val()));
    
                    Entity.Parameters.push( toInput('dateBrith',$('#txtperson_EditdateBrith').val()));
    
                    Entity.Parameters.push( toInput('startTime',$('#txtperson_EditstartTime').val()));
    
                    Entity.Parameters.push( toInput('smailBio',$('#txtperson_EditsmailBio').val()));
    
                    Entity.Parameters.push( toInput('smailHtml',tinymce.editors['txtperson_EditsmailHtml'].contentDocument.body.innerHTML));
    
                    Entity.Parameters.push( toInput('favColor',$('#txtperson_EditfavColor').val()));
    
                    Entity.Parameters.push( toInput('oldImage',$('#txtperson_EditoldImage').val()));
    
                    Entity.Parameters.push( toInput('picImage',$('#txtperson_EditpicImage').val()));
    
                    Entity.Parameters.push( toInput('isBroken',$('#txtperson_EditisBroken').val()));
    
         
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.person_Editrecords= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.person_Editrecords= data.records;
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
person_Edit.InitStartValues=function(){
    var Entity=new Object();
    Entity.PageName='person_Edit';
    Entity.Parameters=new Array();
            Entity.Parameters.push( toInput('id',routeParams.id));
   
TableViewAjax('getStartValueFromServer',Entity,function(data){
    if( data.records.length!=0)
    {
     
                                $('#txtperson_Editname').val(data.records[0].name);

                
$('#txtperson_Editgrade').select2().val(data.records[0].grade  ) .trigger('change');

                
        var o=document.createElement('option');
        o.value=data.records[0].cityid;
        o.innerHTML= data.records[0].city ;
        cityid.append(o);
        cityid.val(data.records[0].cityid  ) .trigger('change');

                $('#txtperson_Editsextype').val(data.records[0].sextype);

                
$('#txtperson_EditsalaryBase').val(ShowAsMoney( data.records[0].salaryBase));

                $('#txtperson_EditexamResult').val(data.records[0].examResult);

                $('#txtperson_EditdateBrith').val(data.records[0].dateBrith);

                $('#txtperson_EditstartTime').val(data.records[0].startTime);

                $('#txtperson_EditsmailBio').val(data.records[0].smailBio);

                 
setTimeout(function(){ tinymce.editors['txtperson_EditsmailHtml'].setContent(data.records[0].smailHtml);},500);

                
$('#txtperson_EditfavColor').val(data.records[0].favColor);
$('#txtperson_EditfavColor').css('background',$('#txtperson_EditfavColor').val());

                
$('#txtperson_EditoldImage').attr( 'src' ,$('#txtperson_EditoldImage').attr('linkSyntax')  +data.records[0].picImage);

                
//Uncan do now for file



                
console.log( data.records[0].isBroken);
if( data.records[0].isBroken=='True')
{
    $('#txtperson_EditisBroken').attr('checked',true);

}


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




