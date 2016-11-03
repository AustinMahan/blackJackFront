(function() {

  'use strict';

  angular
    .module('myApp.components.game', [])
    .controller('gameController', gameController);

  gameController.$inject = ['$scope', 'queries', '$location', '$http', '$q', 'logic'];

  function gameController($scope, queries, $location, $http, $q, logic) {
    /*jshint validthis: true */
    var vm = this
    vm.shown = false

    if (vm.myScore > 21){
      vm.myScore = 'Bust'
    }

    vm.me = localStorage.getItem('playerId')
    $http.get('http://localhost:5000/get/game/' + localStorage.getItem('game'))
    .then(data => {
      var datas = data.data.data.filter(arr => arr.length >= 5)
      vm.myScore = datas.reduce((prev, cur) => {
        console.log(cur);
        if (cur[1] == vm.me) return prev += cur[2]
        else return prev
      }, 0)
      vm.myCards = {}
      datas.forEach(person => {
        vm.myCards[person[1]] = []
      })
      datas.forEach(person => {
        if (person[1] == vm.me) {
          vm.myCards[person[1]].push({num:person[3].toLowerCase(), suit: person[4].toLowerCase()})
        }
      })
      vm.players = datas.map(item => item[1]).filter((item, pos, self) => self.indexOf(item) == pos)
    })
    .catch(console.log)

    vm.reset = function () {
      queries.reset(localStorage.getItem("game"))
    }

    vm.hit = function () {
      var player = localStorage.getItem('playerId')
      var game = localStorage.getItem('game')
      $http.get(`http://localhost:5000/draw/${player}/${game}`).then(() => {
        $http.get('http://localhost:5000/get/game/' + localStorage.getItem('game'))
        .then(data => {
          var datas = data.data.data.filter(arr => arr.length >= 5)
          vm.myScore = datas.reduce((prev, cur) => {
            console.log(cur);
            if (cur[1] == vm.me) return prev += cur[2]
            else return prev
          }, 0)
          if (vm.myScore > 21){
            vm.myScore = 'Bust'
          }
          vm.myCards = {}
          datas.forEach(person => {
            vm.myCards[person[1]] = []
          })
          datas.forEach(person => {
            if (person[1] == vm.me) {
              vm.myCards[person[1]].push({num:person[3].toLowerCase(), suit: person[4].toLowerCase()})
            }
          })
          vm.players = datas.map(item => item[1]).filter((item, pos, self) => self.indexOf(item) == pos)
        })
        .catch(console.log)
      })
    }

    vm.show = function () {
      if (!vm.shown) {
        vm.shown = true;
        $http.get('http://localhost:5000/get/game/' + localStorage.getItem('game'))
        .then(data => {
          var datas = data.data.data.filter(arr => arr.length >= 5)
          vm.myScore = datas.reduce((prev, cur) => {
            if (cur[1] == vm.me) return prev += cur[2]
            else return prev
          }, 0)
          var allScores = {}
          datas.forEach(score => {
            allScores[score[1]] = 0
          })
          datas.forEach(score => {
            allScores[score[1]] += score[2]
          })
          vm.allScores = allScores
          vm.winner = logic.getWinner(allScores)
          if (vm.myScore > 21){
            vm.myScore = 'Bust'
          }
          vm.cards = {}
          datas.forEach(person => {
            vm.cards[person[1]] = []
          })
          datas.forEach(person => {
            vm.cards[person[1]].push({num:person[3].toLowerCase(), suit: person[4].toLowerCase()})
          })
          vm.players = datas.map(item => item[1]).filter((item, pos, self) => self.indexOf(item) == pos)
        })
        .catch(console.log)
      }
    }
  }

})();
