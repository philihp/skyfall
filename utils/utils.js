export const dollarToFloat = (dollar) =>
  Number.parseFloat(dollar.replace('$|,', ''))

export const stringNumToFloat = (str) =>
  str === undefined ? undefined : Number.parseFloat(str.replace(',', ''))
