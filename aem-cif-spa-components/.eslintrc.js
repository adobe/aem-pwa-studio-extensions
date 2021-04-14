// eslint-disable-next-line header/header
const headerBlock = [
    '******************************************************************************',
    ' *',
    {
        pattern: ' *    Copyright 20\\d{2} Adobe. All rights reserved.',
        template: ' *    Copyright 2021 Adobe. All rights reserved.',
    },
    ' *    This file is licensed to you under the Apache License, Version 2.0 (the "License");',
    ' *    you may not use this file except in compliance with the License. You may obtain a copy',
    ' *    of the License at http://www.apache.org/licenses/LICENSE-2.0',
    ' *',
    ' *    Unless required by applicable law or agreed to in writing, software distributed under',
    ' *    the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS',
    ' *    OF ANY KIND, either express or implied. See the License for the specific language',
    ' *    governing permissions and limitations under the License.',
    ' *',
    ' *****************************************************************************',
];

// eslint-disable-next-line no-undef
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    env: {
        browser: true,
        es6: true
    },
    plugins: ['react', 'react-hooks', 'header'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    rules: {
        'no-useless-escape': 'off',
        'no-console': ['warn', {allow: ['error', 'warn']}],
        'no-undef': 'off',
        'no-unused-vars': 'warn',
        'header/header': [2, 'block', headerBlock],
        'no-var': 'error',
        'one-var': ['error', 'never'],
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        // override the default which is more restrictive
        'react/prop-types': ['warn', {ignore: ['children']}],
        strict: ['error', 'global']
    },
};