import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { VerifyBankInfoTabsWrapper } from './VerifyBankInfoTabsStyled'
import { Button, Col, Form, Input, message, Modal, notification, Row, Tabs } from 'antd'
import IMAGES from '../../images'
import { CommonP, SuffixLogoWrapper } from '../CommonStyled/CommonStyled'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import {
  banksDomesticState,
  banksInternationalState,
  selectedBankState,
  selectedMethodState,
} from '../../recoil/paymentMethodState'
import { billInvalidState, currentBillState, formVerifyState } from '../../recoil/billState'
import { useLocation, useNavigate } from 'react-router-dom'
import { PAGES, PAYMENT_RESULT_STATUS, REQUIRE_FIELD, REQUIRE_FIELD_TYPES, RESPONSE_CODE } from '../../constant'
import objectUtils from '../../utils/objectUtils'
import validator from '../../validator'
import billStore from '../../stores/billStore'
import formUtils from '../../utils/formUtils'
import { confirmBeforeUnloadState } from '../../recoil/commonState'

const VerifyBankInfoTabs = props => {
  // region props, hook, state =================
  const { detailMethod } = props
  const [formInternetBanking] = Form.useForm()
  const [formATM] = Form.useForm()
  const navigate = useNavigate()
  const location = useLocation()
  const { state } = location

  const [validFormInternetBanking, setValidFormInternetBanking] = useState(false)
  const [validFormATM, setValidFormATM] = useState(false)
  const selectedBank = useRecoilValue(selectedBankState)
  const setFormVerify = useSetRecoilState(formVerifyState)
  const banksDomestic = useRecoilValue(banksDomesticState)
  const banksInternational = useRecoilValue(banksInternationalState)
  const resetSelectedMethod = useResetRecoilState(selectedMethodState)
  const resetSelectedBank = useResetRecoilState(selectedBankState)
  const setBillInvalid = useSetRecoilState(billInvalidState)

  const setConfirmBeforeUnload = useSetRecoilState(confirmBeforeUnloadState)

  const currentBill = useRecoilValue(currentBillState)
  const billInfo = currentBill?.param

  const [tabActiveKey, setTabActiveKey] = useState('InternetBanking') // InternetBanking || ATM
  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============


  const handleFinishInternetBanking = (collect) => {
    message.info('Coming soon!')
  }
  const handleFinishATM = (collect) => {
    let newCollect = { ...collect, issueDate: collect?.issueDate?.replace('/', '') }
    const payload = {
      token: state?.token, // Mã thanh toán
      bankCode: selectedBank?.bankCode,
      bankAccount: collect?.bankAccount,  // Số thẻ
      ...newCollect,
    }
    billStore.paymentVerify(payload)
      .then(res => {
        switch (res?.responseCode) {
          case RESPONSE_CODE.REQUIRE_CONFIRM_BANK:
            // chuyển sang trang nhập otp
            setFormVerify({ ...collect, ...res, fieldList: detailMethod?.requireField })
            navigate(PAGES.VERIFY_OTP, { state: state, replace: true })
            break
          case RESPONSE_CODE.CREATE_ORDER_FAIL:
            // Tạo đơn hàng lỗi thì show thông báo và ở lại trang verify
            break
          default:
            // Lỗi khác thì bay về trang lỗi
            resetSelectedBank()
            resetSelectedMethod()

            let invalidInfo = {
              status: PAYMENT_RESULT_STATUS.ERROR,
              title: 'Thông báo',
              description: res?.description,
              secondsToRedirect: 10,
              hideWarningClose: false,
            }
            setBillInvalid(invalidInfo)
            navigate(PAGES.BILL_INVALID, { replace: true })
            break
        }
      })
  }
  const handleChangeFormInternetBanking = (changedValues, allValues) => {
    let invalid = objectUtils.hasPropNullOrWhitespace(allValues)
    if (invalid) {
      setValidFormInternetBanking(false)
      return
    }
    formInternetBanking.validateFields()
      .catch(error => {
        if (error?.errorFields?.length === 0) {
          setValidFormInternetBanking(true)
        } else {
          setValidFormInternetBanking(false)
        }
      })
  }

  const handleChangeFormATM = (changedValues, allValues) => {
    let invalid = objectUtils.hasPropNullOrWhitespace(allValues)
    if (invalid) {
      setValidFormATM(false)
      return
    }
    formATM.validateFields()
      .catch(error => {
        if (error?.errorFields?.length === 0) {
          setValidFormATM(true)
        } else {
          setValidFormATM(false)
        }
      })
  }
  const handleCancelInternetBanking = () => {
    Modal.confirm({
      wrapClassName: 'custom-modal-confirm',
      closable: true,
      icon: null,
      title: 'Thông báo',
      okText: 'Đồng ý',
      cancelText: 'Hủy',
      onOk: () => {
        Promise.resolve()
          .then(() => setConfirmBeforeUnload(false))
          .then(() => {
            billStore.cancelBill({ token: state?.token })
              .finally(() => {
                window.location.replace(billInfo?.returnUrl)
              })
          })
      },
      onCancel: () => {
        console.log('Cancel')
      },
      content:
        <CommonP textAlign={'center'}>
          Bạn có muốn hủy thanh toán đơn hàng không?
        </CommonP>,
    })
  }
  const handleCancelATM = () => {
    Modal.confirm({
      wrapClassName: 'custom-modal-confirm',
      closable: true,
      icon: null,
      title: 'Thông báo',
      okText: 'Đồng ý',
      cancelText: 'Hủy',
      onOk: () => {
        Promise.resolve()
          .then(() => setConfirmBeforeUnload(false))
          .then(() => {
            billStore.cancelBill({ token: state?.token })
              .finally(() => {
                window.location.replace(billInfo?.returnUrl)
              })
          })
      },
      onCancel: () => {
        console.log('Cancel')
      },
      content:
        <CommonP textAlign={'center'}>
          Bạn có muốn hủy thanh toán đơn hàng không?
        </CommonP>,
    })
  }
  const showModalSuggestBank = (suggestBank, type, value) => {
    Modal.confirm({
      wrapClassName: 'custom-modal-confirm',
      closable: true,
      icon: null,
      title: 'Thông báo',
      okText: 'Đồng ý',
      cancelText: 'Hủy',
      onOk: () => {
        formATM.resetFields()
        formInternetBanking.resetFields()
        navigate(`${PAGES.VERIFY_PAYMENT}/${suggestBank?.bankCode}`, {
          replace: true,
          state: state,
        })
      },
      onCancel: () => {
        console.log('Cancel')
      },
      content:
        <>
          Số {type === 'ATM' ? 'thẻ' : 'tài khoản'} vừa nhập không đúng định
          dạng {type === 'ATM' ? 'thẻ' : 'tài khoản'} của {selectedBank?.bankCode}.<br />
          Bạn có muốn đổi sang thanh toán bằng {type === 'ATM' ? 'thẻ' : 'tài khoản'} ngân hàng {suggestBank?.bankCode}
        </>,
    })
  }
  const checkBinCode = (value, type) => {
    // value: binCode input, type: ATM | InternetBanking
    // Check nếu binCode lệch với thằng seleted bank và trùng với 1 trong các thằng ngân hàng đang có thì sugest
    let newSelectedBankDomestic = banksDomestic?.details?.find(item => {
      let listBinCode = item?.binCode?.split(',')
      let existBinCode = listBinCode?.find(binCode => value?.includes(binCode))
      if (existBinCode) return item
      return null
    })
    let newSelectedBankInternational = banksInternational?.details?.find(item => {
      let listBinCode = item?.binCode?.split(',')
      let existBinCode = listBinCode?.find(binCode => value?.includes(binCode))
      if (existBinCode) return item
      return null
    })
    if (newSelectedBankDomestic) {
      showModalSuggestBank(newSelectedBankDomestic, type, value)
    } else if (newSelectedBankInternational) {
      showModalSuggestBank(newSelectedBankInternational, type, value)
    } else {
      // Không có thì báo lỗi
      notification.error({
        message: 'Thông báo',
        description: `Số thẻ vừa nhập không đúng định dạng thẻ của ${selectedBank?.bankCode}. Số thẻ của ${selectedBank?.bankCode} bắt đầu ${selectedBank?.binCode}`,
      })
    }
  }
  const handleBlurInternetBanking = (e, item) => {
    if (item !== REQUIRE_FIELD.BANK_ACCOUNT) return
    let value = e?.currentTarget?.value?.slice(0, 7)
    if (!value) return
    if (value?.includes(selectedBank?.binCode)) return
    checkBinCode(value, 'InternetBanking')
  }
  const handleBlurATM = (e, item) => {
    if (item !== REQUIRE_FIELD.BANK_ACCOUNT) return
    let value = e?.currentTarget?.value?.slice(0, 7)
    if (!value) return
    if (value?.includes(selectedBank?.binCode)) return
    checkBinCode(value, 'ATM')
  }
  // endregion
  // region function render ====================
  const onChangeTab = (e) => {
    setTabActiveKey(e)
  }

  const renderTabBarStyle = () => {
    if (detailMethod?.requireFieldBankAccount?.length > 0 && detailMethod?.requireField?.length > 0) {
      return {}
    } else {
      return {
        display: 'none',
      }
    }
  }
  const items = [
    detailMethod?.requireFieldBankAccount?.length > 0 && {
      label: 'Internet Banking',
      key: 'InternetBanking',
      children: <Form
        onFinish={handleFinishInternetBanking}
        layout={'vertical'}
        form={formInternetBanking}
        colon={false}
        onValuesChange={handleChangeFormInternetBanking}
      >
        <Row gutter={[16, 0]}>
          {
            detailMethod?.requireFieldBankAccount?.length > 0 && detailMethod?.requireFieldBankAccount?.map((item, index) =>
              // nếu là item đầu tiên hoặc cuối cùng và độ dài mảng chẵn thì full, nếu không thì 1/2 dòng
              index === 0
              || ((index === detailMethod?.requireFieldBankAccount?.length - 1) && detailMethod?.requireFieldBankAccount?.length % 2 === 0)
                ?
                <Col xxl={24} xl={24} lg={24} sm={24} xs={24} key={index}>
                  <Form.Item
                    name={item}
                    label={formUtils.renderRequireFieldLabel(item, 'requireFieldBankAccount')}
                    rules={formUtils.renderRule(item, 'requireFieldBankAccount')}
                  >
                    <Input
                      onBlur={(e) => handleBlurInternetBanking(e, item)}
                      placeholder={formUtils.renderRequireFieldPlaceholder(item, 'requireFieldBankAccount')}
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
                    label={formUtils.renderRequireFieldLabel(item, 'requireFieldBankAccount')}
                    rules={formUtils.renderRule(item, 'requireFieldBankAccount')}
                  >
                    <Input
                      placeholder={formUtils.renderRequireFieldPlaceholder(item, 'requireFieldBankAccount')}
                    />
                  </Form.Item>
                </Col>,
            )
          }
          <Col
            xxl={24} xl={24} lg={24} sm={24} xs={24}
            style={{ textAlign: 'center' }}
          >
            <Button onClick={handleCancelInternetBanking}>
              Hủy
            </Button>
            <Button
              style={{ marginLeft: 16 }}
              disabled={!validFormInternetBanking}
              htmlType={'submit'}
              type={'primary'}>
              Đồng ý
            </Button>
          </Col>
        </Row>
      </Form>,
    },
    detailMethod?.requireField?.length > 0 && {
      label: 'ATM',
      key: 'ATM',
      children: <Form
        onFinish={handleFinishATM}
        layout={'vertical'}
        form={formATM}
        colon={false}
        onValuesChange={handleChangeFormATM}
      >
        <Row gutter={[16, 0]}>
          {
            detailMethod?.requireField?.length > 0 && detailMethod?.requireField?.map((item, index) =>
              // nếu là item đầu tiên hoặc cuối cùng và độ dài mảng chẵn thì full, nếu không thì 1/2 dòng
              index === 0
              || ((index === detailMethod?.requireField?.length - 1) && detailMethod?.requireField?.length % 2 === 0)
                ?
                <Col xxl={24} xl={24} lg={24} sm={24} xs={24} key={index}>
                  <Form.Item
                    name={item}
                    label={formUtils.renderRequireFieldLabel(item, 'requireField')}
                    rules={formUtils.renderRule(item, 'requireField')}
                  >
                    <Input
                      onBlur={(e) => handleBlurATM(e, item)}
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
          <Col
            xxl={24} xl={24} lg={24} sm={24} xs={24}
            style={{ textAlign: 'center' }}
          >
            <Button onClick={handleCancelATM}>
              Hủy
            </Button>
            <Button
              style={{ marginLeft: 16 }}
              disabled={!validFormATM}
              htmlType={'submit'}
              type={'primary'}>
              Đồng ý
            </Button>
          </Col>
        </Row>
      </Form>,
    },
  ]
  // endregion
  // region side effect ========================
  useEffect(() => {
    if (detailMethod?.requireFieldBankAccount?.length > 0) {
      setTabActiveKey('InternetBanking')
      return
    }
    if (detailMethod?.requireField?.length > 0) {
      setTabActiveKey('ATM')
      return
    }
  }, [detailMethod])
  // endregion

  //requireFieldBankAccount: Internet banking
  //requireField: ATM
  return (
    <VerifyBankInfoTabsWrapper>
      {
        detailMethod &&
        <Tabs activeKey={tabActiveKey} onChange={onChangeTab} tabBarStyle={renderTabBarStyle()} items={items} />
      }
    </VerifyBankInfoTabsWrapper>
  )
}

VerifyBankInfoTabs.propTypes = {
  detailMethod: PropTypes.object,
}

export default VerifyBankInfoTabs