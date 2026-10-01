import {Component} from 'react'
import Cookies from 'js-cookie'
import DishItem from '../DishItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class RestaurantMenu extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    restaurantName: '',
    categoriesList: [],
    activeCategoryId: '',
  }

  componentDidMount() {
    this.getRestaurantMenu()
  }

  getRestaurantMenu = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

    try {
      const response = await fetch(apiUrl)
      const data = await response.json()
      const restaurant = Array.isArray(data) ? data[0] : data

      const fetchedCategories = restaurant.table_menu_list.map(category => ({
        menuCategoryId: category.menu_category_id,
        menuCategory: category.menu_category,
        categoryDishes: category.category_dishes.map(dish => ({
          dishId: dish.dish_id,
          dishName: dish.dish_name,
          dishPrice: dish.dish_price,
          dishImage: dish.dish_image,
          dishCurrency: dish.dish_currency,
          dishCalories: dish.dish_calories,
          dishDescription: dish.dish_description,
          addonCat: dish.addonCat,
          dishAvailability: dish.dish_Availability,
          quantity: 0,
        })),
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        restaurantName: restaurant.restaurant_name,
        categoriesList: fetchedCategories,
        activeCategoryId: fetchedCategories[0]
          ? fetchedCategories[0].menuCategoryId
          : '',
      })
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onIncrementQuantity = dishId => {
    this.setState(prevState => ({
      categoriesList: prevState.categoriesList.map(category => ({
        ...category,
        categoryDishes: category.categoryDishes.map(dish =>
          dish.dishId === dishId
            ? {...dish, quantity: dish.quantity + 1}
            : dish,
        ),
      })),
    }))
  }

  onDecrementQuantity = dishId => {
    this.setState(prevState => ({
      categoriesList: prevState.categoriesList.map(category => ({
        ...category,
        categoryDishes: category.categoryDishes.map(dish =>
          dish.dishId === dishId && dish.quantity > 0
            ? {...dish, quantity: dish.quantity - 1}
            : dish,
        ),
      })),
    }))
  }

  onChangeTab = categoryId => {
    this.setState({activeCategoryId: categoryId})
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickRestaurantName = () => {
    const {history} = this.props
    history.push('/')
  }

  onClickCartIcon = () => {
    const {history} = this.props
    history.push('/cart')
  }

  getCartCount = () => {
    const {categoriesList} = this.state
    return categoriesList.reduce(
      (total, category) =>
        total +
        category.categoryDishes.reduce((sum, dish) => sum + dish.quantity, 0),
      0,
    )
  }

  renderTabs = () => {
    const {categoriesList, activeCategoryId} = this.state
    return (
      <ul className="tabs-list">
        {categoriesList.map(category => (
          <li key={category.menuCategoryId}>
            <button
              type="button"
              className={
                category.menuCategoryId === activeCategoryId
                  ? 'tab-button active-tab-button'
                  : 'tab-button'
              }
              onClick={() => this.onChangeTab(category.menuCategoryId)}
            >
              {category.menuCategory}
            </button>
          </li>
        ))}
      </ul>
    )
  }

  renderDishes = () => {
    const {categoriesList, activeCategoryId} = this.state
    const activeCategory = categoriesList.find(
      category => category.menuCategoryId === activeCategoryId,
    )
    if (!activeCategory) {
      return null
    }

    return (
      <ul className="dishes-list">
        {activeCategory.categoryDishes.map(dish => (
          <DishItem
            key={dish.dishId}
            dishDetails={dish}
            onIncrementQuantity={this.onIncrementQuantity}
            onDecrementQuantity={this.onDecrementQuantity}
          />
        ))}
      </ul>
    )
  }

  renderSuccessView = () => {
    const {restaurantName} = this.state

    return (
      <>
        <div className="topbar">
          <h1 className="restaurant-name" onClick={this.onClickRestaurantName}>
            {restaurantName}
          </h1>
          <div className="header-right-container">
            <p className="my-orders-text">My Orders</p>
            <button
              type="button"
              className="cart-icon-button"
              data-testid="cart"
              onClick={this.onClickCartIcon}
            >
              Cart
            </button>
            <p className="cart-count">{this.getCartCount()}</p>
            <button
              type="button"
              className="logout-button"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="tabs-container">{this.renderTabs()}</div>
        <div className="dishes-container">{this.renderDishes()}</div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="restaurant-menu-loader">
      <div className="spinner" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <p>Something went wrong. Please try again.</p>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default RestaurantMenu