module.exports = function(config) {
  config.set({
    files: [
      'tests/**/*.spec.js'
    ],
    frameworks: ['browserify', 'jasmine'],
    preprocessors: {
      'tests/**/*.spec.js': ['browserify']
    },
    browsers: ['PhantomJS'/*, 'Chrome' */],
    reporters: ['spec', 'failed'],
    browserify: {
      debug: true,
      paths: ['src/js/', 'src/templates/']
    }
  });
};
