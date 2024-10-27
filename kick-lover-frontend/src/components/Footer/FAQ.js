// FAQ.js
import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is Kick Lover?",
    answer:
      "Kick Lover is an online store dedicated to sneaker enthusiasts. We offer a wide variety of sneakers for men, women, and kids, along with brand-specific collections.",
  },
  {
    question: "How can I place an order?",
    answer:
      "You can place an order by adding items to your cart, proceeding to checkout, and filling in your shipping and payment details. Our team will handle the rest!",
  },
  {
    question: "Do you offer worldwide shipping?",
    answer:
      "Yes, we provide worldwide shipping. Shipping fees and delivery times vary depending on your location.",
  },
  {
    question: "Can I return or exchange an item?",
    answer:
      "Yes, we offer a 30-day return and exchange policy. For more details, please visit our Returns & Exchanges page.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach us via the Contact page, or email us directly at support@kicklover.com. We’re here to help with any inquiries.",
  },
];

// Memoized component for individual FAQ item
const FAQItem = memo(({ faq, index, activeIndex, toggleFAQ }) => {
  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
      <div
        onClick={() => toggleFAQ(index)}
        className="p-4 flex justify-between cursor-pointer"
      >
        <h2 className="text-xl font-semibold">{faq.question}</h2>
        <span>{activeIndex === index ? "-" : "+"}</span>
      </div>
      <AnimatePresence>
        {activeIndex === index && (
          <motion.div
            initial={{ opacity: 0, transform: "translateY(-10px)" }}
            animate={{ opacity: 1, transform: "translateY(0)" }}
            exit={{ opacity: 0, transform: "translateY(-10px)" }}
            transition={{ duration: 0.15 }}
            className="p-4 bg-gray-50 dark:bg-gray-800"
          >
            <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-center max-w-2xl mx-auto mb-10">
          Find answers to some of the most common questions about our store and
          services.
        </p>

        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              activeIndex={activeIndex}
              toggleFAQ={toggleFAQ}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
