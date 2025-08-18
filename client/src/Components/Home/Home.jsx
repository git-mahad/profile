import React, { useState, useEffect } from 'react';
import P8image from '../../assets/P8.jpeg';

const titles = [ "Backend Developer", "NestJs Developer", "NodeJs Developer"];

export default function Home() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fullText = titles[textIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayedText(prev => prev.slice(0, -1));
      } else {
        setDisplayedText(prev => fullText.slice(0, prev.length + 1));
      }

      if (!isDeleting && displayedText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      }

      if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setTextIndex(prev => (prev + 1) % titles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, textIndex]);

  // Calculate responsive values based on screen size
  const isMobile = windowSize.width < 640;
  const isTablet = windowSize.width >= 640 && windowSize.width < 1024;
  const isDesktop = windowSize.width >= 1024;

  // Sidebar offset for content
  const sidebarOffset = isDesktop ? 'lg:ml-72' : '';

  return (
    <div className={`relative min-h-screen text-white ${sidebarOffset}`}>
      {/* Background Image */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${P8image})`,
          zIndex: -1,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <section
          id="home"
          className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 md:px-12"
          style={{
            paddingTop: isMobile ? '5rem' : isTablet ? '3rem' : '0',
            paddingBottom: isMobile ? '5rem' : isTablet ? '3rem' : '0'
          }}
        >
          <div className="text-center max-w-4xl mx-auto">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight`}>
              Muhammad Mahad
            </h1>
            <div className={`text-lg sm:text-xl md:text-2xl font-light flex flex-wrap justify-center items-center min-h-12 md:min-h-16`}>
              <p className="whitespace-nowrap">I'm a&nbsp;</p>
              <div className="flex items-center">
                <p className="text-blue-400 font-medium min-h-6">
                  {displayedText}
                </p>
                <span className="ml-1 animate-pulse">|</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="#contact" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300 w-full sm:w-auto text-center"
              >
                Contact Me
              </a>
              <a 
                href="#portfolio" 
                className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300 w-full sm:w-auto text-center"
              >
                My Work
              </a>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>
      </div>
    </div>
  );
}