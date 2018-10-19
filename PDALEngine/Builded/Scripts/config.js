var currentScope=null;
var SelectableRow=null;
var OkDailogSelect=null;
var dlgScope=null;
function DoDailog()
{
    OkDailogSelect(SelectableRow);
    BackPage();

}



var mainApp = angular.module("PShop", ['ngRoute']);
mainApp.controller("dlgController",function ($scope, $routeParams) {
    $scope.ShowBoolean=function(v)
    {
        return ShowBoolean(v);

    }

});
mainApp.controller("mainController",function ($scope, $routeParams) {
    if(currentScope!=null)
    {
        console.log(currentScope.$id); 
    }
 
    currentScope=$scope;
    console.log(currentScope.$id);
    routeParams=$routeParams;
    $scope.ShowBoolean=function(v)
    {
        return ShowBoolean(v);

    }
    $scope.SelectRow=function(a)
    {
        SelectableRow=a;
     

    }
    $scope.SelectNow=function(a)
    {
        $scope.SelectRow(a);
        window.DoDailog();

    }
    $scope.mergeArray=function(a1,b1)
    {
        console.log(a1);
        console.log(b1);
        var keys=   Object.keys(b1);
        for(var i=0;i<keys.length;i++)
        {
            a1[keys[i]]=b1[keys[i]];

        }

    }
    $scope.records=function()
    {
        var d = getDailOpen();
        return $scope[  (d!=""? d : window.pageName) +"records"]; 


    }
    $scope.AjaxActions=window.AjaxActions;
    $scope.CheckAll=function(val)
    {
              
           
        $('[tableCheck]').each(function()
        {
            var s=angular.element( $(this)).scope();
                     
            s.record.selected=true;

        });

    }
    $scope.In=window.In;
    $scope.routeParams=window.routeParams;
    $scope.Num=function(v)
    {
      
        if (v == "") {
            return 0;
        }
        
        try
        {
            if(v===undefined)
            {
                return 0;
            }
            v=v.toString();
            return parseFloat(v.replace(/,/g,''));
        }
        catch(ex)
        {
            return 0;

        }
    }
    $scope.GenId=function()
    {

        return   Math.round(Math.random()*500000);

    }
    $scope.Para=window.Para;
    $scope.Sum=function(name)
    {
        console.log(currentScope.records());
        if(currentScope.records()===undefined)
        {
            return 0;

        }
        var sum=0;
        for(var l=0;l<currentScope.records().length;l++)
        {
            sum+=$scope.Num(currentScope.records()[l][name]);

        }
        return sum;
    }
    $scope.Max=function(name)
    {
        console.log(currentScope.records());
        if(currentScope.records()===undefined)
        {
            return 0;

        }
        var Max=-9999999999999;
        for(var l=0;l<currentScope.records().length;l++)
        {
            
            var mi=    $scope.Num(currentScope.records()[l][name]);
            if(mi>Max)
            {
                Max=mi;
            }
        }
        return Max;
    }

    $scope.Min=function(name)
    {
        console.log(currentScope.records());
        if(currentScope.records()===undefined)
        {
            return 0;

        }
        var Min=9999999999999;
        for(var l=0;l<currentScope.records().length;l++)
        {
            
            var mi=    $scope.Num(currentScope.records()[l][name]);
            if(mi<Min)
            {
                Min=mi;
            }
        }
        return Min
    }
    $scope.SubSum=function(name)
    {
         
        if(currentScope.records()===undefined)
        {
            return 0;

        }
        var sum=0;
        $('[ng-repeat="record in records() | orderBy:currentOrder :rev | filter:FilterValue "]').each(function(){
            var l=angular.element($(this)[0]).scope();
            sum+=  $scope.Num(l.record[name]);
            

        });
   
    
        return sum;
    }
    $scope.Query=window.Query;
    $scope.Avg=function(name)
    {
        console.log(currentScope.records());
        if(currentScope.records()===undefined)
        {
            return 0;

        }
        var sum=0;
        var count=0;
        for(var l=0;l<currentScope.records().length;l++)
        {
            sum+=$scope.Num(currentScope.records()[l][name]);
            count+=1;
        }
        return sum/count;
    }
    $scope.Count=function(name)
    {
        console.log(currentScope.records());
        if(currentScope.records()===undefined)
        {
            return 0;

        }
     
        return currentScope.records().length;
    }
    $scope.$apply();
    $scope.Round=function(v)
    {
        return Math.round(v);


    }
    $scope.ShowMoney=function(v)
    {
  
        try
        {
            if(typeof(v)=='undefined')
            {
                return "-";
            }
       
            return ShowAsMoney(v);
        }
        catch(ex)
        {
            window.xx=v;
            return v;

        }
    };
    $scope.ChageTableOrder =function(colName)
    {
        $scope.currentOrder=colName;
        $scope.rev=  !$scope.rev;
    }
    $scope.RemoveItem=function(item,con)
    {
        console.log(JSON.stringify(item));
        if (con == null) {
            window.currentItem = item;
            ConfirmAsk("آیا مطممن هستید؟", function () { setTimeout('currentScope.RemoveItem(currentItem, "Yes");', 100); });
            return;
        }
        if($scope.DeletedRows===undefined)
        {
            $scope.DeletedRows=new Array();
        }
        if(item.RowState===undefined)
        {
                   
            $scope.DeletedRows.push(     $scope.records().splice(  $scope.records().indexOf(item),1)[0])
        }
        else
        {
            if(item.RowState==='Added')
            {
                $scope.records().splice(  $scope.records().indexOf(item),1);

            }
            else
            {
                item.RowState='Deleted';
                $scope.DeletedRows.push(     $scope.records().splice(  $scope.records().indexOf(item),1)[0])
            }
        }
        if(con!=null)
        {
            currentScope.$apply({});

        }
    }
    $scope.NormalResult=window.NormalResult;
    
    $scope.MergeNow=window.MergeNow;
    $scope.ChangeState=function(item)
    {
        console.log("ChangeState",item.RowState);
        window.lastRecord=item;
        if(item.RowState===undefined)
        {
            item.RowState='Changed';
        }
        if(item.RowState=='NoChange')
        {
            item.RowState='Changed';
        }
        console.log("ChangeState",item.RowState);
    }
    GenStyleForTableResponse();

});

