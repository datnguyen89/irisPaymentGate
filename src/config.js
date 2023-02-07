const merge = require('lodash/merge')

const appConfig = {
  all: {
    env: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV !== 'production',
    basename: process.env.PUBLIC_URL,
    isBrowser: typeof window !== 'undefined',
  },
  development: {
    apiUrl: window.BASE_URL,
    appName: window.APP_NAME,
    walletName: window.WALLET_NAME,
    copyright: window.COPYRIGHT,
    reserved: window.RESERVED,
    supportPhoneLabel: window.SUPPORT_PHONE_LABEL,
    supportPhoneValue: window.SUPPORT_PHONE_VALUE,
    supportEmailLabel: window.SUPPORT_EMAIL_LABEL,
    supportEmailValue: window.SUPPORT_EMAIL_VALUE,
    appLogo: window.APP_LOGO,
    qrLogo: window.QR_LOGO,
  },
  production: {
    apiUrl: window.BASE_URL,
    appName: window.APP_NAME,
    walletName: window.WALLET_NAME,
    copyright: window.COPYRIGHT,
    reserved: window.RESERVED,
    supportPhoneLabel: window.SUPPORT_PHONE_LABEL,
    supportPhoneValue: window.SUPPORT_PHONE_VALUE,
    supportEmailLabel: window.SUPPORT_EMAIL_LABEL,
    supportEmailValue: window.SUPPORT_EMAIL_VALUE,
    appLogo: window.APP_LOGO,
    qrLogo: window.QR_LOGO,
  },
}
const config = merge(appConfig.all, appConfig[appConfig.all.env])

export default config