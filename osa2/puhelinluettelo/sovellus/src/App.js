import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Person from './components/Person'

const Notification = ({ message, msgType }) => {
  console.log("Notification msg",message)
  if (message === null) {
    return null
  }

  if (msgType === 1)
  {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  else
  {
    return (
      <div className="warning">
        {message}
      </div>
    )

  }
}

const App = () => {
   const [ persons, setPersons] = useState([])
  //   { name: 'Arto Hellas', number: '040-123456' },
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' },
  //   { name: 'Danny arton', number: '39-23-6423122' }
  // ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [message, setMessage] = useState(null)
  const [msgType, setMsgType] = useState(0)
  

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        //console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const filteredArray = persons.filter(person=>
    {
      //console.log("Filter ",person.name,filter);
      if (person.name.indexOf(filter) > -1)
        return true;
        return false; 
    });
  
  
  const addNumber = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const found = persons.find(function(element) {
      console.log('element.name', event.target)
      return element.name === newName;
    });
    console.log("found=",found)
    if (found)
    {
      if (window.confirm( `${newName} is already added to phonebook, replase the old number with a new one?`))
      {
        found.number = newNumber;
        personService
        .update(found.id,found)
        .then(updatedPerson =>{
            console.log("UpdatePerson")
            setPersons(persons.map(person => person.id !== found.id ? person : found))

            setMessage(
              `Person '${found.name}' updated`
            )
            setTimeout(() => {
              setMessage(null)
            }, 2000)
        })
        .catch(error => {
          setMsgType(1)
          setMessage(
            `Person '${found.name}' was already removed from server`
          )
          setTimeout(() => {
            setMessage(null)
            setMsgType(1)
          }, 5000)
          setPersons(persons.filter(n => n.id !== found.id))
        })
      }

      setNewName('')
      setNewNumber('')
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .create( personObject)
      .then(returnedPerson => {
        console.log(returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')

        setMessage(
          `Person '${newName}' added`
        )
        setTimeout(() => {
          setMessage(null)
        }, 2000)

      })
      // setPersons(persons.concat(personObject))
      // setNewName('')
  }


  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setFilter(event.target.value)
  }
  const rows = () => filteredArray.map(person =>
    
    <div key={person.name}> 
    <Person name={person.name} number={person.number} handleClick={() =>deleteNumber(person.id)}></Person>
    </div>
    )

  const deleteNumber = id =>{
    console.log("Delete",id);

    const delid = persons.findIndex(i=> i.id === id)
    const delName = persons[delid].name
    if (window.confirm("Haluat siis varmasti poistaa henkilön "+delName))
    {
      personService
      .deletePerson(id)
      .then(x=>{
        console.log(x)
        setPersons(persons.filter(n => n.id !== id))

        setMessage(
          `Person '${delName}' removed`
        )
        setTimeout(() => {
          setMessage(null)
        }, 2000)

        })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} msgType={msgType}/>
      <Filter text={filter} handleChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm name={newName} handleNameChange={handleNameChange} 
        number={newNumber} handleNumberChange={handleNumberChange} handleSubmit={addNumber}/>
      <h2>Numbers</h2>
      {rows()}
    </div>
  )

}

export default App