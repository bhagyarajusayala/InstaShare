import {Component} from 'react'
import Header from '../Header'
import UserStories from '../UserStories'
import './index.css'
import UserPosts from '../UserPosts'
import InstaContext from '../../context/InstaContext'

class Home extends Component {
  render() {
    return (
      <InstaContext.Consumer>
        {value => {
          const {searchPosts} = value
          return (
            <div className="home_container">
              <Header />
              <UserStories />
              <UserPosts searchPosts={searchPosts} />
            </div>
          )
        }}
      </InstaContext.Consumer>
    )
  }
}
export default Home
