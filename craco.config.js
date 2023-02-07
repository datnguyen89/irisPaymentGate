const CracoLessPlugin = require('craco-less')
const APP_THEME = require('./src/theme')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': APP_THEME.PRIMARY_COLOR,
              '@primary-color-hover': APP_THEME.PRIMARY_COLOR_HOVER,
              '@primary-color-active': APP_THEME.PRIMARY_COLOR_ACTIVE,

              '@info-color': APP_THEME.INFO_COLOR,

              '@success-color': APP_THEME.SUCCESS_COLOR,

              '@warning-color': APP_THEME.WARNING_COLOR,

              '@error-color': APP_THEME.ERROR_COLOR,

              '@link-color': APP_THEME.LINK_COLOR,
              '@link-hover-color': APP_THEME.LINK_HOVER_COLOR,
              '@link-active-color': APP_THEME.LINK_ACTIVE_COLOR,

              '@font-size-base': APP_THEME.FONT_SIZE_BASE,

              '@alert-info-border-color': APP_THEME.ALERT_INFO_BORDER_COLOR,
              '@alert-info-bg-color': APP_THEME.ALERT_INFO_BG_COLOR,
              '@alert-info-icon-color': APP_THEME.INFO_COLOR,

              '@border-color-base': APP_THEME.BORDER_COLOR_BASE,

              '@border-radius-base': APP_THEME.BORDER_RADIUS_BASE,
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}