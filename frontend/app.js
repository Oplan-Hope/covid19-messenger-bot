import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'isomorphic-unfetch'
import Home from '@/frontend/components/Pages/Home'
import '@/frontend/styles/app.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

const el = document.querySelector('#root')

if (el) {
  ReactDOM.render(<App />, el)
}
