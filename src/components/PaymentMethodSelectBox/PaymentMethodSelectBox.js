import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { PanelHeaderTitle, PanelHeaderWrapper, PaymentMethodSelectBoxWrapper } from './PaymentMethodSelectBoxStyled'
import { PAGES, METHOD_CODE } from '../../constant'
import { Collapse } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { paymentMethodState } from '../../recoil/paymentMethodState'
import BankSelectBox from '../BankSelectBox'
import IMAGES from '../../images'

// const APP_THEME = require('../../theme')

const PaymentMethodSelectBox = props => {
  // region props, hook, state =================
  const {
    defaultActiveKeyPanel,
  } = props

  const [activeKey, setActiveKey] = useState()

  const navigate = useNavigate()
  const location = useLocation()
  const { state } = location

  const paymentMethod = useRecoilValue(paymentMethodState)
  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============
  const handleClickCollapse = (methodCode) => {
    switch (methodCode) {
      case METHOD_CODE.WALLET:
        navigate(PAGES.PAYING_QR, { state: state, replace: true })
        break
      default:
        // setActiveKey(methodCode)
        break
    }
  }
  // endregion
  // region function render ====================
  const renderCollapsePanelContent = (item) => {
    if (!item?.active) return
    switch (item?.methodCode) {
      case METHOD_CODE.WALLET:
        return
      case METHOD_CODE.DOMESTIC:
        return <BankSelectBox
          title={'CHỌN NGÂN HÀNG THANH TOÁN'}
          showGuideLink={false}
          banks={item?.details}
        />
      case METHOD_CODE.INTERNATIONAL:
        return <BankSelectBox
          title={'CHỌN NGÂN HÀNG THANH TOÁN'}
          showGuideLink={false}
          banks={item?.details}
        />
      default:
        return
    }
  }
  const renderPanelHeader = (item) => {
    switch (item?.methodCode) {
      case METHOD_CODE.WALLET:
        return (
          <PanelHeaderWrapper>
            <img src={IMAGES.WALLET} alt={''} height={36} />
            <PanelHeaderTitle>{item?.methodName}</PanelHeaderTitle>
          </PanelHeaderWrapper>
        )
      case METHOD_CODE.DOMESTIC:
        return (
          <PanelHeaderWrapper>
            <img src={IMAGES.DOMESTIC} alt={''} height={36} />
            <PanelHeaderTitle>{item?.methodName}</PanelHeaderTitle>
          </PanelHeaderWrapper>
        )
      case METHOD_CODE.INTERNATIONAL:
        return (
          <PanelHeaderWrapper>
            <img src={IMAGES.INTERNATIONAL} alt={''} height={36} />
            <PanelHeaderTitle>{item?.methodName}</PanelHeaderTitle>
          </PanelHeaderWrapper>
        )
      default:
        return ''
    }
  }
  // endregion
  // region side effect ========================

  // endregion
  return (
    <PaymentMethodSelectBoxWrapper>
      <Collapse
        onChange={handleClickCollapse}
        expandIconPosition={'end'}
        defaultActiveKey={defaultActiveKeyPanel}
        ghost
        accordion
      >
        {
          paymentMethod && paymentMethod.map(item => {
              if (item?.active) {
                return (
                  <Collapse.Panel
                    forceRender={true}
                    showArrow={item?.details?.length > 0}
                    // header={item?.methodName}
                    header={renderPanelHeader(item)}
                    key={item?.methodCode}>
                    {renderCollapsePanelContent(item)}
                  </Collapse.Panel>
                )
              }
            },
          )
        }
      </Collapse>
    </PaymentMethodSelectBoxWrapper>
  )
}

PaymentMethodSelectBox.propTypes = {
  defaultActiveKeyPanel: PropTypes.string,
}

export default PaymentMethodSelectBox
