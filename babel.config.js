module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          'commons/*': ['./src/commons/*', './src/commons/*/index'],
          'component/*': ['./src/component/*', './src/component/*/index'],
          'assets/*': ['./src/assets/*', './src/assets/*/index'],
          'utils/*': ['./src/utils/*', './src/utils/*/index'],
          'store/*': ['./src/store/*', './src/store/*/index'],
          'hook/*': ['./src/hook/*', './src/hook/*/index'],
        },
      },
    ],
  ]
};
