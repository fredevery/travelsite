var collection = require('core/collection.js'),
    collectionName = 'testCollect',
    collectionOptions = {
      url: '/'
    };

describe("Core Collection Lib", function(){
  var testCollection;

  beforeEach(function(){
    testCollection = collection(collectionName, collectionOptions);
  });

  it("should return a colleciton instance", function(){
    expect(testCollection).not.toBeUndefined();
  });

  it("should throw an error if name and/or options are omitted", function(){
    var collectionWithNoArgs = function() {
          return collection();
        },
        collectionWithInvalidName = function() {
          return collection(123, collectionOptions);
        },
        collectionWithNoOptions = function() {
          return collection(collectionName);
        };

    expect(collectionWithNoArgs).toThrow();
    expect(collectionWithInvalidName).toThrow();
    expect(collectionWithNoOptions).toThrow();
  });

  // it("should throw an error if required options aren't supplied", function(){
  //   var collectionWithMissingOptions = function() {
  //         return collection(collectionName, {});
  //       };
  //
  //   expect(collectionWithMissingOptions).toThrow();
  // });

  it("should have been extended by the mediator", function(){
    expect(testCollection._subscriptions).not.toBeUndefined();
  });
});
