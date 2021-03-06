module.exports = {
  env: {
    es2020: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:json/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-undef': 'off',
    'semi': ['error', 'never'],
    'curly': ['error', 'multi-or-nest'],
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', 'only-multiline'],
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'quote-props': ['error', 'consistent-as-needed'],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'array-bracket-newline': ['error', { multiline: true, minItems: 4 }],
    'quotes': [
      'error',
      'single',
      { avoidEscape: true },
    ],
    'array-element-newline': [
      'error',
      'consistent',
    ],
    'indent': [
      'error',
      2,
      {
        SwitchCase: 1,
        ObjectExpression: 'first',
        VariableDeclarator: 'first',
        flatTernaryExpressions: true,
        CallExpression: { arguments: 'first' },
        FunctionDeclaration: { parameters: 'first' },
      },
    ],
    'max-len': [
      'error',
      {
        code: 100,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreComments: true,
        ignoreStrings: false,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: false,
      },
    ],
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      }
    }
  ],
  ignorePatterns: [
    'node_modules/',
    '*.log*',
    'build/',
    '*.orig',
    'coverage/',
    'yarn.*',
    '*~'
  ],
}
