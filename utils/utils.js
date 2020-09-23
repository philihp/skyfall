export const dollarToFloat = (dollar) =>
  Number.parseFloat(dollar.replaceAll('$|,', ''))

export const stringNumToFloat = (str) =>
  str === undefined ? undefined : Number.parseFloat(str.replace(',', ''))
