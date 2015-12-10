var collection = require('core/collection'),

    searchResultsCollection = collection('searchResultsCollection', {
      fetchOptions: {
        url: "https://www.kimonolabs.com/api/3t46hhke?apikey=12bf3df8839c9952631acb2ef4330f80",
        crossDomain: true,
        dataType: "jsonp"
      }
    });

module.exports = searchResultsCollection;
