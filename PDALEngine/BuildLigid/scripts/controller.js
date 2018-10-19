/// <reference path="../../Res/toolkit.js" />



var {{Page.name}}=new Object();

var currentButton;
{{Page.name}}.sendFiles=  function()
{
    var data = new FormData();
 
    {% for para in  Page.PageParameters -%}
    {% if para.type == 'FileInput' -%}
    var tmp=$('#txt{{Page.name}}{{para.name}}')[0];
    if(tmp.files.length>0){
        data.append('{{para.name}}', tmp.files[0]);
    }
    {% endif -%}
    {% endfor -%}
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
            {{Page.name}}.Submit(currentButton);
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
    xhr.open('POST', "Home/SendFiles?PageName={{Page.name}}");
    // xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.send(data);
}


{{Page.name}}.Submit= function(obj)
{
    currentButton=obj;
    $(obj).attr('disabled',true);
    if({{Page.name}}.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }
    {% if Page.MustSendFiles == 'True' -%}
    {
           
        if(window.fileUploaded!=true)
        {
            {{Page.name}}.sendFiles();
            return ;
        }


    }
    {% endif -%}
    var Entity=new Object();
    Entity.PageName='{{Page.name}}';
    Entity.Parameters=new Array();
    {% for para in  Page.PageParameters -%}
    {% if para.source == 'form' -%}
    {% if (para.type == 'Html') -%}
    Entity.Parameters.push( toInput('{{para.name}}',tinymce.editors['txt{{Page.name}}{{para.name}}'].contentDocument.body.innerHTML));
    {% elseif (para.type == 'CheckBox') -%}
    Entity.Parameters.push( toInput('{{para.name}}', $('#txt{{Page.name}}{{para.name}}').val()) );
  
    {% else -%}
    Entity.Parameters.push( toInput('{{para.name}}',$('#txt{{Page.name}}{{para.name}}').val()));
    {% endif -%} 
    {% endif -%}
    {% if para.source == 'QueryString' -%}
    Entity.Parameters.push( toInput('{{para.name}}',routeParams.{{para.Parameter}} ));
{% endif -%}
{% endfor -%}
ScallerAjax('ScallerSubmit',Entity,function(data){

    {% if Page.SubmitBev == 'BackAndShowReturnValue' -%}
    Messager.ShowMessage('اطلاعات', data.Message + ' شناسه پیگیری : ' + data.retrunValue );
    {% else  if Page.SubmitBev == 'PutValueAtTargetElement' -%}
    if(targetElement!=null)
    {
        targetElement.value=data.retrunValue;
    }
    {% else -%}
    {% else -%}
    Messager.ShowMessage('اطلاعات', data.Message );
    {% endif  -%}
    
  
 

    Messager.ShowMessage('اطلاعات', data.Message);
    if(JsEventInterface.AfterOkReqSubmit!=null)
    {
        JsEventInterface.AfterOkReqSubmit(Entity,data);
    }
 
    {% if Page.SubmitBev == 'BackAndShowReturnValue' -%}
    BackPage();
 
    {% endif  -%}
    {% if Page.SubmitBev == 'Back' -%}
    BackPage();
    {% endif  -%}
    {% if Page.SubmitBev == 'PutValueAtTargetElement' -%}
    BackPage();
    {% endif  -%}
    {% if Page.SubmitBev == '' -%}
    BackPage();
    {% endif  -%}
    {% if Page.SubmitBev == 'GoToStaticPageWithoutReturnValue' -%}
    goToLink('#/{{Page.SubmitBevParameter}}');
    {% endif  -%}
 
    {% if Page.SubmitBev == 'GoToStaticPageWithReturnValue' -%}
    goToLink('#/{{Page.SubmitBevParameter}}/'  + data.retrunValue );
    {% endif  -%}
 
     
  


    $(obj).attr('disabled',false);
    return;
       
},function(data)
{
    $(obj).attr('disabled',false);
    return;

});
};
{{Page.name}}.Validate= function()
{
    Validator.ClearErrors();
    {% for para in  Page.PageParameters -%}
    {% if para.type =='FileInput' -%}
    var tmp=$('#txt{{Page.name}}{{para.name}}')[0];
    {% if para.MaxFileSize != "" -%}
    if(tmp.files.length>0)
    {
        if(tmp.files[0].size/1024 > {{para.MaxFileSize}})
        {
            Messager.errors.push(' اندازه فایل در کادر {{para.title}}  بیش از اندازه مجاز یعنی {{para.MaxFileSize}} کیلوبایت می باشد ');
        }
    }
    {% endif -%}
    {% if para.FileAllows.Size != 0 -%}
    if(tmp.files.length>0)
    {
        var ex=tmp.files[0].name;
        ex=ex.substring(ex.lastIndexOf('.')+1);
        ex=ex.toLowerCase();
        var isCommit=false;
        var cc=new Array();
        {% for a in para.FileAllows -%}
        cc.push('{{a.ext}}'.toLowerCase());
        {% endfor -%}
        isCommit=cc.indexOf(ex)!=-1;
        if(isCommit==false)
        {
            Messager.errors.push(' پسوند فایل در کادر {{para.title}}  مجاز نیست پسوند های مجاز  ' + JSON.stringify(cc));
  

        }
    }
    {% endif -%}
    {% endif -%}

    {% for check in para.ParameterChecks -%}
    {% if check.When !='' -%}
    if ({{check.When}}) {
        {% endif -%}
        {% if para.type =='String' or para.type='TextArea' -%}
        {% if check.cond == 'Reg' -%}
        Validator.CheckEmpty('txt{{Page.name}}{{para.name}}','{{para.title}}');
        {% endif -%}
        {% if check.cond == 'ReqEmail' -%}
        Validator.RegEmail('txt{{Page.name}}{{para.name}}','{{para.title}}');
        {% endif -%}
        {% if check.cond == 'StringLength' -%}
        Validator.CheckStringLength('txt{{Page.name}}{{para.name}}','{{para.title}}',{{check.Value}});
        {% endif -%}
        {% endif -%}
        {% if para.type =='FileInput' -%}
        {% if check.cond == 'Reg' -%}
        Validator.CheckEmpty('txt{{Page.name}}{{para.name}}','{{para.title}}');
        {% endif -%}
        {% endif -%}
        {% if para.type =='Float' -%}
        {% if check.cond == 'Reg' -%}
        Validator.CheckRegFloat('txt{{Page.name}}{{para.name}}','{{para.title}}');
        {% endif -%}
        {% endif -%}
        {% if para.type =='Integer' or para.type == 'Money' -%}
        {% if check.cond == 'Reg' -%}
        Validator.CheckRegInteger('txt{{Page.name}}{{para.name}}','{{para.title}}');
        {% endif -%}
        {% if check.cond == 'StringLength' -%}
        Validator.CheckStringLength('txt{{Page.name}}{{para.name}}','{{para.title}}',{{check.Value}});
        {% endif -%}
        {% endif -%}
        {% if para.type =='Select2Ajax' or para.type=='Select2'  -%}
        Validator.CheckRegSelect2('txt{{Page.name}}{{para.name}}','{{para.title}}');
        {% endif -%}
        {% if para.type =='Date' -%}
        {% if check.cond == 'Reg' -%}
        Validator.CheckRegDate('txt{{Page.name}}{{para.name}}','{{para.title}}');
        {% endif -%}
        {% endif -%}
        {% if check.When !='' -%}
    }
    {% endif -%}
    {% endfor -%}
    {% endfor -%}

    if(Messager.errors.length!=0)
    {
        Validator.ShowErrors();
        return false ;
    }
    {% for c in Page.CustomValidates -%}
    if (!( {{c.Cond}} ))
    {
        Messager.errors.push('{{c.Message}}');
    }
    {% endfor -%}

    if(Messager.errors.length!=0)
    {

        Validator.ShowErrors();
        return false ;
    }


    return Messager.errors.length==0;
}


{{Page.name}}.Serach=function(obj)
{
    $(obj).attr('disabled',true);
    if({{Page.name}}.Validate()==false)
    {
        $(obj).attr('disabled',false);
        return ;
    }

    window.CurrentSerachMethod={{Page.name}}.Serach;
    var Entity=new Object();
    Entity.PageName='{{Page.name}}';
    Entity.Parameters=new Array();
    {% for para in  Page.PageParameters -%}
    {% if para.source == 'form'   -%}
    {% if (para.type == 'Html') -%}
    Entity.Parameters.push( toInput('{{para.name}}',tinymce.editors['txt{{Page.name}}{{para.name}}'].contentDocument.body.innerHTML));
    {% else -%}
    Entity.Parameters.push( toInput('{{para.name}}',$('#txt{{Page.name}}{{para.name}}').val()));
    {% endif -%} 
    {% endif -%}
    {% if para.source == 'QueryString' -%}
    Entity.Parameters.push( toInput('{{para.name}}',routeParams.{{para.Parameter}} ));
{% endif -%}
{% endfor -%}
 
TableViewAjax('getTableViewRecords',Entity,function(data){
          
    currentScope.{{Page.name}}records= data.records;
    
    setTimeout(StoreCache, 200);
    currentScope.$apply(function(){});
    if(dlgScope!=null)
    {
        dlgScope.{{Page.name}}records= data.records;
        dlgScope.$apply(function(){});

    }
    {% for tab in  Page.tables -%}
    {% if tab.AutoSelectCond != '' -%}
    for(var l=0;l<currentScope.{{Page.name}}records.length;l++)
{ 
    var record=currentScope.{{Page.name}}records[l];
    if({{tab.AutoSelectCond}})
    {
        currentScope.{{Page.name}}records[l].selected=true;
        $('#selected_' + currentScope.{{Page.name}}records[l].rndId).attr('checked',true);
}
}
{% endif -%}
{% endfor -%}
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
{% if Page.isDailog == 'Yes' -%}
{
    {{Page.name}}.Scaler=function(namePara)
    {
        var d = getDailOpen();
        targetElement   = document.getElementById('txt' + ( window.pageName) + namePara);
        var s=document.querySelector('#pinc{{Page.name}}');
        angular.element(s).scope(currentScope);
        $("#mdl{{Page.name}}").modal('show');
        SetupDlgScope();

    }
    {{Page.name}}.SerachMode=function(namePara,fun)
    {
        var d = getDailOpen();
        targetElement   = document.getElementById('txt' + ( window.pageName) + namePara);
        var s=document.querySelector('#pinc{{Page.name}}');
        dlgScope= angular.element(s).scope();
        $("#mdl{{Page.name}}").modal('show');
        OkDailogSelect=fun;
        SetupDlgScope();
    }
    {{Page.name}}.SerachAndPutValue=function(namePara,colName)
    {
        var d = getDailOpen();
        targetElement   = document.getElementById('txt' + ( window.pageName) + namePara);
        var s=document.querySelector('#pinc{{Page.name}}');
        dlgScope= angular.element(s).scope();
        $("#mdl{{Page.name}}").modal('show');
        OkDailogSelect=function(d){targetElement.value=SelectableRow[colName]};

        SetupDlgScope();
        
        
    }
 
}
{% endif -%}
{% if Page.ValueDbCommand != '' -%}
{{Page.name}}.InitStartValues=function(){
    var Entity=new Object();
    Entity.PageName='{{Page.name}}';
    Entity.Parameters=new Array();
    {% for para in  Page.ValueParameters -%}
    {% if (para.source == 'QueryString') -%}
    Entity.Parameters.push( toInput('{{para.name}}',routeParams.{{para.value}}));
{% endif -%}
{% endfor -%}
   
TableViewAjax('getStartValueFromServer',Entity,function(data){
    if( data.records.length!=0)
    {
     
        {% for para in  Page.PageParameters -%}
        {% if (para.startValueType == 'DbValueCommand') -%}
        {% if para.type == 'Select2Ajax' %}
        var o=document.createElement('option');
        o.value=data.records[0].{{para.Parameter}};
        o.innerHTML= data.records[0].{{para.TitleParameter}} ;
        {{para.Name}}.append(o);
        {{para.Name}}.val(data.records[0].{{para.Parameter}}  ) .trigger('change');
{%elseif para.type == 'Color' %}
$('#txt{{Page.name}}{{para.Name}}').val(data.records[0].{{para.Parameter}});
$('#txt{{Page.name}}{{para.Name}}').css('background',$('#txt{{Page.name}}{{para.Name}}').val());
{%elseif para.type == 'ImageView' %}
$('#txt{{Page.name}}{{para.Name}}').attr( 'src' ,$('#txt{{Page.name}}{{para.Name}}').attr('linkSyntax')  +data.records[0].{{para.Parameter}});
{%elseif para.type == 'DownloadLink' %}
$('#txt{{Page.name}}{{para.Name}}').attr( 'href', $('#txt{{Page.name}}{{para.Name}}').attr('linkSyntax')  +data.records[0].{{para.Parameter}});
{%elseif para.type == 'Html' %} 
setTimeout(function(){ tinymce.editors['txt{{Page.name}}{{para.Name}}'].setContent(data.records[0].{{para.Parameter}});},500);
{%elseif para.type == 'Select2' %}
$('#txt{{Page.name}}{{para.Name}}').select2().val(data.records[0].{{para.Parameter}}  ) .trigger('change');
{%elseif para.type == 'Money' %}
$('#txt{{Page.name}}{{para.Name}}').val(ShowAsMoney( data.records[0].{{para.Parameter}}));
{%elseif para.type == 'FileInput' %}
//Uncan do now for file


{%elseif para.type == 'CheckBox' %}
console.log( data.records[0].{{para.Parameter}});
if( data.records[0].{{para.Parameter}}=='True')
{
    $('#txt{{Page.name}}{{para.Name}}').attr('checked',true);

}

{% else -%}
$('#txt{{Page.name}}{{para.Name}}').val(data.records[0].{{para.Parameter}});
{% endif -%}          
{% endif -%}
{% endfor -%}
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
{% endif -%}


{% for table in Page.tables -%}
{% if table.Insertable == 'Yes' -%}
{{Page.name}}.InsertRecord=function()
{
    var temp=new Object();
    temp.RowState='Added';
    temp.selected = false;
    temp.rndId = Math.round(Math.random() * 99999999999999);
    {% for r in table.NewRecordColumnValues -%}
    temp.{{r.ColumnName}}='{{r.value}}';
    {% endfor -%}
    currentScope.{{Page.name}}records.push(temp);
    currentScope.$apply();
    {% for table in Page.tables -%}
    {% for col in table.columns -%}
    {% if col.type == 'InputSelect2Ajax' -%}
   
    $('#{{col.name}}_' +temp.rndId).each (function() {$(this).val($(this).attr('valc')) });
    {% endif -%}
    {% endfor -%}
    {% endfor -%}

}
{% endif -%}
{% endfor -%}

{% for BC in Page.BatchCommands -%}
{{Page.name}}.{{BC.name}}_Validate=function()
{
    Validator.ClearErrors();
    {% for Com in BC.Commands -%}
    {% for pa in Com.Parameters -%}
    {% for chk in pa.Checks -%}
    {% if pa.sourceType == 'PageParameter' -%}
    {% if chk.Type == 'ReqString' -%}
    Validator.CheckEmpty('txt{{Page.name}}{{pa.sourceTypeParameter}}','{{pa.caption}}');
    {% endif -%}
    {% if chk.Type == 'ReqDate' -%}
    Validator.CheckRegDate('txt{{Page.name}}{{pa.sourceTypeParameter}}','{{pa.caption}}');
    {% endif -%}
    {% if chk.Type == 'ReqNumber' -%}
    Validator.CheckRegFloat('txt{{Page.name}}{{pa.sourceTypeParameter}}','{{pa.caption}}');
    {% endif -%}
    {% if chk.Type == 'ReqSelect2' -%}
    Validator.CheckRegSelect2('txt{{Page.name}}{{pa.sourceTypeParameter}}','{{pa.caption}}');
    {% endif -%}
    {% endif -%}
    {% endfor -%}
    {% endfor -%}
    {% endfor -%}
    {% for Com in BC.Commands -%}
    if(typeof ( currentScope.{{Page.name}}records)!="undefined") {
    for (var l=0;l<currentScope.{{Page.name}}records.length;l++)
{
    var r=currentScope.{{Page.name}}records[l];

    {% if Com.Selection !='All' -%}
    if(r.selected == {% if (Com.Selection == 'Selected') -%}false{% else -%}true{% endif -%}){
      continue;
}
{% endif -%}
{% if Com.StateMode !='All' -%}
if(r.RowState !='{{Com.StateMode}}'){
    continue;
}
{% endif -%}
{% for pa in Com.Parameters -%}
{% for chk in pa.Checks -%}
{% if pa.sourceType == 'Row' -%}
{% if chk.Type == 'ReqString' -%}
   
Validator.CheckEmpty('{{pa.sourceTypeParameter}}_' + r.rndId,'{{pa.caption}}',r.viewIndex+1);
{% endif -%}
{% if chk.Type == 'ReqDate' -%}
Validator.CheckRegDate('{{pa.sourceTypeParameter}}_' + r.rndId,'{{pa.caption}}',r.viewIndex+1);
{% endif -%}
{% if chk.Type == 'ReqNumber' -%}
Validator.CheckRegFloat('{{pa.sourceTypeParameter}}_' + r.rndId,'{{pa.caption}}',r.viewIndex+1);
{% endif -%}
{% if chk.Type == 'ReqSelect2' -%}
Validator.CheckRegSelect2('{{pa.sourceTypeParameter}}_' + r.rndId,'{{pa.caption}}',r.viewIndex+1);
{% endif -%}
{% endif -%}
{% endfor -%}
{% endfor -%}
}
}
{% endfor -%}
{% for c in BC.CommandCustomValidates -%}
{% if c.For == 'OneTime' -%}
if (!( {{c.Cond}} ))
{
    Messager.errors.push('{{c.Message}}');
}
{% endif -%}

{% endfor -%}
if(typeof ( currentScope.{{Page.name}}records)!="undefined") {
for(var l=0;l<currentScope.{{Page.name}}records.length;l++)
{ 
    var record=currentScope.{{Page.name}}records[l];
    {% for c in BC.CommandCustomValidates -%}
    {% if c.For == 'EachRow' -%}
    if (!( {{c.Cond}} ))
    {
        Messager.errors.push('ردیف '  + (l+1).toString() + ':{{c.Message}}');
    }
    {% endif -%}

    {% endfor -%}

}
}





if (Messager.errors.length!=0)
{
    Validator.ShowErrors();
    return false;
}
return true;
}
{{Page.name}}.{{BC.name}}=function()
{ 
    if(  {{Page.name}}.{{BC.name}}_Validate()==false)
    {
        return ;
    }
    var DataPass=new Array();
    {% for Com in BC.Commands -%}
  
    var t=new Array();
    var  informationRecords=new Array()
    var NullFix=new Array();
    NullFix.push(toInput('fake','NULL'));
    informationRecords.push(NullFix);
    {% if Com.Selection == 'OneTime' -%}
    var rec=new Array();//hi
    {% for pa in Com.Parameters -%}
    //YOU ARE ASL
    {% if  pa.sourceType == 'PageParameter'  -%}
    rec.push(toInput('{{pa.name}}',Para('{{pa.sourceTypeParameter}}')));
    {% endif -%}
    {% if  pa.sourceType == 'QueryString' -%}
    rec.push(toInput('{{pa.name}}', routeParams.{{pa.sourceTypeParameter}}  ) );
{% endif -%}
{% if  pa.sourceType == 'Expr' -%}
rec.push(toInput('{{pa.name}}',  {{para.sourceTypeParameter}}  ) );
{% endif -%}
{% endfor -%}
informationRecords.push(rec);
t.push(informationRecords);
DataPass.push(t);
{% elsif Com.Selection == 'EveryValueInSelect' -%}
var arr=$('#txt{{Page.name}}{{Com.SelectionParameter}}').val();
for (var l=0;l<arr.length;l++)
{
    var rec=new Array();//hi
    var r=arr[l];

var rec=new Array();//hi com

{% for pa in Com.Parameters -%}

{% if  pa.sourceType == 'PageParameter' -%}
rec.push(toInput('{{pa.name}}',Para('{{pa.sourceTypeParameter}}')));
{% endif -%}
{% if  pa.sourceType == 'CurrentValue' -%}
rec.push(toInput('{{pa.name}}', ( r)));
{% endif -%}
{% if  pa.sourceType == 'QueryString' -%}
rec.push(toInput('{{pa.name}}', routeParams.{{pa.sourceTypeParameter}}  ) );
{% endif -%}
{% if  pa.sourceType == 'Expr' -%}
rec.push(toInput('{{pa.name}}',  {{para.sourceTypeParameter}}  ) );
{% endif -%}
{% endfor -%}
informationRecords.push(rec);


}
t.push(informationRecords);
DataPass.push(t);
{% else -%}
for (var l=0;l<currentScope.{{Page.name}}records.length;l++)
{
    var r=currentScope.{{Page.name}}records[l];

    {% if Com.Selection !='All' -%}
    if(r.selected == {% if (Com.Selection == 'Selected') -%}false{% else -%}true{% endif -%}){
      continue;
}
{% endif -%}
{% if Com.StateMode !='All' -%}
if(r.RowState !='{{Com.StateMode}}'){
    continue;
}
{% endif -%}
var rec=new Array();//hi

{% for pa in Com.Parameters -%}

{% if  pa.sourceType == 'PageParameter' -%}
rec.push(toInput('{{pa.name}}',Para('{{pa.sourceTypeParameter}}')));
{% endif -%}
{% if  pa.sourceType == 'Row' -%}
rec.push(toInput('{{pa.name}}', ( r['{{pa.sourceTypeParameter}}']===undefined ? "": r['{{pa.sourceTypeParameter}}'])  ));
{% endif -%}
{% if  pa.sourceType == 'QueryString' -%}
rec.push(toInput('{{pa.name}}', routeParams.{{pa.sourceTypeParameter}}  ) );
{% endif -%}
{% if  pa.sourceType == 'Expr' -%}
rec.push(toInput('{{pa.name}}',  {{para.sourceTypeParameter}}  ) );
{% endif -%}
{% endfor -%}
informationRecords.push(rec);
}

if(currentScope.DeletedRows!==undefined)
{
    for (var l=0;l<currentScope.DeletedRows.length;l++)
    {
        var r=currentScope.DeletedRows[l];

     
        {% if Com.StateMode !='All' -%}
        if(r.RowState !='{{Com.StateMode}}'){
            continue;
        }
        {% endif -%}
        var rec=new Array();//hi
        {% for pa in Com.Parameters -%}
        {% if  pa.sourceType == 'PageParameter' -%}
        rec.push(toInput('{{pa.name}}',Para('{{pa.sourceTypeParameter}}')));
        {% endif -%}
        {% if  pa.sourceType == 'Row' -%}
        rec.push(toInput('{{pa.name}}', ( r['{{pa.sourceTypeParameter}}']===undefined ? "": r['{{pa.sourceTypeParameter}}'])  ));
        {% endif -%}
        {% if  pa.sourceType == 'QueryString' -%}
        rec.push(toInput('{{pa.name}}', routeParams.{{pa.sourceTypeParameter}}  ) );
{% endif -%}
{% if  pa.sourceType == 'Expr' -%}
rec.push(toInput('{{pa.name}}',  {{para.sourceTypeParameter}}  ) );
{% endif -%}
{% endfor -%}
informationRecords.push(rec);
}
}
t.push(informationRecords);
DataPass.push(t);
{% endif -%}
{% endfor -%}
var Enity=new Object();
Enity.PageName='{{Page.name}}';
Enity.CommandName='{{BC.name}}';
Enity.records=DataPass;
ScallerAjax('BatchCommand',Enity,function(data){

    {% if Page.SubmitBev == 'BackAndShowReturnValue' -%}
    Messager.ShowMessage('اطلاعات', data.Message + ' شناسه پیگیری : ' + retrunValue );
    {% else -%}

    Messager.ShowMessage('اطلاعات', data.Message );
 
    {% endif  -%}
 
  
 

    Messager.ShowMessage('اطلاعات', data.Message);
    if(JsEventInterface.AfterOkReqSubmit!=null)
    {
        JsEventInterface.AfterOkReqSubmit(Entity,data);
    }
    ///you are asl
    if(data.code==0)
    {
        window.returnValue=data.retrunValue;




        {% if Page.SubmitBev == 'BackAndShowReturnValue' -%}
        BackPage();
 
        {% endif  -%}
        {% if Page.SubmitBev == 'Back' -%}
        BackPage();
        {% endif  -%}
        {% if Page.SubmitBev == '' -%}
        BackPage();
        {% endif  -%}
        {% if Page.SubmitBev == 'GoToStaticPageWithoutReturnValue' -%}
        goToLink('#/{{Page.SubmitBevParameter}}');
        {% endif  -%}
 
        {% if Page.SubmitBev == 'GoToStaticPageWithReturnValue' -%}
        goToLink('#/{{Page.SubmitBevParameter}}/'  + data.retrunValue );
        {% endif  -%}
 
     
        {% if Page.SubmitBev == 'Back' -%}
        BackPage();
        {% endif -%}
        {% if Page.SubmitBev == '' -%}
        BackPage();
        {% endif -%}
        {% if Page.SubmitBev == 'GoToStaticPageWithoutReturnValue' -%}
        goToLink('#/{{Page.SubmitBevParameter}}');
        {% endif -%}
 
        {% if Page.SubmitBev == 'GoToStaticPageWithReturnValue' -%}
        goToLink('#/{{Page.SubmitBevParameter}}/'  + data.retrunValue );
        {% endif -%}
 
    }
    $(obj).attr('disabled',false);
    return;
},function(data)
{
    $(obj).attr('disabled',false);
    return;
});
console.log(JSON.stringify(Enity));
}
{% endfor -%}

