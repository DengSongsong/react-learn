import axios from 'axios'

export function getUserInfo(params) {
  const url = '/zhongqingtuan/infoSchool'
  return axios.get(url, {
    params
  })
}

export function getMyInfo(activityId) {
  const url = '/zhongqingtuan/contact/getContact'
  const params = {
    activityId
  }
  return axios.get(url, {
    params
  })
}