var routeParams=null;
mainApp.config(['$routeProvider',
function ($routeProvider/*, $locationProvider*/) {
    //$locationProvider.hashPrefix('!');
    $routeProvider.
                
    when('/account_Serach', {
        templateUrl: 'account_Serach.htm',
        controller: 'mainController' }
            ).
    
                
    when('/account_Insert', {
        templateUrl: 'account_Insert.htm',
        controller: 'mainController' }
            ).
    
                
    when('/account_Edit/:acc_id', {
        templateUrl: 'account_Edit.htm',
        controller: 'mainController'
    }).
                
    when('/product_mgt', {
        templateUrl: 'product_mgt.htm',
        controller: 'mainController' }
            ).
    
                
    when('/unit_mgt', {
        templateUrl: 'unit_mgt.htm',
        controller: 'mainController' }
            ).
    
                
    when('/factory_mgt', {
        templateUrl: 'factory_mgt.htm',
        controller: 'mainController' }
            ).
    
                
    when('/stuff_Serach', {
        templateUrl: 'stuff_Serach.htm',
        controller: 'mainController' }
            ).
    
                
    when('/stuff_Insert', {
        templateUrl: 'stuff_Insert.htm',
        controller: 'mainController' }
            ).
    
                
    when('/stuff_Edit/:id_stuff', {
        templateUrl: 'stuff_Edit.htm',
        controller: 'mainController'
    }).
                
    when('/cus_group_mgt', {
        templateUrl: 'cus_group_mgt.htm',
        controller: 'mainController' }
            ).
    
                
    when('/customer_Serach', {
        templateUrl: 'customer_Serach.htm',
        controller: 'mainController' }
            ).
    
                
    when('/customer_Insert', {
        templateUrl: 'customer_Insert.htm',
        controller: 'mainController' }
            ).
    
                
    when('/customer_Edit/:cus_acc_id', {
        templateUrl: 'customer_Edit.htm',
        controller: 'mainController'
    }).
                
    when('/stroage_mgt', {
        templateUrl: 'stroage_mgt.htm',
        controller: 'mainController' }
            ).
    
                
    when('/set_stroge_frist', {
        templateUrl: 'set_stroge_frist.htm',
        controller: 'mainController' }
            ).
    
                
    when('/payment_Serach', {
        templateUrl: 'payment_Serach.htm',
        controller: 'mainController' }
            ).
    
                
    when('/payment_Insert', {
        templateUrl: 'payment_Insert.htm',
        controller: 'mainController' }
            ).
    
                
    when('/payment_Edit/:payment_id', {
        templateUrl: 'payment_Edit.htm',
        controller: 'mainController'
    }).
                
    when('/getment_Serach', {
        templateUrl: 'getment_Serach.htm',
        controller: 'mainController' }
            ).
    
                
    when('/getment_Insert', {
        templateUrl: 'getment_Insert.htm',
        controller: 'mainController' }
            ).
    
                
    when('/getment_Edit/:getment_id', {
        templateUrl: 'getment_Edit.htm',
        controller: 'mainController'
    }).
                
    when('/setAvable/:id_St/:st_name', {
        templateUrl: 'setAvable.htm',
        controller: 'mainController'
    }).
                
    when('/Factor_Insert', {
        templateUrl: 'Factor_Insert.htm',
        controller: 'mainController' }
            ).
    
                
    when('/Factor_Update/:FactoryId', {
        templateUrl: 'Factor_Update.htm',
        controller: 'mainController'
    }).
                
    when('/Factor_Serach', {
        templateUrl: 'Factor_Serach.htm',
        controller: 'mainController' }
            ).
    
                
    when('/MoveAcc_Serach', {
        templateUrl: 'MoveAcc_Serach.htm',
        controller: 'mainController' }
            ).
    
                
    when('/MoveAcc_Insert', {
        templateUrl: 'MoveAcc_Insert.htm',
        controller: 'mainController' }
            ).
    
                
    when('/MoveAcc_Edit/:moveAccId', {
        templateUrl: 'MoveAcc_Edit.htm',
        controller: 'mainController'
    }).
                
    when('/moveStorage_Serach', {
        templateUrl: 'moveStorage_Serach.htm',
        controller: 'mainController' }
            ).
    
                
    when('/moveStorage_Insert', {
        templateUrl: 'moveStorage_Insert.htm',
        controller: 'mainController' }
            ).
    
                
    when('/moveStorage_Edit/:moveStorageId', {
        templateUrl: 'moveStorage_Edit.htm',
        controller: 'mainController'
    }).
                
    when('/moveDetail_mgt/:moveStorageId', {
        templateUrl: 'moveDetail_mgt.htm',
        controller: 'mainController'
    }).
                
    when('/ShowCusReportAllSummery', {
        templateUrl: 'ShowCusReportAllSummery.htm',
        controller: 'mainController' }
            ).
    
                
    when('/ShowStuffSummery', {
        templateUrl: 'ShowStuffSummery.htm',
        controller: 'mainController' }
            ).
    
                
    when('/BankCheck_Serach', {
        templateUrl: 'BankCheck_Serach.htm',
        controller: 'mainController' }
            ).
    
                
    when('/BankCheck_Insert', {
        templateUrl: 'BankCheck_Insert.htm',
        controller: 'mainController' }
            ).
    
                
    when('/GetProfitsBetweenToDate', {
        templateUrl: 'GetProfitsBetweenToDate.htm',
        controller: 'mainController' }
            ).
    
                
    when('/BankCheck_Edit/:BankCheckId', {
        templateUrl: 'BankCheck_Edit.htm',
        controller: 'mainController'
    }).
                
    when('/BankCheckToPayGetCheck/:bankCheckId', {
        templateUrl: 'BankCheckToPayGetCheck.htm',
        controller: 'mainController'
    }).
                
    when('/BankCheckToPayPaymentCheck/:bankCheckId', {
        templateUrl: 'BankCheckToPayPaymentCheck.htm',
        controller: 'mainController'
    }).
                
    when('/BankCheckToBack/:bankCheckId', {
        templateUrl: 'BankCheckToBack.htm',
        controller: 'mainController'
    }).
                
    when('/MoveToAccBank/:bankCheckId', {
        templateUrl: 'MoveToAccBank.htm',
        controller: 'mainController'
    }).
                
    when('/PayMoveCheck/:bankCheckId', {
        templateUrl: 'PayMoveCheck.htm',
        controller: 'mainController'
    }).
                
    when('/SendCheckToPerson/:bankCheckId', {
        templateUrl: 'SendCheckToPerson.htm',
        controller: 'mainController'
    }).
                
    when('/BankCheckOptDetail/:BankCheckId', {
        templateUrl: 'BankCheckOptDetail.htm',
        controller: 'mainController'
    }).
                
    when('/GenCradax', {
        templateUrl: 'GenCradax.htm',
        controller: 'mainController' }
            ).
    
                
    when('/StorageReport', {
        templateUrl: 'StorageReport.htm',
        controller: 'mainController' }
            ).
    
                
    when('/AccountReport', {
        templateUrl: 'AccountReport.htm',
        controller: 'mainController' }
            ).
    
                
    when('/AccountReportAll', {
        templateUrl: 'AccountReportAll.htm',
        controller: 'mainController' }
            ).
    
                
    when('/ShowOptMgt', {
        templateUrl: 'ShowOptMgt.htm',
        controller: 'mainController' }
            ).
    
                
    when('/billPercent_mgt', {
        templateUrl: 'billPercent_mgt.htm',
        controller: 'mainController' }
            ).
    
                
    when('/ShowCusReport', {
        templateUrl: 'ShowCusReport.htm',
        controller: 'mainController' }
            ).
    
                
    when('/ShowCusReportAll', {
        templateUrl: 'ShowCusReportAll.htm',
        controller: 'mainController' }
            ).
    
                
    when('/User_Serach', {
        templateUrl: 'User_Serach.htm',
        controller: 'mainController' }
            ).
    
                
    when('/User_Insert', {
        templateUrl: 'User_Insert.htm',
        controller: 'mainController' }
            ).
    
                
    when('/User_Edit/:UserId', {
        templateUrl: 'User_Edit.htm',
        controller: 'mainController'
    }).
                
    when('/UserPassEdit/:UserId', {
        templateUrl: 'UserPassEdit.htm',
        controller: 'mainController'
    }).
                
    when('/Role_Serach', {
        templateUrl: 'Role_Serach.htm',
        controller: 'mainController' }
            ).
    
                
    when('/Role_Insert', {
        templateUrl: 'Role_Insert.htm',
        controller: 'mainController' }
            ).
    
                
    when('/Role_Edit/:RoleId', {
        templateUrl: 'Role_Edit.htm',
        controller: 'mainController'
    }).
                
    when('/ShowUserInRole/:RoleId', {
        templateUrl: 'ShowUserInRole.htm',
        controller: 'mainController'
    }).
                
    when('/ShowPerInRole/:RoleId', {
        templateUrl: 'ShowPerInRole.htm',
        controller: 'mainController'
    }).
                
    when('/Service_mgt', {
        templateUrl: 'Service_mgt.htm',
        controller: 'mainController' }
            ).
    
                
    when('/ServiceFactor_Serach', {
        templateUrl: 'ServiceFactor_Serach.htm',
        controller: 'mainController' }
            ).
    
                
    when('/ServiceFactor_Insert', {
        templateUrl: 'ServiceFactor_Insert.htm',
        controller: 'mainController' }
            ).
    
                
    when('/ServiceFactor_Edit/:ServiceFactorId', {
        templateUrl: 'ServiceFactor_Edit.htm',
        controller: 'mainController'
    }).
                
    when('/QuickFactorInsert', {
        templateUrl: 'QuickFactorInsert.htm',
        controller: 'mainController' }
            ).
    
                
    when('/multValue', {
        templateUrl: 'multValue.htm',
        controller: 'mainController' }
            ).
    
                when('/welcome', {
        templateUrl: 'welcome.html',
        controller: 'mainController'}
    
    );
}]);


