'use strict';

const { GlimmerApp } = require('@glimmer/application-pipeline');
const { log } = require('broccoli-stew');
const commonjs = require('rollup-plugin-commonjs');
const Funnel = require('broccoli-funnel');
const merge = require('broccoli-merge-trees');
const replace = require('broccoli-string-replace');

module.exports = function(defaults) {
  const app = new GlimmerApp(defaults, {
    'ember-cli-uglify': {
      uglify: {
        mangle: {
          safari10: true,
        },
      },
    },
    fingerprint: {
      assetMapPath: './asset-map.json',
      generateAssetMap: true,
      replaceExtensions: ['html', 'css', 'js', 'json'],
    },
    rollup: {
      plugins: [
        commonjs(),
      ],
    },
  });

  const workers = replace(
    new Funnel('workers', {
      srcDir: '/',
      destDir: '/',
      include: ['**/*.js'],
    }),
    {
      files: ['sw.js'],
      pattern: {
        match: /<@VERSION@>/g,
        replacement: require('./package.json').version,
      },
    }
  );

  return log(merge([app.toTree(), workers]), {
    output: 'tree',
    label: 'app-tree',
  });
};
