import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import a11yRecommended from "eslint-plugin-jsx-a11y";
import prettierConfig from "eslint-config-prettier";

const a11y = {
  plugins: {
    "jsx-a11y": {
      rules: a11yRecommended.rules,
    },
  },
  // prettier-ignore
  /** @type {Record<string, any>} */
  rules: (a11yRecommended.configs.recommended.rules),
};

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  prettierConfig,
  a11y,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: ".",
      },
    },
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "react/react-in-jsx-scope": "off",
    },
  },
);
