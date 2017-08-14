import globalState from 'common/src/store/state'

const localState = {}

export default Object.assign(globalState, localState)
