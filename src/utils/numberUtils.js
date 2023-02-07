const numberUtils = {
  /** Add commas for separate thousand in number */
  thousandSeparator: num => {
    return isNaN(num) ? 0 : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  },
  renderTableIndex: (pageIndex, pageSize, index) => {
    return (Number(pageSize) * (Number(pageIndex) - 1)) + Number(index) + 1
  },
}

export default numberUtils
