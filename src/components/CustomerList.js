import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers, removeCustomer } from '../features/customers/customerSlice';
import { useNavigate } from 'react-router-dom';
import '../CSS/AddCustomer.css';

const CustomerList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const customers = useSelector((state) => state.customers.customers);
  const status = useSelector((state) => state.customers.status);
  const error = useSelector((state) => state.customers.error);


  console.log('customers',customers);
  

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);


  const filteredCustomers = customers?.customers?.filter((customer) =>
    customer?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
    customer?.email?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
    customer?.address?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  console.log('filteredCustomers',filteredCustomers);
  

  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this customer?');
    if (confirmed) {
      dispatch(removeCustomer(id));
    }
  };

  const handleEdit = (id, data) => {
    navigate(`/edit/${id}`);
  };

  if (status === 'loading') {
    return (
      <div className="customer-list-container">
        <h2>Customer List</h2>
        <table className="customer-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                Loading...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="customer-list-container">
      <h2>Customer List</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, email, or address"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <button
        className="add-customer-button"
        onClick={() => navigate('/add')}
      >
        Add New Customer
      </button>
      <table className="customer-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers?.length > 0 ? (
            filteredCustomers?.map((customer, index) => (
              <tr key={customer._id}>
                <td>{index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.address}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(customer._id, customer)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(customer._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">
                No customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
