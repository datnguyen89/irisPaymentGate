import React from 'react'
import { NotFoundPageWrapper } from './NotFoundPageStyled'
import { Button, Result, Space } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { PAGES } from '../../constant'

const NotFoundPage = props => {
  let navigate = useNavigate()
  const location = useLocation()
  const { state } = location

  const handleClickBack = (num) => {
    switch (num) {
      case 1:
        navigate(-1, { state: state, replace: true })
        break
      case 2:
        navigate(PAGES.PAYMENT_METHOD, { state: state, replace: true })
        break
      default:
        break
    }
  }
  return (
    <NotFoundPageWrapper>
      <Result
        status='404'
        title='404'
        subTitle='Trang bạn tìm kiếm không tồn tại.'
        extra={
          <Space>
            <Button onClick={() => handleClickBack(1)}>Về trang trước</Button>
            <Button type='primary' onClick={() => handleClickBack(2)}>Về trang chủ</Button>
          </Space>
        }
      />
    </NotFoundPageWrapper>
  )
}

NotFoundPage.propTypes = {}

export default NotFoundPage