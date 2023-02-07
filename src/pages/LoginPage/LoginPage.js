import React from 'react'
import { Button, Form, Input } from 'antd'

const LoginPage = props => {
  // region props, hook, state =================
  const [formLogin] = Form.useForm()
  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============
  const handleLogin = (e) => {

  }
  // endregion
  // region function render ====================

  // endregion
  // region side effect ========================

  // endregion
  return (
    <div>
      <Form
        form={formLogin}
        labelAlign={'left'}
        onFinish={handleLogin}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        colon={false}
      >
        <Form.Item
          name={'userName'}
          label={'Tên đăng nhập'}>
          <Input />
        </Form.Item>
        <Form.Item
          name={'password'}
          label={'Mật khẩu'}>
          <Input />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
        >
          <Button block type={'primary'} htmlType={'submit'}>Login</Button>
        </Form.Item>
      </Form>



    </div>
  )
}

LoginPage.propTypes = {}

export default LoginPage