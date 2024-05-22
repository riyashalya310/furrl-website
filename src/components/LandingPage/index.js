import './index.css'
import NavBar from '../NavBar'
import ProductList from '../ProductList'

const LandingPage=()=>(
    <div className="outer-container">
      <NavBar />
      <img src="https://cdn.furrl.in/vibes/VibeCard_HomeHunts.jpg" alt=""/>
      <ProductList />
    </div>
)

export default LandingPage