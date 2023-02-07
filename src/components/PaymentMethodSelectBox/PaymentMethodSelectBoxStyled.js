import styled from 'styled-components'

const APP_THEME = require('../../theme')

export const PaymentMethodSelectBoxWrapper = styled.div`
  user-select: none;
  // Collapse
  .ant-collapse-header {
    padding: 16px !important;
    border: 1px solid #D8D8D8;
    border-radius: ${APP_THEME.BORDER_RADIUS_BASE} !important;
  }

  .ant-collapse-item {
    margin-bottom: 8px;
  }

  .ant-collapse-expand-icon {
    color: ${APP_THEME.PRIMARY_COLOR};
  }

  .ant-collapse-item-active .ant-collapse-expand-icon {

  }

  .ant-collapse-item-active .ant-collapse-header,
  .ant-collapse-header:hover {
    border: 1px solid ${APP_THEME.BORDER_COLOR_ACTIVE};
    //background: linear-gradient(180deg, #FFFFFF 0%, #E9F5FF 100%);
    box-shadow: 0 4px 8px rgba(7, 94, 165, 0.2);
  }

  // Alert
  .ant-alert-message {
    line-height: 16px;
    padding: 0 8px;
  }

  .ant-alert.ant-alert-info {
    border-radius: ${APP_THEME.BORDER_RADIUS_BASE};

    .anticon {
      font-size: 1.6rem;
    }
  }
`
export const PanelHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;  
`
export const PanelHeaderTitle = styled.div`
  font-size: 1.4rem;
`