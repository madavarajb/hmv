import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import unusedImports from "eslint-plugin-unused-imports";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";

export default defineConfig([
    js.configs.recommended,
    pluginReact.configs.flat.recommended,

    {
        files: ["**/*.{js,mjs,cjs,jsx}"],

        plugins: {
            "unused-imports": unusedImports,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            prettier,
        },

        languageOptions: {
            globals: globals.browser,
        },

        rules: {
            // React Hooks
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "error",

            // React Refresh
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

            // Remove unused imports automatically
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_",
                },
            ],

            // React
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",

            // Prettier (only if installed properly)
            "prettier/prettier": "error",
        },
    },
]);
