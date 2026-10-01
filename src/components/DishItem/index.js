import './index.css'

const DishItem = props => {
  const {dishDetails, onIncrementQuantity, onDecrementQuantity} = props
  const {
    dishId,
    dishName,
    dishPrice,
    dishImage,
    dishCurrency,
    dishCalories,
    dishDescription,
    addonCat,
    dishAvailability,
    quantity,
  } = dishDetails

  const hasAddons = addonCat && addonCat.length > 0

  return (
    <li className="dish-item">
      <div className="dish-details">
        <div className="dish-info">
          <h1 className="dish-name">{dishName}</h1>
          <p className="dish-price">
            {dishCurrency} {dishPrice}
          </p>
          <p className="dish-description">{dishDescription}</p>
          <p className="dish-calories">{dishCalories} calories</p>

          {dishAvailability ? (
            <div className="stepper-container">
              <button
                type="button"
                className="stepper-button"
                onClick={() => onDecrementQuantity(dishId)}
              >
                -
              </button>
              <p className="quantity-count">{quantity}</p>
              <button
                type="button"
                className="stepper-button"
                onClick={() => onIncrementQuantity(dishId)}
              >
                +
              </button>
            </div>
          ) : (
            <p className="not-available-text">Not available</p>
          )}

          {hasAddons && (
            <p className="customizations-text">Customizations available</p>
          )}
        </div>

        <img src={dishImage} alt={dishName} className="dish-image" />
      </div>
    </li>
  )
}

export default DishItem
