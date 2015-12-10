var template   = require('core/template.js'),
    fn         = require('helpers/fn.js'),
    mediator   = require('core/mediator.js'),

    searchResults = {

      el: '#search-results-main',

      ui: {
        searchResults: '#search-results',
        searchResultsWrap: '.search-results-wrap'
      },

      collection: require('collections/search_results.js'),

      templates: {
        search: template( require('search_results/search.html') ),
        hotelListing: template( require('search_results/hotel_listing.html') )
      },

      collectionEvents: {
        'response' : 'handleCollectionResponse'
      },

      uiEvents: {
        'click .hotel-listing' : 'toggleExpandListing'
      },

      init: function searchResultsInit() {
        this._getUI();
        this._bindUiEvents();
        this._extendWithMediator();
        this._bindCollectionEvents();
        this.collection.fetch();
      },

      handleCollectionResponse: function searchResultsColResponse (response) {
        this._renderSearchResults(response.results.search_results);
      },

      toggleExpandListing: function searchResultsToggleListing (evnt) {
        var $target = $(evnt.currentTarget),
            targetExpanded = $target.data('expanded') || false;

        this.$el.toggleClass('expanded-listing', !targetExpanded);
        $target.data('expanded', !targetExpanded);
      },

      _renderSearchResults: function renderSearchResults(searchResults) {
        var resultLen = searchResults.length,
            docFragment = $(document.createDocumentFragment());

        for(var i = 0; i < resultLen; i++) {
          var resultData = searchResults[i],
              rating = resultData.rating.split('\n'),
              starCount = parseInt(resultData.stars);

          if(resultData.name === "") { continue; }

          resultData.rating = {
            label: rating[0],
            score: rating[1]
          };

          resultData.starCount = starCount;

          resultData.preferred = Math.round(Math.random()) > 0;
          resultData.smartDeal = Math.round(Math.random()) > 0;

          docFragment.append(this.templates.hotelListing.render(resultData));
        }

        $("#search-results .search-results-wrap").empty().append(docFragment);

      },

      _getUI: function searchResultsGetUI () {
        this.$el = $(this.el);
        this.$ = {};

        for(var uiKey in this.ui ) {
          this.$[uiKey] = this.$el.find(this.ui[uiKey]);
        }
      },

      _bindUiEvents: function searchResultsBindUI () {
        var eventKeySplit, eventType, selector,
            methodName, method;

        for(var eventKey in this.uiEvents) {
          eventKeySplit = eventKey.split(' ');
          eventType     = eventKeySplit.shift();
          selector      = eventKeySplit.join(' ');
          methodName    = this.uiEvents[eventKey];
          method        = this[methodName] || false;

          if (method) {
            this.$el.on(eventType, selector, fn.bind(method, this));
          }
        }
      },

      _extendWithMediator: function searchResultsMediator () {
        mediator.extend(this);
      },

      _bindCollectionEvents: function searchResultsColEvnts () {
        var collectionName = this.collection._name,
            methodName, method;

        for(var eventKey in this.collectionEvents) {
          methodName = this.collectionEvents[eventKey];
          method     = this[methodName] || false;

          if (method) {
            this.subscribe( collectionName + ":" + eventKey, fn.bind(method, this) );
          }
        }
      }

    };

$(document).ready( function() { searchResults.init(); } );
