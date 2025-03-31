module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "airbnb-base",
    ],
    overrides: [
        {
            rules: {
                "no-shadow": "off",
                "no-plusplus": "off",
                "@typescript-eslint/no-shadow": ["error"],
                "@typescript-eslint/no-var-requires": "off",
                "no-use-before-define": ["off"],
                "global-require": ["off"],
                "no-restricted-syntax": ["off"],
                "linebreak-style": ["error", "unix"],
                "import/prefer-default-export": ["off"],
                "import/extensions": ["off"],
                "import/no-unresolved": ["off"],
                "prefer-destructuring": ["off"],
                "func-names": ["off"],
                "import/no-extraneous-dependencies": ["error", { devDependencies: ["**/*.test.ts"] }],
                indent: ["error", 4, {"SwitchCase": 1}],
                "no-await-in-loop": ["off"],
                "no-tabs": ["off"],
                "max-len": ["error", { code: 250, ignoreStrings: true, ignoreTemplateLiterals: true }],
                "max-params": ["error", 10],
                quotes: ["error", "double"],
                "import/order": [
                    "error",
                    {
                        groups: [
                            "builtin",
                            "external",
                            "internal",
                            ["sibling", "parent", "index"],
                        ],
                        "newlines-between": "always",
                        alphabetize: {
                            order: "asc",
                            caseInsensitive: true,
                        },
                    },
                ],
            },
            files: ["**/*.ts", "**/*.tsx", "**/*.js"],
            env: { browser: true, es6: true, node: true },
            extends: [
                "eslint:recommended",
                "plugin:@typescript-eslint/eslint-recommended",
                "plugin:@typescript-eslint/recommended",
            ],
            parser: "@typescript-eslint/parser",
            parserOptions: {
                ecmaFeatures: { jsx: true },
                ecmaVersion: 2021,
                sourceType: "module",
            },
            plugins: ["@typescript-eslint", "import"],
        },
    ],
};
