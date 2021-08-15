const path = require('path')

module.exports = {
  style: {
    sass: {
      mode: 'extends',
      loaderOptions: (sassLoaderOptions) => ({
        ...sassLoaderOptions,
        additionalData: `@import "styles/global.scss";`,
      }),
    },
  },
  webpack: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
}
