import React, { useEffect } from 'react'
import { VerifyOtpPageWrapper } from './VerifyOtpPageStyled'
import FormHeader from '../../components/FormHeader'
import {
  CommonH1,
  CommonH3, CommonH6, CommonP,
  FlexDiv,
  FormContent,
  FormContentLeft,
  FormContentRight,
} from '../../components/CommonStyled/CommonStyled'
import FormFooter from '../../components/FormFooter'
import BillingInfoBox from '../../components/BillingInfoBox'
import VerifyBankInfoForm from '../../components/VerifyBankInfoForm'
import { Alert, Button, Form, Input, Modal, notification } from 'antd'
import IMAGES from '../../images'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { currentBillState, formVerifyState } from '../../recoil/billState'
import { useLocation, useNavigate } from 'react-router-dom'
import { PAGES, RESPONSE_CODE } from '../../constant'
import { selectedBankState } from '../../recoil/paymentMethodState'
import billStore from '../../stores/billStore'
import { confirmBeforeUnloadState } from '../../recoil/commonState'
import { Helmet } from 'react-helmet'

const APP_THEME = require('../../theme')

const VerifyOtpPage = props => {
  // region props, hook, state =================
  const [formOTP] = Form.useForm()
  const navigate = useNavigate()
  const location = useLocation()
  const { state } = location

  const formVerify = useRecoilValue(formVerifyState)
  const resetFormVerify = useResetRecoilState(formVerifyState)
  const selectedBank = useRecoilValue(selectedBankState)
  const setConfirmBeforeUnload = useSetRecoilState(confirmBeforeUnloadState)

  const currentBill = useRecoilValue(currentBillState)
  const billInfo = currentBill?.param

  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============
  const handlePressBack = () => {
    navigate(-1)
  }
  const onFinishOTP = (collect) => {
    console.log(collect)
    const payload = {
      token: state?.token, // M?? thanh to??n
      otp: collect?.otp,
      extendData: formVerify?.extendData,
    }
    billStore.paymentConfirm(payload)
      .then(res => {
        switch (res?.responseCode) {
          case RESPONSE_CODE.INVALID_OTP:
            notification.error({
              message: 'Th??ng b??o',
              description: res?.description,
            })
            break
          default:
            navigate(PAGES.PAYMENT_RESULT, { state: { ...state, response: res }, replace: true })
            break
        }
      })
  }
  const handleCancelBill = () => {
    Modal.confirm({
      wrapClassName: 'custom-modal-confirm',
      closable: true,
      icon: null,
      title: 'Th??ng b??o',
      okText: '?????ng ??',
      cancelText: 'H???y',
      onOk: () => {
        Promise.resolve()
          .then(() => setConfirmBeforeUnload(false))
          .then(() => {
            billStore.cancelBill({ token: state?.token })
              .finally(() => {
                window.location.replace(billInfo?.returnUrl)
              })
          })
      },
      onCancel: () => {
        console.log('Cancel')
      },
      content:
        <CommonP textAlign={'center'}>
          B???n c?? mu???n h???y thanh to??n ????n h??ng kh??ng?
        </CommonP>,
    })
  }

  // endregion
  // region function render ====================

  // endregion
  // region side effect ========================

  // endregion
  return (
    <VerifyOtpPageWrapper>
      <Helmet>
        <title>X??c nh???n thanh to??n</title>
      </Helmet>
      <FormHeader onPressBack={handlePressBack} hideBackButton={true} />
      <FormContent>
        <FormContentLeft>
          <CommonH1
            margin={'8px 0'}
            fontWeight={700}
            textAlign={'center'}
            fontSize={'2.4rem'}>
            X??c nh???n thanh to??n
          </CommonH1>
          <CommonH6
            margin={'8px 0'}
            fontWeight={300}
            textAlign={'center'}
            fontSize={'1.6rem'}>
            Vui l??ng nh???p m?? OTP
          </CommonH6>
          <VerifyBankInfoForm
            formVerify={formVerify}
            disabled={true} hideFooter={true} />
          {/*<Alert*/}
          {/*  showIcon*/}
          {/*  message={`??i???u ki???n thanh to??n th??? ${selectedBank?.bankName}: Qu?? kh??ch ???? ????ng k?? d???ch v??? ${selectedBank?.bankName} internet banking v?? s??? ??i???n tho???i nh???n SMS-OTP cho th??? n???i ?????a ${selectedBank?.bankName}.`}*/}
          {/*  type={'info'}*/}
          {/*  style={{ marginBottom: 16 }}*/}
          {/*  closable*/}
          {/*/>*/}
          <FlexDiv margin={'0 0 16px 0'} justifyContent={'space-between'}>
            <CommonH3>
              Nh???p m?? OTP*
            </CommonH3>
            {/*<CommonH3*/}
            {/*  cursor={'pointer'}*/}
            {/*  color={APP_THEME.ERROR_COLOR}>*/}
            {/*  G???i l???i m?? OTP <img src={IMAGES.RESEND_OTP} alt={'resend'} style={{ marginBottom: 2 }} height={20} />*/}
            {/*</CommonH3>*/}
          </FlexDiv>
          <Form
            onFinish={onFinishOTP}
            form={formOTP}>
            <Form.Item name={'otp'}>
              <Input placeholder={'Nh???p m?? OTP'} />
            </Form.Item>
            <FlexDiv justifyContent={'center'}>
              <Button type={'default'} onClick={handleCancelBill} style={{ minWidth: 150 }}>H???y</Button>
              <Button type={'primary'} htmlType={'submit'} style={{ minWidth: 150 }}>X??c nh???n</Button>
            </FlexDiv>
          </Form>
        </FormContentLeft>
        <FormContentRight>
          <BillingInfoBox showCountDown={true} />
        </FormContentRight>
      </FormContent>
      <FormFooter />
    </VerifyOtpPageWrapper>
  )
}

VerifyOtpPage.propTypes = {}

export default VerifyOtpPage