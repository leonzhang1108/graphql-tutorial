import React from 'react'
import './styles/App.css'
import Title from './components/Title'
import TodoApp from './pages/TodoApp'
import Grid from 'material-ui/Grid'

const App = () => (
  <Grid 
    container
    alignItems={`center`}
    direction={`row`}
    justify={`center`}
  >
    <Title/>
    <TodoApp/>
  </Grid>
)

export default App
