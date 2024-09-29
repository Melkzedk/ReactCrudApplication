import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Log to check if request returns the right data
    axios.get(`http://localhost:3001/getUser/${id}`)
      .then(result => {
        console.log(result.data);  // Log the response data
        const user = result.data;
        setName(user.name);
        setEmail(user.email);
        setAge(user.age);
      })
      .catch(error => console.log(error));
  }, []);

  const Update = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/updateUser/${id}`, { name, email, age })
      .then((result) => {
        console.log(result.data);  // Log the result after update
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
        navigate('/');  // Redirect after update
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="w-50 bg-white rounded p-4">
        <h2 className="mb-4">Update User</h2>
        <form onSubmit={Update}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              id="age"
              name="age"
              placeholder="Enter age"
              value={age}
              required
              onChange={(e) => setAge(e.target.value)} 
            />
          </div>
          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
