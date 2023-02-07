import React from 'react'
// region Styling
import './App.less'
import LoadingOverLay from './components/LoadingOverLay'
// endregion
// region Router
import { Route, Routes } from 'react-router-dom'
import history from './customRouter/history'
import CustomRouter from './customRouter/CustomRouter'
// endregion
// region Pages
import { PAGES } from './constant'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import ProtectedLayout from './layouts/ProtectedLayout'
import AuthenticationLayout from './layouts/AuthenticationLayout'
import ChoosePaymentMethodPage from './pages/ChoosePaymentMethodPage'
import PayingQRPage from './pages/PayingQRPage'
import PaymentResultPage from './pages/PaymentResultPage'
import TestPage from './pages/TestPage/TestPage'
import VerifyPaymentInfoPage from './pages/VerifyPaymentInfoPage'
import VerifyOtpPage from './pages/VerifyOtpPage'
import ThemeEditPage from './pages/ThemeEditPage'
import BillInvalidPage from './pages/BillInvalidPage'
import ReceiveDataPage from './pages/ReceiveDataPage'


// endregion
const App = () => {
  return (
    <>
      <CustomRouter history={history}>
        <Routes>
          <Route element={<AuthenticationLayout />}>
            <Route path={PAGES.LOGIN} element={<LoginPage />} />
          </Route>
          <Route path={PAGES.RECEIVE_DATA} element={<ReceiveDataPage />} />
          <Route element={<ProtectedLayout />}>
            <Route path={PAGES.HOME} element={<HomePage />} />
            <Route path={PAGES.PAYMENT_METHOD} element={<ChoosePaymentMethodPage />} />
            <Route path={PAGES.PAYING_QR} element={<PayingQRPage />} />
            <Route path={PAGES.PAYMENT_RESULT} element={<PaymentResultPage />} />
            <Route path={PAGES.VERIFY_PAYMENT} element={<VerifyPaymentInfoPage />}>
              <Route path=':bankCode' element={<VerifyPaymentInfoPage />} />
            </Route>
            <Route path={PAGES.VERIFY_OTP} element={<VerifyOtpPage />} />
            <Route path={PAGES.BILL_INVALID} element={<BillInvalidPage />} />

            <Route path={PAGES.TEST} element={<TestPage />}>
              <Route path=':testId' element={<TestPage />} />
              <Route path=':testId/:moreId' element={<TestPage />} />
            </Route>
          </Route>
          <Route path={PAGES.THEME_EDIT} element={<ThemeEditPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </CustomRouter>
      <LoadingOverLay />
    </>
  )
}

export default App
