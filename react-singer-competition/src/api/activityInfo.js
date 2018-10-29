import axios from 'axios'

export function getActivityInfo() {
  const url = '/zhongqingtuan/common/activityInfo'
  const params = {
    type: 'zhongqingtuan'
  }
  return axios.get(url, {
    params
  })
}