var controller = require('core/controller.js'),
    controllerName = "testController",
    controllerOptions = {

    };

describe("Core Controller Lib", function(){
  var testController;

  beforeEach(function(){
    testController = controller(controllerName, controllerOptions);
  });

  it("should return a controller instance", function(){
    expect(testController).not.toBeUndefined();
    expect(testController.getName()).toBe(controllerName);
    expect(testController.getOptions()).toBe(controllerOptions);
  });
});
