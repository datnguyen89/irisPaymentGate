import React, { useEffect } from 'react'
import { useQuery } from '../../hooks/useQuery'
import { useResetRecoilState, useSetRecoilState } from 'recoil'
import { billInvalidState } from '../../recoil/billState'
import { selectedBankState, selectedMethodState } from '../../recoil/paymentMethodState'
import { PAGES, METHOD_CODE, PAYMENT_RESULT_STATUS } from '../../constant'
import { useNavigate } from 'react-router-dom'

const ReceiveDataPage = props => {
  // region props, hook, state =================
  const query = useQuery()
  const navigate = useNavigate()
  const resetSelectedMethod = useResetRecoilState(selectedMethodState)
  const resetSelectedBank = useResetRecoilState(selectedBankState)
  const setBillInvalid = useSetRecoilState(billInvalidState)
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
    if (!query) return
    const orderData = query.get('orderData')
    if (orderData) {
      if (window.ReactNativeWebView) {
        let payload = {
          Action: 'PAYMENT',
          Data: orderData,
        }
        window.ReactNativeWebView.postMessage(JSON.stringify(payload))
        window.history.back()
      }
    } else {
      const queryToken = query.get('token')
      const methodCode = query.get('methodCode')
      resetSelectedBank()
      resetSelectedMethod()

      if (!queryToken) {
        let invalidToken = {
          status: PAYMENT_RESULT_STATUS.ERROR,
          title: 'Thông báo',
          description: 'Đơn hàng không tồn tại hoặc đã được xử lý',
          secondsToRedirect: 10,
        }
        setBillInvalid(invalidToken)
        navigate(PAGES.BILL_INVALID, { replace: true })
      } else {
        switch (methodCode) {
          case METHOD_CODE.WALLET:
            navigate(PAGES.PAYING_QR, { replace: true, state: { token: queryToken } })
            break
          case METHOD_CODE.DOMESTIC:
          case METHOD_CODE.INTERNATIONAL:
            navigate(PAGES.PAYMENT_METHOD, { replace: true, state: { token: queryToken, method: methodCode } })
            break
          default:
            navigate(`${PAGES.VERIFY_PAYMENT}/${methodCode}`, { replace: true, state: { token: queryToken } })
            break
        }
      }
    }
  }, [query])
  // endregion
  return (
    <>

    </>
  )
}

ReceiveDataPage.propTypes = {}

export default ReceiveDataPage
