import React from "react";
import './index.css'

const SharePopup = ({ productDetails, onClose }) => {
  const { title, url, image } = productDetails; // Assuming these properties exist

  const shareUrl = `https://your-website.com/product/${productDetails.id}`; // Replace with your actual sharing URL

  const handleShareClick = (platform) => {
    const shareWindow = window.open(
      `https://www.${platform}.com/share?url=${encodeURIComponent(shareUrl)}`,
      "share-popup",
      "width=600,height=400"
    );
    if (shareWindow) {
      shareWindow.focus();
    }
  };

  return (
    <div className="share-popup-container">
      <div className="share-popup">
        <h2>Share {title}</h2>
        <p>Share this product with your friends on social media.</p>
        <ul className="share-buttons">
          <li>
            <button onClick={() => handleShareClick("facebook")}>
              <i className="fa fa-facebook"></i> Share on Facebook
            </button>
          </li>
          <li>
            <button onClick={() => handleShareClick("twitter")}>
              <i className="fa fa-twitter"></i> Share on Twitter
            </button>
          </li>
          {/* Add more buttons for other social media platforms */}
        </ul>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SharePopup;
