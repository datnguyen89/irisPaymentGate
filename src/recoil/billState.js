import { atom } from 'recoil'
import { PAYMENT_RESULT_STATUS } from '../constant'
import { localStorageEffect } from './recoilHelper'


export const currentBillState = atom({
  key: 'currentBillState',
  default: null,
})

export const feeState = atom({
  key: 'feeState',
  default: null,
})

export const billInvalidState = atom({
  key: 'billInvalidState',
  default: {
    status: PAYMENT_RESULT_STATUS.ERROR,
    title: 'Thông báo',
    description: 'Đơn hàng không tồn tại hoặc đã được xử lý',
    secondsToRedirect: 10,
    showBillInfo: false,
    hideWarningClose: false,
  },
})
export const formVerifyState = atom({
  key: 'formVerifyState',
  default: null,
  effects: [
    localStorageEffect('formVerifyState'),
  ],
})