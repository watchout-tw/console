export function cleanField (value) {
  return (value || value === 0) ? value : null
}
