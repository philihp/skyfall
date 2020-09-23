export const dollarToFloat = (dollar) =>
  Number.parseFloat(dollar.replace('$', '').replace(',', ''))

export const stringNumToFloat = (str) => Number.parseFloat(str.replace(',', ''))
