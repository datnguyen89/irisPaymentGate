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
              *HƯỚNG DẪN THANH TOÁN QUA
              THẺ {selectedMethod === METHOD_CODE.DOMESTIC ? 'NỘI ĐỊA' : 'QUỐC TẾ'} NGÂN HÀNG
            </CommonH2>
            : <></>
        }

      </FlexDiv>
      {/*<Alert*/}
      {/*  showIcon*/}
      {/*  message={`Điều kiện thanh toán thẻ ${selectedBank?.bankName}: Quý khách đã Đăng ký dịch vụ ${selectedBank?.bankName} internet banking và số điện thoại nhận SMS-OTP cho thẻ nội địa ${selectedBank?.bankName}.`}*/}
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
        title={`HƯỚNG DẪN THANH TOÁN QUA THẺ ${selectedMethod === METHOD_CODE.DOMESTIC ? 'NỘI ĐỊA' : 'QUỐC TẾ'}`}
        wrapClassName={'custom-modal payment-guide-modal'}
        open={visibleGuide}
        footer={null}
        onCancel={() => setVisibleGuide(false)}
      >
        <Row gutter={[16, 16]}>
          <Col xxl={8} xl={6} md={24} sm={24} xs={24}>
            <CommonH3 fontWeight={500}>Số thẻ</CommonH3>
            <CommonP>
              Dãy 19 số in trên mặt trước của thẻ, 4 số đầu của thẻ là 9704.<br />
              Ví dụ: 9704 1234 5678 9123 456
            </CommonP>
            <CommonH3 fontWeight={500}>Tháng/Năm phát hành</CommonH3>
            <CommonP>
              Tháng và Năm phát hành của thẻ, in trên mặt trước của thẻ (VALID FROM) (nếu có).<br />
              Ví dụ: 05/17
            </CommonP>
            <CommonH3 fontWeight={500}>Tên chủ thẻ</CommonH3>
            <CommonP>
              Tên chủ thẻ in trên mặt trước của thẻ, viết cách và không có dấu Tiếng Việt.<br />
              Ví dụ: NGUYEN VAN A
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
            {/*<CommonH3 fontWeight={500}>Điều kiện thanh toán trực tuyến</CommonH3>*/}
            {
              stringUtils.isJson(selectedBank?.description)
                ? renderGuideContent(selectedBank?.description)
                : selectedBank?.description
            }
            {/*<div dangerouslySetInnerHTML={{__html: 'First &middot; Second'}} />*/}

            {/*<CommonP>*/}
            {/*  Đăng ký dịch vụ <strong>MSB iBanking</strong> và <strong>số điện thoại nhận SMS-OTP</strong> cho thẻ ghi*/}
            {/*  nợ nội địa MSB Bank bằng một trong các cách sau:<br />*/}
            {/*  <strong>Cách 1:</strong> Truy cập Ngân hàng trực tuyến MSB iBanking tại <Link*/}
            {/*  style={{ color: APP_THEME.ERROR_COLOR }} to={'#'}>https://msb.com.vn/ibanking2022/</Link>, và thực hiện*/}
            {/*  chuyển đổi sang dịch vụ MSB iBanking theo hướng dẫn của MSB Bank<br />*/}
            {/*  <strong>Cách 2:</strong> Đăng ký tại quầy giao dịch của MSB Bank*/}
            {/*</CommonP>*/}
            {/*<CommonH3 fontWeight={500}>Hạn mức thanh toán trực tuyến</CommonH3>*/}
            {/*<CommonP>*/}
            {/*  Tối đa 50,000,000 VND/giao dịch/ngày và 10 giao dịch/ngày.*/}
            {/*</CommonP>*/}
            {/*<CommonH3 fontWeight={500}>*/}
            {/*  Tổng đài hỗ trợ <Link style={{ color: APP_THEME.ERROR_COLOR }} to={'#'}>19006083</Link>*/}
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
