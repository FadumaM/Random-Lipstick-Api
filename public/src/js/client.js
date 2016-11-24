angular
  .module('Hobbyist', ['angular-jwt', 'ngResource', 'satellizer','ui.router'])
  .constant('API_URL', 'https://hobbyist-app.herokuapp.com/api')
  .constant('facebookClientId', '1812062232347280')
  .config(MainRouter)
  .config(oauthConfig)
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider','$locationProvider'];
  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "/src/js/views/home.html",
        // controller: "UsersController",
        // controllerAs: "user"
      })
      .state('profile', {
        url: "/profile",
        templateUrl: "/src/js/views/user/show.html",
        // controller: "UsersController",
        // controllerAs: "user"
      })
      .state('login', {
        url: "/login",
        templateUrl: "/src/js/views/authentication/login.html",
        // controller: "UsersController",
        // controllerAs: "user"
      })
      .state('register', {
        url: "/register",
        templateUrl: "/src/js/views/authentication/register.html",
        // controller: "UsersController",
        // controllerAs: "user"
      })
      .state('categoryFirstQuestion',{
        url: '/quiz',
        templateUrl: "/src/js/views/quiz/category/questions.html",
        controller: "CategoryController",
        controllerAs: "quiz"
      })
      .state('hobbyFirstQuestion',{
        url: '/quiz/:id',
        templateUrl: "/src/js/views/quiz/hobby/questions.html",
        controller: "HobbyController",
        controllerAs: "quiz"
      })
      .state('showHobby',{
        url: '/hobby/:id',
        templateUrl: "/src/js/views/quiz/hobby/show.html",
        controller: "ShowHobbyController",
        controllerAs: "hobby"
      })
      .state('eventIndex',{
        url: '/events/:id',
        templateUrl: "/src/js/views/events/index.html",
        controller: "EventsController",
        controllerAs: "events"
      });

    $urlRouterProvider.otherwise("/");
  }

    oauthConfig.$inject = ['API_URL', '$authProvider', 'facebookClientId'];
    function oauthConfig(API_URL, $authProvider, facebookClientId) {
      $authProvider.facebook({
        url: API_URL + '/auth/facebook',
        clientId: facebookClientId // replace with your facebook client id
      });
    }
