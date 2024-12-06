module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    '@babel/plugin-transform-class-static-block',
    ['@babel/plugin-proposal-decorators', {legacy: true}],
  ],
  // TODO this was crushing the app on production
  // env: {
  //   production: {
  //     plugins: ['react-native-paper/babel'],
  //   },
  // },
};
