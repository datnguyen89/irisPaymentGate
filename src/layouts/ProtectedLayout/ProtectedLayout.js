import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { WhiteShadowBox } from '../../components/CommonStyled/CommonStyled'
import { ProtectedLayoutContent, ProtectedLayoutWrapper } from './ProtectedLayoutStyled'
import MainFooter from '../../components/MainFooter'
import billStore from '../../stores/billStore'
import paymentMethodStore from '../../stores/paymentMethodStore'
import { OS_NAME, PAGES, PAYMENT_RESULT_STATUS, RESPONSE_CODE } from '../../constant'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { billInvalidState, currentBillState, feeState } from '../../recoil/billState'
import { selectedBankState, selectedMethodState } from '../../recoil/paymentMethodState'
import { useBeforeunload } from 'react-beforeunload'
import { confirmBeforeUnloadState } from '../../recoil/commonState'
import { useDeviceData } from 'react-device-detect'
import { useQuery } from '../../hooks/useQuery'

const ProtectedLayout = props => {
  // region props, hook, state =================
  const setBillInvalid = useSetRecoilState(billInvalidState)

  const confirmBeforeUnload = useRecoilValue(confirmBeforeUnloadState)
  const selectedBank = useRecoilValue(selectedBankState)
  const resetSelectedMethod = useResetRecoilState(selectedMethodState)
  const resetSelectedBank = useResetRecoilState(selectedBankState)
  const resetFee = useResetRecoilState(feeState)
  const currentBill = useRecoilValue(currentBillState)
  const billInfo = currentBill?.param
  const deviceData = useDeviceData()

  const location = useLocation()
  const params = useParams()
  const { state } = location
  const navigate = useNavigate()
  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============
  const getBillInfo = (token) => {
    billStore.getCurrentBill({ token: token })
      .then(res => {
        if (res?.responseCode === RESPONSE_CODE.SUCCESS) {

        } else {
          let billInvalidInfo = {
            status: PAYMENT_RESULT_STATUS.ERROR,
            title: 'Th??ng b??o',
            description: res?.description,
            secondsToRedirect: 10,
            showBillInfo: false,
          }
          setBillInvalid(billInvalidInfo)
          navigate(PAGES.BILL_INVALID, { replace: true })
        }
      })
  }
  const handleInvalidBill = () => {
    resetSelectedBank()
    resetSelectedMethod()

    let invalidToken = {
      status: PAYMENT_RESULT_STATUS.ERROR,
      title: 'Th??ng b??o',
      description: '????n h??ng kh??ng t???n t???i ho???c ???? ???????c x??? l??',
      secondsToRedirect: 10,
      hideWarningClose: true,
    }
    setBillInvalid(invalidToken)
    navigate(PAGES.BILL_INVALID, { replace: true })
  }
  // endregion
  // region function render ====================

  // endregion
  // region side effect ========================
  useEffect(() => {
    if (location.pathname === PAGES.BILL_INVALID
      || location.pathname.includes(PAGES.TEST) // ??ang ??? trang test th?? kh??ng l??m g??
      || location.pathname.includes(PAGES.RECEIVE_DATA)) return // ??ang ??? trang BILL_INVALID ho???c RECEIVE_DATA th?? kh??ng l??m g??
    if (state?.token) { // c?? token
      getBillInfo(state?.token)
    } else { // kh??ng c?? token
      handleInvalidBill()
    }
  }, [location.pathname, state?.token])

  useEffect(() => {
    if (!state?.token) return
    const params = {
      token: state?.token,
    }
    paymentMethodStore.getListPaymentMethod(params)
  }, [state?.token])

  useEffect(() => {
    if (!state?.token) return
    if (!selectedBank) {
      resetFee()
    } else {
      // g???i api getFee ????? l???y ph?? theo bank code m???i
      const payloadFee = {
        token: state?.token,
        methodCode: selectedBank?.bankCode,
      }
      billStore.getFee(payloadFee)
    }
  }, [selectedBank, state?.token])

  useEffect(() => {
    return () => {
      billStore.cancelBill({ token: state?.token })
        .finally(() => {
          window.location.replace(billInfo?.returnUrl)
        })
    }
  }, [])


  useBeforeunload((event) => {
    if (confirmBeforeUnload) {
      event.preventDefault()
    }
  })
  // endregion

  return (
    <ProtectedLayoutWrapper>
      <ProtectedLayoutContent>
        <WhiteShadowBox
          padding={'16px'}
        >
          <Outlet />
        </WhiteShadowBox>
        <MainFooter />
      </ProtectedLayoutContent>
    </ProtectedLayoutWrapper>

  )
}

ProtectedLayout.propTypes = {}

export default ProtectedLayout
