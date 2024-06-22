// src/components/Footer.js
import React from 'react';
import '../Styles/Footer.css';
import FeedbackForm from './FeedbackForm';

function Footer() {
  return (
    <footer>
      <p>© 2024 Anime Figures Store. All rights reserved.</p>
       <FeedbackForm />
    </footer>
  );
}

export default Footer;
