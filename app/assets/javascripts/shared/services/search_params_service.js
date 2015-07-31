angular.module('mapApp').service('searchParams', [
  function () {
    var searchParams = {};

    return {
      addParam: function(param) {
        searchParams[param]= param;
      },

      getParam: function(param) {
        return searchParams[param];
      }
    }
  }
]);