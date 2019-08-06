import React from 'react'

const Person = ({name,number,handleClick}) => {

  return (
    <div>     
        { name +" " +number}
        <button onClick={handleClick}>delete</button>
        </div>
  )
}

export default Person