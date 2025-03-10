import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateCustomer } from '../services/customerService';
import '../CSS/AddCustomer.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerById } from '../features/customers/customerSlice';

const EditCustomer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [customer, setCustomer] = useState({ name: '', email: '', address: '' });
  console.log('customer state',customer);
  
  const navigate = useNavigate();
  const customerDetail = useSelector((state) => state.customers?.customer) || {};


  console.log('customer detail', customerDetail);



  useEffect(() => {
    dispatch(fetchCustomerById(id))
  }, [id, dispatch]);

  useEffect(() => {
    if (customerDetail) {
      setCustomer({
        name: customerDetail?.customer?.name || '',
        email: customerDetail?.customer?.email || '',
        // address: data.address || '',
      });
    }
  }, [customerDetail]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleEdit = ((id, data) => {
    console.log("handle edit  ", id, data)
    navigate(`/edit/${id}`);
    // dispatch(updateCustomerData(id,data));
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCustomer(id, customer);
      navigate('/');
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <div className="add-customer-container">
      <form onSubmit={handleSubmit}>
        <h2>Edit Customer</h2>
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
        {/* <input
          type="text"
          name="address"
          placeholder="Address"
          value={customer.address}
          onChange={handleChange}
          required
        /> */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditCustomer;
