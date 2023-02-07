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
    if (!banksDomestic || !banksInternational) return // Chưa load được danh sách bank thì không làm gì
    // console.log('params', params?.bankCode)
    /*
    *  /{VERIFY_PAYMENT}/STB ( params?.bankCode = STB )
    *
    *  Khi params?.bankCode thay đổi:
    *   - Có params?.bankCode:
    *     + Check trong banksDomesticState/banksInternationalState tìm bank có bank code trùng với params?.bankCode
    *       => set lại selectedMethodState và selectedBankState
    *       => gọi lại api check bank => render lại form nhập thông tin thẻ
    *     + Không tìm thấy bank nào trùng với params?.bankCode
    *       => reset selectedMethodState và selectedBankState rồi redirect về trang chọn phương thức thanh toán
    *   - Không có params?.bankCode:
    *     + reset selectedMethodState và selectedBankState rồi redirect về trang chọn phương thức thanh toán
    */
    if (params?.bankCode && params?.bankCode !== 'null') { // Có params?.bankCode:
      let payloadBank = {
        bankCode: params?.bankCode, // Ngân hàng thanh toán
      }
      // gọi lại api check bank => render lại form nhập thông tin thẻ
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
              // bank code truyền trên url không tìm thấy ở đâu hết
              handleBackChoosePaymentMethod()
            }
          }
        })
    } else { // Không có params?.bankCode:
      handleBackChoosePaymentMethod()
    }
  }, [params, banksDomestic, banksInternational])
  // endregion
  return (
    <VerifyPaymentInfoPageWrapper>
      <Helmet>
        <title>Xác nhận thông tin</title>
      </Helmet>
      <FormHeader onPressBack={handleBackChoosePaymentMethod} />
      <FormContent>
        <FormContentLeft>
          <CommonH1
            margin={'8px 0'}
            fontWeight={700}
            textAlign={'center'}
            fontSize={'2.4rem'}>
            Thanh toán ngân hàng {selectedMethod === METHOD_CODE.DOMESTIC ? 'nội địa' : 'quốc tế'}
          </CommonH1>
          <CommonH2
            fontSize={'1.4rem'}
            textAlign={'center'}
            margin={'8px 0'}>
            Lựa chọn ngân hàng {selectedMethod === METHOD_CODE.DOMESTIC ? 'nội địa' : 'quốc tế'} và nhập thông
            tin
          </CommonH2>

          {/*<VerifyBankInfoForm />*/}
          {/*<VerifyBankInfoGroupButton />*/}

          {
            detailMethod &&
            <VerifyBankInfoTabs detailMethod={detailMethod} />
          }


          <BankSelectBox
            title={`CHỌN NGÂN HÀNG ${selectedMethod === METHOD_CODE.DOMESTIC ? 'NỘI ĐỊA' : 'QUỐC TẾ'} THANH TOÁN`}
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
