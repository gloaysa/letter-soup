module.exports = {
    "root": true,
    "parser": '@typescript-eslint/parser',
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "plugins": [
        '@typescript-eslint',
    ],
    "extends": [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    "ignorePatterns": ['webpack.config.js'],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
    },
    "rules": {
        "no-console": "off",
        "comma-dangle": "off",
        "react/jsx-filename-extension": "off"
    }
};
