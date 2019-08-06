import React, { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
   const [ countries,setCountries] = useState([])

  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

const filteredArray = countries.filter(country=>
  {
      if (country.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)
      {

        return true;
      }
        
      return false; 
  });
  console.log(filteredArray.length);
  const rows = () =>
    {
      if (filteredArray.length > 10)
        return <div>Too many matches, specify another filter</div>
      else if (filteredArray.length > 1)
      {
      return(
        filteredArray.map(country =>
        
        <div key={country.name}>     
        { country.name}
        <button tag={country.name} onClick={() =>handleButtonClick(country.name)}>show</button>
        </div>
        ));
      }
      else if (filteredArray.length === 1)
      {
        const country = filteredArray[0]
        console.log(country)
        const langs = () => country.languages.map(lang =>
          <li key={lang.name}>{lang.name}</li>)
         return <div>
             <h1>{country.name}</h1>
             <div>capital {country.capital}</div>
             <div>population {country.population}</div>
             <h2>Languages</h2>
             {langs()}
             <img src={country.flag} alt="Flag" width="128"></img>
               </div>
      }
    }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  const handleButtonClick = (countryName) => {
    setFilter(countryName);
  }


  return (
    <div>
       <div>find countries
        <input
        value={filter} 
        onChange={handleFilterChange}>
        </input>
        </div>
        {rows()}
        </div>
  )

}

export default App