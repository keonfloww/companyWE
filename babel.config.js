module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        root: ['.'],
        alias: {
          '@api': './src/api',
          '@assets': './src/assets',
          '@screens': './src/screens',
          '@components': './src/components',
          '@navigation': './src/navigation',
          '@hooks': './src/hooks',
          '@i18n': './src/i18n',
          '@redux': './src/redux',
          '@routes': './src/routes',
          '@services': './src/services',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@layouts': './src/layouts',
        },
      },
    ],
  ],
};
