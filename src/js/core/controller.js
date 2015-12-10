var $ = require('vendor/jquery-2.1.4.js');

var controller = function controllerFactory(name, options) {
  var Controller = function controllerConstructor(){};

  $.extend(Controller.prototype, {
    getName: function controllerGetName() {
      return name;
    },

    getOptions: function controllerGetOptions() {
      return options;
    },

    fetch: function controllerFetch(options) {

    }
  });

  return new Controller();
};

module.exports = controller;
