const path = require('path')

module.exports = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
        backgrounds: false,
        controls: false,
        docs: false,
        viewport: false,
        toolbars: false,
      },
    },
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
  ],
  // eslint-disable-next-line require-await
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    })

    config.module.rules.push({
      test: /\.pug$/,
      use: [{ loader: 'pug-plain-loader' }],
    })

    config.module.rules.push({
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true
          }
        }
      ]
    })

    config.resolve.extensions.push('.ts')

    const rootPath = path.resolve(__dirname, '..')
    config.resolve.alias['@'] = rootPath
    config.resolve.alias['~'] = rootPath

    return config
  },
}
