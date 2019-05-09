module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        rootPathSuffix: 'src',
      },
    ],
  ],
  env: {
    productions: {
      plugins: [
        'babel-plugin-root-import',
        {
          rootPathSuffix: 'src',
        },
      ],
    },
  },
};
