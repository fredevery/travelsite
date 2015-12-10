var fn = require('helpers/fn.js');

describe("Function Helper", function(){
  it("should have a bind method availabe", function(){
    expect(fn.bind).not.toBeUndefined();
  });
});

describe("Function Bind", function(){
  it("should bind a function and return the bound function", function(){
    var boundFn = fn.bind(function(){}, {});
    expect(typeof boundFn).toBe("function");
  });

  it("should bind the context as the function scope", function(){
    var context = {foo: 'bar'},
        boundFn = fn.bind(function(){ return this; }, context);

    expect(boundFn()).toBe(context);
  });
});
