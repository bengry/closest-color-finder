import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  presets: ['@shadow-panda/preset'],
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  emitPackage: true,
  outdir: '@shadow-panda/styled-system',
  jsxFramework: 'react',
  theme: {
    extend: {},
  },
  staticCss: {
    recipes: {
      // Load toast variant styles since it cannot be statically analyzed
      toast: [{ variant: ['*'] }],
    },
  },
});
