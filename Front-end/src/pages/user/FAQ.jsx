import React, { useState } from 'react';

const faqs = [
  {
    question: 'Waar bevind het medialab zich?',
    answer: 'Answer 1',
  },
  {
    question: 'Wat zijn de openingsuren?',
    answer: 'Answer 2',
  },
  {
    question: 'Met wie moet ik contact opnemen bij een probleem?',
    answer: 'Answer 3',
  },
  {
    question: 'Wat is de uitleen termijn?',
    answer: 'Answer 4',
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">FAQs</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-2 mx-auto text-center max-w-prose border-2 border-black rounded-lg shadow-md">
          <div className="flex justify-between items-center py-2 px-4 cursor-pointer" onClick={() => handleClick(index)}>
            <h2 className="text-xl font-semibold">{faq.question}</h2>
            <span>{activeIndex === index ? '-' : '+'}</span>
          </div>
          {activeIndex === index && <p className="px-4 pb-2">{faq.answer}</p>}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
