import React from 'react';
import ChatSupport from './ChatSupport';
import FAQs from './FAQs';
import HelpCenter from './HelpCenter';
import './Support.css';

const Support = () => {
  return (
    <div className="support-container">
      <h2>Need Help?</h2>
      <div className="support-sections">
        <ChatSupport />
        <FAQs />
        <HelpCenter />
      </div>
    </div>
  );
};

export default Support;