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
        <title>Thanh to??n qua v??</title>
      </Helmet>
      <FormHeader onPressBack={handlePressBack} />
      <FormContent>
        <FormContentLeft>
          <CommonH1
            margin={'8px 0'}
            fontWeight={700}
            textAlign={'center'}
            fontSize={'2.4rem'}>
            Qu??t m?? ????? thanh to??n
          </CommonH1>
          <CommonH2
            margin={'32px 0'}
            fontWeight={300}
            textAlign={'center'}
            fontSize={'1.6rem'}>
            Vui l??ng s??? d???ng qu??t QR trong App {config.walletName} ????? c???p nh???t th??ng tin thanh to??n
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
            H?????ng d???n thanh to??n
          </CommonH2>
          <CustomSteps>
            <CustomStepItem>
              <CustomLabelWrapper>
                <CustomStepLabel>
                  1
                </CustomStepLabel>
              </CustomLabelWrapper>
              <CustomStepDescription>
                M??? app {config.walletName} ????ng nh???p v?? ch???n ch???c n??ng QR v?? qu??t m?? QR tr??n
              </CustomStepDescription>
            </CustomStepItem>
            <CustomStepItem>
              <CustomLabelWrapper>
                <CustomStepLabel>
                  2
                </CustomStepLabel>
              </CustomLabelWrapper>
              <CustomStepDescription>
                Ki???m tra th??ng tin ????n h??ng v?? l???a ch???n lo???i t??i kho???n thanh to??n
              </CustomStepDescription>
            </CustomStepItem>
            <CustomStepItem>
              <CustomLabelWrapper>
                <CustomStepLabel>
                  3
                </CustomStepLabel>
              </CustomLabelWrapper>
              <CustomStepDescription>
                X??c nh???n thanh to??n v?? ho??n t???t giao d???ch.
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
