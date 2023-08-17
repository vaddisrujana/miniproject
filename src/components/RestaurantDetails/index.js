import {Component} from 'react'
import Cookies from 'js-cookie'
import Navbar from '../Navbar'
import Footer from '../Footer'
import FoodItems from '../FoodItems'
import './index.css'

class RestaurantDetails extends Component {
  state = {
    itemsList: [],

    imageUrl: '',
    name: '',
    cuisine: '',
    location: '',
    rating: '',
    reviewsCount: '',
    costForTwo: '',
  }

  componentDidMount() {
    this.fetchRestaurantDetails()
  }

  fetchRestaurantDetails = async () => {
    const {match} = this.props
    console.log(match)
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.food_items.map(each => ({
        cost: each.cost,
        foodType: each.food_type,
        id: each.id,
        imageUrl: each.image_url,
        name: each.name,
        rating: each.rating,
      }))

      const imageUrl = fetchedData.image_url

      const reviewsCount = fetchedData.reviews_count
      const costForTwo = fetchedData.cost_for_two

      this.setState({
        itemsList: updatedData,
        imageUrl,
        name: fetchedData.name,
        cuisine: fetchedData.cuisine,
        location: fetchedData.location,
        rating: fetchedData.rating,
        reviewsCount,
        costForTwo,
      })
    }
  }

  render() {
    const {
      itemsList,
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      costForTwo,
      reviewsCount,
    } = this.state

    return (
      <div>
        <Navbar />
        <div className="restaurantDetails-background">
          <div className="restaurantDetails-container1">
            <img src={imageUrl} alt={name} className="restaurant-image" />
            <div className="restaurantDetails-container11">
              <p className="name">{name}</p>
              <p className="restaurant-cuisine">{cuisine}</p>
              <p className="restaurant-location">{location}</p>
              <div className="restaurantDetails-container111">
                <div className="padding">
                  <p className="restaurant-rating">{rating}</p>
                  <p className="restaurant-reviewsCount">
                    {reviewsCount}+ Ratings
                  </p>
                </div>

                <div className="padding">
                  <p className="restaurant-rating">{costForTwo}</p>
                  <p className="restaurant-reviewsCount">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ul>
              <div className="restaurants-list">
                {itemsList.map(each => (
                  <FoodItems key={each.id} itemDetails={each} />
                ))}
              </div>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default RestaurantDetails
