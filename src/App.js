import {Switch, Route} from 'react-router-dom'

import RestaurantMenu from './components/RestaurantMenu'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={RestaurantMenu} />
    <Route component={NotFound} />
  </Switch>
)

export default App
