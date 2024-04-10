import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import download from '../assets/download-solid.svg';
import heroImage from '../assets/bubble.png';
import { useNavigate } from "react-router-dom";
function Sem3() {
  const [semester] = useState('Semester3');
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subjectSelected, setSubjectSelected] = useState(false);
  const [answerFileChosen, setAnswerFileChosen] = useState({});
  const fileInputRefs = useRef({});
  const Navigate=useNavigate();
  const subjects = [
    'Python Programming',
    'Data Structures',
    'Computer Networks',
    'Database Management Systems',
    'Applied Mathematics',
    'Mobile Programming Practical',
  ];

  const getItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://localhost:8080/api', {
        params: { semester, subject, year },
      });
      setItems(res.data.items);
    } catch (error) {
      setError('Error fetching items');
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = async (id, fileName) => {
    const isLoggedIn = !!localStorage.getItem("token");
    if (!isLoggedIn) {
      alert("Please login first.");
      window.location.href = "/login";
      return; 
    }

    try {
      const res = await axios.get(`http://localhost:8080/api/download/${id}`, {
        responseType: "blob",
      });
      const blob = new Blob([res.data], { type: res.data.type });
      const defaultFileName = "quistion"; // Set a default file name here
      const downloadFileName = fileName ? fileName : defaultFileName; // Use default if fileName is undefined
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = downloadFileName;
      link.click();
      Navigate("/rate");
    } catch (error) {
      console.log(error);
    }
  };
  
  const downloadAnswerFile = async (id, fileName) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/download-answer/${id}`,
        { responseType: "blob" }
      );
      const blob = new Blob([res.data], { type: res.data.type });
      const defaultFileName = "answer"; // Set a default file name here
      const downloadFileName = fileName ? fileName : defaultFileName; // Use default if fileName is undefined
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = downloadFileName;
      link.click();
      Navigate("/rate");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubjectClick = (subj) => {
    setSubject(subj);
    setSubjectSelected(true);
  };

  const handleYearChange = (selectedYear) => {
    setYear(selectedYear);
  };

  const handleFileInputChange = (itemId, file) => {
    setAnswerFileChosen((prev) => ({ ...prev, [itemId]: file }));
  };

  const uploadAnswer = async (id) => {
  setLoading(true);
  setError(null);
  try {
    const file = answerFileChosen[id];

    if (!file) {
      setError("Please select a file for the answer");
      setLoading(false);
      return;
    }
    const fileExtension = file.name.split(".").pop().toLowerCase();

    // Allowed file types
    const allowedFileTypes = ["jpg", "jpeg", "pdf"];


    // Check if the selected file type is allowed
    if (!allowedFileTypes.includes(fileExtension)) {
      setError("Only JPG, JPEG, and PDF files are allowed");
      setLoading(false);
      alert("Only JPG, JPEG, and PDFafiles are allowed");
      return;
    }

    const formData = new FormData();
    formData.append("answerFile", file);

    await axios.post(
      `http://localhost:8080/api/upload-answer/${id}`,
      formData
    );

    fileInputRefs.current[id].value = null;
    setAnswerFileChosen((prev) => ({ ...prev, [id]: null })); 
    getItems();
  
  } catch (error) {
    setError("Error uploading answer");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    getItems();
  }, [semester, subject, year]);


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
        </div>
      <div className="hii">
        <Navbar />
      </div>
      <div style={{ overflowY: 'auto', maxHeight: '600px' }}>
        <h1 className="flex flex-row justify-center mt-10 font-bold text-[#ffff] text-[30px]">
          BSc IT Semester III
        </h1>
        <div className="hello2 font-bold text-[#ffff]">
          {subjectSelected ? (
            <div className={`selected-subject-box`}>{subject}</div>
          ) : (
            subjects.map((subj) => (
              <div
                key={subj}
                className={`subject-box ${subject === subj ? 'selected' : ''}`}
                onClick={() => handleSubjectClick(subj)}
              >
                {subj}
              </div>
            ))
          )}
        </div>
        <div>
          {loading && <p>Loading...</p>}
       
          <div className="itemContainer text-[#ffff] my-auto" >
            {subjectSelected &&
              items
                .filter((item) => subject === "" || item.subject === subject)
                .map((item) => (
                  <div className="item1" key={item._id}>
                    <div className="itemBox1">
                      <h3>
                        {item.semester} {item.subject} ({item.year})
                      </h3>
                      <div className="buttonContainer flex flex-row lg:w-[180px] lg:mr-[10rem] lg:gap-10 ">
                        <div className="flex flex-row lg:w-full lg:gap-5 ">
                        {item.answerFile ? (
    <div className="flex items-center">
      <button
        onClick={() => downloadAnswerFile(item._id)}
        className="flex items-center"
      >
        <span className="mr-2">Answer:</span>
        <img src={download} alt="Download" />
      </button>
    </div>
                          ) : (
                            <div className="const flex flex-row lg:gap-5 ">
                              {answerFileChosen[item._id] ? (
                                <button
                                  onClick={() => uploadAnswer(item._id)}
                                  disabled={loading}
                                  className="bg-[#d84914] text-[11px] px-2  rounded-md"
                                >
                                  {loading ? "Uploading..." : "Upload"}
                                </button>
                              ) : (
                                <>
                                  <input
                                    type="file"
                                    id={`answerFileInput-${item._id}`}
                                    ref={(ref) =>
                                      (fileInputRefs.current[item._id] = ref)
                                    }
                                    style={{ display: "none" }}
                                    onChange={(e) =>
                                      handleFileInputChange(
                                        item._id,
                                        e.target.files[0]
                                      )
                                    }
                                  />
                                  <label
                                    htmlFor={`answerFileInput-${item._id}`}
                                    className="w-[8rem] flex flex-col justify-center"
                                  >
                                    <button
                                      onClick={() =>
                                        fileInputRefs.current[
                                          item._id
                                        ].click()
                                      }
                                      disabled={loading}
                                      className="choose text-[10px] "
                                    >
                                      <p className="w-full flex flex-col justify-center mt-[1.5px]">
                                        Choose File
                                      </p>
                                    </button>
                                  </label>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center ">
                          <button
                            onClick={() =>
                              downloadFile(item._id, item.fileName)
                            }
                            className="flex items-center"
                          >
                            <span className="mr-2">Question:</span>
                            <img src={download} alt="Download" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
      <div className="h-[48rem]"> </div>
    </div>
  );
}

export default Sem3;
