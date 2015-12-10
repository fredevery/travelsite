// The dependencies
var $ = require('vendor/jquery-2.1.4.js'),
    mediator = require('core/mediator.js'),
    fn = require('helpers/fn.js'),
    request = require('core/request.js');

var collection = function collectionFactory(name, options) {
      // The STATICS
  var REQUIRED_OPTIONS = {
        // url: "string"
      },

      MEDIATOR_CHANNEL = name,

      // The rest of the variables
      reqsLen = REQUIRED_OPTIONS.length,
      optionKey, option, Collection;

  // The error checking.
  if(typeof name !== 'string') {
    throw new Error("COLLECTION: No name was given for this collection");
  }

  if(typeof options !== 'object') {
    throw new Error("COLLECTION: No options were given for this collection");
  }

  for( optionKey in REQUIRED_OPTIONS ) {
    option = options[optionKey] || false;

    if (!option || typeof option !== REQUIRED_OPTIONS[optionKey]) {
      throw new Error("COLLECTION: Missing a required option - " + optionKey);
    }
  }

  // The meat and potatoes.
  Collection = function collectionConstructor(){
    $.extend(this, {
      _name: name,
      _options: options
    });
  };

  $.extend(Collection.prototype, {
    fetch: function collectionApiFetch (params) {
      $.ajax(options.fetchOptions).done(function(response){
        mediator.publish(MEDIATOR_CHANNEL + ':response', response);
      });
    }
  });

  mediator.extend(Collection.prototype);

  return new Collection();

};

module.exports = collection;
