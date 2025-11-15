'use client';

import React, { useState } from 'react';
import { ChevronDown, Truck, Award, Shield, CreditCard } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      icon: Truck,
      question: 'Pristatymo laikas',
      answer: '2-4 savaitės priklausomai nuo prekės'
    },
    {
      icon: Award,
      question: 'Lojalumo programa',
      answer: 'Mūsų lojalumo programa suteikia specialias nuolaidas ir privilegijas nuolatiniams klientams'
    },
    {
      icon: Shield,
      question: 'Garantija',
      answer: 'Jei prekė yra brokuota, pakeisime į kitą nemokamai'
    },
    {
      icon: CreditCard,
      question: 'Atsiskaitymas',
      answer: 'Visi atsiskaitymai yra saugūs ir apsaugoti'
    }
  ];

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-12 md:py-16 w-full bg-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 md:mb-12 text-white">
          Dažnai Užduodami <span className="text-emerald-400">Klausimai</span>
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const Icon = faq.icon;
            const isOpen = openIndex === idx;
            
            return (
              <div
                key={`faq-${idx}`}
                className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                    </div>
                    <span className="text-base sm:text-lg font-semibold text-gray-900">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-600 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                    <p className="text-sm sm:text-base text-gray-700 pl-12 sm:pl-16">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;