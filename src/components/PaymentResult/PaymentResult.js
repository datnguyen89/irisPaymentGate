import React from 'react'
import PropTypes from 'prop-types'
import { PaymentResultWrapper } from './PaymentResultStyled'
import { CommonH1, CommonH2, FlexDiv } from '../CommonStyled/CommonStyled'
import { PAYMENT_RESULT_STATUS } from '../../constant'
import IMAGES from '../../images'
import moment from 'moment'
import { Statistic } from 'antd'
import { selectedBankState } from '../../recoil/paymentMethodState'
import { useRecoilValue } from 'recoil'
import { currentBillState } from '../../recoil/billState'

const APP_THEME = require('../../theme')

const PaymentResult = props => {
  // region props, hook, state =================
  const {
    status,
    title,
    description,
    secondsToRedirect,
    hideWarningClose,
    finishCountdown,
  } = props
  const selectedBank = useRecoilValue(selectedBankState)
  const currentBill = useRecoilValue(currentBillState)
  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============

  // endregion
  // region function render ====================
  const renderColor = () => {
    switch (status) {
      case PAYMENT_RESULT_STATUS.SUCCESS:
        return APP_THEME.PRIMARY_COLOR
      case PAYMENT_RESULT_STATUS.PENDING:
        return APP_THEME.WARNING_COLOR
      case PAYMENT_RESULT_STATUS.ERROR:
        return APP_THEME.ERROR_COLOR
      default:
        return
    }
  }
  const renderTitle = () => {
    switch (status) {
      case PAYMENT_RESULT_STATUS.SUCCESS:
        return 'Thanh toán thành công'
      case PAYMENT_RESULT_STATUS.PENDING:
        return 'Giao dịch đang xử lý...'
      case PAYMENT_RESULT_STATUS.ERROR:
        return 'Giao dịch thất bại'
      default:
        return
    }
  }
  const renderDescription = () => {
    switch (status) {
      case PAYMENT_RESULT_STATUS.SUCCESS:
        return `Đơn hàng của bạn đã được thanh toán thành công trên hệ thống ngân hàng ${selectedBank?.bankCode}.`
      case PAYMENT_RESULT_STATUS.PENDING:
        return 'Hệ thống đang xử lý đơn hàng của bạn, vui lòng ghi lại mã đơn hàng để tra soát trạng thái.'
      case PAYMENT_RESULT_STATUS.ERROR:
        return 'Giao dịch của bạn không xử lý thành công vui lòng quay lại trang để thực hiện lại đơn hàng.'
      default:
        return
    }
  }
  const renderImage = () => {
    switch (status) {
      case PAYMENT_RESULT_STATUS.SUCCESS:
        return IMAGES.RESULT_SUCCESS
      case PAYMENT_RESULT_STATUS.PENDING:
        return IMAGES.RESULT_PENDING
      case PAYMENT_RESULT_STATUS.ERROR:
        return IMAGES.RESULT_ERROR
      default:
        return
    }
  }
  // endregion
  // region side effect ========================

  // endregion
  return (
    <PaymentResultWrapper>
      <CommonH1
        color={renderColor()}
        margin={'8px 0'}
        fontWeight={700}
        textAlign={'center'}
        fontSize={'2.4rem'}>
        {
          title ? title : renderTitle()
        }
      </CommonH1>
      <CommonH2
        whiteSpace={'pre-wrap'}
        textAlign={'center'}
      >
        {
          description ? description : renderDescription()
        }
      </CommonH2>

      {
        !hideWarningClose &&
        <CommonH2
          whiteSpace={'pre-wrap'}
          textAlign={'center'}
        >
          Quý khách vui lòng KHÔNG tắt trình duyệt
        </CommonH2>
      }


      <FlexDiv
        margin={'32px'}
        justifyContent={'center'}
        alignItems={'center'}>
        <img src={renderImage()} alt={''} height={320} />
      </FlexDiv>
      {
        currentBill &&
        <>
          <CommonH2
            color={APP_THEME.PRIMARY_COLOR}
            fontWeight={500}
            fontSize={'1.6rem'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Bạn sẽ trở lại trang mua hàng trong
            <Statistic.Countdown
              valueStyle={{
                color: '#D3333C',
                padding: '0 8px',
                fontSize: '16px',
              }}
              onFinish={() => finishCountdown && finishCountdown()}
              title={null}
              value={moment().add(secondsToRedirect || 10, 'seconds')}
              format={'ss Giây'}
            />
          </CommonH2>
          <CommonH2
            textAlign={'center'}
            color={APP_THEME.PRIMARY_COLOR}
            fontWeight={500}
            fontSize={'1.6rem'}
          >
            Xin vui lòng chờ trong giây lát...
          </CommonH2>
        </>
      }
    </PaymentResultWrapper>
  )
}

PaymentResult.propTypes = {
  status: PropTypes.string,
  description: PropTypes.node,
  title: PropTypes.node,
  secondsToRedirect: PropTypes.number,
  finishCountdown: PropTypes.func,
  hideWarningClose: PropTypes.bool,
}

export default PaymentResult