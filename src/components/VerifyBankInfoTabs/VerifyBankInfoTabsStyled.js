import styled from 'styled-components'
import APP_THEME from '../../theme'

export const VerifyBankInfoTabsWrapper = styled.div`
  margin: 16px 0;

  .ant-tabs-nav-list {
    flex-grow: 1;
  }

  .ant-tabs-tab {
    width: 50%;
    justify-content: center;
    margin: 0 !important;
  }

  .ant-tabs-nav-operations {
    display: none !important;
  }
  
  img {
    max-width: 100%;
    max-height: 100%;
  }
`
