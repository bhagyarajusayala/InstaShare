import './index.css'

const NotFound = () => (
  <div className="not-con">
    <img
      src="https://res.cloudinary.com/dhwcldgtg/image/upload/v1706944548/erroring_1_onoygu.png"
      alt="images"
      className="image-size"
    />
    <h1 className="para">Page Not Found</h1>
    <p className="para">
      we are sorry.the page you are requested could not be found.please go back
      to home page
    </p>
    <button type="button" className="button1">
      Home Page
    </button>
  </div>
)

export default NotFound
