import React from 'react';
import teks from '../data';

const Footer = () => {
  return (
    <footer className="teknolab-footer">
      <div className="teknolab-container">
        <div className="teknolab-footer__badge">
          {teks.footer.badge}
        </div>
      </div>
    </footer>
  );
};

export default Footer; 