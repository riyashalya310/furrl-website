import { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import SharePopup from "../ShareProduct";

const ProductCard = (props) => {
    const [showSharePopup, setShowSharePopup] = useState(false);
  const { details } = props;
  const { discountPercent, currency, images, mrp, price, title, vendor, id } =
    details;
  const productDetails = {
    title,
    price,
    image: images[0].src,
  };
  const handleOpenSharePopup = () => {
    setShowSharePopup(true);
  };

  const handleCloseSharePopup = () => {
    setShowSharePopup(false);
  };
  return (
    <Link to={`/products/${id}`} className="link-item">
      <li className="product-card">
        <img className="productImg" src={images[0].src} alt="" />
        <p>{title.length > 26 ? `${title.slice(0, 25)}...` : title}</p>
        <p>{vendor}</p>
        <p>
          <span className="price">
            {currency} {price}
          </span>{" "}
          <span className="mrp">
            {currency} {mrp}
          </span>{" "}
          {discountPercent}%
        </p>
        <div>
        <div>
      <button onClick={handleOpenSharePopup} className="share-btn">Share Product</button>
      {showSharePopup && (
        <SharePopup productDetails={productDetails} onClose={handleCloseSharePopup} />
      )}
    </div>
    </div>
      </li>
    </Link>
  );
};

export default ProductCard;
