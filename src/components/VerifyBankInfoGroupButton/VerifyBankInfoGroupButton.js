import React from 'react'
import PropTypes from 'prop-types'
import { VerifyBankInfoGroupButtonWrapper } from './VerifyBankInfoGroupButtonStyled'
import { Button, Col, Divider, Row } from 'antd'

const VerifyBankInfoGroupButton = props => {
  // region props, hook, state =================

  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============

  // endregion
  // region function render ====================

  // endregion
  // region side effect ========================

  // endregion
  return (
    <VerifyBankInfoGroupButtonWrapper>
      <Row justify={'center'}>
        <Col xxl={16} xl={16} lg={16} sm={16} xs={24}>
          <Button block type={'primary'}>Tiếp tục</Button>
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col xxl={16} xl={16} lg={16} sm={16} xs={24}>
          <Divider>Hoặc</Divider>
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col xxl={16} xl={16} lg={16} sm={16} xs={24}>
          <Button block>Hủy</Button>
        </Col>
      </Row>
    </VerifyBankInfoGroupButtonWrapper>
  )
}

VerifyBankInfoGroupButton.propTypes = {}

export default VerifyBankInfoGroupButton