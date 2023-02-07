import { atom, selector } from 'recoil'
import { METHOD_CODE } from '../constant'
import { localStorageEffect } from './recoilHelper'

export const paymentMethodState = atom({
  key: 'paymentMethodState',
  default: null,
})
export const selectedMethodState = atom({
  key: 'selectedMethodState',
  default: METHOD_CODE.DOMESTIC,
})
export const selectedBankState = atom({
  key: 'selectedBankState',
  default: null,
  effects: [
    localStorageEffect('selectedBankState'),
  ],
})
export const banksDomesticState = selector({
  key: 'banksDomesticState',
  get: ({ get }) => {
    const paymentMethod = get(paymentMethodState)
    return paymentMethod?.find(item => item?.methodCode === METHOD_CODE.DOMESTIC)
  },
})
export const banksInternationalState = selector({
  key: 'banksInternationalState',
  get: ({ get }) => {
    const paymentMethod = get(paymentMethodState)
    return paymentMethod?.find(item => item?.methodCode === METHOD_CODE.INTERNATIONAL)
  },
})
