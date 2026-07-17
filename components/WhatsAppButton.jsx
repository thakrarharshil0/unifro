'use client';

import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
    const [showButton, setShowButton] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('down');
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.pageYOffset;

            // Determine scroll direction
            if (currentScrollY > lastScrollY) {
                setScrollDirection('down');
            } else {
                setScrollDirection('up');
            }

            setLastScrollY(currentScrollY);

            // Hide when at top
            if (currentScrollY === 0) {
                setShowButton(false);
            }
            // Show when scrolling down and past a threshold
            else if (currentScrollY > 150 && scrollDirection === 'down') {
                setShowButton(true);
            }
            // Hide when scrolling back near top
            else if (currentScrollY < 100 && scrollDirection === 'up') {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, scrollDirection]);

    return (
        <a
            href="https://wa.me/919574076889"
            target="_blank"
            rel="noopener noreferrer"
            className={`
        fixed right-8 bottom-28 z-[9998] 
        flex items-center justify-center 
        w-14 h-14 
        bg-[#25D366] text-white 
        rounded-full 
        shadow-2xl shadow-[#25D366]/40
        transition-all duration-500 ease-out 
        hover:scale-110 active:scale-95 
        group
        ${showButton
                    ? 'animate-dropIn opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-[-100px] pointer-events-none'
                }
      `}
            aria-label="Chat on WhatsApp"
        >
            <FaWhatsapp className="text-3xl" />

            {/* Tooltip */}
            <span className="absolute right-full mr-3 px-3 py-1 bg-white text-gray-800 text-sm font-semibold rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100">
                Chat with us
            </span>
        </a>
    );
};

export default WhatsAppButton;
