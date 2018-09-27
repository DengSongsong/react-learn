export default {
  getItem: function(key) {
    let value
    try {
      value = localStorage.getItem(key)
    } catch (error) {
      if(__DEV__){
        console.error('localStorage.getItem exception', error.message)
      }
    }finally {
      return value
    }
  },
  setItem: function(key, value) {
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      if(__DEV__){
        console.error('localStorage.setItem exception', error.message);
      }
    }
  }
}