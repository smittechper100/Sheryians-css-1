import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCounters, addCounter, increment, decrement, deleteCounter } from './countersSlice'

export default function App() {
  const counters = useSelector(selectCounters) 
  const dispatch = useDispatch()
  const [name, setName] = useState('')

  function handleAdd(e) {
    e.preventDefault()
    dispatch(addCounter(name))
    setName('')
  }

  return (
    <div className="wrap">
      <h1>RTK Counters</h1>

      <form onSubmit={handleAdd} className="add-form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New counter name"
        />
        <button type="submit">Add</button>
      </form>

      <ul className="list">
        {counters.map((c) => (
          <li key={c.id} className="row">
            <span className="name">{c.name}</span>
            <button onClick={() => dispatch(decrement(c.id))}>-</button>
            <span className="value">{c.value}</span>
            <button onClick={() => dispatch(increment(c.id))}>+</button>
            <button className="del" onClick={() => dispatch(deleteCounter(c.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
