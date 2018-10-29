import { getActivityInfo } from 'src/api/activityInfo'

export function getActivityId() {
  return new Promise(resolve => {
    if (sessionStorage.getItem('activityId')) {
      resolve(sessionStorage.getItem('activityId'))
    } else {
      getActivityInfo().then(res => {
        resolve(res.data.data.id)
        sessionStorage.setItem('activityId', res.data.data.id)
      })
    }
  })
}