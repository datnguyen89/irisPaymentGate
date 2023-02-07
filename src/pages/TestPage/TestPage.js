import React, { useEffect } from 'react'
import { Button, Col, DatePicker, Form, Input, Modal, Row } from 'antd'
import Marquee from 'react-fast-marquee'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import FormHeader from '../../components/FormHeader'
import { FormContent, FormContentLeft, FormContentRight } from '../../components/CommonStyled/CommonStyled'
import FormFooter from '../../components/FormFooter'
import BillingInfoBox from '../../components/BillingInfoBox'
import { useDeviceData } from 'react-device-detect'
import { useQuery } from '../../hooks/useQuery'
import { PAGES } from '../../constant'

const APP_THEME = require('../../theme')

const TestPage = props => {
  // region props, hook, state =================
  const deviceData = useDeviceData()
  const query = useQuery()
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============
  const handleClickConfirm = () => {
    Modal.confirm({
      wrapClassName: 'custom-modal-confirm',
      closable: true,
      icon: null,
      title: 'Kết quả giao dịch',
      okText: 'Đồng ý',
      cancelText: 'Hủy',
      onOk: () => {
        console.log('OK')
      },
      onCancel: () => {
        console.log('Cancel')
      },
      content:
        <>
          Nội dung thông báo
        </>,
    })
  }
  const handleClickInfo = () => {
    Modal.info({
      wrapClassName: 'custom-modal-confirm', // class: hide-btn (no buttons footer)
      closable: true,
      icon: null,
      title: 'Thông báo',
      okText: 'Đồng ý',
      onOk: () => {
        console.log('OK')
      },
      onCancel: () => {
        console.log('Cancel')
      },
      content:
        <>
          Nội dung thông báo
        </>,
    })
  }

  const handleDeleteLocationState = (data) => {
    navigate(PAGES.TEST, { replace: true, state: { data: data } })
    // location.state sẽ không thay đổi ngay khi log ở đây => theo dõi location changed bằng useEffect với location trong dependence array
  }
  // endregion
  // region function render ====================

  // endregion
  // region side effect ========================
  useEffect(() => {
    console.log(deviceData?.os?.name)
  }, [deviceData])


  useEffect(() => {
    // http://localhost:3004/test/a31
    console.log(params) // {testId: 'a31'}
  }, [])
  useEffect(() => {
    // http://localhost:3004/test/a31/b32
    console.log(params) // {testId: 'a31', moreId: 'b32'}
  }, [])

  useEffect(() => {
    console.log(location)
  }, [location])
  // endregion
  return (
    <div>
      <FormHeader />
      <FormContent>
        <FormContentLeft>
          <Button onClick={handleClickConfirm}>Confirm Modal</Button>
          <Button onClick={handleClickInfo}>Info Modal</Button>
          <Row>
            <Col span={10}>
              <Marquee
                gradient={false}
                // gradientWidth={50}
                // gradientColor={[4, 101, 176]}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into
                electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of
                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
                Aldus PageMaker including versions of Lorem Ipsum
              </Marquee>
            </Col>
          </Row>
          <br />
          <Button type={'default'} disabled>Disable</Button>
          <br />
          <br />
          <Button type={'default'}>Default</Button>
          <br />
          <br />
          <Button type={'primary'} onClick={() => handleDeleteLocationState('Primary')}>Primary</Button>
          <br />
          <br />
          <Button danger onClick={() => handleDeleteLocationState('Danger')}>Delete Location State</Button>
          <br />
          <br />
          <DatePicker />
          <br />
          <br />
          <Link to={'#'}>ABC</Link>
          <br />
          <div style={{ fontWeight: 300 }}>
            {deviceData && JSON.stringify(deviceData)}
          </div>
        </FormContentLeft>
        <FormContentRight>
          <BillingInfoBox showCountDown={true} />
        </FormContentRight>
      </FormContent>
      <FormFooter />
      <Modal
        wrapClassName={'custom-modal'}
        title={'Thông báo'}
        open={false}
        okText={'Đồng ý'}
        cancelText={'Hủy'}
      >
        Thông tin số thẻ của bạn định dạng là thuộc Ngân Hàng Vietcombank.
        Bạn có muốn đổi sang thanh toán bằng thẻ ngân hàng Vietcombank?
      </Modal>
      <Form layout={'vertical'}>
        <Form.Item
          label={'a'}
          rules={[{ required: true, message: 'Nhập nội dung' }]}
          name={'a'}>
          <Input />
        </Form.Item>
        <Form.Item
          label={'b'}
          name={'b'}>
          <Input />
        </Form.Item>
      </Form>
    </div>
  )
}

TestPage.propTypes = {}

export default TestPage
