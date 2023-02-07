import React, { useEffect, useState } from 'react'
import { PayingQRPageWrapper, QRWrapper } from './PayingQRPageStyled'
import FormHeader from '../../components/FormHeader'
import {
  CommonH1,
  CommonH2,
  CustomLabelWrapper,
  CustomStepDescription,
  CustomStepItem,
  CustomStepLabel,
  CustomSteps,
  FlexDiv,
  FormContent,
  FormContentLeft,
  FormContentRight,
} from '../../components/CommonStyled/CommonStyled'
import FormFooter from '../../components/FormFooter'
import BillingInfoBox from '../../components/BillingInfoBox'
import IMAGES from '../../images'
import { Helmet } from 'react-helmet'
import { useLocation, useNavigate } from 'react-router-dom'
import { OS_NAME, PAGES } from '../../constant'
import config from '../../config'
import { QRCode } from 'react-qrcode-logo'
import { useRecoilValue } from 'recoil'
import { currentBillState } from '../../recoil/billState'
import { useDeviceData } from 'react-device-detect'

const APP_THEME = require('../../theme')

const PayingQrPage = props => {
  // region props, hook, state =================
  const navigate = useNavigate()
  const location = useLocation()
  const { state } = location
  const deviceData = useDeviceData()

  const currentBill = useRecoilValue(currentBillState)
  const billInfo = currentBill?.param

  const [firstLoad, setFirstLoad] = useState(true)

  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============
  const handlePressBack = () => {
    navigate(PAGES.PAYMENT_METHOD, { state: state, replace: true })
  }
  // endregion
  // region function render ====================

  // endregion
  // region side effect ========================
  const openDeepLink = (deepLink, storeLink) => {
    let isError = false

    try {
      let win = window.location.replace(deepLink)
      if (win == null) {
        isError = true
      }
    } catch (e) {
      isError = true
    }
    if (isError) {
      alert(storeLink)
    } else {
      window.location.replace(deepLink)
    }
  }

  useEffect(() => {
    if (!deviceData) return
    if (!billInfo) return
    if (firstLoad) {
      switch (deviceData?.os?.name) {
        case OS_NAME.ANDROID:
          openDeepLink(billInfo?.deepLinkAndroid, 'Open CH play')
          break
        case OS_NAME.IOS:
          openDeepLink(billInfo?.deepLinkIos, 'Open AppStore')
          break
        default:
          break
      }
      setFirstLoad(false)
    }
  }, [deviceData, billInfo])
  // endregion
  return (
    <PayingQRPageWrapper>
      <Helmet>
        <title>Thanh toán qua ví</title>
      </Helmet>
      <FormHeader onPressBack={handlePressBack} />
      <FormContent>
        <FormContentLeft>
          <CommonH1
            margin={'8px 0'}
            fontWeight={700}
            textAlign={'center'}
            fontSize={'2.4rem'}>
            Quét mã để thanh toán
          </CommonH1>
          <CommonH2
            margin={'32px 0'}
            fontWeight={300}
            textAlign={'center'}
            fontSize={'1.6rem'}>
            Vui lòng sử dụng quét QR trong App {config.walletName} để cập nhật thông tin thanh toán
          </CommonH2>
          <FlexDiv justifyContent={'center'}>
            <QRWrapper>
              <QRCode
                value={billInfo?.qrCode}
                logoWidth={56}
                logoHeight={56}
                logoImage={`${process.env.PUBLIC_URL}/assets/logo/${config.qrLogo}`}
                size={240}
              />
            </QRWrapper>
          </FlexDiv>
          <CommonH2
            color={APP_THEME.PRIMARY_COLOR}
            margin={'32px 0'}
            fontWeight={500}
            textAlign={'center'}
            fontSize={'1.6rem'}>
            Hướng dẫn thanh toán
          </CommonH2>
          <CustomSteps>
            <CustomStepItem>
              <CustomLabelWrapper>
                <CustomStepLabel>
                  1
                </CustomStepLabel>
              </CustomLabelWrapper>
              <CustomStepDescription>
                Mở app {config.walletName} đăng nhập và chọn chức năng QR và quét mã QR trên
              </CustomStepDescription>
            </CustomStepItem>
            <CustomStepItem>
              <CustomLabelWrapper>
                <CustomStepLabel>
                  2
                </CustomStepLabel>
              </CustomLabelWrapper>
              <CustomStepDescription>
                Kiểm tra thông tin đơn hàng và lựa chọn loại tài khoản thanh toán
              </CustomStepDescription>
            </CustomStepItem>
            <CustomStepItem>
              <CustomLabelWrapper>
                <CustomStepLabel>
                  3
                </CustomStepLabel>
              </CustomLabelWrapper>
              <CustomStepDescription>
                Xác nhận thanh toán và hoàn tất giao dịch.
              </CustomStepDescription>
            </CustomStepItem>
          </CustomSteps>
        </FormContentLeft>
        <FormContentRight>
          <BillingInfoBox showCountDown={true} />
        </FormContentRight>
      </FormContent>
      <FormFooter />
    </PayingQRPageWrapper>
  )
}

PayingQrPage.propTypes = {}

export default PayingQrPage
