import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CafeMenu.css';
import coffeeBackground from '../assets/cafe1.jpg';
import snacksBackground from '../assets/cafe2.jpg';
import pastaBackground from '../assets/coffee.jpg';
import sandwichBackground from '../assets/coffee1.jpg';
import dessertBackground from '../assets/cofeemaker.jpg';

gsap.registerPlugin(ScrollTrigger);

const menuSections = [
  {
    title: "Coffee & Beverages",
    items: [
      { id: 1, name: 'Espresso', price: '₹80' },
      { id: 2, name: 'Americano', price: '₹90' },
      { id: 3, name: 'Cappuccino', price: '₹120' },
      { id: 4, name: 'Latte', price: '₹120' },
      { id: 5, name: 'Mocha', price: '₹140' },
      { id: 6, name: 'Masala Chai', price: '₹30' },
      { id: 7, name: 'Filter Coffee', price: '₹40' },
      { id: 8, name: 'Lassi', price: '₹50' },
      { id: 9, name: 'Nimbu Pani', price: '₹20' },
      { id: 10, name: 'Mango Smoothie', price: '₹70' },
      { id: 11, name: 'Kesar Badam Milk', price: '₹60' },
    ],
    backImage: dessertBackground
  },
  {
    title: "Snacks & Appetizers",
    items: [
      { id: 12, name: 'Samosas', price: '₹40' },
      { id: 13, name: 'Pakoras', price: '₹50' },
      { id: 14, name: 'Paneer Tikka', price: '₹100' },
      { id: 15, name: 'Aloo Tikki Chaat', price: '₹60' },
      { id: 16, name: 'Dhokla', price: '₹50' },
    ],
    backImage: pastaBackground
  },
  {
    title: "Pastas",
    items: [
      { id: 17, name: 'Penne Arrabbiata', price: '₹150' },
      { id: 18, name: 'Pasta Primavera', price: '₹160' },
      { id: 19, name: 'Creamy Alfredo Pasta', price: '₹180' },
      { id: 20, name: 'Cheese Pasta Bake', price: '₹200' },
      { id: 21, name: 'Pesto Pasta', price: '₹170' },
    ],
    backImage: snacksBackground
  },
  {
    title: "Sandwiches",
    items: [
      { id: 22, name: 'Vegetable Club Sandwich', price: '₹120' },
      { id: 23, name: 'Grilled Cheese Sandwich', price: '₹100' },
      { id: 24, name: 'Paneer Tikka Sandwich', price: '₹140' },
      { id: 25, name: 'Egg Mayonnaise Sandwich', price: '₹100' },
      { id: 26, name: 'Masala Egg Sandwich', price: '₹110' },
    ],
    backImage: sandwichBackground
  },
  {
    title: "Egg Dishes",
    items: [
      { id: 27, name: 'Scrambled Eggs', price: '₹80' },
      { id: 28, name: 'Omelette', price: '₹90' },
      { id: 29, name: 'Egg Bhurji', price: '₹100' },
      { id: 30, name: 'Egg Curry', price: '₹150' },
    ],
    backImage: coffeeBackground
  },
  {
    title: "Desserts",
    items: [
      { id: 31, name: 'Gulab Jamun', price: '₹40' },
      { id: 32, name: 'Jalebi', price: '₹30' },
      { id: 33, name: 'Rasgulla', price: '₹50' },
      { id: 34, name: 'Kheer', price: '₹60' },
    ],
    backImage: dessertBackground
  },
];



const CafeMenu = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const flipbookRef = useRef(null);
  const pageRefs = useRef([]);

  useEffect(() => {
    const flipbook = flipbookRef.current;
    const pages = pageRefs.current;
    const totalPages = menuSections.length;
  
    gsap.set(pages, { 
      rotationY: 0, 
      transformOrigin: 'left center', 
      zIndex: (i) => totalPages - i 
    });
  
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: flipbook,
        start: 'center center',
        end: () => `+=${flipbook.offsetHeight * (totalPages - 1)}`,
        scrub: 0.5,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
      },
    });
  
    pages.forEach((page, index) => {
      if (index < totalPages - 1) {
        tl.to(page, {
          rotationY: -180,
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            gsap.set(page, { zIndex: totalPages + index });
            if (index < totalPages - 2) {
              gsap.set(pages[index + 1], { zIndex: totalPages + index - 1, rotationY: 0 });
            }
          },
          onReverseComplete: () => {
            gsap.set(page, { zIndex: totalPages - index, rotationY: 0 });
            if (index > 0) {
              gsap.set(pages[index - 1], { zIndex: totalPages - index + 1, rotationY: -180 });
            }
          }
        }, index);
      }
    });
  
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      tl.kill();
    };
  }, []);

  return (
    <div className="flipbook-container">
      <div className="flipbook" ref={flipbookRef}>
        {menuSections.map((section, index) => (
          <div
            key={index}
            className={`page ${index === currentPage ? 'active' : ''}`}
            ref={(el) => (pageRefs.current[index] = el)}
          >
            <div className="page-front">
              <h2>{section.title}</h2>
              <ul className="menu-list">
                {section.items.map(item => (
                  <li key={item.id} className="menu-item">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div 
              className="page-back"
              style={{backgroundImage: `url(${section.backImage})`}}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default CafeMenu;