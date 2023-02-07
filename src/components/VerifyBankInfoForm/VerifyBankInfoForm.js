import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { VerifyBankInfoFormWrapper } from './VerifyBankInfoFormStyled'
import { Button, Col, Form, Input, Row } from 'antd'
import IMAGES from '../../images'
import { useRecoilValue } from 'recoil'
import { selectedBankState } from '../../recoil/paymentMethodState'
import { SuffixLogoWrapper } from '../CommonStyled/CommonStyled'
import { REQUIRE_FIELD } from '../../constant'
import formUtils from '../../utils/formUtils'

const VerifyBankInfoForm = props => {
  // region props, hook, state =================
  const { formVerify } = props

  const [form] = Form.useForm()

  const selectedBank = useRecoilValue(selectedBankState)

  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============

  const onFinishForm = (formData) => {
    console.log(formData)
  }
  // endregion
  // region function render ====================

  // endregion
  // region side effect ========================
  useEffect(() => {
    if (!formVerify) return
    form.setFieldsValue(formVerify)
  }, [formVerify])
  // endregion
  return (
    <VerifyBankInfoFormWrapper>
      <Form
        onFinish={onFinishForm}
        disabled={true}
        layout={'vertical'}
        form={form}
        colon={false}
      >
        <Row gutter={[16, 0]}>
          {
            formVerify?.fieldList?.length > 0 && formVerify?.fieldList?.map((item, index) =>
              // nếu là item đầu tiên hoặc cuối cùng và độ dài mảng chẵn thì full, nếu không thì 1/2 dòng
              index === 0
              || ((index === formVerify?.fieldList?.length - 1) && formVerify?.fieldList?.length % 2 === 0)
                ?
                <Col xxl={24} xl={24} lg={24} sm={24} xs={24} key={index}>
                  <Form.Item
                    name={item}
                    label={formUtils.renderRequireFieldLabel(item, 'requireField')}
                    rules={formUtils.renderRule(item, 'requireField')}
                  >
                    <Input
                      placeholder={formUtils.renderRequireFieldPlaceholder(item, 'requireField')}
                      suffix={
                        item === REQUIRE_FIELD.BANK_ACCOUNT &&
                        <SuffixLogoWrapper height={'32px'}>
                          <img src={selectedBank?.logo} />
                        </SuffixLogoWrapper>
                      } />
                  </Form.Item>
                </Col>
                :
                <Col xxl={12} xl={12} lg={12} sm={24} xs={24} key={index}>
                  <Form.Item
                    name={item}
                    label={formUtils.renderRequireFieldLabel(item, 'requireField')}
                    rules={formUtils.renderRule(item, 'requireField')}
                  >
                    <Input
                      placeholder={formUtils.renderRequireFieldPlaceholder(item, 'requireField')} />
                  </Form.Item>
                </Col>,
            )
          }
        </Row>
      </Form>
    </VerifyBankInfoFormWrapper>
  )
}

VerifyBankInfoForm.propTypes = {
  formVerify: PropTypes.object,
}

export default VerifyBankInfoForm