module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
    disableTelemetry: true,
  },
  staticDirs: ['../src/themes/tvh/assets'],
  webpackFinal: async (config, { configType }) => {
    // remove svg from existing rule
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;
    // Add SVGR Loader
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    // Memory leak https://github.com/storybookjs/storybook/issues/6408#issuecomment-648197797
    config.optimization = {
      minimize: false,
      minimizer: [],
    };

    return config;
  },
};
