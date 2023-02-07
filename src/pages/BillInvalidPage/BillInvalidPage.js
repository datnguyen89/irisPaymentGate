import React from 'react'
import { BillInvalidPageWrapper } from './BillInvalidPageStyled'
import FormHeader from '../../components/FormHeader'
import { FormContent, FormContentLeft, FormContentRight } from '../../components/CommonStyled/CommonStyled'
import BillingInfoBox from '../../components/BillingInfoBox'
import PaymentResult from '../../components/PaymentResult'
import FormFooter from '../../components/FormFooter'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { billInvalidState, currentBillState } from '../../recoil/billState'
import { confirmBeforeUnloadState } from '../../recoil/commonState'

const BillInvalidPage = props => {
  // region props, hook, state =================
  const billInvalid = useRecoilValue(billInvalidState)
  const currentBill = useRecoilValue(currentBillState)
  const setConfirmBeforeUnload = useSetRecoilState(confirmBeforeUnloadState)
  const billInfo = currentBill?.param
  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============
  const handleFinishCountdown = () => {
    if (billInfo?.returnUrl) {
      Promise.resolve()
        .then(() => setConfirmBeforeUnload(false))
        .then(() => window.location.replace(billInfo?.returnUrl))
    }
  }
  // endregion
  // region function render ====================

  // endregion
  // region side effect ========================

  // endregion
  return (
    <BillInvalidPageWrapper>
      <FormHeader />
      <FormContent>
        <FormContentLeft>
          <PaymentResult
            status={billInvalid?.status}
            title={billInvalid?.title}
            description={billInvalid?.description}
            hideWarningClose={billInvalid?.hideWarningClose}
            finishCountdown={handleFinishCountdown}
          />
        </FormContentLeft>
        {
          billInvalid?.showBillInfo &&
          <FormContentRight>
            <BillingInfoBox showCountDown={false} />
          </FormContentRight>
        }
      </FormContent>
      <FormFooter />
    </BillInvalidPageWrapper>
  )
}

BillInvalidPage.propTypes = {}

export default BillInvalidPage