import axios from 'axios';

const API_URL = 'http://3.91.213.221:5000/api/customers';
// const API_URL = 'http://localhost:5000/api/customers';

// export const getCustomers = () => axios.get(`${API_URL}/getCustomers`)

export const getCustomers = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/getCustomers`);
      return data;
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw error;
    }
  };
  
export const addCustomer = (customer) => axios.post(`${API_URL}/addCustomer`, customer);
export const fetchCustomerDetail = (id) => axios.get(`${API_URL}/${id}`);
export const updateCustomer = (id, customer) => axios.put(`${API_URL}/updateCustomer/${id}`, customer);
export const deleteCustomer = (id) => axios.post(`${API_URL}/removeCustomer/${id}`);


