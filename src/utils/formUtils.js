import { REQUIRE_FIELD, REQUIRE_FIELD_TYPES } from '../constant'
import validator from '../validator'

const formUtils = {
  renderRule: (item, type) => {
    switch (item) {
      case REQUIRE_FIELD.BANK_ACCOUNT:
        switch (type) {
          case REQUIRE_FIELD_TYPES.REQUIRE_FIELD:
            return [
              { required: true, message: 'Vui lòng nhập số thẻ' },
              { validator: validator.validateAccountNumber },
            ]
          case REQUIRE_FIELD_TYPES.REQUIRE_FIELD_BANK_ACCOUNT:
            return [
              { required: true, message: 'Vui lòng nhập số tài khoản' },
              { validator: validator.validateAccountNumber },
            ]
          default:
            return [
              { required: true, message: 'Vui lòng nhập số thẻ' },
              { validator: validator.validateAccountNumber },
            ]
        }
      case REQUIRE_FIELD.BANK_ACCOUNT_NAME:
        return [
          { required: true, message: 'Vui lòng nhập tên chủ thẻ' },
          { validator: validator.validateAccountName },
        ]
      case REQUIRE_FIELD.ISSUE_DATE:
        return [
          { required: true, message: 'Vui lòng nhập tháng/năm phát hành' },
          { validator: validator.validateIssueDate },
        ]
      case REQUIRE_FIELD.CUST_LEGAL_ID:
        return [
          { required: true, message: 'Vui lòng nhập CMT/CCCD' },
        ]
      default:
        return []
    }
    // return []
  },
  renderRequireFieldLabel: (item, type) => {
    switch (item) {
      case REQUIRE_FIELD.BANK_ACCOUNT:
        switch (type) {
          case REQUIRE_FIELD_TYPES.REQUIRE_FIELD:
            return 'Số thẻ'
          case REQUIRE_FIELD_TYPES.REQUIRE_FIELD_BANK_ACCOUNT:
            return 'Số tài khoản'
          default:
            return 'Số thẻ'
        }
      case REQUIRE_FIELD.BANK_ACCOUNT_NAME:
        return 'Tên chủ thẻ'
      case REQUIRE_FIELD.ISSUE_DATE:
        return 'Tháng/Năm phát hành'
      case REQUIRE_FIELD.CUST_LEGAL_ID:
        return 'CMT/CCCD'

      default:
        return
    }
  },
  renderRequireFieldPlaceholder: (item, type) => {
    switch (item) {
      case REQUIRE_FIELD.BANK_ACCOUNT:
        switch (type) {
          case REQUIRE_FIELD_TYPES.REQUIRE_FIELD:
            return 'Nhập số thẻ'
          case REQUIRE_FIELD_TYPES.REQUIRE_FIELD_BANK_ACCOUNT:
            return 'Nhập số tài khoản'
          default:
            return 'Nhập số thẻ'
        }
      case REQUIRE_FIELD.BANK_ACCOUNT_NAME:
        return 'Nhập tên chủ thẻ'
      case REQUIRE_FIELD.ISSUE_DATE:
        return 'Nhập tháng/năm phát hành, nhập số 0-9'
      case REQUIRE_FIELD.CUST_LEGAL_ID:
        return 'Nhập số CMT/CCCD'

      default:
        return
    }
  },
}

export default formUtils
