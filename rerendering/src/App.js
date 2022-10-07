import { useState, useEffect, Fragment } from 'react'

const Display = ({ counter, text='', type='' }) => <div>{text} {counter}{type}</div>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const History = ({allClicks}) => {
  return (
    allClicks.length === 0 
      ? <div> the app is used by pressing the buttons </div>
      : <div> button press history: {allClicks.join(' ')} </div>
  )
}

const Statistics = ({good, neutral, bad}) => {

  const [average, setAverage] = useState(0)
  const [positivePerc, setPositivePerc] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(()=>{
    setTotal(good+neutral+bad)
  },[bad, good, neutral])

  useEffect(()=>{
    total && setAverage(good-bad / total)
  },[bad, good, total])

  useEffect(() => {
    total && setPositivePerc(good/total * 100)
  },[good, total])

  return (
    <Fragment>
      <h3>Stats</h3>
      {
        total===0
        ? <div>No feedback given</div>
        :
          <Fragment>
            <Display counter={good} text='Good' />
            <Display counter={neutral} text='Neutral' />
            <Display counter={bad} text='Bad' />
            <Display counter={total} text='All' />
            <Display counter={average} text='Average' />
            <Display counter={positivePerc} text='Positive' type='%' />
          </Fragment>
      }
    </Fragment>
  )
}


const App = () => {
  const [ counter, setCounter ] = useState(0)
  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)


  const [clicks, setClicks] = useState({ left: 0, right: 0 })
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setClicks({ ...clicks, left: clicks.left + 1 })
  }
  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setClicks({ ...clicks, right: clicks.right + 1 })
  }

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)

  const handleSelectAnecdote = () => {

  }

  return (
    <Fragment>
      <div>
        <Display counter={counter}/>
        <Button onClick={decreaseByOne} text='minus' />
        <Button onClick={setToZero} text='zero' />
        <Button onClick={increaseByOne} text='plus' />
      </div>
      <div>
        <Display counter={clicks.left}/>
        <Button onClick={handleLeftClick} text='left' />
        <Button onClick={handleRightClick} text='right' />
        <Display counter={clicks.right}/>
        <History allClicks={allClicks}/>
      </div>
      <div>
        <h2>Give Feedback</h2>
        <Button onClick={()=>setGood(good+1)} text='Good' />
        <Button onClick={()=>setNeutral(neutral+1)} text='Neutral' />
        <Button onClick={()=>setBad(bad+1)} text='Bad' />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
      <div>
        <Button onClick={handleSelectAnecdote} text='Select Random Anecdote' />
        {anecdotes[selected]}
      </div>

    </Fragment>
  )
}

export default App