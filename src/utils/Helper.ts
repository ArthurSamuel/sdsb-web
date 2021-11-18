export const FromStringToDate = (dateParam: string) => {
  let temp = new Date(dateParam.split(' ')[0])
  return `${temp.getDay()}/${temp.getMonth()}/${temp.getFullYear()}`
}

export const CreditToString = (credit: string) => {
  let temp = credit.split('.')[0]
  temp = temp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  if (temp[0] === '-') {
    temp = temp.substr(1, temp.length)
    return `-Rp ${temp}`
  }
  return `+Rp ${temp}`
}