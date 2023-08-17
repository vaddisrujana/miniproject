import {useState} from 'react'
import './index.css'

const FoodItems = props => {
  const {itemDetails} = props
  const {imageUrl, name, cost, rating, id} = itemDetails
  const [click, setClick] = useState(false)

  const [count, setCount] = useState(1)
  const addToCart = () => {
    const cartItem = {
      id,
      image: imageUrl,
      name,
      price: cost,
      quantity: count,
    }

    const existingCartItems = localStorage.getItem('cartItems')
    const cartItems = existingCartItems ? JSON.parse(existingCartItems) : []

    const existingCartItemIndex = cartItems.findIndex(item => item.id === id)

    if (existingCartItemIndex !== -1) {
      const updatedQuantity = cartItems[existingCartItemIndex].quantity + count
      cartItems[existingCartItemIndex].quantity = updatedQuantity
    } else {
      cartItems.push(cartItem)
    }

    const newCartItems = JSON.stringify(cartItems)
    localStorage.setItem('cartItems', newCartItems)
    setClick(true)
  }

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
    if (count > 1) {
      const newCount = count - 1
      setCount(newCount)

      updateLocalStorage(id, newCount)
    }
  }

  const onIncrement = () => {
    const newCount = count + 1
    setCount(newCount)

    updateLocalStorage(id, newCount)
  }

  const isClicked = click ? (
    <div className="flex">
      <div>
        <button className="button-margin" type="button" onClick={onDecrement}>
          -
        </button>
      </div>
      <p className="quantity">{count}</p>
      <div>
        <button className="button-margin" type="button" onClick={onIncrement}>
          +
        </button>
      </div>
    </div>
  ) : (
    'ADD'
  )

  return (
    <li className="list">
      <div className="item-background">
        <img src={imageUrl} alt={name} className="item-icon" />
        <div className="item-back">
          <p className="item-name">{name}</p>
          <p className="item-cost">{cost}</p>
          <p className="item-rating">{rating}</p>
          <button type="button" className="add-button" onClick={addToCart}>
            {isClicked}
          </button>
        </div>
      </div>
    </li>
  )
}

export default FoodItems
