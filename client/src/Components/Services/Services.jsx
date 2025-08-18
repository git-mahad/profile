import React, { useState, useEffect } from 'react';
import { Code, Database, Globe, Server, Bug, LayoutGrid, Cloud, ChevronRight, X } from 'lucide-react';

const Services = () => {
  const [activeService, setActiveService] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const getLayoutClasses = () => {
    if (isMobile) {
      return 'text-3xl';
    } else if (isTablet) {
      return 'text-4xl';
    } else {
      return 'text-5xl';
    }
  };

  const titleClass = getLayoutClasses();

  const services = [
    {
      id: 1,
      title: "MERN Developer",
      description: "Full-stack development using MongoDB, Express, React, and Node.js.",
      icon: <LayoutGrid className="w-8 h-8 md:w-10 md:h-10 text-indigo-400" />,
      details: "Comprehensive MERN stack development services covering everything from database design to front-end implementation. I build scalable, modern web applications with clean code, effective state management, and optimized performance.",
      features: ["Full-stack Integration", "State Management", "Component Architecture", "API Design"]
    },
    {
      id: 2,
      title: "Troubleshooting (MERN Project)",
      description: "Expert debugging and optimization for MERN stack applications.",
      icon: <Bug className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" />,
      details: "Specialized diagnostic and troubleshooting services for MERN stack applications. I identify performance bottlenecks, resolve complex bugs, and implement architectural improvements to enhance application stability and user experience.",
      features: ["Performance Analysis", "Error Resolution", "Code Refactoring", "Architecture Review"]
    },
    {
      id: 3,
      title: "Backend Design (Node.js)",
      description: "Robust and scalable backend solutions powered by Node.js.",
      icon: <Server className="w-8 h-8 md:w-10 md:h-10 text-red-400" />,
      details: "End-to-end backend development using Node.js to create scalable, maintainable APIs and server applications. I implement efficient data processing, authentication systems, and third-party integrations while ensuring security and performance.",
      features: ["RESTful APIs", "Authentication Systems", "Microservices", "Real-time Applications"]
    },
    {
      id: 4,
      title: "Static Website",
      description: "Fast-loading, responsive static websites with modern design principles.",
      icon: <Globe className="w-8 h-8 md:w-10 md:h-10 text-purple-400" />,
      details: "Development of lightning-fast static websites that deliver exceptional user experience across all devices. I leverage modern frameworks and best practices to create visually appealing, SEO-friendly sites with minimal maintenance requirements.",
      features: ["Responsive Design", "SEO Optimization", "Performance Focused", "Modern UI/UX"]
    },
    {
      id: 5,
      title: "Database Design",
      description: "Structured database architecture that scales with your application needs.",
      icon: <Database className="w-8 h-8 md:w-10 md:h-10 text-green-400" />,
      details: "Comprehensive database design services that focus on data integrity, performance, and scalability. I create efficient schema designs, implement proper indexing strategies, and optimize query performance to ensure your data layer supports your application's growth.",
      features: ["Schema Design", "Query Optimization", "Data Modeling", "Migration Planning"]
    },
    {
      id: 6,
      title: "C & C++ Task",
      description: "Expert implementation of memory-efficient and performance-optimized solutions using C and C++.",
      icon: <Code className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />,
      details: "Specialized in developing high-performance applications, system utilities, and embedded systems using C and C++. I focus on memory optimization, efficient algorithms, and cross-platform compatibility to deliver robust solutions that meet your specific requirements.",
      features: ["Algorithm Optimization", "Memory Management", "System Programming", "Performance Tuning"]
    },
  ];

  return (
    <section 
      id="services" 
      className={`
        ${isMobile ? 'ml-0 px-4' : isTablet ? 'ml-0 sm:ml-0 px-6' : 'ml-0 lg:ml-72 px-8'} 
        min-h-screen py-12 text-white
      `}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className={`font-bold mb-8 ${titleClass}`}>
          SERVICES
          <div className="h-1 w-12 bg-blue-500 mt-3"></div>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-gray-900 bg-opacity-70 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
              onClick={() => setActiveService(service)}
            >
              <div className="p-4 md:p-6">
                <div className="flex justify-center items-center h-12 w-12 md:h-16 md:w-16 rounded-full bg-gray-800 mx-auto mb-3 md:mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 text-center">{service.title}</h3>
                <p className="text-gray-300 text-center text-sm md:text-base">{service.description}</p>
                <div className="flex justify-center mt-3 md:mt-4">
                  <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm md:text-base">
                    <span className="mr-1">View Details</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeService && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <button 
                  className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-white"
                  onClick={() => setActiveService(null)}
                  aria-label="Close details"
                >
                  <X size={24} />
                </button>
                <div className="p-4 md:p-8">
                  <div className="flex flex-col md:flex-row items-center mb-4 md:mb-6">
                    <div className="flex justify-center items-center h-12 w-12 md:h-16 md:w-16 rounded-full bg-gray-800 mb-3 md:mb-0 md:mr-4">
                      {activeService.icon}
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-xl md:text-2xl font-bold">{activeService.title}</h3>
                      <p className="text-blue-400">{activeService.description}</p>
                    </div>
                  </div>
                  <div className="mb-4 md:mb-6">
                    <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Overview</h4>
                    <p className="text-gray-300 text-sm md:text-base">{activeService.details}</p>
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Key Features</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {activeService.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          <span className="text-gray-300 text-sm md:text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 md:mt-8 flex justify-center md:justify-end">
                    <button 
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition-colors"
                      onClick={() => setActiveService(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;