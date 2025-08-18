import React, { useState, useEffect } from 'react';
import { Github, Facebook, Linkedin, MessageCircle, User, FileText, Briefcase, Award, Mail, Menu, X } from 'lucide-react';
import P6image from '../../assets/About.jpeg';

export default function Sidebar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
      
      if (width >= 1024) {
        setSidebarOpen(true); 
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  const socialLinks = [
    { icon: <Github size={18} />, href: 'https://github.com/git-mahad', label: 'GitHub' },
    { icon: <Facebook size={18} />, href: 'https://www.facebook.com/profile.php?id=100079441698112', label: 'Facebook' },
    { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/mahad-dev', label: 'LinkedIn' },
    { icon: <MessageCircle size={18} />, href: 'https://wa.me/+923051479956', label: 'WhatsApp' },
  ];

  const navLinks = [
    { name: 'Home', href: '#home', icon: <User size={18} /> },
    { name: 'About', href: '#about', icon: <User size={18} /> },
    { name: 'Resume', href: '#resume', icon: <FileText size={18} /> },
    { name: 'Portfolio', href: '#portfolio', icon: <Briefcase size={18} /> },
    { name: 'Services', href: '#services', icon: <Award size={18} /> },
    { name: 'Contact', href: '#contact', icon: <Mail size={18} /> },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <>
      {(isMobile || isTablet) && (
        <button
          onClick={toggleSidebar}
          className={`fixed top-4 left-4 z-50 bg-gray-900 p-2 rounded-md text-white shadow-lg hover:bg-gray-800 transition-colors ${
            sidebarOpen ? 'left-64' : 'left-4'
          } ${isMobile ? 'transition-left duration-300' : ''}`}
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      <div
        className={`fixed bg-gray-900 text-white flex flex-col items-center py-8 z-40 transition-all duration-300 ease-in-out shadow-xl
          ${isMobile ? 
            `w-full h-screen ${sidebarOpen ? 'left-0' : '-left-full'}` :
            isTablet ? 
              `w-72 h-screen ${sidebarOpen ? 'left-0' : '-left-72'}` :
              'left-0 top-0 h-screen w-72'}`}
      >
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-3 border-2 border-gray-700 shadow-lg">
          <img
            src={P6image}
            alt="Muhammad Mahad"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold mb-3">Muhammad Mahad</h2>
        <div className="flex space-x-2 mb-6">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>
        <nav className="w-full mt-4">
          <ul className="w-full">
            {navLinks.map((link, index) => (
              <li key={index} className="w-full">
                <a
                  href={link.href}
                  className="flex items-center py-3 px-6 w-full hover:bg-blue-600 transition-colors"
                  onClick={() => (isMobile || isTablet) && setSidebarOpen(false)}
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {(isMobile || isTablet) && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
}