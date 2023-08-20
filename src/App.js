import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Cart from './components/Cart'
import RestaurantDetails from './components/RestaurantDetails'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import PaymentSuccessful from './components/PaymentSuccessful'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <ProtectedRoute
      exact
      path="/payment-successful"
      component={PaymentSuccessful}
    />

    <ProtectedRoute
      exact
      path="/RestaurantDetails/:id"
      component={RestaurantDetails}
    />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
