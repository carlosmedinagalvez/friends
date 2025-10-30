    // src/components/Banner.jsx
    import React from 'react';
    import './Banner.css'; // Import your CSS for styling

    const Banner = ({ message, onClose }) => {
      return (
        <div className="banner-container">
          <p className="banner-message">{message}</p>
          {onClose && (
            <button className="banner-close-button" onClick={onClose}>
              X
            </button>
          )}
        </div>
      );
    };

    export default Banner;