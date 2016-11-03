(() => {

  angular
  .module('myApp.services', [])
  .service('queries', queries)
  .service('logic', logic)

  function queries($http) {
    var vm = this;
    vm.startNewGame = function() {
      return $http.get('http://localhost:5000/start')
    }

    vm.joinGame = function(gameId) {
      return $http.get('http://localhost:5000/new/player/' + gameId)
    }

    vm.reset = function (gameId) {
      return $http.get('http://localhost:5000/reset/' + gameId)
    }
  }

  function logic() {
    this.getWinner = function (obj) {
      var biggest = -1;
      var winner = '';
      for (var key in obj) {
        console.log(obj[key]);
        if (obj[key] > biggest && obj[key] < 21) {
          biggest = obj[key]
          winner = key
        }
      }
      return winner
    }
  }

})();
