import styled from 'styled-components'
const APP_THEME = require('../../theme')

export const FormHeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  //background: linear-gradient(90deg, #55B1DB 0%, #216CC4 100%);
  border-radius: ${APP_THEME.BORDER_RADIUS_BASE} ${APP_THEME.BORDER_RADIUS_BASE} 0 0;
  padding: 8px;
  border-bottom: 1px solid ${APP_THEME.BORDER_COLOR_BASE};
`
export const FormHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  img {
    cursor: pointer;
  }
`
export const FormHeaderRight = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1.4rem;
  color: ${APP_THEME.PRIMARY_COLOR};
  padding-right: 16px;
`