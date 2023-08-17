import {Link} from 'react-router-dom'
import {star} from '../../assets'
import './index.css'

const Restaurants = props => {
  const {restaurant, onClickRestaurant} = props
  const {imageUrl, name, cuisine, userRating, id} = restaurant
  const onClicked = () => {
    onClickRestaurant(id)
  }
  return (
    <Link to={`/RestaurantDetails/${id}`}>
      <li className="list">
        <div>
          <button type="button" onClick={onClicked} className="restaurant">
            <div className="flex">
              <img src={imageUrl} className="restaurant-icon" alt={name} />
              <div className="restaurant1">
                <p className="restaurant-name">{name}</p>
                <p className="food-type">{cuisine}</p>
                <div className="flex1">
                  <img src={star} alt="star" />
                  <p className="rating">
                    {userRating.rating}
                    <span className="span">
                      ({userRating.total_reviews} ratings)
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </button>
        </div>
      </li>
    </Link>
  )
}

export default Restaurants
