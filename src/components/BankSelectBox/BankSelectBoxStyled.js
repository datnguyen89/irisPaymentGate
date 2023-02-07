import styled from 'styled-components'
import APP_THEME from '../../theme'
import IMAGES from '../../images'

export const BankSelectBoxWrapper = styled.div``
export const GuideImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 260px;
`
export const GuideCard = styled.div`
  // Đây là cái thẻ
  position: relative;
  background-image: url(${IMAGES.GUIDE_IMG});
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${props => props.background ? props.background : APP_THEME.PRIMARY_COLOR_HOVER};
  background-size: contain;
  border-radius: ${APP_THEME.BORDER_RADIUS_BASE};
  border: 1px solid ${APP_THEME.BORDER_RADIUS_BASE};

  height: 200px;
  width: 310px;

  @media screen and (max-width: 520px) {
    height: 145px;
    width: 224px;
  }

  .guide-logo-bank {
    height: 56px;
    position: absolute;
    right: 16px;
    top: 16px;
  }

  // Đây là img text hướng dẫn
  .guide-text-card {
    width: 410px;
    position: absolute;
    bottom: -61px;
    left: -47px;

    @media screen and (max-width: 520px) {
      width: 306px;
      position: absolute;
      bottom: -45px;
      left: -40px;
    }
  }
`
export const LogoBankWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${APP_THEME.BORDER_COLOR_BASE};
  overflow: hidden;
  border-radius: ${APP_THEME.BORDER_RADIUS_BASE};
  cursor: pointer;
  padding: 4px;
  height: ${props => props.height ? props.height : '64px'};

  &:hover, &.active {
    border: 1px solid ${APP_THEME.BORDER_COLOR_ACTIVE};
      //background: ${APP_THEME.BACKGROUND_COLOR_ACTIVE};
    box-shadow: 0 4px 8px rgba(7, 94, 165, 0.2);
  }

  img {
    object-fit: contain;
    object-position: center;
    max-width: 100%;
    max-height: 100%;
  }
`