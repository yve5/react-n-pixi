module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    'global-require': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-template-curly-in-string': 'off',
    'no-restricted-globals': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/destructuring-assignment': 'off',
    'react/forbid-prop-types': 'off',
    'react/prop-types': 'off',
    'react/no-danger': 'off',
    'object-curly-newline': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-wrap-multilines': 'off',
    camelcase: 'off', // Not interesting because of API logical and vocabulary
    indent: 'off',
    'implicit-arrow-linebreak': 'off',
    'no-confusing-arrow': 'off',
    'function-paren-newline': 'off',
    'operator-linebreak': 'off',
    'no-shadow': 'off',
    'max-len': 'off',

    'arrow-body-style': ['warn', 'as-needed'],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    radix: ['warn', 'as-needed'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
    'react/button-has-type': 'error',
    'comma-dangle': ['warn', 'only-multiline'],
    eqeqeq: 'error',
    'react/function-component-definition': [
      'warn',
      { namedComponents: 'arrow-function' },
    ],
    'no-underscore-dangle': [
      'error',
      {
        allow: ['__REDUX_DEVTOOLS_EXTENSION__'],
      },
    ],
    'react/jsx-indent': [
      'warn',
      2,
      { checkAttributes: false, indentLogicalExpressions: false },
    ],

    'no-trailing-spaces': 'warn',
    'no-unused-vars': 'warn',
    'no-multiple-empty-lines': 'warn',
    'prefer-const': 'warn',
    indent: 'warn',
  },
  settings: {
    'import/extensions': ['.js', '.jsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
