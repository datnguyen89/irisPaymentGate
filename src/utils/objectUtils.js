const objectUtils = {
  hasPropNullOrWhitespace: (obj) => {
    for (let member in obj) {
      if (obj[member]?.trim() === null || obj[member]?.trim() === undefined || obj[member]?.trim()?.length === 0)
        return true
    }
    return false
  },
}

export default objectUtils
