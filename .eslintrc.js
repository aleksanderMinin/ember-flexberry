module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
  },
  overrides: [
    // node files
    {
      files: [
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js'
      ],
      excludedFiles: [
        'addon/**',
        'addon-test-support/**',
        'app/**',
        'tests/dummy/app/**'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        // add your custom rules and overrides for node files here
      })
    },

    // models of dummy application
    {
      files: [
        'tests/dummy/app/models/**/*.js',
        'tests/dummy/app/locales/**/*.js',
      ],
      rules: {
        'ember/avoid-leaking-state-in-ember-objects': 'off'
      }
    },

    {
      files: [
        'tests/integration/components/flexberry-ddau-checkbox-test.js',
      ],
      rules: {
        'ember/new-module-imports': 'off'
      }
    },

    {
      files: [
        'addon/components/flexberry-objectlistview.js',
        'addon/components/object-list-view-row.js',
        'addon/components/object-list-view.js',
        'addon/components/olv-toolbar.js',
      ],
      rules: {
        'ember/closure-actions': 'off'
      }
    },
  ]
};
