module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./packages/*/tsconfig.json"],
  },
  rules: {
    "prettier/prettier": ["error", { parser: "typescript" }],
    "max-len": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "react/react-in-jsx-scope": "off",
    "func-style": ["error", "declaration", { allowArrowFunctions: true }],
    "@typescript-eslint/no-unused-vars": "error",
    "react/prop-types": "off",
  },
  overrides: [
    {
      files: ["**/*.stories.*"],
      rules: {
        "import/no-anonymous-default-export": "off",
      },
    },
  ],
};
