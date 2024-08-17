const moduleFileExtensions = [
  "web.mjs",
  "mjs",
  "web.js",
  "js",
  "web.ts",
  "ts",
  "web.tsx",
  "tsx",
  "json",
  "web.jsx",
  "jsx",
];

module.exports = {
  roots: ["<rootDir>"],
  testMatch: ["<rootDir>/.storybook/storyshots.test.ts"],

  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],

  moduleNameMapper: {
    "^react-native$": "react-native-web",
    "^d3-(.*)$": `d3-$1/dist/d3-$1`,
    "^d3$": `d3/dist/d3`,
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },

  moduleFileExtensions: [...moduleFileExtensions, "node"].filter(
    (ext) => !ext.includes("mjs"),
  ),

  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
};
