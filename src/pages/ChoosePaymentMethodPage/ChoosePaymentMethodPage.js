import React, { useEffect } from 'react'
import { ChoosePaymentMethodPageWrapper } from './ChoosePaymentMethodPageStyled'
import FormHeader from '../../components/FormHeader'
import FormFooter from '../../components/FormFooter'
import { CommonH1, FormContent, FormContentLeft, FormContentRight } from '../../components/CommonStyled/CommonStyled'
import PaymentMethodSelectBox from '../../components/PaymentMethodSelectBox'
import BillingInfoBox from '../../components/BillingInfoBox'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'


const ChoosePaymentMethodPage = props => {
  // region props, hook, state =================
  const location = useLocation()
  const { state } = location
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
  useEffect(() => {
    console.log(state)
  }, [state])
  // endregion
  return (
    <ChoosePaymentMethodPageWrapper>
      <Helmet>
        <title>Phương thức thanh toán</title>
      </Helmet>
      <FormHeader hideBackButton={true} />
      <FormContent>
        <FormContentLeft>
          <CommonH1
            margin={'8px 0 16px 0'}
            fontWeight={700}
            textAlign={'center'}
            fontSize={'2.4rem'}>
            Chọn phương thức thanh toán
          </CommonH1>
          <PaymentMethodSelectBox
            defaultActiveKeyPanel={state?.method}
          />
        </FormContentLeft>
        <FormContentRight>
          <BillingInfoBox showCountDown={true} />
        </FormContentRight>
      </FormContent>
      <FormFooter />
    </ChoosePaymentMethodPageWrapper>
  )
}

ChoosePaymentMethodPage.propTypes = {}

export default ChoosePaymentMethodPage
