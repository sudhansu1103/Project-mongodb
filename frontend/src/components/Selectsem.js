import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/SelectSem.css";
import Navbar from './Navbar';
import heroImage from '../assets/bubble.png';
function SelectSem() {
  const [selectedSemester, setSelectedSemester] = useState(null);
  const navigate = useNavigate();

  const handleSemesterClick = (semester) => {
    setSelectedSemester(semester);
    switch (semester) {
      case 1:
        navigate('/sem1');
        break;
      case 2:
        navigate('/sem2');
        break;
      case 3:
        navigate('/sem3');
        break;
      case 4:
        navigate('/sem4');
        break;
      case 5:
        navigate('/sem5');
        break;
      case 6:
        navigate('/sem6');
        break;
      default:
        break;
    }
  };

  return (
    <div className='skm'>
      <div className="hero" >
          <img src={heroImage} alt="bubble" />
          <img src={heroImage} alt="bubble" />
          <img src={heroImage} alt="bubble" />
          <img src={heroImage} alt="bubble" />
          <img src={heroImage} alt="bubble" />
          <img src={heroImage} alt="bubble" />
          <img src={heroImage} alt="bubble" />
          <img src={heroImage} alt="bubble" />
          <img src={heroImage} alt="bubble" />
        </div> <Navbar />
    <div className="select-sem-container text-[#ffff]">
      <div
        className={`sem-box ${selectedSemester === 1 ? 'selected' : ''} font-bold`}
        onClick={() => handleSemesterClick(1)}
      >
        BSc IT Semester I
      </div>
      <div
        className={`sem-box ${selectedSemester === 2 ? 'selected' : ''} font-bold`}
        onClick={() => handleSemesterClick(2)}
      >
        BSc IT Semester II
      </div>
      <div
        className={`sem-box ${selectedSemester === 3 ? 'selected' : ''} font-bold`}
        onClick={() => handleSemesterClick(3)}
      >
        BSc IT Semester III
      </div>
      <div
        className={`sem-box ${selectedSemester === 4 ? 'selected' : ''} font-bold`}
        onClick={() => handleSemesterClick(4)}
      >
        BSc IT Semester IV
      </div>
      <div
        className={`sem-box ${selectedSemester === 5 ? 'selected' : ''} font-bold`}
        onClick={() => handleSemesterClick(5)}
      >
        TY BSc IT Semester V
      </div>
      <div 
        className={`sem-box ${selectedSemester === 6 ? 'selected' : ''} font-bold`}
        onClick={() => handleSemesterClick(6)}
      >
        TY BSc IT Semester VI
      </div>
    </div>
    <div className='h-[15rem]'></div></div>
  );
}

export default SelectSem;
