var AjaxActions = new Object();
AjaxActions.Role_Delete =function(   RoleId)
{ 
    var Entity=new Object();
    Entity.actionName='Role_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
      Entity.Parameters.push( toInput('RoleId' ,RoleId));
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
AjaxActions.Role_Delete_asTable =function(func,   RoleId)
{ 
    var Entity=new Object();
    Entity.actionName='Role_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
        Entity.Parameters.push( toInput('RoleId' ,RoleId));
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

AjaxActions.User_Delete =function(   UserId)
{ 
    var Entity=new Object();
    Entity.actionName='User_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
      Entity.Parameters.push( toInput('UserId' ,UserId));
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
AjaxActions.User_Delete_asTable =function(func,   UserId)
{ 
    var Entity=new Object();
    Entity.actionName='User_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
        Entity.Parameters.push( toInput('UserId' ,UserId));
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

AjaxActions.Seller_Delete =function(   SellerId)
{ 
    var Entity=new Object();
    Entity.actionName='Seller_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
      Entity.Parameters.push( toInput('SellerId' ,SellerId));
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
AjaxActions.Seller_Delete_asTable =function(func,   SellerId)
{ 
    var Entity=new Object();
    Entity.actionName='Seller_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
        Entity.Parameters.push( toInput('SellerId' ,SellerId));
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

AjaxActions.Buyer_Delete =function(   BuyerId)
{ 
    var Entity=new Object();
    Entity.actionName='Buyer_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
      Entity.Parameters.push( toInput('BuyerId' ,BuyerId));
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
AjaxActions.Buyer_Delete_asTable =function(func,   BuyerId)
{ 
    var Entity=new Object();
    Entity.actionName='Buyer_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
        Entity.Parameters.push( toInput('BuyerId' ,BuyerId));
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

