module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:prettier/recommended', 'airbnb'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'array-callback-return': 'off',
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'react/react-in-jsx-scope': 'off',
    'import/no-unresolved': 'off',
    'import/no-anonymous-default-export': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true
      }
    ],
    'react/jsx-filename-extension': 'off',
    'comma-dangle': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['function-declaration', 'arrow-function'],
        unnamedComponents: 'arrow-function'
      }
    ],
    'object-curly-newline': [
      'error',
      {
        ObjectPattern: {
          multiline: true
        }
      }
    ],
    'linebreak-style': ['error', 'windows'],
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true
      }
    ],
    'no-unused-vars': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'jsx-a11y/control-has-associated-label': [
      'off',
      {
        labelComponents: [],
        labelAttributes: [],
        controlComponents: [],
        assert: 'both',
        depth: 25
      }
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        components: [],
        required: {
          some: ['nesting', 'id']
        },
        allowChildren: false
      }
    ]
  }
};
