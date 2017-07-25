import * as types from './cascade-types'

export default {
  appointDirectory(targets) {
    return {
      action: types.APPOINT_DIRECTORY,
      targets
    }
  },
  applyConstraint(targets, constraintName) {
    return {
      action: types.APPLY_CONSTRAINT,
      targets,
      constraintName
    }
  },
  lookupTerm(targets) {
    return {
      action: types.LOOKUP_TERM,
      targets
    }
  }
}
