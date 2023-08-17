import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFilterLeft} from 'react-icons/bs'
import Slider from 'react-slick'
import {left, right} from '../../assets'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Restaurants from '../Restaurants'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    data: [],
    error: null,
    loading: true,
    restaurants: [],
    sort: '',
    offset: 0,
    total: '',
  }

  componentDidMount() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken) {
      this.fetchCarousalImages()
      this.fetchRestaurants()
    } else {
      console.log('User not logged in.')
    }
  }

  fetchCarousalImages = () => {
    this.setState({loading: true})
    const jwtToken = Cookies.get('jwt_token')
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
    }
    fetch('https://apis.ccbp.in/restaurants-list/offers', {headers})
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        this.setState({data: data.offers, loading: false})
      })
      .catch(error => {
        this.setState({error, loading: false})
      })
  }

  fetchRestaurants = async () => {
    this.setState({loading: true})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=0&limit=9`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.restaurants.map(each => ({
        imageUrl: each.image_url,
        userRating: each.user_rating,
        name: each.name,
        cuisine: each.cuisine,
        id: each.id,
      }))
      this.setState({
        restaurants: updatedData,
        loading: false,
        total: fetchedData.total,
      })
    }
  }

  onChangeOption = event => {
    this.setState({sort: event.target.value}, this.onChangeFilter)
  }

  onChangeFilter = async () => {
    const {sort, offset} = this.state
    console.log(sort)
    this.setState({
      loading: true,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=9&sort_by_rating=${sort}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.restaurants.map(each => ({
        imageUrl: each.image_url,
        userRating: each.user_rating,
        name: each.name,
        cuisine: each.cuisine,
        id: each.id,
      }))
      this.setState({
        restaurants: updatedData,
        loading: false,
        total: fetchedData.total,
      })
    }
  }

  onIncrement = () => {
    const {total, offset} = this.state
    if (offset + 9 < total) {
      this.setState(
        prevState => ({offset: prevState.offset + 9}),
        this.onChangeFilter,
      )
    }
  }

  onDecrement = () => {
    const {offset} = this.state
    if (offset > 0) {
      this.setState(
        prevState => ({offset: prevState.offset - 9}),
        this.onChangeFilter,
      )
    }
  }

  onClickRestaurant = id => {
    console.log(id)
  }

  render() {
    const {data, restaurants, sort, offset, total} = this.state
    console.log(sort)
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    }

    return (
      <div>
        <Navbar />
        <Slider {...settings}>
          {data.length > 0 ? (
            data.map(item => (
              <div key={item.id}>
                <img
                  src={item.image_url}
                  alt={`Offer ${item.id}`}
                  className="carousal"
                />
              </div>
            ))
          ) : (
            <div>Loading carousel...</div>
          )}
        </Slider>
        <div className="home-container">
          <h1 className="header">Popular Restaurants</h1>
          <div className="flex">
            <p className="home-para">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>

            <div className="flex">
              <BsFilterLeft className="left-arrow" />
              <select onChange={this.onChangeOption} className="select">
                {sortByOptions.map(each => (
                  <option key={each.id} value={each.value}>
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr />
          <ul>
            <div className="restaurants-list">
              {restaurants.map(each => (
                <Restaurants
                  restaurant={each}
                  key={each.id}
                  onClickRestaurant={this.onClickRestaurant}
                />
              ))}
            </div>
          </ul>
        </div>
        <div className="count">
          <div className="count">
            <button
              type="button"
              onClick={this.onDecrement}
              className="restaurant-decrement"
            >
              <img src={left} alt="left" />
            </button>
            <p>
              {offset} of {total}
            </p>
            <button
              type="button"
              onClick={this.onIncrement}
              className="restaurant-decrement"
            >
              <img src={right} alt="left" />
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
