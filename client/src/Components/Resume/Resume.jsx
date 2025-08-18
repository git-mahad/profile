import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Briefcase, GraduationCap, Award, Download } from 'lucide-react';

export default function Resume() {
  const [screenSize, setScreenSize] = useState('desktop');
  const [activeTab, setActiveTab] = useState('experience');

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

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate layout classes based on screen size
  const getLayoutClasses = () => {
    switch (screenSize) {
      case 'mobile':
        return {
          container: 'px-4 py-12',
          title: 'text-3xl',
          sectionTitle: 'text-xl',
          itemTitle: 'text-lg',
          itemFlex: 'flex-col gap-2',
        };
      case 'tablet':
        return {
          container: 'px-6 py-16 ml-0 lg:ml-72',
          title: 'text-4xl',
          sectionTitle: 'text-2xl',
          itemTitle: 'text-xl',
          itemFlex: 'justify-between items-start',
        };
      default: // desktop
        return {
          container: 'px-8 py-20 ml-72',
          title: 'text-5xl',
          sectionTitle: 'text-2xl',
          itemTitle: 'text-xl',
          itemFlex: 'justify-between items-start',
        };
    }
  };

  const layout = getLayoutClasses();

  // Resume Data
  const resumeData = {
    education: [
      {
        degree: "BACHELOR OF COMPUTER SCIENCE",
        institution: "University of Engineering and Technology, Lahore",
        period: "11/2021 - 05/2025",
        description: "Studied core concepts in computer science, including software engineering, database systems, and web development.",
        relevantCoursework: [
          "Advanced Database Systems",
          "Object-Oriented Programming",
          "Data Structures & Algorithms",
          "Web Application Development",
          "Software Engineering Principles"
        ],
      },
      {
        degree: "FSC Engineering",
        institution: "Punjab Group of Colleges, Lahore",
        period: "09/2019 - 05/2021",
        description: "Completed intermediate studies with a focus on mathematics and physics, laying a strong foundation for computer science.",
        relevantCoursework: [
          "Mathematics",
          "Physics",
          "Chemistry",
          "English Literature",
        ]
      }
    ],
    experience: [
      {
        title: "Backend Developer",
        company: "iTitans",
        type: "Full Time | Onsite",
        period: "06/2025 - Present",
        description: "Backend Developer specializing in Node.js and NestJS to build robust server-side applications.",
        responsibilities: [
          "Developed server-side logic using Node.js and NestJS.",
          "Collaborated with frontend teams to integrate APIs.",
          "Contributed to code reviews to maintain high code quality.",
          "Designed and optimized database architectures for efficient data management."
        ]
      },

      {
        title: "Full Stack Developer",
        company: "NAVTECH",
        type: "Course + Intership | Onsite",
        period: "03/2025 - 06/2025",
        description: "Completed a comprehensive full-stack development course focusing on React and Node.js.",
        responsibilities: [
          "Developed full-stack web solutions using modern technologies.",
          "Demonstrated proficiency in React and Node.js",
          "Gained knowledge of best practices in software development and project management."
        ]
      },

      {
        title: "Frontend Developer (Contract)",
        company: "New Frontier Lab",
        location: "Remote (Lahore, Pakistan)",
        type: "Contract | Remote",
        period: "06/2024 - 09/2024",
        description: "Frontend Developer specializing in HTML, CSS, JavaScript, and React to create engaging web applications.",
        responsibilities: [
          "Collaborated with designers and backend developers.",
          "Contributed to code reviews to ensure high quality and seamless functionality."
        ]
      },
    ],
    skills: [
      {
        category: "Frontend",
        items: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS", "Bootstrap", "Angular", "Typescript"]
      },
      {
        category: "Backend",
        items: ["Node.js", "Express", "MongoDB", "SQL", "REST APIs", "Typescript", "NestJS"]
      },
      {
        category: "Tools & Technologies",
        items: ["Git", "GitHub", "VS Code", "Google Meet", "Vercel", "Chatgpt", "Slack"]
      },
      {
        category: "Soft Skills",
        items: ["Team Collaboration", "Communication", "Problem Solving", "Time Management"]
      }
    ],
    certifications: [
      {
        title: "Nestjs",
        issuer: "CodeSignal",
        date: "Jul 2025"
      },
      {
        title: "Database",
        issuer: "Mindluster",
        date: "Mar 2024"
      },
      {
        title: "Advance Nest.js",
        issuer: "Mindluster",
        date: "Aug 2025"
      }
    ]
  };

  const renderEducation = () => (
    <div className="space-y-6">
      {resumeData.education.map((edu, index) => (
        <div key={index} className="bg-gray-800 bg-opacity-50 p-5 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300">
          <div className={`flex ${layout.itemFlex} mb-3`}>
            <div>
              <h4 className={`${layout.itemTitle} font-semibold`}>{edu.degree}</h4>
              <div className="flex items-center text-blue-400 text-sm md:text-base mt-1">
                <GraduationCap size={16} className="mr-2" />
                {edu.institution}
              </div>
              {edu.specialization && (
                <div className="text-gray-300 text-sm mt-1">
                  Specialization: {edu.specialization}
                </div>
              )}
              
            </div>
            <span className={`bg-blue-600 text-white px-3 py-1 rounded text-xs md:text-sm flex items-center ${screenSize === 'mobile' ? 'self-start mt-2' : ''
              }`}>
              <Calendar size={14} className="mr-1" />
              {edu.period}
            </span>
          </div>
          <p className="text-sm md:text-base mb-4 text-gray-300">
            {edu.description}
          </p>
          {edu.relevantCoursework && (
            <div className="mt-3">
              <h5 className="text-sm font-semibold text-gray-200 mb-2">Relevant Coursework:</h5>
              <ul className="list-disc pl-5 space-y-1 text-sm md:text-base text-gray-300">
                {edu.relevantCoursework.map((course, i) => (
                  <li key={i}>{course}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      {resumeData.experience.map((exp, index) => (
        <div key={index} className="bg-gray-800 bg-opacity-50 p-5 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300">
          <div className={`flex ${layout.itemFlex} mb-3`}>
            <div>
              <h4 className={`${layout.itemTitle} font-semibold`}>{exp.title}</h4>
              <div className="flex items-center text-blue-400 text-sm md:text-base mt-1">
                <Briefcase size={16} className="mr-2" />
                {exp.company}
              </div>
              <div className="flex items-center text-gray-400 text-xs md:text-sm mt-1">
                <MapPin size={14} className="mr-2" />
                {exp.location} • {exp.type}
              </div>
            </div>
            <span className={`bg-blue-600 text-white px-3 py-1 rounded text-xs md:text-sm flex items-center ${screenSize === 'mobile' ? 'self-start mt-2' : ''
              }`}>
              <Calendar size={14} className="mr-1" />
              {exp.period}
            </span>
          </div>
          <p className="text-sm md:text-base mb-4 text-gray-300">
            {exp.description}
          </p>
          <div className="mt-3">
            <h5 className="text-sm font-semibold text-gray-200 mb-2">Responsibilities:</h5>
            <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-gray-300">
              {exp.responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSkills = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {resumeData.skills.map((skillGroup, index) => (
        <div key={index} className="bg-gray-800 bg-opacity-50 p-5 rounded-lg border border-gray-700">
          <h4 className="text-lg font-semibold mb-3 text-blue-400">{skillGroup.category}</h4>
          <div className="flex flex-wrap gap-2">
            {skillGroup.items.map((skill, i) => (
              <span key={i} className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}

      {/* Certifications */}
      <div className="md:col-span-2 bg-gray-800 bg-opacity-50 p-5 rounded-lg border border-gray-700 mt-3">
        <h4 className="text-lg font-semibold mb-4 text-blue-400">Certifications</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {resumeData.certifications.map((cert, i) => (
            <div key={i} className="bg-gray-700 p-4 rounded-lg flex items-start">
              <Award size={18} className="text-blue-400 mr-3 mt-1" />
              <div>
                <h5 className="font-medium">{cert.title}</h5>
                <p className="text-sm text-gray-300">{cert.issuer} • {cert.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="resume"
      className={`min-h-screen text-white transition-all duration-300 ${layout.container}`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className={`font-bold ${layout.title} mb-2`}>
              RESUME
              <div className="h-1 w-12 bg-blue-500 mt-3"></div>
            </h2>
            <p className="text-gray-400 mb-6 md:mb-0">My academic and professional journey</p>
          </div>

          {/* <a
            href="https://drive.google.com/file/d/1urmvt_ADecyu6uL5fx0wvJvAr64hpSTw/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center self-start transition-colors"
          >
            <Download size={18} className="mr-2" />
            Download CV
          </a> */}

        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700 mb-8">
          <div className="flex space-x-1 md:space-x-4">
            <button
              className={`py-3 px-4 md:px-6 border-b-2 transition-colors ${activeTab === 'experience'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-white'
                }`}
              onClick={() => setActiveTab('experience')}
            >
              <span className="flex items-center">
                <Briefcase size={18} className="mr-2" />
                Experience
              </span>
            </button>
            <button
              className={`py-3 px-4 md:px-6 border-b-2 transition-colors ${activeTab === 'education'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-white'
                }`}
              onClick={() => setActiveTab('education')}
            >
              <span className="flex items-center">
                <GraduationCap size={18} className="mr-2" />
                Education
              </span>
            </button>
            <button
              className={`py-3 px-4 md:px-6 border-b-2 transition-colors ${activeTab === 'skills'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-white'
                }`}
              onClick={() => setActiveTab('skills')}
            >
              <span className="flex items-center">
                <Award size={18} className="mr-2" />
                Skills
              </span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-gray-900 bg-opacity-70 p-6 rounded-lg">
          {activeTab === 'experience' && renderExperience()}
          {activeTab === 'education' && renderEducation()}
          {activeTab === 'skills' && renderSkills()}
        </div>
      </div>
    </section>
  );
}