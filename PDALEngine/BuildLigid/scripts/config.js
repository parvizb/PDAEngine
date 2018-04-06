var currentScope=null;
var mainApp = angular.module("{{App.Name}}", ['ngRoute']);

mainApp.controller("mainController",function ($scope, $routeParams) {
    currentScope=$scope;
    routeParams=$routeParams;
    $scope.ShowBoolean=function(v)
    {
        return ShowBoolean(v);

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

    $scope.Num=function(v)
    {
        try
        {
            if(v===undefined)
            {
                return 0;
            }
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
    $scope.RemoveItem=function(item)
    {
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
    }
    $scope.MergeNow=window.MergeNow;
    $scope.ChangeState=function(item)
    {
        window.lastRecord=item;
        if(item.RowState===undefined)
        {
            item.RowState='Changed';
        }
        if(item.RowState==='NoChange')
        {
            item.RowState='Changed';
        }
    }
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
