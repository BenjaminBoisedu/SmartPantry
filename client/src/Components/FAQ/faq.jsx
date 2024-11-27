import React, { useState } from 'react';
import { IoChevronDownSharp } from "react-icons/io5";
import './faq.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div id="faq">
      <div id="left">
        <h1>FAQs</h1>
        <p>Find answers to your most pressing questions about our app's features and support.</p>
      </div>

      <div id="right">
        <div className="container">
          <div onClick={() => toggleFAQ(0)} className="question">
            <h3>What features are included?</h3>
            <IoChevronDownSharp className={`icon ${activeIndex === 0 ? 'rotate' : ''}`} />
          </div>
          <p className={`answer ${activeIndex === 0 ? 'show' : ''}`}>
            Our app offers a variety of features including food inventory tracking, recipe suggestions, and expiration alerts. You can easily manage your ingredients and discover new recipes based on what you have. It's designed to make meal planning effortless.
          </p>
        </div>
        <div className="container">
          <div onClick={() => toggleFAQ(1)} className="question">
            <h3>Is user support available?</h3>
            <IoChevronDownSharp className={`icon ${activeIndex === 1 ? 'rotate' : ''}`} />
          </div>
          <p className={`answer ${activeIndex === 1 ? 'show' : ''}`}>
            Yes, our support team is available 24/7 to help you with any issues or questions you may have.
          </p>
        </div>
        <div className="container">
          <div onClick={() => toggleFAQ(2)} className="question">
            <h3>How to reset password?</h3>
            <IoChevronDownSharp className={`icon ${activeIndex === 2 ? 'rotate' : ''}`} />
          </div>
          <p className={`answer ${activeIndex === 2 ? 'show' : ''}`}>
            To reset your password, go to the settings page, click on 'Forgot Password', and follow the instructions.
          </p>
        </div>
        <div className="container">
          <div onClick={() => toggleFAQ(3)} className="question">
            <h3>Can I share recipes?</h3>
            <IoChevronDownSharp className={`icon ${activeIndex === 3 ? 'rotate' : ''}`} />
          </div>
          <p className={`answer ${activeIndex === 3 ? 'show' : ''}`}>
            Yes, you can share recipes with your friends and family through the app.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
