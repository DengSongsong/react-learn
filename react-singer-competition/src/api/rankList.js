import axios from 'axios'

/**
 * 高校热门榜数据
 */
export function getCollegeRank(pageIndex, activityId) {
  const url = '/zhongqingtuan/hotSchool'
  const params = {
    activityId: activityId,
    pageIndex: pageIndex
  }
  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

/**
 * 同校热门榜数据
 */
export function getSameCollege(pageIndex, activityId) {
  const url = '/zhongqingtuan/hotSchool1'
  const params = {
    activityId: activityId,
    pageIndex: pageIndex
  }
  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
/**
 * 我的声音数据
 * @param {*} pageIndex 单页索引
 */
export function getMine(pageIndex, activityId) {
  // const url = '/commonvote/common/mineSchool'
  const url = '/zhongqingtuan/mineSchool'
  const params = {
    activityId: activityId,
    pageIndex: pageIndex
  }
  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

/**
 * 单所学校全部数据
 * @param {*} pageIndex 单页索引
 */
export function getSameCollegeList(pageIndex, schoolType, activityId) {
  const url = '/zhongqingtuan/hotSchool2'
  const params = {
    activityId: activityId,
    pageIndex: pageIndex,
    schoolType: schoolType
  }
  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
