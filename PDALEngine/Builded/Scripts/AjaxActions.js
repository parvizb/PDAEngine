var AjaxActions = new Object();
AjaxActions.Storage_Delete =function(   StroageId)
{ 
    var Entity=new Object();
    Entity.actionName='Storage_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
      Entity.Parameters.push( toInput('StroageId' ,StroageId));
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
       window.CurrentSerachMethod();
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
       return;

   });
   
}
AjaxActions.Storage_Delete_asTable =function(func,   StroageId)
{ 
    var Entity=new Object();
    Entity.actionName='Storage_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
        Entity.Parameters.push( toInput('StroageId' ,StroageId));
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

AjaxActions.Product_Delete =function(   ProductId)
{ 
    var Entity=new Object();
    Entity.actionName='Product_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
      Entity.Parameters.push( toInput('ProductId' ,ProductId));
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
       window.CurrentSerachMethod();
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
       return;

   });
   
}
AjaxActions.Product_Delete_asTable =function(func,   ProductId)
{ 
    var Entity=new Object();
    Entity.actionName='Product_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
        Entity.Parameters.push( toInput('ProductId' ,ProductId));
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

