import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class UserProfile extends Component {
  state = {list: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiConstants.inprogress})
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = {
        id: data.profile.id,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
        profilePic: data.profile.profile_pic,
        followerCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        userBio: data.profile.user_bio,
        postsCount: data.profile.posts_count,
        posts: data.profile.posts.map(each => ({
          id: each.id,
          image: each.image,
        })),
        stories: data.profile.stories.map(each => ({
          id: each.id,
          image: each.image,
        })),
      }
      this.setState({list: updatedData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  getSuccess = () => {
    const {list} = this.state

    return (
      <div className="user-main">
        <div className="user-con">
          <img src={list.profilePic} alt="images" className="profile1" />
          <div>
            <p>{list.userName}</p>
            <div className="user-con">
              <p className="para">{list.postsCount} posts</p>
              <p className="para">{list.followerCount} followers</p>
              <p className="para">{list.followingCount} following</p>
            </div>
            <p className="para">{list.userName}</p>
            <p className="para">{list.userBio}</p>
          </div>
        </div>
        <div className="user-con">
          {list.stories.map(each => (
            <img src={each.image} alt="images" className="storyImage1" />
          ))}
        </div>
        <div className="user-con1">
          <img
            src="https://res.cloudinary.com/dhwcldgtg/image/upload/v1706863879/Frame_1420_eu223s.png"
            alt="images"
            className="frameImage"
          />
          <h1 className="heading-user">Posts</h1>
        </div>
        <div className="post-main">
          {list.posts.map(each => (
            <img src={each.image} alt="images" className="post-image1" />
          ))}
        </div>
      </div>
    )
  }

  getLoading = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  Failure = () => {
    this.getProfile()
  }

  getFailure = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dhwcldgtg/image/upload/v1706856181/alert-triangle_1_wjfzit.png"
        alt="images"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" className="button" onClick={this.Failure()}>
        Try Again
      </button>
    </div>
  )

  getRender = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.getSuccess()
      case apiConstants.inprogress:
        return this.getLoading()
      case apiConstants.failure:
        return this.getFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div>{this.getRender()}</div>
      </div>
    )
  }
}

export default UserProfile
