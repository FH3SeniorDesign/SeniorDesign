module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  // Reference: https://reactnative.dev/docs/typescript#using-custom-path-aliases-with-typescript
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
        },
      },
    ],
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanImage'],
      },
    ],
  ],
};
