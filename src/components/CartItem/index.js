import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => {
  const {cartItemDetails} = props
  const {
    dishId,
    dishName,
    dishPrice,
    dishImage,
    dishCurrency,
    quantity,
  } = cartItemDetails

  return (
    <CartContext.Consumer>
      {value => {
        const {
          removeCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        } = value

        const onDecrement = () => decrementCartItemQuantity(dishId)
        const onIncrement = () => incrementCartItemQuantity(dishId)
        const onRemove = () => removeCartItem(dishId)

        return (
          <li className="cart-item">
            <img src={dishImage} alt={dishName} className="cart-item-image" />
            <div className="cart-item-details">
              <p className="cart-dish-name">{dishName}</p>
              <p className="cart-dish-price">
                {dishCurrency} {dishPrice}
              </p>
            </div>
            <div className="cart-stepper-container">
              <button
                type="button"
                className="cart-stepper-button"
                onClick={onDecrement}
              >
                -
              </button>
              <p className="cart-quantity-count">{quantity}</p>
              <button
                type="button"
                className="cart-stepper-button"
                onClick={onIncrement}
              >
                +
              </button>
            </div>
            <p className="cart-total-price">
              {dishCurrency} {dishPrice * quantity}
            </p>
            <button
              type="button"
              className="cart-remove-button"
              onClick={onRemove}
            >
              Remove
            </button>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem
