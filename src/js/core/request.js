var request = (function(){

  var fn = require("helpers/fn.js"),
      $ = require("vendor/jquery-2.1.4.js");

  var handlers = {},

      request = function requestRequest(responseKey) {
        var args = [].slice.call(arguments, 1),
            handler = handlers[responseKey];

        if(!handler) { return false; }

        return handler.apply(null, args);
      },

      setHandler = function requestSetHandler(responseKey, handler, context) {
        if (typeof handler !== "function") {
          throw new Error("Need to have a function to handle requests for", responseKey);
        }

        if (handlers[responseKey]) {
          console.warn('A handler has already been set for ', responseKey);
        }

        context = context || this;
        handlers[responseKey] = fn.bind(handler, context);
      },

      objSetHandler = function requestObjSetHandler(responseKey, handlerName) {
        var handler = this[handlerName];
        setHandler(responseKey, handler, this);
      },

      removeHandler = function requestRemoveHandler(responsKey) {
        delete handlers[responsKey];
      },

      returnFn = function() {
        return request.apply(this, arguments);
      };

  $.extend(returnFn, {
    request: request,
    setHandler: setHandler,
    removeHandler: removeHandler,
    extend: function requestExtend(obj) {
      obj.request = request;
      obj.canHandle = objSetHandler;
      obj.removeHandler = removeHandler;
    }
  });

  return returnFn;
})();

module.exports = request;
