import React, { useState, useEffect, useRef } from "react";
import "../styles/Upload.css";
import axios from "axios";
import heroImage from '../assets/bubble.png';
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Upload = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const fileInputRefQuestion = useRef(null); 
  const fileInputRefAnswer = useRef(null); 
  const [answerFileChosen, setAnswerFileChosen] = useState(false);
  const fileInputRefs = useRef({});
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");

 const Navigate=useNavigate();
  const semesterSubjects = {
    "1stSem": [
      "Imperative Programming",
      "Digital Electronics",
      "Operating Systems",
      "Discrete Mathematics",
      "Ability Enhancement Skill",
      "Communication Skills",
    ],
    "2ndSem": [
      "Object-oriented Programming",
      "Microprocessor Architecture",
      "Web Programming",
      "Numerical and Statistical Methods",
      "Ability Enhancement Skill",
      "Green Computing",
    ],
    "3rdSem": [
      "Python Programming",
      "Data Structures",
      "Computer Networks",
      "Database Management Systems",
      "Applied Mathematics",
      "Mobile Programming Practical",
    ],
    "4thSem": [
      "Introduction to Embedded Systems",
      "Computer-Oriented Statistical Techniques",
      "Software Engineering",
      "Computer Graphics and Animation",
      "Computer Graphics and Animation",
      "Core Java Practical",
    ],
    "5thSem": [
      "Network Security",
      "Asp.Net",
      "Software Testing",
      "Advanced Java",
      "Linux Administration",
    ],
    "6thSem": [
      "Business intelligence",
      "software quality asurance",
      "Information Technology service management",
      "security in computing",
      "Cyber laws",
      "Geographic Informations Systems",
    ],
    
  };

  
  const subjectOptions = semesterSubjects[semester] || [];

  const getItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:8080/api");
      setItems(res.data.items);
    } catch (error) {
      setError("Error fetching items");
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    // Get the selected file
    const file = fileInputRefQuestion.current.files[0];
  
    // Check if a file is selected
    if (!file) {
      setError("Please select a file");
      setLoading(false);
      return;
    }
  
    // Get the file extension
    const fileExtension = file.name.split(".").pop().toLowerCase();
  
    // Allowed file types
    const allowedFileTypes = ["jpg", "jpeg", "pdf"];
  
    // Check if the selected file type is allowed
    if (!allowedFileTypes.includes(fileExtension)) {
      setError("Only JPG, JPEG, and PDF files are allowed");
      setLoading(false);
      alert("Only JPG, JPEG, and PDF files are allowed");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("semester", semester);
      formData.append("subject", subject);
      formData.append("year", year);
  
      await axios.post("http://localhost:8080/api/upload-file", formData);
  
      fileInputRefQuestion.current.value = null;
      getItems(); // Refresh the items list after adding
    } catch (error) {
      setError("Error adding item");
    } finally {
      setLoading(false);
    }
  };
  

  const downloadFile = async (id, fileName) => {
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
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleFileInputChange = (itemId, file) => {
    setAnswerFileChosen((prev) => ({ ...prev, [itemId]: file }));
  };

  const uploadAnswer = async (id) => {
    setLoading(true);
    setError(null);
    // const fileExtension = file.name.split(".").pop().toLowerCase();

    // // Allowed file types
    // const allowedFileTypes = ["jpg", "jpeg", "pdf"];

    // // Check if the selected file type is allowed
    // if (!allowedFileTypes.includes(fileExtension)) {
    //   setError("Only JPG, JPEG, and PDF files are allowed");
    //   setLoading(false);
    //   alert("Only JPG, JPEG, and PDF files are allowed");
    //   return;
    // }
    try {
      const file = answerFileChosen[id];

      if (!file) {
        setError('Please select a file for the answer');
        setLoading(false);
        return;
      }
      const fileExtension = file.name.split(".").pop().toLowerCase();

      // Allowed file types
      const allowedFileTypes = ["jpg", "jpeg", "pdf","word"];
  
      // Check if the selected file type is allowed
      if (!allowedFileTypes.includes(fileExtension)) {
        setError("Only JPG, JPEG, and PDF files are allowed");
        setLoading(false);
        alert("Only JPG, JPEG, and PDF files are allowed");
        return;
      }
      const formData = new FormData();
      formData.append('answerFile', file);

      await axios.post(`http://localhost:8080/api/upload-answer/${id}`, formData);

      fileInputRefs.current[id].value = null;
      setAnswerFileChosen((prev) => ({ ...prev, [id]: null }));
      getItems();
    } catch (error) {
      setError('Error uploading answer');
    } finally {
      setLoading(false);
    }
  };
const handleFeedback = async () =>{
Navigate("/feedback");
};
  useEffect(() => {
    getItems();
  }, []);
  return (
    <div className='feedback-wrapper'>
      {" "}
      <Navbar />

      <button className="feedback-button" onClick={handleFeedback}>
      Feedback
    </button>
      <div className="app">
        <div className="addItems">
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="h-10"
          >
            <option value="">Select Semester</option>
            <option value="1stSem">1st Semester</option>
            <option value="2ndSem">2nd Semester</option>
            <option value="3rdSem">3rd Semester</option>
            <option value="4thSem">4th Semester</option>
            <option value="5thSem">5th Semester</option>
            <option value="6thSem">6th Semester</option>
           
          </select>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="h-10"
          >
            <option value="">Select Subject</option>
            {subjectOptions.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="h-10"
          >
            <option value="">Select Year</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            
          </select>

          <input type="file" className="w-10" ref={fileInputRefQuestion} />
          <button className="addButton" onClick={addItem} disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
     
        <div className="items-container">
          <div className="items">
            {loading ? (
              <p>Loading...</p>
            ) : items.length ? (
              items.map((item) => (
                <div className="item" key={item._id}>
                  <div className="itemBox">
                    <h3>{item.semester}</h3>
                    <div className="flex items-center ">
                    <h3 className="flex items-center justify-center">{item.subject}</h3> </div>
                    <h3>{item.year}</h3>

                    <button
                      onClick={() => downloadFile(item._id, item.fileName)}
                    >
                      Download File
                    </button>
                    
                    {item.answerFile ? (
                     <button onClick={() => downloadAnswerFile(item._id, item.answerFileName)}>
                     Download Answer File
                   </button>
                   
                    ) : (
                      <div>
                        {answerFileChosen[item._id] ? (
                          <button onClick={() => uploadAnswer(item._id)} disabled={loading}>
                            {loading ? 'Uploading...' : 'Upload Answer'}
                          </button>
                        ) : (
                          <>
                            <input
                              type="file"
                              id={`answerFileInput-${item._id}`}
                              ref={(ref) => (fileInputRefs.current[item._id] = ref)}
                              style={{ display: 'none' }}
                              onChange={(e) => handleFileInputChange(item._id, e.target.files[0])}
                            />
                            <label htmlFor={`answerFileInput-${item._id}`}>
                              <button onClick={() => fileInputRefs.current[item._id].click()} disabled={loading}
                              className="choose ml-2">
                                Choose File
                              </button>
                            </label>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No items available</p>
            )}
       
                     </div>
          <div className="colorfulElements"></div>
          <div className="colorfulElements"></div>
          <div className="colorfulElements"></div>
        </div>
      </div>
      <div className="h-[48rem]"> </div>
    </div>
  );
};

export default Upload;
