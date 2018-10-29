import * as actionTypes from 'src/constants/activityInfo'

const initialState = {}

export default function activityInfo(state = initialState, action) {
  switch(action.type) {
    case actionTypes.ACTIVITYINFO_UPDATE:
    return action.data
    default:
      return state
  }
}