module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/fonts'],
  devServer: {
    proxy: {
      '/*': {
        target: `http://192.168.1.1:5000`,
      },
    },
  },
  dependencies: {},
};
