import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

function App() {
  const [submissions, setSubmissions] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState(null);
  const [uploadedResume, setUploadedResume] = useState(null);

  useEffect(() => {
    axios.get('/api/submissions')
      .then(response => {
        setSubmissions(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResumeChange = (event) => {
    setResume(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('resume', resume);

    axios.post('/api/submissions', formData)
      .then(response => {
        setUploadedResume(response.data.resume);
        setSubmissions([...submissions, response.data]);
        setName('');
        setEmail('');
        setResume(null);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Resume Submission and Display</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Resume:
          <input type="file" accept=".pdf" onChange={handleResumeChange} />
        </label>
        <br />
        <Button type="submit">Submit</Button>
      </form>
      <h2>Submissions</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Resume</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr key={index}>
              <td>{submission.name}</td>
              <td>{submission.email}</td>
              <td>
                <a href={submission.resume} target="_blank" rel="noopener noreferrer">
                  View Resume
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;