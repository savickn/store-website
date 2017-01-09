'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('musescore', {
        url: '/musescore',
        templateUrl: 'app/musescore/musescore.html',
        controller: 'MusescoreCtrl'
      });
  });