import commonGetters from 'common/src/store/getters'

const localGetters = {
  selectOptions: state => (uniqueID) => {
    return state[uniqueID]
  }
}

export default Object.assign(commonGetters, localGetters)
