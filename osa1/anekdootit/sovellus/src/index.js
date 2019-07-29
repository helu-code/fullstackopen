import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(6))
  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * 5))
  }
  const voteSelectedAnecdote = () => {
    const copy = { ...points }
    copy[selected] += 1   
    setPoints(copy)
  }

  let mostVotes = 0
  let mostVotesId = -1
  const copy = { ...points }
  for (let index = 0; index < 6; index++) {
    if (copy[index] > mostVotes)
    {
      mostVotes = copy[index]
      mostVotesId = index
    }
  }
  
  if (mostVotes == 0)
  {
  return (
    <div>
      <div><h1>Anecdote of the day</h1></div>
      {props.anecdotes[selected]}
      <div>has {points[selected]} votes</div>
      <button onClick={()=>voteSelectedAnecdote()}>vote</button>  
      <button onClick={()=>randomAnecdote()}>next anecdote</button>  
    </div>
  )
  }
  else
  {
    return (
      <div>
        <div><h1>Anecdote of the day</h1></div>
        {props.anecdotes[selected]}
        <div>has {points[selected]} votes</div>
        <button onClick={()=>voteSelectedAnecdote()}>vote</button>  
        <button onClick={()=>randomAnecdote()}>next anecdote</button>  
        <div><h1>Anecdote with most votes</h1></div>
        {props.anecdotes[mostVotesId]}
        <div>has {points[mostVotesId]} votes</div>
      </div>
    )

  }

}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)