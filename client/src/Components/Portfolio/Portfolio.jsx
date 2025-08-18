import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import TextEditor from '../../assets/Projects/Collaborative_Text_Editor.png'
import ExpenseTracker from '../../assets/Projects/Expense_Tracker.png'
import SportNews from '../../assets/Projects/Sport_new_site.png'
import WeatheApp from '../../assets/Projects/Weather_app.png'

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);
  const [screenSize, setScreenSize] = useState('desktop');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef(null);

  const projects = {
    ALL: [
      {
        id: 1,
        title: "Collaborative Text Editor",
        // year: "2024/06",
        description: "A real-time collaborative text editor built with React and WebSockets. Multiple users can simultaneously edit the same document with instant synchronization across all clients.",
        category: "APP WEB",
        image: TextEditor,
        details: "Features include live user count, connection status indicators, and an elegant, responsive interface.",
        features: ["Live User Count", "Connection Status Indicators", "Instant Synchronization", "Responsive Interface"],
        // url: "https://collaborative-text-editor.example.com"
      },
      {
        id: 2,
        title: "Expense Tracker",
        // year: "2024/07",
        description: "A simple React-based Expense Tracker application that allows users to add income and expenses dynamically, view their balance, and track transactions.",
        category: "APP",
        image: ExpenseTracker,
        details: "This application allows users to add transactions (income or expenses), view their total balance, and track financial activities effectively. It features a responsive and user-friendly UI with persistent state management using React Hooks.",
        features: [
          "Add transactions (income or expenses)",
          "View total balance",
          "View a summary of income and expenses",
          "Responsive and user-friendly UI",
          "Persistent state management using React Hooks",
          "Dynamic balance updates based on transactions"
        ],
        // url: "https://expense-tracker.example.com"
      },
      {
        id: 3,
        title: "Sports News",
        description: "A React-based sports news application that fetches and displays latest sports news including cricket, football, hockey, badminton, and tennis with search and category filters.",
        features: [
          "Search sports news by keyword",
          "Filter news by sports categories (Cricket, Football, Hockey, Badminton, Tennis)",
          "Real-time news fetching from NewsAPI",
          "Error handling for failed or empty fetch",
          "Responsive and user-friendly UI"
        ],
        category: "WEB",
        image: SportNews,
        details: "Mindful Unicorn is a React web app designed to display live sports news with real-time search, multiple category filters, and a card-based news display system.",
        // url: "https://mindful-unicorn.example.com"
      },
      {
        id: 4,
        title: "World Weather Monitor",
        description: "A real-time weather application providing live weather updates for cities across World and beyond.",
        features: [
          "Real-time Weather Updates",
          "City-based Search",
          "Humidity and Wind Speed Details",
          "Error Handling for Invalid City Names",
          "Responsive and User-Friendly UI"
        ],
        category: "APP",
        image: WeatheApp,
        details: "World Weather Monitor offers current temperature, humidity, and wind speed details for any city searched. It provides accurate weather info with a clean interface and effective error handling.",
        // url: "https://weather-monitor.example.com"
      }
    ],
    APP: [
      {
        id: 1,
        title: "Expense Tracker",
        // year: "2024/07",
        description: "A simple React-based Expense Tracker application that allows users to add income and expenses dynamically, view their balance, and track transactions.",
        category: "APP",
        image: ExpenseTracker,
        details: "This application allows users to add transactions (income or expenses), view their total balance, and track financial activities effectively. It features a responsive and user-friendly UI with persistent state management using React Hooks.",
        features: [
          "Add transactions (income or expenses)",
          "View total balance",
          "View a summary of income and expenses",
          "Responsive and user-friendly UI",
          "Persistent state management using React Hooks",
          "Dynamic balance updates based on transactions"
        ],
        // url: "https://expense-tracker.example.com"
      },
      {
        id: 2,
        title: "World Weather Monitor",
        description: "A real-time weather application providing live weather updates for cities across World and beyond.",
        features: [
          "Real-time Weather Updates",
          "City-based Search",
          "Humidity and Wind Speed Details",
          "Error Handling for Invalid City Names",
          "Responsive and User-Friendly UI"
        ],
        category: "APP",
        image: WeatheApp,
        details: "World Weather Monitor offers current temperature, humidity, and wind speed details for any city searched. It provides accurate weather info with a clean interface and effective error handling.",
        // url: "https://weather-monitor.example.com"
      }
    ],
    WEB: [
      {
        id: 1,
        title: "Sports News ",
        description: "A React-based sports news application that fetches and displays latest sports news including cricket, football, hockey, badminton, and tennis with search and category filters.",
        features: [
          "Search sports news by keyword",
          "Filter news by sports categories (Cricket, Football, Hockey, Badminton, Tennis)",
          "Real-time news fetching from NewsAPI",
          "Error handling for failed or empty fetch",
          "Responsive and user-friendly UI"
        ],
        category: "WEB",
        image: SportNews,
        details: "Mindful Unicorn is a React web app designed to display live sports news with real-time search, multiple category filters, and a card-based news display system.",
        // url: "https://mindful-unicorn.example.com"
      },
      {
        id: 2,
        title: "Collaborative Text Editor",
        // year: "2024/06",
        description: "A real-time collaborative text editor built with React and WebSockets. Multiple users can simultaneously edit the same document with instant synchronization across all clients.",
        category: "WEB",
        image: TextEditor,
        details: "Features include live user count, connection status indicators, and an elegant, responsive interface.",
        features: ["Live User Count", "Connection Status Indicators", "Instant Synchronization", "Responsive Interface"],
        // url: "https://collaborative-text-editor.example.com"
      }
    ]
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScreenSize('mobile');
      } else if (window.innerWidth < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const handleViewLiveProject = (url, e) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getLayoutClasses = () => {
    switch (screenSize) {
      case 'mobile':
        return {
          container: 'px-4 py-12',
          title: 'text-3xl',
          grid: 'grid-cols-1 gap-4',
          tabs: 'justify-between text-sm',
        };
      case 'tablet':
        return {
          container: 'px-6 py-16 ml-0 lg:ml-72',
          title: 'text-4xl',
          grid: 'grid-cols-2 gap-5',
          tabs: 'justify-center text-base',
        };
      default:
        return {
          container: 'px-8 py-20 ml-72',
          title: 'text-5xl',
          grid: 'grid-cols-2 md:grid-cols-3 gap-6',
          tabs: 'justify-center text-lg',
        };
    }
  };

  const layout = getLayoutClasses();

  return (
    <section id="portfolio" className={`min-h-screen text-white ${layout.container}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`font-bold mb-8 ${layout.title}`}>
          PORTFOLIO
          <div className="h-1 w-12 bg-blue-500 mt-3"></div>
        </h2>

        <div className={`flex ${layout.tabs} mb-8 border-b border-gray-700`}>
          {['ALL', 'APP', 'WEB'].map((tab) => (
            <button
              key={tab}
              className={`px-4 md:px-8 py-3 font-medium relative ${activeTab === tab
                ? 'text-blue-400'
                : 'text-gray-400 hover:text-white'
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 h-1 bg-blue-400 w-full"></span>
              )}
            </button>
          ))}
        </div>

        <div className={`grid ${layout.grid}`}>
          {projects[activeTab].map((project) => (
            <div
              key={project.id}
              className="bg-gray-900 bg-opacity-70 rounded-lg overflow-hidden cursor-pointer hover:translate-y-[-5px] hover:shadow-lg transition-all duration-300 border border-gray-800"
              onClick={() => openProjectModal(project)}
            >
              <div className="relative h-48 md:h-56 bg-gray-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="bg-blue-600 px-4 py-2 rounded-full flex items-center">
                    <span className="font-medium mr-1">View Details</span>
                    <ExternalLink size={16} />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-blue-400 text-xs md:text-sm font-medium bg-blue-400 bg-opacity-10 px-2 py-1 rounded">
                    {project.category}
                  </span>
                  {project.year && <span className="text-gray-400 text-xs md:text-sm">{project.year}</span>}
                </div>
                <h3 className="font-bold text-lg md:text-xl mb-1">{project.title}</h3>
                <p className="text-gray-300 text-sm md:text-base line-clamp-2">{project.description}</p>
                
                {/* Add View Live Project button directly in the card */}
                {/* <div className="mt-4">
                  <button 
                    onClick={(e) => handleViewLiveProject(project.url, e)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded-full text-sm font-medium transition flex items-center"
                  >
                    View Live Project <ExternalLink size={14} className="ml-2" />
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-3 md:p-6">
            <div
              ref={modalRef}
              className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in"
            >
              <div className="relative">
                <div className="h-56 md:h-72 bg-gray-800">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <button
                  className="absolute top-3 right-3 bg-gray-900 bg-opacity-70 p-2 rounded-full text-gray-300 hover:text-white hover:bg-blue-600 transition-colors"
                  onClick={closeModal}
                >
                  <X size={20} />
                </button>

                <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto">
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <span className="text-blue-400 text-sm md:text-base bg-blue-400 bg-opacity-10 px-2 py-1 rounded font-medium">
                        {selectedProject.category}
                      </span>
                      <h3 className="font-bold text-xl md:text-2xl mt-2 mb-1">
                        {selectedProject.title}
                      </h3>
                      {selectedProject.year && (
                        <p className="text-gray-400 text-sm md:text-base">{selectedProject.year}</p>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm md:text-base mb-6">
                    {selectedProject.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-bold text-lg md:text-xl mb-3">Project Details</h4>
                    <p className="text-gray-300 text-sm md:text-base">
                      {selectedProject.details}
                    </p>
                  </div>

                  {selectedProject.features && (
                    <div>
                      <h4 className="font-bold text-lg md:text-xl mb-3">Key Features</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                        {selectedProject.features.map((feature, i) => (
                          <li key={i} className="flex items-center bg-gray-800 rounded-lg p-3">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                            <span className="text-gray-300 text-sm md:text-base">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-8 flex justify-center">
                    <a 
                      href={selectedProject.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full font-medium transition flex items-center"
                    >
                      View Live Project <ExternalLink size={16} className="ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {screenSize === 'desktop' && isModalOpen && (
          <>
            <button className="fixed top-1/2 left-80 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 p-3 rounded-full text-white hover:bg-blue-600 transition-colors z-50">
              <ChevronLeft size={24} />
            </button>
            <button className="fixed top-1/2 right-6 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 p-3 rounded-full text-white hover:bg-blue-600 transition-colors z-50">
              <ChevronRight size={24} />
            </button>
          </>
        )}
        
        {projects[activeTab].length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-gray-400 text-center">
              <span className="block text-5xl mb-4">🏗️</span>
              <h3 className="text-xl font-bold mb-2">No Projects Yet</h3>
              <p>Projects for this category will appear here soon.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;