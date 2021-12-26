const { join } = require('path');

module.exports = {
  mode: 'jit',
  presets: [require('../../tailwind-workspace-preset.js')],
  content: [],
  purge: [
    join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, 'components/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
