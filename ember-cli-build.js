'use strict';

const GlimmerApp = require('@glimmer/application-pipeline').GlimmerApp;
const commonjs = require('rollup-plugin-commonjs');

module.exports = function(defaults) {
  let app = new GlimmerApp(defaults, {
    rollup: {
       plugins: [
         commonjs(),
       ],
     },
  });

  return app.toTree();
};
