import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.git/**',
      'build/**',
      'coverage/**',
      '.cache/**',
      '*.log'
    ]
  },
  {
    files: ['**/*.{js,jsx}'],
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      ecmaVersion: 2022, // Modern JS support
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Only include essential rules for performance
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Disable expensive rules for development
      'import/no-cycle': 'off',
      'import/no-deprecated': 'off',
      'import/no-named-as-default': 'off',
    },
  },
]
