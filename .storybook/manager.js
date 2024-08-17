module.exports = {
  stories: [
    "../@(packages|entrypoints|web-components)/*/src/**/*@(.stories|.stories.skip).@(js|jsx|ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react",
    options: {},
  },
  features: {
    emotionAlias: false,
  },
};
