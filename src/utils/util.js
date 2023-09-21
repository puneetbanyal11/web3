const pattern = /^[a-zA-Z0-9]+[ ,=]\d+$/

export const validInput = (stringToBeValidated) => {
  const {address}  = getEthAddressAmount(stringToBeValidated);
  return pattern.test(stringToBeValidated) && address.length === 42
}

export const getEthAddressAmount = (line) => {
  const separators = /[ ,=]/
  const splitedLine = line.split(separators)
  return {address: splitedLine[0], amount: splitedLine[1]}
}

export const getErrorMsgs = (errorArray) => {
  // eslint-disable-next-line
  return errorArray.map((err) => {
    if (err.error === 'INVALID') return `Line ${err.lineNumbers} wrong amount`

    if (err.error === 'DUPLICATE'){
      return `Address ${err.address} encountered duplicate in line ${err.lineNumbers}`}
  })
}

export const getCombinedAddressAmount = (addressAndAmountData, addressMap) => {
  const onlyFirstAddress = []
  const combinedAddressAmount = []
  const duplicate = new Set()
  for (let [key, value] of addressMap) {
    let totalAmount = 0
    onlyFirstAddress[value[0] - 1] = addressAndAmountData[value[0] - 1]

    value.forEach((lineIndex) => {
      duplicate.add(lineIndex - 1)
      const {amount} = getEthAddressAmount(addressAndAmountData[lineIndex - 1])
      totalAmount += parseInt(amount)
    })

    combinedAddressAmount[value[0] - 1] = `${key}=${totalAmount}`
  }

  for (
    let lineNumber = 0;
    lineNumber < addressAndAmountData.length;
    lineNumber++
  ) {
    if (!onlyFirstAddress[lineNumber] && !duplicate.has(lineNumber)) {
      onlyFirstAddress[lineNumber] = addressAndAmountData[lineNumber]
      combinedAddressAmount[lineNumber] = addressAndAmountData[lineNumber]
    }
  }

  return {onlyFirstAddress, combinedAddressAmount}
}

export const validateAddressAmountData = (addressAndAmountData) => {
  const addressMap = new Map()
  const errorArray = []
  let isDuplicate = false

  addressAndAmountData.forEach((line, index) => {
    if (validInput(line)) {
      const {address: eithAddress} = getEthAddressAmount(line)

      if (addressMap.has(eithAddress)) {
        const addressOccurance = addressMap.get(eithAddress)
        const totalNumberOfLines = [...addressOccurance, index + 1]
        if (totalNumberOfLines.length > 2) {
          errorArray.forEach((err) => {
            if (err.address === eithAddress) {
              err.lineNumbers = totalNumberOfLines.toString()
            }
          })
        } else {
          isDuplicate = true
          errorArray.push({
            error: 'DUPLICATE',
            lineNumbers: totalNumberOfLines.toString(),
            address: eithAddress,
          })
        }

        addressMap.set(eithAddress, totalNumberOfLines)
      } else {
        addressMap.set(eithAddress, [index + 1])
      }
    } else {
      errorArray.push({
        lineNumbers: (index + 1).toString(),
        error: 'INVALID',
        adddress: null,
      })
    }
  })

  const getErrorMsgsToDisplay = getErrorMsgs(errorArray)

  const {onlyFirstAddress, combinedAddressAmount} = getCombinedAddressAmount(
    addressAndAmountData,
    addressMap,
  )

  return {
    addressMap,
    errorArray,
    getErrorMsgsToDisplay,
    onlyFirstAddress,
    combinedAddressAmount,
    isDuplicate,
  }
}
