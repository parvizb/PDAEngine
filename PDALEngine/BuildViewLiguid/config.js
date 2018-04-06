var mainApp = angular.module("{{App.Name}}", ['ngRoute']);

mainApp.config(['$routeProvider',
function ($routeProvider/*, $locationProvider*/) {
    //$locationProvider.hashPrefix('!');
    $routeProvider.
    {% for pages in App.Pagess  -%}
    {% for Page in pages.Pages  -%}
    {% if Page.queryString == '' -%}
    
    when('/{{Page.name}}', {
        templateUrl: '{{Page.name}}.htm',
        controller: function ($scope) {
        
            $scope.$apply();

        }}).
    {% else -%}
    when('/{{Page.name}}{{Page.queryString}}', {
        templateUrl: '{{Page.name}}.htm',
        controller: function ($scope, $routeParams) {
            $scope.$apply();
        }}).
{% endif -%}
{% endfor -%}
{% endfor -%}
    when('/welcome', {
        templateUrl: 'welcome.html',
        controller: function ($scope, $routeParams) {
        
            $scope.$apply();

        }}).
  
    otherwise({
        redirectTo: '/welcome'
    });
}]);
