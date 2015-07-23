angular.module('mapApp').service('Flash', ['$timeout',
  function ($timeout) {
    var messages = {};

    return {
      setMessage: function(topic, message) {
        messages[topic] = message;

        $timeout(function() {
           messages[topic] = undefined;

        }, 10000);
      },

      getMessage: function(topic) {
        return messages[topic];
      }
    }
  }
]);