export const dollarToFloat = (dollar) =>
  Number.parseFloat(dollar.replace('$', '').replace(',', ''))

export const stringNumToFloat = (str) =>
  str === undefined ? undefined : Number.parseFloat(str.replace(',', ''))
