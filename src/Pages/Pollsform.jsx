import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
function Pollsform() {
  
  const navigate = useNavigate()
  const [pollsData, setpollsData] = useState({
    id: "",
    title: "",
    options: [],
    createdAt: ""
  });

  console.log(pollsData);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const timestamp = new Date().toISOString();
      const docRef = await addDoc(collection(db, "polls Collection"), {
        title: pollsData.title,
        options: pollsData.options,
        createdAt: timestamp
      });
      console.log("Poll created with ID:", docRef.id);

      // Reset the form
      setpollsData({
        id: "",
        title: "",
        options: [],
        createdAt: ""
      });
      toast.success("Poll created successfully...");
      setTimeout(() => {
        navigate('/home')
      }, 3000);
    } catch (error) {
      console.error("Error in created poll:", error);
      toast.warning("Error in created poll:", error)
    }
  };







  const [optionInput, setoptionInput] = useState('');//for options
  const handleAddOption = () => {
    if (optionInput.trim() !== '') {
      setpollsData(prevPoll => ({
        ...prevPoll,
        options: [...prevPoll.options, { label: optionInput.trim(), votes: 0 }]
      }));
      setoptionInput('');
    } else {
      console.error(Error);

    }
  };

  const handleDeleteoption = (index) => {
    const newoptions = [...pollsData.options];
    newoptions.splice(index, 1);
    setpollsData(prevPoll => ({
      ...prevPoll,
      options: newoptions
    }));
  };

  const handleOptionChange = (index, value) => {
    const newoptions = [...pollsData.options];
    newoptions[index] = value;
    setpollsData(prevPoll => ({
      ...prevPoll,
      options: newoptions
    }));
  };

  return (
    <>
      <div style={{ height: '100vh', width: '100%', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundColor: 'rgb(33, 42, 111)', backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/035/442/424/non_2x/abstract-monochrome-mosaic-template-with-grey-chevron-transparent-free-png.png')`, color: 'white' }}>
        <div className='text-center ps-5 pe-5'>
          <h1 className='pt-2'>Create a Poll</h1>
          <p className='text-secondary'>Complete the below fields to create your poll.</p>
          <Link to="/home" className='d-flex justify-content-start fw-bolder '><p> <i class="fa-solid fa-arrow-left"></i>  Back to ActivePolls</p> </Link>
          <div className="container border-top rounded-4 w-75 h-75 pt-5 pb-4 ps-5 pe-5 text-dark bg-light">
            <h6 className='text-start'>Poll Title</h6>
            <Form.Control
              type="text"
              id="text"
              aria-describedby="TextHelpBlock"
              placeholder='Type your question here'
              value={pollsData.title}
              onChange={e => setpollsData({ ...pollsData, title: e.target.value })}
            />
            <br />
            <h6 className='text-start'>Answer Options</h6>

            {pollsData.options.map((option, index) => (
              <div className='mb-3 d-flex' key={index}>
                <input
                  type="text"
                  className='form-control'
                  placeholder={`option ${index + 1}`}
                  value={option.label}
                  onChange={e => handleOptionChange(index, e.target.value)}
                  required
                />

                <Button variant="warning ms-3" onClick={() => handleDeleteoption(index)}>
                  <i className="fa-solid fa-xmark text-dark"></i>
                </Button>
              </div>

            ))}

            <div className='mb-3 d-flex'>
              <input
                type="text"
                className='form-control'
                placeholder={`Option ${pollsData.options.length + 1}`}
                value={optionInput}
                onChange={e => setoptionInput(e.target.value)}
              />
            </div>
            <Button onClick={handleAddOption} className='d-flex justify-content-start' variant="warning pt-2 pb-2 ps-3 pe-3" > <i class="fa-solid fa-plus me-1 mt-1"></i>  Add Options  </Button>
            <br />
            <Button onClick={handleSubmit} className='d-flex justify-content-start' variant="success  pt-2 pb-2 ps-5 pe-5 mt-3" > Create Poll  </Button>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={3000} theme='colored' />
    </>
  )
}

export default Pollsform