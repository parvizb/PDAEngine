var AjaxActions = new Object();
{% for actions in App.Actionss -%}
{% for action in actions.actions -%}
{% assign i=0 -%}
AjaxActions.{{action.name}} =function({% for act in action.actionParameters %}   {% if i != 0 -%},{% endif -%}{% assign i = i | plus: 1 -%}{{act.name}}{% endfor -%})
{ 
    var Entity=new Object();
    Entity.actionName='{{action.name}}';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
   {% for act in action.actionParameters -%}
   Entity.Parameters.push( toInput('{{act.name}}' ,{{act.name}}));
   {% endfor -%}
   if(JsEventInterface.AfterInitAjaxAction!=null)
   {
       JsEventInterface.AfterInitAjaxAction(Entity);

   }
   ScallerAjax('AjaxAction',Entity,function(data){
       if(JsEventInterface.BeforeOkReqInitAjaxAction!=null)
       {
           JsEventInterface.BeforeOkReqInitAjaxAction(Entity,data);

       }
       Messager.ShowMessage('اطلاعات', data.Message);
       if(window.CurrentSerachMethod!=null)
       {
           window.CurrentSerachMethod();
       }
       if(JsEventInterface.AfterOkReqInitAjaxAction!=null)
       {
           JsEventInterface.AfterOkReqInitAjaxAction(Entity,data);

       }
       return;
          
   },function(data) 
   {
       if(JsEventInterface.BeforeFailReqInitAjaxAction!=null)
       {
           JsEventInterface.BeforeFailReqInitAjaxAction(Entity,data);

       }
      
       Messager.ShowMessage('خطا', data);
       return;

   });
   
}
{% assign i=0 -%}
AjaxActions.{{action.name}}_asTable =function(func,{% for act in action.actionParameters %}   {% if i != 0 -%},{% endif -%}{% assign i = i | plus: 1 -%}{{act.name}}{% endfor -%})
{ 
    var Entity=new Object();
    Entity.actionName='{{action.name}}';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
    {% for act in action.actionParameters -%}
    Entity.Parameters.push( toInput('{{act.name}}' ,{{act.name}}));
    {% endfor -%}
    if(JsEventInterface.AfterInitAjaxAction!=null)
    {
        JsEventInterface.AfterInitAjaxAction(Entity);

    }
    TableViewAjax('AjaxActionTable',Entity,function(data){
        if(JsEventInterface.BeforeOkReqInitAjaxAction!=null)
        {
            JsEventInterface.BeforeOkReqInitAjaxAction(Entity,data);

        }
        func(data.records);
        return;
          
    },function(data) 
    {
        if(JsEventInterface.BeforeFailReqInitAjaxAction!=null)
        {
            JsEventInterface.BeforeFailReqInitAjaxAction(Entity,data);

        }
        return;

    });
   
}

{% endfor -%}
{% endfor -%}