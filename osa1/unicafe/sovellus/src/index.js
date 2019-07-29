import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => {

  return (
    <div>
      <h1>{text}</h1>
    </div>
  )

}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = ({text,count,unit}) => {
  return (
  <div>{text} {count} {unit}</div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  let average = 0
  let positive = 0

  if (all > 0)
  {
    average = ((good * 1) + (neutral * 0) + (bad * -1)) / all
    positive = (good / all) * 100
  }
   

  const setToValue = (category) => {

    if (category == 1)
    {
      setGood(good + 1)
    }
    if (category == 2)
    {
      setNeutral(neutral + 1)
    }
    if (category == 3)
    {
      setBad(bad + 1)
    }
  }

  if (all > 0)
  {
    return (
      <div>
        <Header text="give feedback"/>
        <Button handleClick={()=>setToValue(1)} text="good" /> 
        <Button handleClick={()=>setToValue(2)} text="neutral" /> 
        <Button handleClick={()=>setToValue(3)} text="bad" /> 
        <Header text="statisticks"/>
        <Statistic text="good " count={good}/>
        <Statistic text="neutral " count={neutral}/>
        <Statistic text="bad " count={bad}/>
        <Statistic text="all" count={all} />
        <Statistic text="average" count={average} />
        <Statistic text="positive" count={positive} unit="%" />
      </div>
    )
  }
  else
  {
    return (
      <div>
        <Header text="give feedback"/>
        <Button handleClick={()=>setToValue(1)} text="good" /> 
        <Button handleClick={()=>setToValue(2)} text="neutral" /> 
        <Button handleClick={()=>setToValue(3)} text="bad" /> 
        <Header text="statisticks"/>
        <p>No feedback given</p>
      </div>
    )
  }
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)