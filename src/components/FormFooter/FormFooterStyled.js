import styled from 'styled-components'

const APP_THEME = require('../../theme')

export const FormFooterWrapper = styled.div`
  border-top: 1px solid #CFCFCF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  margin-top: 8px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`
export const FormFooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  a {
    color: #333;

    &:hover {
      color: ${APP_THEME.LINK_HOVER_COLOR};
    }
  }
`
export const ContactPhone = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.4rem;
`
export const ContactEmail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.4rem;
`
export const FormFooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`