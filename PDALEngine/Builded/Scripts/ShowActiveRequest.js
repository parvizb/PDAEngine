/// <reference path="../../Res/toolkit.js" />

 
   var ShowActiveRequest=new Object();
   ShowActiveRequest.Submit= function()
   {
       if(ShowActiveRequest.Validate()==false)
       {
           return ;

       }

       var Entity=new Object();
       Entity.PageName='ShowActiveRequest';
       if(JsEventInterface.BeforeSubmit!=null)
       {
           JsEventInterface.BeforeSubmit(Entity);
       }
       Entity.Parameters=new Array();

if(JsEventInterface.AfterSubmit!=null)
{
    JsEventInterface.AfterSubmit(Entity);
}
       ScallerAjax('ScallerSubmit',Entity,function(data){
           if(JsEventInterface.BeforeOkReqSubmit!=null)
           {
               JsEventInterface.BeforeOkReqSubmit(Entity,data);
           }
           Messager.ShowMessage('اطلاعات', data.Message);
           if(JsEventInterface.AfterOkReqSubmit!=null)
           {
               JsEventInterface.AfterOkReqSubmit(Entity,data);
           }
           BackPage();
           return;
          
       },function(data)
       {
           return;

       });
   };
ShowActiveRequest.Validate= function()
{
    if(JsEventInterface.beforeValidate!=null)
    {
        JsEventInterface.beforeValidate('ShowActiveRequest');

    }
    Validator.ClearErrors();




if(JsEventInterface.afterVaildate!=null)
{
    JsEventInterface.afterVaildate('ShowActiveRequest');

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

ShowActiveRequest.Serach=function()
{
    alert("salam");
    window.CurrentSerachMethod=ShowActiveRequest.Serach;
    var Entity=new Object();
    Entity.PageName='ShowActiveRequest';
     
    Entity.Parameters=new Array();
     
    TableViewAjax('getTableViewRecords',Entity,function(data){
          
        currentScope.records= data.records;
        currentScope.$apply(function(){});
        NormalResult();
        return;
          
    },function(data)
    {
        return;

    });


}


 