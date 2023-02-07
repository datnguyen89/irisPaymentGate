import React from 'react'
import viVN from 'antd/lib/locale/vi_VN'
import moment from 'moment'
import 'moment/locale/vi'
import { ConfigProvider, notification } from 'antd'

moment.locale('vi')

notification.config({
  duration: 5,
  top: 60,
  maxCount: 1,
  placement: 'top',
})

const ThemeProvider = props => {
  const { children } = props

  return (
    <ConfigProvider
      locale={viVN}
      getPopupContainer={node => {
        if (node) {
          return node.parentNode
        }
        return document.body
      }}
    >
      {children}
    </ConfigProvider>

  )
}

ThemeProvider.propTypes = {}

export default ThemeProvider