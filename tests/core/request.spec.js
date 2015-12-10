var request = require('core/request.js');

describe("Core Request - Direct Interface", function(){

  it("should exist", function(){
    expect(request).not.toBeUndefined();
    expect(typeof request).toBe("function");
    expect(request.setHandler).not.toBeUndefined();
    expect(request.removeHandler).not.toBeUndefined();
    expect(request.extend).not.toBeUndefined();
  });

  it("should throw if it doesn't get a function as a handler", function(){
    var setInvalidHandler = function(){
      return request.setHandler("bingo", 123);
    };
    expect(setInvalidHandler).toThrow();
  });

  it("should be able to be used directly", function(){
    request.setHandler("baz", function(){ return "zinga"; });
    expect(request("baz")).toBe("zinga");
  });

  it("should be pass on arguments to handler", function(){
    request.setHandler("add", function(x,y){
      return x + y;
    });
    expect(request("add", 1, 2)).toBe(3);
  });

  it("should remove handlers when needed", function(){
    request.setHandler("zing", function(){ return true; });
    expect(request("zing")).toBe(true);
    request.removeHandler("zing");
    expect(request("zing")).toBe(false);
  });

});


describe("Core Request - Obj Interface", function(){
  var obj;

  beforeEach(function(){
    obj = {
      fooHandler: function foo() {
        return "bar";
      }
    };

    request.extend(obj);
    obj.canHandle("foo", "fooHandler");
  });

  afterEach(function(){
    request.removeHandler("foo");
  });

  it("should extend the obj", function(){
    expect(obj.request).not.toBeUndefined();
    expect(obj.canHandle).not.toBeUndefined();
    expect(obj.removeHandler).toBe(request.removeHandler);
  });

  it("should preserve scope", function(){
    var obj2 = {foo: "bar", handler: function(){ return this; }};
    request.extend(obj2);
    obj2.canHandle("raz", "handler");
    expect(request("raz")).toBe(obj2);
  });

  it("should be able to work between objects", function(){
    var obj2 = {};
    request.extend(obj2);
    expect(obj2.request("foo")).toBe("bar");
  });

});
