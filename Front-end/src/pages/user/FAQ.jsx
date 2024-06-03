import React, { useState } from 'react';

const faqs = [
  {
    question: 'Waar bevind het medialab zich?',
    answer: 'De labs van medialab.brussels bevinden zich op Campus Kaai van de Erasmushogeschool Brussel. \n\nNijverheidskaai 170\n1070 Brussel',
  },
  {
    question: 'Wat zijn de openingsuren?',
    answer: 'Gesloten op feestdagen\n\nZomersluiting 2024: 11/07 t.e.m. 15/08\n\nMaandag\t10:00 - 12:00\t12:30 - 17:00\nDinsdag\t/\t/\nWoensdag\t/\t/\nDonderdag\t10:00 - 12:00\t12:30 - 17:00\nVrijdag\t10:00 - 12:00\t12:30 - 17:00',
  },
  {
    question: 'Met wie moet ik contact opnemen bij een probleem?',
    answer: 'Glenn Dumortier\n\nE-mail: glenn.dumortier1@ehb.be',
  },
  {
    question: 'Wat is de uitleen termijn?',
    answer: '1 week en 1 week op voorhand voor student. \t\t Geen beperkingen voor docenten.',
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <main className="p-6">
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
    </main>
  );
};

export default FAQ;
