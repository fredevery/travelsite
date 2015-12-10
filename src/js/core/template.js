var fn = require('helpers/fn.js'),

    template = function template (templateHTML) {
      if (typeof templateHTML !== "string") {
        throw new Error("It seems that no html was given for this template, or the html was invalid");
      }

      return {
        render: fn.bind( render, {
          templateHTML: templateHTML,
          tokenKeyMap: _tokenizeTemplate(templateHTML)
        })
      };
    },

    render = function render (data) {
      var renderedTemplate = this.templateHTML,
          token, tokenKey, value;

      for (token in this.tokenKeyMap) {
        tokenKey = this.tokenKeyMap[token];
        value = _getValue(tokenKey, data);
        renderedTemplate = renderedTemplate.replace(token, value, 'g' );
      }

      return renderedTemplate;
    },

    _getValue = function(key, data) {
      var keyParts = key.split('.'),
          value = data,
          valKey;

      for(var i = 0; i < keyParts.length; i++) {
        valKey = keyParts[i];
        if(value[valKey]) {
          value = value[valKey];
        } else {
          break;
        }
      }

      if(value === data) { value = ''; }
      if(value.toString) { value = value.toString(); }

      return value.replace('\n', ' ', 'g');
    },

    _tokenizeTemplate = function _tokenizeTemplate ( templateHTML ) {

      var tokenRegex = /{{(.*?)}}/g,
          keyRegex = /{{(.*)}}/,
          tokens = templateHTML.match(tokenRegex),
          tokenKeyMap = {},
          tokenLength = tokens ? tokens.length : 0,
          i, token, tokenKey;

      for (i = 0; i < tokenLength; i++) {
        token = tokens[i];
        tokenKey = token.match(keyRegex)[1].replace(/\s/g, '');
        tokenKeyMap[token] = tokenKey;
      }

      return tokenKeyMap;

    };

module.exports = template;
