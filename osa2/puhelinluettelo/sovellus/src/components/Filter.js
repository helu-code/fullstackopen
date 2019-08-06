import React from 'react'

const Filter = ({text, handleChange}) => {
  return (
    <div>filter shown with 
        <input
        value={text} 
        onChange={handleChange}>
        </input>
        
        </div>
  )
}

export default Filter