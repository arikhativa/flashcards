module.exports = function (api) {
  api.cache(true);
  const presets = [];
  const plugins = ['react-native-reanimated/plugin'];

  if (process.env.NODE_ENV !== 'development') {
    plugins.push('babel-plugin-transform-remove-console');
  }
  // if (process.env.NODE_ENV === 'development') {
  //   presets.push({
  //     jsxImportSource: "@welldone-software/why-did-you-render",
  //   });
  // }

  return {
    presets: ['babel-preset-expo',
      [
        '@babel/preset-react',
        {
          importSource: '@welldone-software/why-did-you-render',
          development: process.env.NODE_ENV === 'development' || false,
        },
      ],
    ],
    plugins:plugins,
  };
};
