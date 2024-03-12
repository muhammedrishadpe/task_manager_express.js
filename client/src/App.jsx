import { Fragment, useState } from 'react'
import './App.css'
import { Todo } from './Todo/Todo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Fragment >
      <Todo />
    </Fragment>
  )
}

export default App
