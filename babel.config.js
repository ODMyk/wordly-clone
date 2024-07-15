module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['react-native-reanimated/plugin'],
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
          '@app': './src/App.tsx',
          '@components': './src/components',
          '@navigation': './src/navigation',
          '@services': './src/services',
          '@screens': './src/screens',
          '@images': './src/assets/images/index',
          '@svg': './src/assets/svg',
          '@store': './src/store',
        },
      },
    ],
  ],
};
