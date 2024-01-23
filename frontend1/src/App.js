import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const apiBaseUrl = 'http://localhost:5000/api';

const App = () => {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [isEdit, setIsEdit] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
  fetchData();
}, []);
  const fetchData = async () => {
    try {
      const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(`${apiBaseUrl}/getAllList`, options);
      if (response.ok) {
        const data = await response.json();
        console.log('Data from the response:', data);
        setData(data);
      } else {
        console.error('Error response:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleAddItem = async () => {
    if (validateData()) {
      const newItem = { firstName, lastName, email, phoneNumber};
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      };
      try {
        const response = await fetch(`${apiBaseUrl}/insertData`, options);
        if (response.ok) {
          fetchData()
        } else {
          console.error('Error response:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
      clearValue();
    }
  };
  
  const clearValue = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
  };

  const validateData = () => {
    if (firstName === '' || lastName === '' || email === '' || phoneNumber === '') {
      setErrorMessage('All fields are required.');
      return false;
    } else {
      setErrorMessage('');
      return true;
    }
  };

  const handleEditItem = (index) => {
    let editData = data[index] 
    setEditItem(index);
    setIsEdit('True');
    setFirstName(editData.firstName);
    setLastName(editData.lastName);
    setEmail(editData.email);
    setPhoneNumber(editData.phoneNumber);
  }

  const handleSaveEdit = async (index) => {
    if (validateData()) {
      var confirm = window.confirm("Do you want to proceed?");
      if (confirm) {
      let id = data[index]._id
      console.log('id',id);
      data[index] = { firstName, lastName, email, phoneNumber};
      const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data[index]),
      };
      try {
        const response = await fetch(`${apiBaseUrl}/${id}`, options);
        console.log(response);
        if (response.ok) {
          // const responseData = await response.json();
          // console.log(responseData);
          const updatedData = [...data];
          // updatedData[index] = responseData; 
          setData(updatedData);
        } else {
          console.error('Error response:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
      setIsEdit('false');
      setEditItem(null);
      clearValue();
    }
    }
  };

  const handleDeleteItem = async (index) => {
    var confirm = window.confirm("Do you want to proceed?");
    if (confirm) {
    let id = data[index]._id;
    const options = {
      method: 'DELETE',
    };
    try {
      const response = await fetch(`${apiBaseUrl}/delete/${id}`, options);
       fetchData();
      } catch (error) {
      console.error('Fetch error:', error);
    }
  }
  };
  
  return (
    <div className="app-container">
      <div>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></td>
              <td><input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} /></td>
              <td><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></td>
              <td><input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} /></td>
              <td>
                {isEdit === 'True' ? (<button  onClick={() => handleSaveEdit(editItem)}>Save</button>) : (<button onClick={handleAddItem}>Add Data</button>)}
                </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="table-container">
        <table className='table'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.phoneNumber}</td>
              <td>
                {editItem === index ? (
                  <button disabled onClick={() => handleEditItem(index)}>Edit</button>
                ) : (
                <button onClick={() => handleEditItem(index)}>Edit</button>)}                
                
                {editItem === index ? (
                  <button disabled onClick={() => handleDeleteItem(index)}>Delete</button>
                ) : (
                <button onClick={() => handleDeleteItem(index)}>Delete</button>)}     
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
      {errorMessage && <div className="error">{errorMessage}</div>}
      
    </div>
  );
};

export default App;
