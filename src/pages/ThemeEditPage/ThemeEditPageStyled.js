import styled from 'styled-components'
import { Button } from 'antd'

export const ThemeEditPageWrapper = styled.div`
  padding: 32px;
`
export const TestButton = styled(Button)`
  background: ${props => props.primary};
  border-color: ${props => props.primary};  
  &:hover, &:active, &:focus {
    background: ${props => props.primary};
    border-color: ${props => props.primary};
  }
`
export const CheckThemeComponent = styled.div`
  width: 128px;
  height: 128px;
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${props => props.primary};

  &:hover {
    background: ${props => props.primaryHover};
  }

  &:active {
    background: ${props => props.primaryActive};
  }
`
export const CheckThemeNotice = styled.div`
  font-size: 24px;
  color: ${props => props.primary};
`
export const CheckThemeLink = styled.a`
  font-size: 24px;
  color: ${props => props.primary};

  &:hover {
    color: ${props => props.primaryHover};
  }

  &:active {
    color: ${props => props.primaryActive};
  }
`