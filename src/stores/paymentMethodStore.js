import request from '../requests/request'
import { setRecoil } from 'recoil-nexus'
import { paymentMethodState } from '../recoil/paymentMethodState'

const paymentMethodStore = {
  getListPaymentMethod: (params) => {
    return new Promise((resolve, reject) => {
      const url = `/api/v1/payment/methods`
      request.get(url, params, false, false)
        .then(res => {
          setRecoil(paymentMethodState, res?.param)
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getDetailPaymentMethod: (params) => {
    return new Promise((resolve, reject) => {
      const url = `/api/v1/payment/bank/${params.bankCode}`
      request.get(url, null, false, false)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
}
export default paymentMethodStore