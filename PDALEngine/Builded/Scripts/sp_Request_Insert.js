/// <reference path="../../Res/toolkit.js" />

 
   var sp_Request_Insert=new Object();
   sp_Request_Insert.Submit= function()
   {
       if(sp_Request_Insert.Validate()==false)
       {
           return ;

       }

       var Entity=new Object();
       Entity.PageName='sp_Request_Insert';
       if(JsEventInterface.BeforeSubmit!=null)
       {
           JsEventInterface.BeforeSubmit(Entity);
       }
       Entity.Parameters=new Array();

 
       Entity.Parameters.push( toInput('Req_fName',$('#txtReq_fName').val()));
       
               
       Entity.Parameters.push( toInput('Req_lname',$('#txtReq_lname').val()));
       
               
       Entity.Parameters.push( toInput('Req_cu_isReal',$('#txtReq_cu_isReal').val()));
       
               
       Entity.Parameters.push( toInput('Req_target_Sup',$('#txtReq_target_Sup').val()));
       
               
       Entity.Parameters.push( toInput('req_min_Sup',$('#txtreq_min_Sup').val()));
       
               
       Entity.Parameters.push( toInput('Req_max_sup',$('#txtReq_max_sup').val()));
       
               
       Entity.Parameters.push( toInput('Req_tar_push',$('#txtReq_tar_push').val()));
       
               
       Entity.Parameters.push( toInput('req_stDate',$('#txtreq_stDate').val()));
       
               
       Entity.Parameters.push( toInput('req_etDate',$('#txtreq_etDate').val()));
       
                      
       Entity.Parameters.push( toInput('emailToNot',$('#txtemailToNot').val()));
       
               
       Entity.Parameters.push( toInput('mobileToNot',$('#txtmobileToNot').val()));
       
               
       Entity.Parameters.push( toInput('bussCode',$('#txtbussCode').val()));
       
               
       Entity.Parameters.push( toInput('natCode',$('#txtnatCode').val()));
       
                      
       Entity.Parameters.push( toInput('Req_subbreif',$('#txtReq_subbreif').val()));
       
               
       Entity.Parameters.push( toInput('Req_place_dewater',$('#txtReq_place_dewater').val()));
       
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
sp_Request_Insert.Validate= function()
{
    if(JsEventInterface.beforeValidate!=null)
    {
        JsEventInterface.beforeValidate('sp_Request_Insert');

    }
    Validator.ClearErrors();
            Validator.CheckEmpty('txtReq_fName','نام ');
                                                                            Validator.CheckRegFloat('txtreq_min_Sup','حداقل درخواست');
                                        Validator.CheckRegFloat('txtReq_max_sup','حداکثر درخواست');
                                                    Validator.CheckRegDate('txtreq_stDate','شروع دوره');
                                        Validator.CheckRegDate('txtreq_etDate','پایان دوره');
                        Validator.CheckEmpty('txtemailToNot','پست الکترونیک');
                                                    Validator.RegEmail('txtemailToNot','پست الکترونیک');
                                if (Para('Req_cu_isReal')==0) {
                Validator.CheckEmpty('txtmobileToNot','شماره تلفن همراه');
                                    }
                    Validator.CheckEmpty('txtReq_place_dewater','محل آبگیری ');
                                    



if(JsEventInterface.afterVaildate!=null)
{
    JsEventInterface.afterVaildate('sp_Request_Insert');

}



    if(Messager.errors.length!=0)
    {

        Validator.ShowErrors();
        return false ;
    }
        if (!( Para('Req_max_sup')>Para('req_min_Sup') ))
    {
        Messager.errors.push('مقدار حداقل نمی تواند از مقدار حداکثر بیشتر باشد ');
    }
        if (!( Para('req_etDate')>Para('req_stDate') ))
    {
        Messager.errors.push('زمان پایان نمی تواند قبل از شروع باشد ');
    }
        if(Messager.errors.length!=0)
    {

        Validator.ShowErrors();
        return false ;
    }


    return Messager.errors.length==0;
}

sp_Request_Insert.Serach=function()
{
    window.CurrentSerachMethod=sp_Request_Insert.Serach;
    var Entity=new Object();
    Entity.PageName='sp_Request_Insert';
     
    Entity.Parameters=new Array();
         
        Entity.Parameters.push( toInput('Req_fName',$('#txtReq_fName').val()));
    
             
        Entity.Parameters.push( toInput('Req_lname',$('#txtReq_lname').val()));
    
             
        Entity.Parameters.push( toInput('Req_cu_isReal',$('#txtReq_cu_isReal').val()));
    
             
        Entity.Parameters.push( toInput('Req_target_Sup',$('#txtReq_target_Sup').val()));
    
             
        Entity.Parameters.push( toInput('req_min_Sup',$('#txtreq_min_Sup').val()));
    
             
        Entity.Parameters.push( toInput('Req_max_sup',$('#txtReq_max_sup').val()));
    
             
        Entity.Parameters.push( toInput('Req_tar_push',$('#txtReq_tar_push').val()));
    
             
        Entity.Parameters.push( toInput('req_stDate',$('#txtreq_stDate').val()));
    
             
        Entity.Parameters.push( toInput('req_etDate',$('#txtreq_etDate').val()));
    
                     
        Entity.Parameters.push( toInput('emailToNot',$('#txtemailToNot').val()));
    
             
        Entity.Parameters.push( toInput('mobileToNot',$('#txtmobileToNot').val()));
    
             
        Entity.Parameters.push( toInput('bussCode',$('#txtbussCode').val()));
    
             
        Entity.Parameters.push( toInput('natCode',$('#txtnatCode').val()));
    
                     
        Entity.Parameters.push( toInput('Req_subbreif',$('#txtReq_subbreif').val()));
    
             
        Entity.Parameters.push( toInput('Req_place_dewater',$('#txtReq_place_dewater').val()));
    
         
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


 