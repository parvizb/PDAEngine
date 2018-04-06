{% for pages in App.Pagess  -%}
{% for Page in pages.Pages  -%}
   var {{Page.name}}=new Object();
   {{Page.name}}.Submit= function()
   {
       if({{Page.name}}.Validate()==false)
       {
           return ;

       }

       var Entity=new Object();
{% for para in  Page.PageParameters -%}
{% if para.source == 'form' -%}
       Entity.{{para.name}}=$('#txt{{para.name}}').val();
{% endif -%}
{% endfor -%}
       ScallerAjax('{{Page.name}}_Save',Entity,function(data){
          
           Messager.ShowMessage('اطلاعات', data.Message);

           BackPage();
           return;
          
       },function(data)
       {
           return;

       });
   };
{{Page.name}}.Validate= function()
{
    Validator.ClearErrors();
{% for para in  Page.PageParameters -%}
{% for check in para.ParameterChecks -%}
{% if check.cond == 'Reg' -%}
    Validator.CheckEmpty('txt{{para.name}}','{{para.title}}');
{% endif -%}
{% if check.cond == 'StringLength' -%}
    Validator.CheckStringLength('txt{{para.name}}','{{para.title}}',{{check.Value}});
{% endif -%}
{% endfor -%}
{% endfor -%}

    if(Messager.errors.length!=0)
    {

        Validator.ShowErrors();
    }
    return Messager.errors.length==0;
}
{% endfor -%}
{% endfor -%}

