import styled, { css } from 'styled-components'

const APP_THEME = require('../../theme')

export const TestWrapper = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
`
export const BorderBoxWrapper = styled.div`
  padding: 16px;
  border-radius: ${props => props.borderRadius};
  ${(props) => {
    switch (props.active) {
      case true:
        return css`
          border: 1px solid ${props.borderActive};
          background: ${props.backgroudActive};
        `
      default:
        return css`
          border: 1px solid ${props.borderBase};
        `
    }
  }}
`

export const WhiteShadowBox = styled.div`
  background: #FFFFFF;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  border-radius: ${props => props?.borderRadius ? props?.borderRadius : APP_THEME.BORDER_RADIUS_BASE};
  width: ${props => props?.width ? props?.width : 'auto'};
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
`
export const CommonSpan = styled.span`
  color: ${props => props.color || '#333'};
  font-weight: ${props => props.fontWeight || '300'};
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
  font-size: ${props => props.fontSize || 'inherit'};
  cursor: ${props => props.cursor || 'auto'};
  white-space: ${props => props.whiteSpace ? props.whiteSpace : 'normal'};
  word-wrap: ${props => props.wordWrap ? props.wordWrap : 'normal'};
`
export const CommonP = styled.p`
  text-align: ${props => props.textAlign ? props.textAlign : 'left'};
  color: ${props => props.color || '#333'};
  font-weight: ${props => props.fontWeight || '300'};
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
  font-size: ${props => props.fontSize || 'inherit'};
  cursor: ${props => props.cursor || 'auto'};
  white-space: ${props => props.whiteSpace ? props.whiteSpace : 'normal'};
  word-wrap: ${props => props.wordWrap ? props.wordWrap : 'normal'};
`
export const CommonH1 = styled.h1`
  text-align: ${props => props.textAlign ? props.textAlign : 'left'};
  color: ${props => props.color || '#333'};
  font-weight: ${props => props.fontWeight || '500'};
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
  font-size: ${props => props.fontSize || 'inherit'};
  cursor: ${props => props.cursor || 'auto'};
  white-space: ${props => props.whiteSpace ? props.whiteSpace : 'normal'};
  word-wrap: ${props => props.wordWrap ? props.wordWrap : 'normal'};
`
export const CommonH2 = styled.h2`
  text-align: ${props => props.textAlign ? props.textAlign : 'left'};
  color: ${props => props.color || '#333'};
  font-weight: ${props => props.fontWeight || '400'};
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
  font-size: ${props => props.fontSize || 'inherit'};
  cursor: ${props => props.cursor || 'auto'};
  white-space: ${props => props.whiteSpace ? props.whiteSpace : 'normal'};
  word-wrap: ${props => props.wordWrap ? props.wordWrap : 'normal'};
`
export const CommonH3 = styled.h3`
  text-align: ${props => props.textAlign ? props.textAlign : 'left'};
  color: ${props => props.color || '#333'};
  font-weight: ${props => props.fontWeight || '400'};
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
  font-size: ${props => props.fontSize || 'inherit'};
  cursor: ${props => props.cursor || 'auto'};
  white-space: ${props => props.whiteSpace ? props.whiteSpace : 'normal'};
  word-wrap: ${props => props.wordWrap ? props.wordWrap : 'normal'};
`
export const CommonH4 = styled.h4`
  text-align: ${props => props.textAlign ? props.textAlign : 'left'};
  color: ${props => props.color || '#333'};
  font-weight: ${props => props.fontWeight || '400'};
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
  font-size: ${props => props.fontSize || 'inherit'};
  cursor: ${props => props.cursor || 'auto'};
  white-space: ${props => props.whiteSpace ? props.whiteSpace : 'normal'};
  word-wrap: ${props => props.wordWrap ? props.wordWrap : 'normal'};
`
export const CommonH5 = styled.h5`
  text-align: ${props => props.textAlign ? props.textAlign : 'left'};
  color: ${props => props.color || '#333'};
  font-weight: ${props => props.fontWeight || '400'};
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
  font-size: ${props => props.fontSize || 'inherit'};
  cursor: ${props => props.cursor || 'auto'};
  white-space: ${props => props.whiteSpace ? props.whiteSpace : 'normal'};
  word-wrap: ${props => props.wordWrap ? props.wordWrap : 'normal'};
`
export const CommonH6 = styled.h6`
  text-align: ${props => props.textAlign ? props.textAlign : 'left'};
  color: ${props => props.color || '#333'};
  font-weight: ${props => props.fontWeight || '400'};
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
  font-size: ${props => props.fontSize || 'inherit'};
  cursor: ${props => props.cursor || 'auto'};
  white-space: ${props => props.whiteSpace ? props.whiteSpace : 'normal'};
  word-wrap: ${props => props.wordWrap ? props.wordWrap : 'normal'};
`
export const FormContent = styled.div`
  min-height: 640px;
  padding: 16px 0 8px 0;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`
export const FormContentLeft = styled.div`
  width: 70%;
  order: 1;
  @media screen and (max-width: 768px) {
    width: 100%;
    order: 2;
  }
`
export const FormContentRight = styled.div`
  width: 30%;

  border-left: 1px solid #CFCFCF;
  padding: 8px 16px 16px 16px;
  margin-left: 16px;
  order: 2;

  @media screen and (max-width: 768px) {
    order: 1;
    width: 100%;
    border-left: none;
    padding-left: 0;
    margin-left: 0;
    padding-top: 8px;
    margin-top: 8px;
  }
`
export const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection ? props.flexDirection : 'row'};;
  justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
  align-items: ${props => props.alignItems ? props.alignItems : 'flex-start'};
  margin: ${props => props.margin ? props.margin : '0'};
  padding: ${props => props.padding ? props.padding : '0'};
  gap: ${props => props.gap ? props.gap : '16px'};
`
export const CustomSteps = styled.div`
  display: flex;
  justify-content: space-between;
`
export const CustomLabelWrapper = styled.div`
  position: relative;
`
export const CustomStepItem = styled.div`
  width: 33.33%;

  &:not(:last-child) ${CustomLabelWrapper}:after {
    content: '';
    position: absolute;
    height: 1px;
    width: 80%;
    background: #ccc;
    top: 50%;
    left: calc(50% + 24px);
  }
`

export const CustomStepLabel = styled.div`
  margin: 0 auto;
  text-align: center;
  background: ${APP_THEME.PRIMARY_COLOR};
  color: #fff;

  width: 32px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  &:after {
    content: '';
    display: block;
    padding-top: 100%;
  }
`
export const CustomStepDescription = styled.div`
  padding: 16px;
  font-weight: 300;
  font-size: 1.4rem;
`

export const SuffixLogoWrapper = styled.div`
display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: ${APP_THEME.BORDER_RADIUS_BASE};
  cursor: pointer;
  height: ${props => props.height ? props.height : '32px'};
  
  img {
    object-fit: contain;
    object-position: center;
    max-width: 100%;
    max-height: 100%;
  }
`