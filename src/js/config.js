(function() {

  'use strict';

  angular
    .module('myApp.config', [])
    .config(appConfig);

  function appConfig($urlRouterProvider, $stateProvider) {
    var mainState = {
      name: 'main',
      url: '/',
      templateUrl: 'js/components/main/main.view.html',
      controller: 'mainController',
      controllerAs: 'mainCtrl',
      access: false
    };
    var gameState = {
      name: 'game',
      url: '/game',
      templateUrl: 'js/components/game/game.view.html',
      controller: 'gameController',
      controllerAs: 'gameCtrl',
      access: false
    };
    $urlRouterProvider.otherwise('/');

    $stateProvider.state(mainState);
    $stateProvider.state(gameState);
  }

})();
