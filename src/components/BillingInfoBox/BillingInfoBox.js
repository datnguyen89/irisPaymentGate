import React from 'react'
import PropTypes from 'prop-types'
import { BillingInfoBoxWrapper } from './BillingInfoBoxStyled'
import { CommonH2, CommonSpan, FlexDiv } from '../CommonStyled/CommonStyled'
import IMAGES from '../../images'
import moment from 'moment'
import { Statistic, Tooltip } from 'antd'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { billInvalidState, currentBillState, feeState } from '../../recoil/billState'
import { PAGES, PAYMENT_RESULT_STATUS, RESPONSE_CODE } from '../../constant'
import numberUtils from '../../utils/numberUtils'
import dateUtils from '../../utils/dateUtils'
import { useNavigate } from 'react-router-dom'

const BillingInfoBox = props => {
  // region props, hook, state =================
  const { showCountDown } = props
  const navigate = useNavigate()
  const setBillInvalid = useSetRecoilState(billInvalidState)
  const currentBill = useRecoilValue(currentBillState)
  const fee = useRecoilValue(feeState)
  const billInfo = currentBill?.param
  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============
  const handleExpiredTime = () => {
    let billInvalidInfo = {
      status: PAYMENT_RESULT_STATUS.ERROR,
      title: 'Hết hạn',
      description: `Giao dịch quá thời gian chờ thanh toán. Quý khách vui lòng thực hiện lại giao dịch`,
      secondsToRedirect: 10,
      showBillInfo: true,
    }
    setBillInvalid(billInvalidInfo)
    navigate(PAGES.BILL_INVALID, { replace: true })
  }
  // endregion
  // region function render ====================

  // endregion
  // region side effect ========================

  // endregion
  return (
    <BillingInfoBoxWrapper>
      {
        currentBill?.responseCode === RESPONSE_CODE.SUCCESS &&
        <>
          <CommonH2
            fontSize={'2rem'}
            fontWeight={700}>
            Thông tin đơn hàng
          </CommonH2>
          <CommonH2
            fontSize={'1.6rem'}
            margin={'16px 0'}
            fontWeight={500}>
            Thanh toán tại
          </CommonH2>
          <FlexDiv alignItems={'center'}>
            {
              billInfo?.merchantLogo && <img className={'merchant-logo'} src={billInfo?.merchantLogo} alt={''} />
            }
            <CommonSpan fontSize={'1.4rem'}>{billInfo?.websiteName}</CommonSpan>
          </FlexDiv>
          <CommonH2
            fontSize={'1.6rem'}
            margin={'16px 0'}
            fontWeight={500}>
            Mã đơn hàng
          </CommonH2>
          <CommonSpan fontSize={'1.4rem'}>{billInfo?.orderNumber}</CommonSpan>
          <CommonH2
            fontSize={'1.6rem'}
            margin={'16px 0'}
            fontWeight={500}>
            Ghi chú
          </CommonH2>
          {
            billInfo?.description?.length > 64
              ?
              <Tooltip mouseEnterDelay={0.5} title={billInfo?.description}>
                <CommonSpan wordWrap={'break-word'} fontSize={'1.4rem'}>
                  {billInfo?.description?.slice(0, 64)}...
                </CommonSpan>
              </Tooltip>
              :
              <CommonSpan wordWrap={'break-word'} fontSize={'1.4rem'}>
                {billInfo?.description}
              </CommonSpan>
          }
          <CommonH2
            fontSize={'1.6rem'}
            margin={'16px 0'}
            fontWeight={500}>
            Số tiền đơn hàng
          </CommonH2>
          <CommonSpan fontSize={'1.4rem'}>{numberUtils.thousandSeparator(billInfo?.amount)} Đ</CommonSpan>
          {
            fee?.transferorFee &&
            <>
              <CommonH2
                fontSize={'1.6rem'}
                margin={'16px 0'}
                fontWeight={500}>
                Phí giao dịch
              </CommonH2>
              <CommonSpan
                fontSize={'1.4rem'}>{fee?.transferorFee > 0 ? numberUtils.thousandSeparator(fee?.transferorFee) + ' Đ' : 'Miễn phí'} </CommonSpan>
              <CommonH2
                fontSize={'1.6rem'}
                margin={'16px 0'}
                fontWeight={500}>
                Tổng tiền thanh toán
              </CommonH2>
              <CommonSpan
                fontSize={'1.4rem'}>{numberUtils.thousandSeparator(billInfo?.amount + fee?.transferorFee)} Đ</CommonSpan>
            </>
          }
          {
            showCountDown &&
            <>
              <CommonH2
                fontSize={'1.6rem'}
                margin={'16px 0'}
                fontWeight={500}>
                Đơn hàng sẽ hết hạn sau:
              </CommonH2>

              <Statistic.Countdown
                valueStyle={{
                  color: '#B12C43',
                  fontWeight: 700,
                  fontSize: 32,
                }}
                title={null}
                onFinish={handleExpiredTime}
                value={dateUtils.convertToMoment(billInfo?.expiredDate)}
                // value={moment().add(10,'seconds')}
                format={'mm:ss'}
              />
            </>
          }
        </>
      }
    </BillingInfoBoxWrapper>
  )
}

BillingInfoBox.propTypes = {
  showCountDown: PropTypes.bool,
}

export default BillingInfoBox