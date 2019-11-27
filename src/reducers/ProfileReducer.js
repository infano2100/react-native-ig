import { PROFILE_FETCH, PROFILE_EDIT } from '../actions/types'

const INITIAL_STATE = {
  profile: {
    profile: {
      userpic: '',
    },
  },
}

const profile = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_FETCH:
      return { ...state, profile: action.payload }
    case PROFILE_EDIT:
      return { ...state }
    default:
      return state
  }
}

export default profile
