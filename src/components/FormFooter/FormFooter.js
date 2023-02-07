import React from 'react'
import { ContactEmail, ContactPhone, FormFooterLeft, FormFooterRight, FormFooterWrapper } from './FormFooterStyled'
import IMAGES from '../../images'
import config from '../../config'

const FormFooter = props => {
  // region props, hook, state =================

  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============

  // endregion
  // region function render ====================

  // endregion
  // region side effect ========================

  // endregion
  return (
    <FormFooterWrapper>
      <FormFooterLeft>
        <ContactPhone>
          <img src={IMAGES.PHONE_CALL} alt={'phone'} />
          <a href={`tel:${config.supportPhoneValue}`}>{config.supportPhoneLabel}</a>
        </ContactPhone>
        <ContactEmail>
          <img src={IMAGES.MAIL_OPEN} alt={'email'} />
          <a href={`mailto:${config.supportEmailValue}`}>{config.supportEmailLabel}</a>
        </ContactEmail>
      </FormFooterLeft>
      <FormFooterRight>
        <img src={IMAGES.PCI} alt={'pci'} height={32} />
        <img src={IMAGES.SECURE_TRUST} alt={'secure-trust'} height={32} />
      </FormFooterRight>
    </FormFooterWrapper>
  )
}

FormFooter.propTypes = {}

export default FormFooter