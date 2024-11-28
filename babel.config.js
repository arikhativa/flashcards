module.exports = function (api) {
  api.cache(true);
  const plugins = ['react-native-reanimated/plugin'];

  if (process.env.NODE_ENV !== 'development') {
    plugins.push('babel-plugin-transform-remove-console');
  }

  return {
    presets: ['babel-preset-expo'],
    plugins:plugins,
  };
};
