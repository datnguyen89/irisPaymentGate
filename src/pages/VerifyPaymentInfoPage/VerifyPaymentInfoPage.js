import React, { useEffect, useState } from 'react'
import { VerifyPaymentInfoPageWrapper } from './VerifyPaymentInfoPageStyled'
import FormHeader from '../../components/FormHeader'
import {
  CommonH1,
  CommonH2,
  FormContent,
  FormContentLeft,
  FormContentRight,
} from '../../components/CommonStyled/CommonStyled'
import BillingInfoBox from '../../components/BillingInfoBox'
import FormFooter from '../../components/FormFooter'
import VerifyBankInfoTabs from '../../components/VerifyBankInfoTabs'
import BankSelectBox from '../../components/BankSelectBox'
import {
  banksDomesticState,
  banksInternationalState,
  selectedBankState,
  selectedMethodState,
} from '../../recoil/paymentMethodState'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { METHOD_CODE, PAGES, RESPONSE_CODE } from '../../constant'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import paymentMethodStore from '../../stores/paymentMethodStore'
import { confirmBeforeUnloadState } from '../../recoil/commonState'
import { Helmet } from 'react-helmet'

const VerifyPaymentInfoPage = props => {
  // region props, hook, state =================
  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()
  const { state } = location


  const banksDomestic = useRecoilValue(banksDomesticState)
  const banksInternational = useRecoilValue(banksInternationalState)
  const selectedMethod = useRecoilValue(selectedMethodState)

  const resetSelectedMethod = useResetRecoilState(selectedMethodState)
  const resetSelectedBank = useResetRecoilState(selectedBankState)

  const setSelectedMethod = useSetRecoilState(selectedMethodState)
  const setSelectedBank = useSetRecoilState(selectedBankState)


  const [detailMethod, setDetailMethod] = useState(null)
  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============
  const handleBackChoosePaymentMethod = () => {
    resetSelectedBank()
    resetSelectedMethod()
    navigate(PAGES.PAYMENT_METHOD, { state: state, replace: true })
  }
  // endregion
  // region function render ====================

  // endregion
  // region side effect ========================
  useEffect(() => {
    if (!params) return
    if (!banksDomestic || !banksInternational) return // Ch??a load ???????c danh s??ch bank th?? kh??ng l??m g??
    // console.log('params', params?.bankCode)
    /*
    *  /{VERIFY_PAYMENT}/STB ( params?.bankCode = STB )
    *
    *  Khi params?.bankCode thay ?????i:
    *   - C?? params?.bankCode:
    *     + Check trong banksDomesticState/banksInternationalState t??m bank c?? bank code tr??ng v???i params?.bankCode
    *       => set l???i selectedMethodState v?? selectedBankState
    *       => g???i l???i api check bank => render l???i form nh???p th??ng tin th???
    *     + Kh??ng t??m th???y bank n??o tr??ng v???i params?.bankCode
    *       => reset selectedMethodState v?? selectedBankState r???i redirect v??? trang ch???n ph????ng th???c thanh to??n
    *   - Kh??ng c?? params?.bankCode:
    *     + reset selectedMethodState v?? selectedBankState r???i redirect v??? trang ch???n ph????ng th???c thanh to??n
    */
    if (params?.bankCode && params?.bankCode !== 'null') { // C?? params?.bankCode:
      let payloadBank = {
        bankCode: params?.bankCode, // Ng??n h??ng thanh to??n
      }
      // g???i l???i api check bank => render l???i form nh???p th??ng tin th???
      paymentMethodStore.getDetailPaymentMethod(payloadBank)
        .then(res => {
          if (res?.responseCode === RESPONSE_CODE.SUCCESS) {
            let newSelectedBankDomestic = banksDomestic?.details?.find(item => item?.bankCode === params?.bankCode)
            let newSelectedBankInternational = banksInternational?.details?.find(item => item?.bankCode === params?.bankCode)
            setDetailMethod(res?.param)
            if (newSelectedBankDomestic) {
              setSelectedMethod(METHOD_CODE.DOMESTIC)
              setSelectedBank(newSelectedBankDomestic)
            } else if (newSelectedBankInternational) {
              setSelectedMethod(METHOD_CODE.INTERNATIONAL)
              setSelectedBank(newSelectedBankInternational)
            } else {
              // bank code truy???n tr??n url kh??ng t??m th???y ??? ????u h???t
              handleBackChoosePaymentMethod()
            }
          }
        })
    } else { // Kh??ng c?? params?.bankCode:
      handleBackChoosePaymentMethod()
    }
  }, [params, banksDomestic, banksInternational])
  // endregion
  return (
    <VerifyPaymentInfoPageWrapper>
      <Helmet>
        <title>X??c nh???n th??ng tin</title>
      </Helmet>
      <FormHeader onPressBack={handleBackChoosePaymentMethod} />
      <FormContent>
        <FormContentLeft>
          <CommonH1
            margin={'8px 0'}
            fontWeight={700}
            textAlign={'center'}
            fontSize={'2.4rem'}>
            Thanh to??n ng??n h??ng {selectedMethod === METHOD_CODE.DOMESTIC ? 'n???i ?????a' : 'qu???c t???'}
          </CommonH1>
          <CommonH2
            fontSize={'1.4rem'}
            textAlign={'center'}
            margin={'8px 0'}>
            L???a ch???n ng??n h??ng {selectedMethod === METHOD_CODE.DOMESTIC ? 'n???i ?????a' : 'qu???c t???'} v?? nh???p th??ng
            tin
          </CommonH2>

          {/*<VerifyBankInfoForm />*/}
          {/*<VerifyBankInfoGroupButton />*/}

          {
            detailMethod &&
            <VerifyBankInfoTabs detailMethod={detailMethod} />
          }


          <BankSelectBox
            title={`CH???N NG??N H??NG ${selectedMethod === METHOD_CODE.DOMESTIC ? 'N???I ?????A' : 'QU???C T???'} THANH TO??N`}
            showGuideLink={true}
            banks={selectedMethod === METHOD_CODE.DOMESTIC ? banksDomestic?.details : banksInternational?.details}
          />

        </FormContentLeft>
        <FormContentRight>
          <BillingInfoBox showCountDown={true} />
        </FormContentRight>
      </FormContent>
      <FormFooter />
    </VerifyPaymentInfoPageWrapper>
  )
}

VerifyPaymentInfoPage.propTypes = {}

export default VerifyPaymentInfoPage
