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

AjaxActions.account_Delete =function(   acc_id)
{ 
    var Entity=new Object();
    Entity.actionName='account_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
      Entity.Parameters.push( toInput('acc_id' ,acc_id));
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
AjaxActions.account_Delete_asTable =function(func,   acc_id)
{ 
    var Entity=new Object();
    Entity.actionName='account_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
        Entity.Parameters.push( toInput('acc_id' ,acc_id));
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

AjaxActions.stuff_Delete =function(   id_stuff)
{ 
    var Entity=new Object();
    Entity.actionName='stuff_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
      Entity.Parameters.push( toInput('id_stuff' ,id_stuff));
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
AjaxActions.stuff_Delete_asTable =function(func,   id_stuff)
{ 
    var Entity=new Object();
    Entity.actionName='stuff_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
        Entity.Parameters.push( toInput('id_stuff' ,id_stuff));
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

AjaxActions.customer_Delete =function(   cus_acc_id)
{ 
    var Entity=new Object();
    Entity.actionName='customer_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
      Entity.Parameters.push( toInput('cus_acc_id' ,cus_acc_id));
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
AjaxActions.customer_Delete_asTable =function(func,   cus_acc_id)
{ 
    var Entity=new Object();
    Entity.actionName='customer_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
        Entity.Parameters.push( toInput('cus_acc_id' ,cus_acc_id));
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

AjaxActions.payment_Delete =function(   payment_id)
{ 
    var Entity=new Object();
    Entity.actionName='payment_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
      Entity.Parameters.push( toInput('payment_id' ,payment_id));
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
AjaxActions.payment_Delete_asTable =function(func,   payment_id)
{ 
    var Entity=new Object();
    Entity.actionName='payment_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
        Entity.Parameters.push( toInput('payment_id' ,payment_id));
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

AjaxActions.getment_Delete =function(   getment_id)
{ 
    var Entity=new Object();
    Entity.actionName='getment_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
      Entity.Parameters.push( toInput('getment_id' ,getment_id));
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
AjaxActions.getment_Delete_asTable =function(func,   getment_id)
{ 
    var Entity=new Object();
    Entity.actionName='getment_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
        Entity.Parameters.push( toInput('getment_id' ,getment_id));
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

AjaxActions.GetProduct =function(   id_stuff   ,id_Factor)
{ 
    var Entity=new Object();
    Entity.actionName='GetProduct';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
      Entity.Parameters.push( toInput('id_stuff' ,id_stuff));
      Entity.Parameters.push( toInput('id_Factor' ,id_Factor));
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
AjaxActions.GetProduct_asTable =function(func,   id_stuff   ,id_Factor)
{ 
    var Entity=new Object();
    Entity.actionName='GetProduct';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
        Entity.Parameters.push( toInput('id_stuff' ,id_stuff));
        Entity.Parameters.push( toInput('id_Factor' ,id_Factor));
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

AjaxActions.Factor_Delete =function(   FactoryId)
{ 
    var Entity=new Object();
    Entity.actionName='Factor_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
      Entity.Parameters.push( toInput('FactoryId' ,FactoryId));
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
AjaxActions.Factor_Delete_asTable =function(func,   FactoryId)
{ 
    var Entity=new Object();
    Entity.actionName='Factor_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
        Entity.Parameters.push( toInput('FactoryId' ,FactoryId));
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

AjaxActions.MoveAcc_Delete =function(   moveAccId)
{ 
    var Entity=new Object();
    Entity.actionName='MoveAcc_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
      Entity.Parameters.push( toInput('moveAccId' ,moveAccId));
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
AjaxActions.MoveAcc_Delete_asTable =function(func,   moveAccId)
{ 
    var Entity=new Object();
    Entity.actionName='MoveAcc_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
        Entity.Parameters.push( toInput('moveAccId' ,moveAccId));
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

AjaxActions.moveStorage_Delete =function(   moveStorageId)
{ 
    var Entity=new Object();
    Entity.actionName='moveStorage_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
      Entity.Parameters.push( toInput('moveStorageId' ,moveStorageId));
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
AjaxActions.moveStorage_Delete_asTable =function(func,   moveStorageId)
{ 
    var Entity=new Object();
    Entity.actionName='moveStorage_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
        Entity.Parameters.push( toInput('moveStorageId' ,moveStorageId));
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

AjaxActions.BankCheck_Delete =function(   BankCheckId)
{ 
    var Entity=new Object();
    Entity.actionName='BankCheck_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
      Entity.Parameters.push( toInput('BankCheckId' ,BankCheckId));
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
AjaxActions.BankCheck_Delete_asTable =function(func,   BankCheckId)
{ 
    var Entity=new Object();
    Entity.actionName='BankCheck_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
        Entity.Parameters.push( toInput('BankCheckId' ,BankCheckId));
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

AjaxActions.BankCheckOptDelete =function(   BankCheckOptId)
{ 
    var Entity=new Object();
    Entity.actionName='BankCheckOptDelete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
      Entity.Parameters.push( toInput('BankCheckOptId' ,BankCheckOptId));
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
AjaxActions.BankCheckOptDelete_asTable =function(func,   BankCheckOptId)
{ 
    var Entity=new Object();
    Entity.actionName='BankCheckOptDelete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
        Entity.Parameters.push( toInput('BankCheckOptId' ,BankCheckOptId));
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

AjaxActions.FactorInsert =function(   factory_name)
{ 
    var Entity=new Object();
    Entity.actionName='FactorInsert';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
      Entity.Parameters.push( toInput('factory_name' ,factory_name));
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
AjaxActions.FactorInsert_asTable =function(func,   factory_name)
{ 
    var Entity=new Object();
    Entity.actionName='FactorInsert';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
        Entity.Parameters.push( toInput('factory_name' ,factory_name));
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

AjaxActions.ProductInsert =function(   product_name)
{ 
    var Entity=new Object();
    Entity.actionName='ProductInsert';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
      Entity.Parameters.push( toInput('product_name' ,product_name));
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
AjaxActions.ProductInsert_asTable =function(func,   product_name)
{ 
    var Entity=new Object();
    Entity.actionName='ProductInsert';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
        Entity.Parameters.push( toInput('product_name' ,product_name));
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

AjaxActions.UnitInsert =function(   unit_name)
{ 
    var Entity=new Object();
    Entity.actionName='UnitInsert';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
      Entity.Parameters.push( toInput('unit_name' ,unit_name));
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
AjaxActions.UnitInsert_asTable =function(func,   unit_name)
{ 
    var Entity=new Object();
    Entity.actionName='UnitInsert';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
        Entity.Parameters.push( toInput('unit_name' ,unit_name));
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

AjaxActions.ServiceFactor_Delete =function(   ServiceFactorId)
{ 
    var Entity=new Object();
    Entity.actionName='ServiceFactor_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
      Entity.Parameters.push( toInput('ServiceFactorId' ,ServiceFactorId));
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
AjaxActions.ServiceFactor_Delete_asTable =function(func,   ServiceFactorId)
{ 
    var Entity=new Object();
    Entity.actionName='ServiceFactor_Delete';
    Entity.Parameters=new Array();
    if(JsEventInterface.BeforeInitAjaxAction!=null)
    {
        JsEventInterface.BeforeInitAjaxAction(Entity);

    }
        Entity.Parameters.push( toInput('ServiceFactorId' ,ServiceFactorId));
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

