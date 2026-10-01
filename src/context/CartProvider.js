import {Component} from 'react'
import CartContext from './CartContext'

class CartProvider extends Component {
  state = {
    cartList: [],
  }

  addCartItem = item => {
    const {cartList} = this.state
    const isAlreadyExists = cartList.find(
      cartItem => cartItem.dishId === item.dishId,
    )

    if (isAlreadyExists) {
      const updatedCartList = cartList.map(cartItem => {
        if (cartItem.dishId === item.dishId) {
          return {...cartItem, quantity: cartItem.quantity + item.quantity}
        }
        return cartItem
      })
      this.setState({cartList: updatedCartList})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, item]}))
    }
  }

  removeCartItem = dishId => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      cartItem => cartItem.dishId !== dishId,
    )
    this.setState({cartList: updatedCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = dishId => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(cartItem => {
      if (cartItem.dishId === dishId) {
        return {...cartItem, quantity: cartItem.quantity + 1}
      }
      return cartItem
    })
    this.setState({cartList: updatedCartList})
  }

  decrementCartItemQuantity = dishId => {
    const {cartList} = this.state
    const cartItem = cartList.find(item => item.dishId === dishId)

    if (cartItem.quantity > 1) {
      const updatedCartList = cartList.map(item => {
        if (item.dishId === dishId) {
          return {...item, quantity: item.quantity - 1}
        }
        return item
      })
      this.setState({cartList: updatedCartList})
    } else {
      this.removeCartItem(dishId)
    }
  }

  render() {
    const {children} = this.props
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        {children}
      </CartContext.Provider>
    )
  }
}

export default CartProvider
