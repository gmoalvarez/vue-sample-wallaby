const wallabyWebpack = require('wallaby-webpack')
var webpackConfig = require('./webpack.test.js')

module.exports = function (wallaby) {
  webpackConfig.module.rules = webpackConfig.module.rules.filter(r => !'.ts'.match(r.test) && !'.js'.match(r.test));
  webpackConfig.module.rules.find(r => r.loader === 'vue-loader').options.loaders.js = '';
  webpackConfig.resolve.extensions = ['.js', '.ts', '.vue', '.json'];
  
  const wallabyPostprocessor = wallabyWebpack(webpackConfig)

  return {
    files: [
      {pattern: 'node_modules/chai/chai.js', instrument: false},
      {pattern: 'node_modules/sinon/pkg/sinon.js', instrument: false},
      {pattern: 'src/**/*.*', load: false},
      { pattern: 'src/**/*.spec.ts', ignore: true }
    ],

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript({module: 'es2015', target: 'ES5'})
    },

    preprocessors: {
      '**/*.vue': f => f.content.replace('lang="ts"', '').replace('.ts', '.js')
    },

    tests: [
      {pattern: 'src/**/*.spec.ts', load: false},
    ],

    postprocessor: wallabyPostprocessor,
    testFramework: 'mocha',
    setup: function () {
      window.__moduleBundler.loadTests()
      window.expect = chai.expect
      window.sinon = sinon
      var should = chai.should()
    },
    debug: true
  }
}
