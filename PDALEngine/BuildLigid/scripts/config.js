var currentScope=null;
var SelectableRow=null;
var OkDailogSelect=null;
var dlgScope=null;
function DoDailog()
{
    OkDailogSelect(SelectableRow);
    BackPage();

}



var mainApp = angular.module("{{App.Name}}", ['ngRoute']);
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
        console.log(currentScope.records);
        if(currentScope.records===undefined)
        {
            return 0;

        }
        var sum=0;
        for(var l=0;l<currentScope.records.length;l++)
        {
            sum+=$scope.Num(currentScope.records[l][name]);

        }
        return sum;
    }
    $scope.Max=function(name)
    {
        console.log(currentScope.records);
        if(currentScope.records===undefined)
        {
            return 0;

        }
        var Max=-9999999999999;
        for(var l=0;l<currentScope.records.length;l++)
        {
            
            var mi=    $scope.Num(currentScope.records[l][name]);
            if(mi>Max)
            {
                Max=mi;
            }
        }
        return Max;
    }

    $scope.Min=function(name)
    {
        console.log(currentScope.records);
        if(currentScope.records===undefined)
        {
            return 0;

        }
        var Min=9999999999999;
        for(var l=0;l<currentScope.records.length;l++)
        {
            
            var mi=    $scope.Num(currentScope.records[l][name]);
            if(mi<Min)
            {
                Min=mi;
            }
        }
        return Min
    }
    $scope.SubSum=function(name)
    {
         
        if(currentScope.records===undefined)
        {
            return 0;

        }
        var sum=0;
        $('[ng-repeat="record in records | orderBy:currentOrder :rev | filter:FilterValue "]').each(function(){
            var l=angular.element($(this)[0]).scope();
           sum+=  $scope.Num(l.record[name]);
            

        });
   
    
        return sum;
    }
    $scope.Query=window.Query;
    $scope.Avg=function(name)
    {
        console.log(currentScope.records);
        if(currentScope.records===undefined)
        {
            return 0;

        }
        var sum=0;
        var count=0;
        for(var l=0;l<currentScope.records.length;l++)
        {
            sum+=$scope.Num(currentScope.records[l][name]);
            count+=1;
        }
        return sum/count;
    }
    $scope.Count=function(name)
    {
        console.log(currentScope.records);
        if(currentScope.records===undefined)
        {
            return 0;

        }
     
        return currentScope.records.length;
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
                   
            $scope.DeletedRows.push(     $scope.records.splice(  $scope.records.indexOf(item),1)[0])
        }
        else
        {
            if(item.RowState==='Added')
            {
                $scope.records.splice(  $scope.records.indexOf(item),1);

            }
            else
            {
                item.RowState='Deleted';
                $scope.DeletedRows.push(     $scope.records.splice(  $scope.records.indexOf(item),1)[0])
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
    {% for pages in App.Pagess  -%}
    {% for Page in pages.Pages  -%}
    {% if Page.queryString == '' -%}
    
    when('/{{Page.name}}', {
        templateUrl: '{{Page.name}}.htm',
        controller: 'mainController' }
            ).
    
    {% else -%}
    
    when('/{{Page.name}}{{Page.queryString}}', {
        templateUrl: '{{Page.name}}.htm',
        controller: 'mainController'
        }).
    {% endif -%}
    {% endfor -%}
    {% endfor -%}
    when('/welcome', {
        templateUrl: 'welcome.html',
        controller: 'mainController'}
    
    );
}]);


{% for Not in App.Notifactions -%}
function Not_{{Not.name}}()
{
    AjaxActions.{{Not.AjaxActionName}}_asTable(function(records){
      
        if({{Not.returnSyntax}})
        {
            
            ConfirmAsk('{{Not.Message}}',function(){goToLink("#{{Not.PageName}}")});

        }
    }{% if Not.ParameterSyntax != '' -%},{{Not.ParameterSyntax}}{% endif -%});

    setTimeout("Not_{{Not.name}}",60000*{{Not.TimeFire}});
}
{% endfor -%}