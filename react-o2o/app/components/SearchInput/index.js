import React from 'react'

import './style.less'

class SearchInput extends React.Component {
  render() {
    return (
      <input 
        type="text"
        className='search-input'
        placeholder='请输入关键字'
      />
    )
  }
}
export default SearchInput