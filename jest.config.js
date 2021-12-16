module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  transform: {
    "^.+\\.vue$": "vue-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,vue,ts}",
    "!src/main.js",
    "!src/views/Register.vue*",
    "!src/views/Profile.vue*",
    "!src/store/state.ts",
    "!src/components/VideoForm.vue*",
  ],
  modulePathIgnorePatterns: [
    "src/main.ts",
    "src/store/index.ts",
    "src/store/state.ts",
    "src/views/Register.vue",
    "src/views/Profile.vue",
    "src/components/VideoForm.vue",
  ],
};
