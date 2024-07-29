import globals from 'globals';
import pluginJs from '@eslint/js';
// @ts-ignore
import tailwindcss from 'eslint-plugin-tailwindcss';

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      tailwindcss,
    },
    rules: {
      ...tailwindcss.configs.recommended.rules,
    },
  },
];
