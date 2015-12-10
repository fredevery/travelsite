var mediator = require('core/mediator');

describe("Core Mediator", function(){
  var obj;

  beforeEach(function(){
    obj = {
      args: {
        foo: 'bar'
      },
      callback: function(){}
    };

    spyOn(obj, 'callback');
    mediator.extend(obj);

    obj.subscribe('testSub', obj.callback);
    mediator.publish('testSub', 123);
    mediator.publish('testSub', obj.args, "indeed");
  });

  it("should exist", function(){
    expect(mediator).not.toBeUndefined();
  });

  it("should have publish, subscribe, and extend methods", function(){
    expect(mediator.publish).not.toBeUndefined();
    expect(mediator.subscribe).not.toBeUndefined();
    expect(mediator.extend).not.toBeUndefined();
  });

  it("should be able extend another object", function(){
    expect(obj.publish).not.toBeUndefined();
    expect(obj.subscribe).not.toBeUndefined();
  });

  it("should execute subscription callbacks", function(){
    expect(obj.callback).toHaveBeenCalledWith(123);
    expect(obj.callback).toHaveBeenCalledWith(obj.args, "indeed");
  });

  it("should allow objects to unsubscribe", function(){

    mediator.publish('testSub', 'xyz');
    expect(obj.callback).toHaveBeenCalledWith('xyz');
    expect(obj._subscriptions.testSub).not.toBeUndefined();

    obj.unsubscribe('testSub');
    mediator.publish('testSub', 'foo');

    expect(obj.callback).not.toHaveBeenCalledWith('foo');
    expect(obj._subscriptions.testSub).toBeUndefined();
  });
});
