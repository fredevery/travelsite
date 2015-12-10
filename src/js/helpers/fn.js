var bind = function bind(fn, context) {
  if( typeof fn !== 'function' ) {
    throw new TypeError("The supplied function is not callable");
  }

  var args = [].slice.call(arguments, 2),
      fnNOP, fnBound;

  fnNOP = function(){};
  fnBound = function() {
    return fn.apply(context, args.concat([].slice.call(arguments)));
  };

  if (fn.prototype) {
    fnNOP.prototype = fn.prototype;
  }

  fnBound.prototype = new fnNOP();

  return fnBound;
};

module.exports = {
  bind: bind
};
