import React, { useState } from 'react';

const FAQ_LIST = [
  { q: 'How do I track my order?', a: 'Go to My Orders and click Track.' },
  { q: 'What is the return policy?', a: 'You can return within 7 days of delivery.' },
  { q: 'How do I contact support?', a: 'Use the Chat or Help Center form.' },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="faq-box">
      <h3>FAQs</h3>
      {FAQ_LIST.map((item, idx) => (
        <div key={idx} className="faq-item">
          <div className="faq-question" onClick={() => setOpenIndex(openIndex === idx ? null : idx)}>
            {item.q}
          </div>
          {openIndex === idx && <div className="faq-answer">{item.a}</div>}
        </div>
      ))}
    </div>
  );
};

export default FAQs;