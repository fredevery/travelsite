// Addapted from implementation found here:
// http://addyosmani.com/largescalejavascript/#mediatorpattern

var mediator = (function(){
  var channels = {},

      _sid = -1,

      subscribe = function mediatorSubscribe (channel, id, fn, context) {
        var subscription;

        if (typeof id === "function") {
          fn = id;
          context = fn;
          id = null;
        }

        context = context || this;

        if (!channels[channel]) {
          channels[channel] = [];
        }

        subscription = {
          id: id,
          context: context,
          callback: fn,
          _sid: _sid++
        };

        channels[channel].push(subscription);

        if( this._subscriptions ) {
          this._subscriptions[channel] = this._subscriptions[channel] || [];
          this._subscriptions[channel].push(subscription);
        }

        return this;
      },

      publish = function mediatorPublish(channel) {
        if(!channels[channel]){ return false; }

        var args = [].slice.call(arguments, 1);

        for (var i = 0, len = channels[channel].length; i < len; i++ ) {
          var subscription = channels[channel][i];
          subscription.callback.apply(subscription.context, args);
        }
      },

      unsubscribe = function mediatorUnsubscribe(channel) {
        if(!channels[channel] && !(this._subscriptions && this._subscriptions[channel])){ return false; }

        var subscriptions = this._subscriptions[channel],
            subLen = subscriptions.length,
            subscription, channelSubIndex;

        for(var i = 0; i < subLen; i++) {
          subscription = subscriptions[i];
          channelSubIndex = channels[channel].indexOf(subscription);
          channels[channel].splice(channelSubIndex, 1);
          delete this._subscriptions[channel];
        }
      };

  return {
    publish: publish,
    subscribe: subscribe,
    extend: function mediatorExtend(obj) {
      obj._subscriptions = {};
      obj.publish = publish;
      obj.subscribe = subscribe;
      obj.unsubscribe = unsubscribe;
    }
  };
})();

module.exports = mediator;
