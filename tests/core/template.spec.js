var template = require('core/template.js'),
    templateHTML = "<div>{{foo}} {{bing}}</div>",
    templateHTMLWithSpaces = "<div>{{ foo }} {{    bing      }}</div>",
    renderedTemplate = "<div>bar boom</div>",
    data = {foo: 'bar', bing: "boom"};

describe("Template Core Lib", function(){
  it("should return a template method", function(){
    expect(typeof template).toBe("function");
  });

  it("should return a render method when called", function(){
    var tmpl = template(templateHTML);
    expect(tmpl.render).not.toBeUndefined();
    expect(typeof tmpl.render).toBe("function");
  });

  it("should throw an error if no HTML is provided", function(){
    expect(template).toThrow();
  });

  it("should render a template with data", function(){
    var tmpl = template(templateHTML);
    expect(tmpl.render(data)).toBe(renderedTemplate);
  });

  it("should be able to handle spaces in the tokens", function(){
    var tmpl = template(templateHTMLWithSpaces);
    expect(tmpl.render(data)).toBe(renderedTemplate);
  });
});
