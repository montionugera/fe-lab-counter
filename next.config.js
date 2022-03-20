const withSass = require('@zeit/next-sass')
const withLess = require('@zeit/next-less')
const withCSS = require('@zeit/next-css')

const isProd = process.env.NODE_ENV === 'production'

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {}
}

module.exports = {
  isProd,
  ...withCSS({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]',
    },
    ...withLess(
      withSass({
        lessLoaderOptions: {
          javascriptEnabled: true,
        },
      }),
    ),
  }),
  i18n: {
    localeDetection: false,
    defaultLocale: 'th',
    locales: ['en', 'th'],
  },
  env: {
    customKey: isProd ? 'prd-value' : 'non-prd-value',
    userServiceURL: isProd
      ? 'https://user-svc.api.joymify.com'
      : 'http://localhost:3000',
    appURL: isProd ? 'https://user-svc.joymify.com' : 'http://localhost:3005',
  },
}
