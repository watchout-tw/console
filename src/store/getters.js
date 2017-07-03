export default {
  selectOptions: state => (uniqueID) => {
    return state[uniqueID]
  }
}
