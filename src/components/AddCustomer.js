import React, { useState } from 'react';
import { addCustomer } from '../services/customerService';
import { useNavigate } from 'react-router-dom';
import '../CSS/AddCustomer.css';
const AddCustomer = () => {
  const [customer, setCustomer] = useState({ name: '', email: '', address: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCustomer(customer);
    navigate('/');
  };

  return (
    <div className="add-customer-container"> 
      <form onSubmit={handleSubmit}>
        <h2>Add New Customer</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={customer.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={customer.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={customer.address}
          onChange={handleChange}
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddCustomer;
