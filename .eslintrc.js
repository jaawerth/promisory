'use strict';

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  ecmaFeatures: { impliedStrict: false },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'script',
  },
  rules: {
    quotes: ['error', 'single', {
      allowTemplateLiterals: true,
      avoidEscape: true,
    }],
    strict: ['warn', 'global'],
  },
};
