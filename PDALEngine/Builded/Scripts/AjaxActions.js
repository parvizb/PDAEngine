var AjaxActions = new Object();
AjaxActions.person_Delete =function(   id)
{ 
    var Entity=new Object();
    Entity.actionName='person_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
      Entity.Parameters.push( toInput('id' ,id));
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
AjaxActions.person_Delete_asTable =function(func,   id)
{ 
    var Entity=new Object();
    Entity.actionName='person_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
        Entity.Parameters.push( toInput('id' ,id));
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

AjaxActions.GetPop =function(   id)
{ 
    var Entity=new Object();
    Entity.actionName='GetPop';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
      Entity.Parameters.push( toInput('id' ,id));
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
AjaxActions.GetPop_asTable =function(func,   id)
{ 
    var Entity=new Object();
    Entity.actionName='GetPop';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
        Entity.Parameters.push( toInput('id' ,id));
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

