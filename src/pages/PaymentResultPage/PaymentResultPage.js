import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { PaymentResultPageWrapper } from './PaymentResultPageStyled'
import FormHeader from '../../components/FormHeader'
import FormFooter from '../../components/FormFooter'
import { FormContent, FormContentLeft, FormContentRight } from '../../components/CommonStyled/CommonStyled'
import BillingInfoBox from '../../components/BillingInfoBox'
import PaymentResult from '../../components/PaymentResult'
import { PAYMENT_RESULT_STATUS, RESPONSE_CODE } from '../../constant'
import { Helmet } from 'react-helmet'
import { Modal } from 'antd'
import { useLocation } from 'react-router-dom'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { billInvalidState, currentBillState, formVerifyState } from '../../recoil/billState'
import {
  banksDomesticState,
  banksInternationalState,
  paymentMethodState,
  selectedBankState,
  selectedMethodState,
} from '../../recoil/paymentMethodState'
import { confirmBeforeUnloadState } from '../../recoil/commonState'

const PaymentResultPage = props => {
  // region props, hook, state =================
  const location = useLocation()
  const { state } = location
  const currentBill = useRecoilValue(currentBillState)
  const billInfo = currentBill?.param

  const resetCurrentBill = useResetRecoilState(currentBillState)
  const resetBillInvalid = useResetRecoilState(billInvalidState)
  const resetFormVerifyState = useResetRecoilState(formVerifyState)
  const resetPaymentMethod = useResetRecoilState(paymentMethodState)
  const resetSelectedMethodState = useResetRecoilState(selectedMethodState)
  const resetSelectedBankState = useResetRecoilState(selectedBankState)

  const setConfirmBeforeUnload = useSetRecoilState(confirmBeforeUnloadState)
  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============
  const handleFinishCountdown = () => {
    Promise.resolve()
      .then(() => setConfirmBeforeUnload(false))
      .then(() => window.location.replace(billInfo?.returnUrl))
  }
  // endregion
  // region function render ====================
  const renderStatus = () => {
    switch (state?.response?.responseCode) {
      case RESPONSE_CODE.SUCCESS:
        return PAYMENT_RESULT_STATUS.SUCCESS
      case RESPONSE_CODE.PENDING:
        return PAYMENT_RESULT_STATUS.PENDING
      default:
        return PAYMENT_RESULT_STATUS.ERROR
    }
  }
  // endregion
  // region side effect ========================
  useEffect(() => {
    return () => {
      resetCurrentBill()
      resetBillInvalid()
      resetFormVerifyState()
      resetPaymentMethod()
      resetSelectedMethodState()
      resetSelectedBankState()
    }
  }, [])
  // endregion
  return (
    <PaymentResultPageWrapper>
      <Helmet>
        <title>Kết quả giao dịch</title>
      </Helmet>
      <FormHeader hideBackButton={true} />
      <FormContent>
        <FormContentLeft>
          <PaymentResult
            description={state?.response?.description}
            status={renderStatus()}
            finishCountdown={handleFinishCountdown}
          />
        </FormContentLeft>
        <FormContentRight>
          <BillingInfoBox showCountDown={false} />
        </FormContentRight>
      </FormContent>
      <FormFooter />

    </PaymentResultPageWrapper>
  )
}

PaymentResultPage.propTypes = {}

export default PaymentResultPage