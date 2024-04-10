import React from 'react';
import '../styles/Sub.css'; 
function SemesterSubjects({ subjects }) {
  return (
    <div className='semester-box'>
      {subjects.map((subject, index) => (
        <div key={index} className='subject'>
          {subject}
        </div>
      ))}
    </div>
  );
}

export default function Sub() {
 
  const semesters = [
    [
      "Imperative Programming",
      "Digital Electronics",
      "Operating Systems",
      "Discrete Mathematics",
      "Ability Enhancement Skill",
      "Communication Skills",
    ],
    [
      'Object-oriented Programming',
      'Microprocessor Architecture',
      'Web Programming',
      'Numerical and Statistical Methods',
      'Ability Enhancement Skill',
      'Green Computing',
    ],
    [
      'Python Programming',
      'Data Structures',
      'Computer Networks',
      'Database Management Systems',
      'Applied Mathematics',
      'Mobile Programming Practical',
    ],
    [
      'Introduction to Embedded Systems',
      'Computer-Oriented Statistical Techniques',
      'Software Engineering',
      'Computer Graphics and Animation',
      'Skill Enhancement Course Practical',
      'Core Java Practical',
    ],
    [
      'Network Security',
      'Asp.Net',
      'Software Testing',
      'Advanced Java',
      'Linux Administration',
    ],
    [
      'Internet Technology',
      'Project Management',
      'Information Technology service management',
      'Electives',
      'Cyber laws',
      'Geographic Informations Systems',
    ]
  ];

  return (
    <div className='bg-[#f7c223]'>
      <div className='hero-text mt-[80px]'>
        <h1 className='text-[#ffffff] text-[2rem] max767:text-[2rem]'>Our Services</h1>
        <p className='text-[12px]'>To Provide These Paper Questions</p>
        <p className='text-[12px]'>To Get the Questions Click On Get Start</p>
       
        <div className="semester-container">
          {semesters.map((semesterSubjects, index) => (
            <div key={index}>
              <h2 className='semester-heading'>Semester {index + 1}</h2>
              <SemesterSubjects subjects={semesterSubjects} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
