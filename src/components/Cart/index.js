import {Component} from 'react'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'
import CartItem from '../CartItem'
import './index.css'

class Cart extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderEmptyCartView = () => (
    <div className="empty-cart-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty cart"
        className="empty-cart-image"
      />
      <p>Your Cart is Empty. Add items to make you fell happy</p>
    </div>
  )

  renderCartList = (cartList, removeAllCartItems) => (
    <>
      <div className="cart-header-row">
        <h1>My Cart</h1>
        <button
          type="button"
          className="remove-all-button"
          onClick={removeAllCartItems}
        >
          Remove All
        </button>
      </div>
      <ul className="cart-items-list">
        {cartList.map(item => (
          <CartItem key={item.dishId} cartItemDetails={item} />
        ))}
      </ul>
    </>
  )

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, removeAllCartItems} = value

          return (
            <div className="cart-page-container">
              <div className="topbar">
                <h1 className="restaurant-name">My Cart</h1>
                <button
                  type="button"
                  className="logout-button"
                  onClick={this.onClickLogout}
                >
                  Logout
                </button>
              </div>
              <div className="cart-content-container">
                {cartList.length === 0
                  ? this.renderEmptyCartView()
                  : this.renderCartList(cartList, removeAllCartItems)}
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart
