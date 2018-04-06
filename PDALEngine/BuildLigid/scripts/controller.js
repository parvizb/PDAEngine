/// <reference path="../../Res/toolkit.js" />
var {{Page.name}}=new Object();
var currentButton;
{{Page.name}}.sendFiles=  function()
{
    var data = new FormData();
 
    {% for para in  Page.PageParameters -%}
    {% if para.type == 'FileInput' -%}
    var tmp=$('#txt{{para.name}}')[0];
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
       Entity.Parameters.push( toInput('{{para.name}}',tinymce.editors['txt{{para.name}}'].contentDocument.body.innerHTML));
{% else -%}
       Entity.Parameters.push( toInput('{{para.name}}',$('#txt{{para.name}}').val()));
{% endif -%} 
{% endif -%}
       {% if para.source == 'QueryString' -%}
       Entity.Parameters.push( toInput('{{para.name}}',routeParams.{{para.Parameter}} ));
{% endif -%}
{% endfor -%}
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
{{Page.name}}.Validate= function()
{
    Validator.ClearErrors();
    {% for para in  Page.PageParameters -%}
    {% if para.type =='FileInput' -%}
    var tmp=$('#txt{{para.name}}')[0];
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
    Validator.CheckEmpty('txt{{para.name}}','{{para.title}}');
{% endif -%}
{% if check.cond == 'RegEmail' -%}
    Validator.RegEmail('txt{{para.name}}','{{para.title}}');
{% endif -%}
{% if check.cond == 'StringLength' -%}
    Validator.CheckStringLength('txt{{para.name}}','{{para.title}}',{{check.Value}});
{% endif -%}
{% endif -%}
{% if para.type =='FileInput' -%}
{% if check.cond == 'Reg' -%}
Validator.CheckEmpty('txt{{para.name}}','{{para.title}}');
{% endif -%}
{% endif -%}
{% if para.type =='Float' -%}
{% if check.cond == 'Reg' -%}
    Validator.CheckRegFloat('txt{{para.name}}','{{para.title}}');
{% endif -%}
{% endif -%}
{% if para.type =='Integer' or para.type == 'Money' -%}
{% if check.cond == 'Reg' -%}
    Validator.CheckRegInteger('txt{{para.name}}','{{para.title}}');
{% endif -%}
{% if check.cond == 'StringLength' -%}
    Validator.CheckStringLength('txt{{para.name}}','{{para.title}}',{{check.Value}});
{% endif -%}
{% endif -%}
{% if para.type =='Select2Ajax' or para.type=='Select2'  -%}
    Validator.CheckRegSelect2('txt{{para.name}}','{{para.title}}');
{% endif -%}
{% if para.type =='Date' -%}
{% if check.cond == 'Reg' -%}
    Validator.CheckRegDate('txt{{para.name}}','{{para.title}}');
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
    Entity.Parameters.push( toInput('{{para.name}}',tinymce.editors['txt{{para.name}}'].contentDocument.body.innerHTML));
{% else -%}
    Entity.Parameters.push( toInput('{{para.name}}',$('#txt{{para.name}}').val()));
{% endif -%} 
{% endif -%}
{% if para.source == 'QueryString' -%}
    Entity.Parameters.push( toInput('{{para.name}}',routeParams.{{para.Parameter}} ));
{% endif -%}
{% endfor -%}
 
    TableViewAjax('getTableViewRecords',Entity,function(data){
          
        currentScope.records= data.records;
        
        currentScope.$apply(function(){});
        {% for tab in  Page.tables -%}
        {% if tab.AutoSelectCond != '' -%}
        for(var l=0;l<currentScope.records.length;l++)
        { 
            var record=currentScope.records[l];
            if({{tab.AutoSelectCond}})
            {
                currentScope.records[l].selected=true;
                $('#selected_' + currentScope.records[l].rndId).attr('checked',true);
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
$('#txt{{para.Name}}').val(data.records[0].{{para.Parameter}});
$('#txt{{para.Name}}').css('background',$('#txt{{para.Name}}').val());
{%elseif para.type == 'ImageView' %}
$('#txt{{para.Name}}').attr( 'src' ,$('#txt{{para.Name}}').attr('linkSyntax')  +data.records[0].{{para.Parameter}});
{%elseif para.type == 'DownloadLink' %}
$('#txt{{para.Name}}').attr( 'href', $('#txt{{para.Name}}').attr('linkSyntax')  +data.records[0].{{para.Parameter}});
{%elseif para.type == 'Html' %} 
setTimeout(function(){ tinymce.editors['txt{{para.Name}}'].setContent(data.records[0].{{para.Parameter}});},500);
{%elseif para.type == 'Select2' %}
$('#txt{{para.Name}}').select2().val(data.records[0].{{para.Parameter}}  ) .trigger('change');
{% else -%}
            $('#txt{{para.Name}}').val(data.records[0].{{para.Parameter}});
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
    currentScope.records.push(temp);
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
///Hi ...
///{{Page.BatchCommands.Size}}
{% for BC in Page.BatchCommands -%}
{{Page.name}}.{{BC.name}}_Validate=function()
{
Validator.ClearErrors();
{% for Com in BC.Commands -%}
{% for pa in Com.Parameters -%}
{% for chk in pa.Checks -%}
{% if pa.sourceType == 'PageParameter' -%}
{% if chk.Type == 'ReqString' -%}
Validator.CheckEmpty('txt{{pa.sourceTypeParameter}}','{{pa.caption}}');
{% endif -%}
{% if chk.Type == 'ReqDate' -%}
Validator.CheckRegDate('txt{{pa.sourceTypeParameter}}','{{pa.caption}}');
{% endif -%}
{% if chk.Type == 'ReqNumber' -%}
Validator.CheckRegFloat('txt{{pa.sourceTypeParameter}}','{{pa.caption}}');
{% endif -%}
{% if chk.Type == 'ReqSelect2' -%}
Validator.CheckRegSelect2('txt{{pa.sourceTypeParameter}}','{{pa.caption}}');
{% endif -%}
{% endif -%}
{% endfor -%}
{% endfor -%}
{% endfor -%}
{% for Com in BC.Commands -%}
for (var l=0;l<currentScope.records.length;l++)
{
    var r=currentScope.records[l];

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
{% endfor -%}
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
    NullFix.push(toInput('fake',Para('fake')));
    informationRecords.push(NullFix);
{% if Com.Selection == 'OneTime' -%}
    var rec=new Array();//hi
{% for pa in Com.Parameters -%}
    //YOU ARE ASL
{% if ( pa.sourceType == 'PageParameter' ) -%}
    rec.push(toInput('{{pa.name}}',Para('{{pa.sourceTypeParameter}}')));
{% endif -%}
{% if  pa.sourceType == 'QueryString' -%}
    rec.push(toInput('{{pa.name}}', routeParams.{{para.sourceTypeParameter}}  ) );
{% endif -%}
{% if  pa.sourceType == 'Expr' -%}
    rec.push(toInput('{{pa.name}}',  {{para.sourceTypeParameter}}  ) );
{% endif -%}
{% endfor -%}
    informationRecords.push(rec);
    t.push(informationRecords);
    DataPass.push(t);
{% else -%}
    for (var l=0;l<currentScope.records.length;l++)
    {
        var r=currentScope.records[l];

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
rec.push(toInput('{{pa.name}}', routeParams.{{para.sourceTypeParameter}}  ) );
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
            rec.push(toInput('{{pa.name}}', routeParams.{{para.sourceTypeParameter}}  ) );
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
            Messager.ShowMessage('اطلاعات', data.Message);
            if(JsEventInterface.AfterOkReqSubmit!=null)
            {
                JsEventInterface.AfterOkReqSubmit(Entity,data);
            }
            if(data.code==0)
            {
                BackPage();
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
