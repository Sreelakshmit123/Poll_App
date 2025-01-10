import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDoc, onSnapshot } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';

function Home() {
  const navigate = useNavigate()
  const [polls, setPolls] = useState([]);
  const [openAccordion, setOpenAccordion] = useState(null); 
  const [selectedPoll, setSelectedPoll] = useState(null); 
  const [selectedOption, setSelectedOption] = useState(null); 
  const [showResults, setShowResults] = useState(false);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "polls Collection"), (snapshot) => {
      const fetchedPolls = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setPolls(fetchedPolls);
    });

    return () => unsubscribe(); 
  }, []);




  const handleVote = async () => {
    if (!selectedPoll || selectedOption === null) {
      alert("Please select an option to vote!");
      return;
    }

    try {
      const pollDoc = doc(db, "polls Collection", selectedPoll);
      const pollSnapshot = await getDoc(pollDoc);
      const poll = pollSnapshot.data();

      const updatedOptions = [...poll.options];
      updatedOptions[selectedOption].votes += 1;

      await updateDoc(pollDoc, { options: updatedOptions });

      console.log("Vote successfully updated!");
      setShowResults(true); 
    } catch (error) {
      console.error("Error updating votes:", error);
    }
  };


  const handleLogout = async () => {
    try {
      await auth.signOut();
      setTimeout(() => {
        navigate('/')
      }, 3000);
      toast.success("user Logged Out successfully")
    } catch (error) {
      toast.warning(error.message)
    }
  }
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  return (



    <>
      <div style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundColor: 'rgb(33, 42, 111)', backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/035/442/418/non_2x/abstract-monochrome-transparent-background-with-grey-chevron-landing-page-template-free-png.png')`, color: 'white', paddingBottom: '130px' }}>
        <Container>
          <Navbar.Brand></Navbar.Brand>
          <Nav >
            <Button onClick={handleLogout} className='btn btn-danger ms-auto mt-5'>LogOut</Button>
          </Nav>
        </Container>

        <Container>

          <Row>
            <Col sm={8}>
              <div style={{ marginTop: "10px" }}>
                <h2 className='pt-2'>Polls</h2>
                <ul className='d-flex p-0 m-0'>
                  <ol className='ms-3'>#</ol>
                  <ol>Poll Title</ol>
                </ul>
                <Accordion>
                {polls.map((poll, index) => (
                  <Accordion.Item 
                  key={poll.id}
                  eventKey={index}
                  onClick={() => {
                    setOpenAccordion(openAccordion === index ? null : index);
                  }}>                  
                      <div >
                        <Accordion.Header>
                          <div className='d-flex text-dark  p-0 m-0 '>
                            <ul className='m-0 p-0' key={index}>
                              <ol className='text-dark'>{index + 1}</ol>
                            </ul>
                            <h5 className='text-dark ms-4'>{poll.title}  <p className='text-danger fs-6'>Created At: {formatTimestamp(poll.createdAt)}</p></h5>
                            <ol><p className='border bg-success text-light rounded-1 p-1 '>active</p></ol>
                          </div>
                        </Accordion.Header>
                        {showResults && selectedPoll === poll.id ? (
                          <ul className='text-dark ms-5 mt-2'>
                            {poll.options.map((option, index) => (
                              <li key={index}>
                                {option.label} <span className='vote'>- Votes: {option.votes}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <Accordion.Body >
                            <div >
                              {poll.options.map((option, index) => (
                                <div key={index} className="mb-2 d-flex ms-4">
                                  <input style={{ height: '25px', width: '25px' }}
                                    type="radio"
                                    name={`poll-${poll.id}`}
                                    value={index}
                                    checked={selectedPoll === poll.id && selectedOption === index}
                                    onChange={() => {
                                      setSelectedPoll(poll.id);
                                      setSelectedOption(index);
                                    }}
                                  />
                                  <label className="ms-3 text-dark">{option.label}</label>
                                </div>
                              ))}
                              {selectedPoll === poll.id && (

                                <button onClick={handleVote} style={{ backgroundColor: 'rgb(28, 49, 210)' }} className='btn text-light ms-5 mt-5 ps-4 pe-4'>Vote <i className="fa-solid fa-arrow-right ps-2"></i></button>
                              )}
                            </div>
                          </Accordion.Body>
                        )}
                      </div>
                      </Accordion.Item>
                    ))}
                  
                </Accordion>
              </div>
            </Col>
            <Col sm={4} className='mt-5 pt-5'>
              <div style={{ marginTop: "10px" }}>
                <img className='w-100 h-100' src="https://images.squarespace-cdn.com/content/v1/592de4f49f7456c659b05f4f/1613534500137-ND9QS0EA35EV9EO3Z72V/Questionnaires" alt="" />
                <Link to={'/pollsform'}>     <Button style={{ paddingLeft: '155px', paddingRight: '158px' }} className='mt-2 btn-warning text-dark fw-bolder'><i class="fa-solid fa-plus"></i> Create Poll</Button></Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer autoClose={3000} theme='colored' />

    </>
  )
}

export default Home