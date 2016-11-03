(function() {

  'use strict';

  angular
    .module('myApp.components.main', [])
    .controller('mainController', mainController);

  mainController.$inject = ['$scope', 'queries', '$location'];

  function mainController($scope, queries, $location) {
    /*jshint validthis: true */
    var vm = this
    vm.greeting = 'Hello World!';

    vm.startGame = function () {
      queries.startNewGame()
      .then(data => {
        vm.gameId = data.data.data
        localStorage.setItem('game', data.data.data)
      })
      .catch(console.log)
    }

    vm.joinGame = function (gameId) {
      localStorage.setItem('game', gameId)
      queries.joinGame(gameId)
      .then(data => {
        $location.path('/game')
        localStorage.setItem('playerId', data.data.player_id)
      })
      .catch(console.log)
    }
  }

})();
