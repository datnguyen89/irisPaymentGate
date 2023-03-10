import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { BankSelectBoxWrapper, GuideCard, GuideImageWrapper, LogoBankWrapper } from './BankSelectBoxStyled'
import { CommonH2, CommonH3, CommonP, FlexDiv } from '../CommonStyled/CommonStyled'
import APP_THEME from '../../theme'
import { Alert, Col, Modal, Row } from 'antd'
import IMAGES from '../../images'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { selectedBankState, selectedMethodState } from '../../recoil/paymentMethodState'
import { PAGES, METHOD_CODE } from '../../constant'
import stringUtils from '../../utils/stringUtils'

const BankSelectBox = props => {
  // region props, hook, state =================
  const {
    title,
    showGuideLink,
    banks,
  } = props
  const location = useLocation()
  const { state } = location
  const navigate = useNavigate()
  const selectedMethod = useRecoilValue(selectedMethodState)
  const selectedBank = useRecoilValue(selectedBankState)
  const [visibleGuide, setVisibleGuide] = useState(false)
  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============
  const handleSelectBank = (bank) => {
    navigate(`${PAGES.VERIFY_PAYMENT}/${bank?.bankCode}`, { state: state, replace: true })
  }
  // endregion
  // region function render ====================
  const renderGuideContent = (description) => {
    let objDescription = JSON.parse(description)
    const payment = objDescription.payment
    const condition = payment?.condition
    const url_ibanking = payment?.url_ibanking
    const phone_hotline = payment?.phone_hotline
    const img_logo = payment?.img_logo
    let newCondition = ''
    if (condition) {
      newCondition = condition
        ?.replace('{img_logo}', `<img src='${img_logo}' alt='' height='32' />`)
        ?.replace('{url_ibanking}', `<a href='${url_ibanking}' target='_blank'>${url_ibanking}</a>`)
        ?.replace('{phone_hotline}', `<a href='tel:${phone_hotline}'>${phone_hotline}</a>`)
    }
    return (
      <div dangerouslySetInnerHTML={{ __html: newCondition }} />
    )
  }
  // endregion
  // region side effect ========================

  // endregion
  return (
    <BankSelectBoxWrapper>
      <FlexDiv justifyContent={'space-between'}>
        <CommonH2
          fontSize={'1.4rem'}
          fontWeight={400}
          margin={'8px 0 16px 0'}
          color={APP_THEME.PRIMARY_COLOR}>
          {title}
        </CommonH2>
        {
          showGuideLink
            ?
            <CommonH2
              onClick={() => setVisibleGuide(true)}
              cursor={'pointer'}
              fontSize={'1rem'}
              fontWeight={400}
              margin={'8px 0 16px 0'}
              color={APP_THEME.ERROR_COLOR}>
              *H?????NG D???N THANH TO??N QUA
              TH??? {selectedMethod === METHOD_CODE.DOMESTIC ? 'N???I ?????A' : 'QU???C T???'} NG??N H??NG
            </CommonH2>
            : <></>
        }

      </FlexDiv>
      {/*<Alert*/}
      {/*  showIcon*/}
      {/*  message={`??i???u ki???n thanh to??n th??? ${selectedBank?.bankName}: Qu?? kh??ch ???? ????ng k?? d???ch v??? ${selectedBank?.bankName} internet banking v?? s??? ??i???n tho???i nh???n SMS-OTP cho th??? n???i ?????a ${selectedBank?.bankName}.`}*/}
      {/*  type={'info'}*/}
      {/*  style={{ marginBottom: 16 }}*/}
      {/*  closable*/}
      {/*/>*/}
      <Row gutter={[16, 16]}>
        {
          banks && banks.map((item, index) =>
            <Col
              key={index}
              xxl={4} xl={6} lg={6} md={6} sm={8} xs={8}>
              <LogoBankWrapper
                className={item?.bankId === selectedBank?.bankId ? 'active' : ''}
                onClick={() => handleSelectBank(item)}
              >
                <img src={item?.logo} alt={''} />
              </LogoBankWrapper>
            </Col>,
          )
        }
      </Row>
      <Modal
        title={`H?????NG D???N THANH TO??N QUA TH??? ${selectedMethod === METHOD_CODE.DOMESTIC ? 'N???I ?????A' : 'QU???C T???'}`}
        wrapClassName={'custom-modal payment-guide-modal'}
        open={visibleGuide}
        footer={null}
        onCancel={() => setVisibleGuide(false)}
      >
        <Row gutter={[16, 16]}>
          <Col xxl={8} xl={6} md={24} sm={24} xs={24}>
            <CommonH3 fontWeight={500}>S??? th???</CommonH3>
            <CommonP>
              D??y 19 s??? in tr??n m???t tr?????c c???a th???, 4 s??? ?????u c???a th??? l?? 9704.<br />
              V?? d???: 9704 1234 5678 9123 456
            </CommonP>
            <CommonH3 fontWeight={500}>Th??ng/N??m ph??t h??nh</CommonH3>
            <CommonP>
              Th??ng v?? N??m ph??t h??nh c???a th???, in tr??n m???t tr?????c c???a th??? (VALID FROM) (n???u c??).<br />
              V?? d???: 05/17
            </CommonP>
            <CommonH3 fontWeight={500}>T??n ch??? th???</CommonH3>
            <CommonP>
              T??n ch??? th??? in tr??n m???t tr?????c c???a th???, vi???t c??ch v?? kh??ng c?? d???u Ti???ng Vi???t.<br />
              V?? d???: NGUYEN VAN A
            </CommonP>
          </Col>
          <Col xxl={8} xl={12} md={24} sm={24} xs={24}>
            <GuideImageWrapper>
              <GuideCard background={selectedBank?.cardColor}>
                <img className={'guide-logo-bank'} src={selectedBank?.logo} alt={''} />
                <img className={'guide-text-card'} src={IMAGES.GUIDE_TEXT} alt={''} />
              </GuideCard>
            </GuideImageWrapper>
          </Col>
          <Col xxl={8} xl={6} md={24} sm={24} xs={24}>
            {/*<CommonH3 fontWeight={500}>??i???u ki???n thanh to??n tr???c tuy???n</CommonH3>*/}
            {
              stringUtils.isJson(selectedBank?.description)
                ? renderGuideContent(selectedBank?.description)
                : selectedBank?.description
            }
            {/*<div dangerouslySetInnerHTML={{__html: 'First &middot; Second'}} />*/}

            {/*<CommonP>*/}
            {/*  ????ng k?? d???ch v??? <strong>MSB iBanking</strong> v?? <strong>s??? ??i???n tho???i nh???n SMS-OTP</strong> cho th??? ghi*/}
            {/*  n??? n???i ?????a MSB Bank b???ng m???t trong c??c c??ch sau:<br />*/}
            {/*  <strong>C??ch 1:</strong> Truy c???p Ng??n h??ng tr???c tuy???n MSB iBanking t???i <Link*/}
            {/*  style={{ color: APP_THEME.ERROR_COLOR }} to={'#'}>https://msb.com.vn/ibanking2022/</Link>, v?? th???c hi???n*/}
            {/*  chuy???n ?????i sang d???ch v??? MSB iBanking theo h?????ng d???n c???a MSB Bank<br />*/}
            {/*  <strong>C??ch 2:</strong> ????ng k?? t???i qu???y giao d???ch c???a MSB Bank*/}
            {/*</CommonP>*/}
            {/*<CommonH3 fontWeight={500}>H???n m???c thanh to??n tr???c tuy???n</CommonH3>*/}
            {/*<CommonP>*/}
            {/*  T???i ??a 50,000,000 VND/giao d???ch/ng??y v?? 10 giao d???ch/ng??y.*/}
            {/*</CommonP>*/}
            {/*<CommonH3 fontWeight={500}>*/}
            {/*  T???ng ????i h??? tr??? <Link style={{ color: APP_THEME.ERROR_COLOR }} to={'#'}>19006083</Link>*/}
            {/*</CommonH3>*/}
          </Col>
        </Row>
      </Modal>
    </BankSelectBoxWrapper>
  )
}

BankSelectBox.propTypes = {
  title: PropTypes.string,
  showGuideLink: PropTypes.bool,
  banks: PropTypes.array,
}

export default BankSelectBox
