import "./index.css";

const NavBar = () => (
  <div className="nav-horizontal">
    <button type="button" className="nav-buttons">
      <img
        src="https://web.furrl.in/_next/static/media/Menu.b5bc5303.svg"
        alt=""
      />
    </button>
    <img
      src="https://web.furrl.in/_next/static/media/Furrl.13550a62.svg"
      alt=""
    />
    <button type="button" className="nav-buttons">
      <img
        src="https://web.furrl.in/_next/static/media/Search.73a1749b.svg"
        alt=""
      />
    </button>
    <button type="button" className="nav-buttons">
      <a href="https://furrl.in/wishlist">
        <img
          src="https://web.furrl.in/_next/static/media/Whislist.2ac94d87.svg"
          alt=""
        />
      </a>
    </button>
    <button type="button" className="nav-buttons">
      <a href="https://furrl.in/cart">
        <img
          src="https://web.furrl.in/_next/static/media/Bag.b94fa005.svg"
          alt=""
        />
      </a>
    </button>
  </div>
);

export default NavBar;
