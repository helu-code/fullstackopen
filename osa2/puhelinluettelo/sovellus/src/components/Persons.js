import React from 'react'
import Person from './Person'

const Persons = ({array}) => {
    
    const rows = () => array.map(person =>
    
        <div key={person.name}> 
        <Person name={person.name} number={person.number}></Person>
        </div>
        )


  return (
   rows()
  )
}

export default Persons