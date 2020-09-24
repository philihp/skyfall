export const dollarToFloat = (dollar) =>
  dollar ? Number.parseFloat(dollar.replace('$', '')) : null

export const stringNumToFloat = (str) =>
  str === undefined ? undefined : Number.parseFloat(str.replace(',', ''))
