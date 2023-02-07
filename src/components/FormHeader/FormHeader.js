import React from 'react'
import { FormHeaderLeft, FormHeaderRight, FormHeaderWrapper } from './FormHeaderStyled'
import IMAGES from '../../images'
import PropTypes from 'prop-types'
import config from '../../config'

const FormHeader = props => {
  // region props, hook, state =================
  const { onPressBack, hideBackButton } = props
  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============
  const handleClickBack = () => {
    onPressBack && onPressBack()
  }
  // endregion
  // region function render ====================

  // endregion
  // region side effect ========================

  // endregion
  return (
    <FormHeaderWrapper>
      <FormHeaderLeft>
        {
          !hideBackButton &&
          <img src={IMAGES.BACK_BUTTON} alt={'back'} onClick={handleClickBack} />
        }
        <img src={`${process.env.PUBLIC_URL}/assets/logo/${config.appLogo}`} alt={'logo'} height={48} />
      </FormHeaderLeft>
      <FormHeaderRight>
        Cổng thanh toán {config.appName}
      </FormHeaderRight>
    </FormHeaderWrapper>
  )
}

FormHeader.propTypes = {
  onPressBack: PropTypes.func,
  hideBackButton: PropTypes.bool,
}

export default FormHeader