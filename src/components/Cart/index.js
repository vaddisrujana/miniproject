import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import Navbar from '../Navbar'
import Footer from '../Footer'
import CartItems from '../CartItems'
import NoOrders from '../NoOrders'
import './index.css'

class Cart extends Component {
  state = {storedData: []}

  componentDidMount() {
    this.retrieveDataFromLocalStorage()
  }

  retrieveDataFromLocalStorage = () => {
    const storedData = localStorage.getItem('cartItems')

    // localStorage.clear()

    if (storedData) {
      const retrievedCartItems = JSON.parse(storedData)
      this.setState({storedData: retrievedCartItems}, () => {
        this.calculateOrderTotal()
      })
    }
  }

  calculateOrderTotal = () => {
    const {storedData} = this.state

    return storedData.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    )
  }

  updateStoredData = newData => {
    this.setState({storedData: newData})
  }

  placeOrder = () => {
    const {history} = this.props
    history.replace('/payment-successful')
  }

  render() {
    const {storedData} = this.state
    const orderTotal = this.calculateOrderTotal()
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    const noItemsInCart = cartItems.length === 0
    if (noItemsInCart) {
      return <NoOrders />
    }

    return (
      <div>
        <Navbar />
        <div className="cart-background">
          <div className="cart-container">
            <div className="cart-flex">
              <p className="cart-para">Item</p>
              <p className="cart-para">Quantity</p>
              <p className="cart-para">Price</p>
            </div>
            <ul>
              {storedData.map(item => (
                <CartItems
                  itemDetails={item}
                  key={item.id}
                  retrieveDataFromLocalStorage={
                    this.retrieveDataFromLocalStorage
                  }
                />
              ))}
            </ul>
            <hr />
            <div className="total-container">
              <h1 className="order-total">Order Total:</h1>
              <div>
                <p className="price" data-testid="total-price">
                  <BiRupee />
                  {orderTotal}
                </p>
                <button
                  type="button"
                  className="place-order"
                  onClick={this.placeOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Cart
