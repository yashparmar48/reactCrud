import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCustomers, addCustomer, deleteCustomer,updateCustomer, fetchCustomerDetail } from '../../services/customerService';

export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
  const response = await getCustomers();
  return response;
});

export const createCustomer = createAsyncThunk('customers/createCustomer', async (customer) => {
  const response = await addCustomer(customer);
  return response.data;
});

export const removeCustomer = createAsyncThunk('customers/removeCustomer', async (id) => {
  await deleteCustomer(id);
  return id;
});
export const updateCustomerData = createAsyncThunk('customers/updateCustomer', async (id, data) => {
  await updateCustomer(id,data);
  return id;
});
export const fetchCustomerById = createAsyncThunk('customers/fetchCustomerById', async (id) => {
  const response = await fetchCustomerDetail(id);
  return response.data
});

const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    customers: {},
    customer:{},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succedeed';
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.customers.push(action.payload);
      })
      .addCase(removeCustomer.fulfilled, (state, action) => {
        const actualCustomers = [...state?.customers?.data];
        state.customers.data = actualCustomers?.filter((customer) => customer._id !== action.payload);
      })
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        state.status = 'succedeed';
        state.customer = action.payload
      });
  },
});

export default customerSlice.reducer;
