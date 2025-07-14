// postcss.config.js or postcss.config.ts (ES module)
export default {
  plugins: {
    '@tailwindcss/postcss': {}, // ✅ FIX: use new plugin name
    autoprefixer: {},
  },
};
