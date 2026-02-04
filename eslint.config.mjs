import { defineConfig } from "eslint/config";
import eslintPlugin from "@eslint/js";
import { configs as tseslintConfigs } from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import nextPlugin from "@next/eslint-plugin-next";

// Global ignores
const ignoresConfig = defineConfig([
  {
    name: "project/ignores",
    ignores: [
      ".next/",
      "node_modules/",
      "out/",
      "build/",
      "public/",
      "next-env.d.ts",
    ],
  },
]);

// ESLint recommended rules
const eslintConfig = defineConfig([
  {
    name: "project/javascript-recommended",
    files: ["**/*.{js,mjs,ts,tsx}"],
    ...eslintPlugin.configs.recommended,
  },
]);

// TypeScript configuration
const typescriptConfig = defineConfig([
  {
    name: "project/typescript",
    files: ["**/*.{ts,tsx}"],
    extends: [...tseslintConfigs.recommended],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Allow unused vars with underscore prefix
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    name: "project/javascript-disable-type-check",
    files: ["**/*.{js,mjs,cjs}"],
    ...tseslintConfigs.disableTypeChecked,
  },
]);

// React and Next.js configuration
const reactConfig = defineConfig([
  {
    name: "project/react-next",
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      "@next/next": nextPlugin,
    },
    rules: {
      // React recommended rules
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      // React Hooks rules
      ...reactHooksPlugin.configs.recommended.rules,
      // Disable the new strict setState-in-effect rule (common pattern for prop sync)
      "react-hooks/set-state-in-effect": "off",
      // Accessibility rules (set to warn to avoid blocking commits)
      ...jsxA11yPlugin.configs.recommended.rules,
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-noninteractive-element-interactions": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
      // Next.js rules
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      // Customizations
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);

// Config files override (Node.js environment for CommonJS)
const configFilesConfig = defineConfig([
  {
    name: "project/config-files",
    files: ["jest.config.js", "*.config.js", "jest.setup.js"],
    languageOptions: {
      globals: {
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        process: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off",
    },
  },
]);

export default defineConfig([
  ...ignoresConfig,
  ...eslintConfig,
  ...typescriptConfig,
  ...reactConfig,
  ...configFilesConfig,
]);
