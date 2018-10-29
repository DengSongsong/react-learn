import * as actionTypes from 'src/constants/activityInfo'

export function update(data) {
  return {
    type: actionTypes.ACTIVITYINFO_UPDATE,
    data
  }
}