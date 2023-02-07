/** Use only with Antd Form */
/** Use only with Antd Form */
import moment from 'moment'

/** Currently validator will no longer working if using regex from outside 'validator' object */

const validator = {
  validateAccountNumber: (rule, value, callback) => {
    const regex = /^\d*$/
    const regexWhitespace = /^\S$|^\S[\s\S]*\S$/
    if (value && !regexWhitespace.test(value)) {
      callback('Vui lòng loại bỏ khoảng trắng ở đầu và cuối!')
    } else if (value && !regex.test(value)) {
      callback('Vui lòng nhập giá trị số!')
    } else if (value && value?.length < 12) {
      callback('Vui lòng nhập tối thiểu 12 ký tự!')
    } else if (value?.length > 20) {
      callback('Vui lòng nhập tối đa 20 ký tự!')
    } else {
      callback()
    }
  },
  validateAccountName: (rule, value, callback) => {
    const regexWhitespace = /^\S$|^\S[\s\S]*\S$/
    const regexUppercase = /^[a-zA-z\s]+$/
    if (value && !regexWhitespace.test(value)) {
      callback('Vui lòng loại bỏ khoảng trắng ở đầu và cuối!')
    } else if (value?.length > 63) {
      callback('Vui lòng nhập tối đa 63 ký tự!')
    } else if (value && !regexUppercase.test(value)) {
      callback('Vui lòng nhập tiếng việt không dấu!')
    } else {
      callback()
    }
  },
  validateIssueDate: (rule, value, callback) => {
    const regexWhitespace = /^\S$|^\S[\s\S]*\S$/
    const regexNumber = /^\d\d\/\d\d$/
    if (value && !regexWhitespace.test(value)) {
      callback('Vui lòng loại bỏ khoảng trắng ở đầu và cuối!')
    } else if (value && !regexNumber.test(value)) {
      callback('Tháng/năm phát hành không đúng định dạng!')
    } else if (value?.length > 5) {
      callback('Vui lòng nhập tối đa 5 ký tự!')
    } else if (value?.length === 5) {
      let mm = Number(value.split('/')[0])
      let yy = Number(value.split('/')[1])
      let currentYearLast2Digits = Number(moment().format('YY'))
      let currentMonth = Number(moment().format('MM'))
      if (mm < 1 || mm > 12 || yy < 1) {
        callback('Tháng/năm phát hành không đúng định dạng!')
      } else if (yy > currentYearLast2Digits || (mm > currentMonth && yy === currentYearLast2Digits)) {
        callback('Tháng/năm phát hành không được ở tương lai!')
      } else {
        callback()
      }
    } else {
      callback()
    }
  },
}

export default validator
