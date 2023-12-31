import {useState} from 'react'
import {BiRupee} from 'react-icons/bi'
import './index.css'

const CartItems = props => {
  const {itemDetails, retrieveDataFromLocalStorage} = props
  const {id, image, name, quantity, price} = itemDetails

  const [count, setCount] = useState(quantity)

  const updateLocalStorage = (itemId, newQuantity) => {
    const existingCartItems =
      JSON.parse(localStorage.getItem('cartItems')) || []

    const updatedCartItems = existingCartItems.map(item => {
      if (item.id === itemId) {
        return {...item, quantity: newQuantity}
      }
      return item
    })

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
  }

  const onDecrement = () => {
    if (count === 1) {
      const existingCartItems =
        JSON.parse(localStorage.getItem('cartItems')) || []
      const updatedCartItems = existingCartItems.filter(item => item.id !== id)

      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
      retrieveDataFromLocalStorage()
    } else {
      const newCount = count - 1
      setCount(newCount)

      updateLocalStorage(id, newCount)
      retrieveDataFromLocalStorage()
    }
  }

  const onIncrement = () => {
    const newCount = count + 1
    setCount(newCount)

    updateLocalStorage(id, newCount)
    retrieveDataFromLocalStorage()
  }

  const cost = count * price

  return (
    <li className="list">
      <div className="cart-flex" data-testid="cartItem">
        <div className="cart">
          <img src={image} alt={name} className="cart-image" />
          <h1 className="item-name">{name}</h1>
        </div>
        <div className="flex">
          <div>
            <button
              className="button-margin"
              type="button"
              onClick={onDecrement}
              data-testid="decrement-quantity"
            >
              -
            </button>
          </div>
          <p className="quantity" data-testid="item-quantity">
            {count}
          </p>
          <div>
            <button
              data-testid="increment-quantity"
              className="button-margin"
              type="button"
              onClick={onIncrement}
            >
              +
            </button>
          </div>
        </div>
        <p className="cost">
          <BiRupee />
          {cost}
        </p>
      </div>
    </li>
  )
}

export default CartItems
