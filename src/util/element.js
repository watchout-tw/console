export const columnWidth = (n) => {
  let em = 14
  let padding = 18
  return em * n + padding * 2
}
export const labelWidth = (n) => {
  let padding = 12
  return `calc(${n}em + ${padding}px)`
}
