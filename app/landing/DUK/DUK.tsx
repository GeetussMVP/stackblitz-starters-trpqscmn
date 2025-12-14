'use client';
import { useState } from 'react';
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
    <section className="py-16 w-full px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-white text-center mb-12">
          Dažnai Užduodami <span className="text-teal-300">Klausimai</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const Icon = faq.icon;
            const isOpen = openIndex === idx;

            return (
              <div
                key={`faq-${idx}`}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl" />

                <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full flex items-center justify-between p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                        <Icon className="w-6 h-6 text-teal-300" />
                      </div>
                      <span className="text-lg font-medium text-white">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-white/60 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-48' : 'max-h-0'
                    }`}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-white/70 pl-16">
                        {faq.answer}
                      </p>
                    </div>
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
