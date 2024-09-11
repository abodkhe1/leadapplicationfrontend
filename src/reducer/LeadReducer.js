import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';

// Async thunks
export const addLead = createAsyncThunk(
    'Lead/addLead',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3000/api/saveLead', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            Swal.fire({
                icon: 'success',
                title: 'Good job!',
                text: 'Lead added successfully!',
            });

            return response.data;
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response?.data?.message || 'Something went wrong!',
            });

            return rejectWithValue(err.response?.data || 'An error occurred');
        }
    }
);

export const updateLead = createAsyncThunk(
    'Lead/updateLead',
    async ({ data, updateid }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/updateLead/${updateid}`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            Swal.fire({
                icon: 'success',
                title: 'Good job!',
                text: 'Lead updated successfully!',
            });

            return response.data;
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response?.data?.message || 'Something went wrong!',
            });

            return rejectWithValue(err.response?.data || 'An error occurred');
        }
    }
);

export const getAll = createAsyncThunk(
    'Lead/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:3000/api/findAll');
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || 'An error occurred');
        }
    }
);

export const getSingleLead = createAsyncThunk(
    'Lead/getSingleLead',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/findOne/${id}`);
            // console.log(response.data);
            
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || 'An error occurred');
        }
    }
);

export const deleteLead = createAsyncThunk(
    'Lead/deleteLead',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`http://localhost:3000/api/deleteOne/${id}`);
            Swal.fire({
                icon: 'success',
                title: 'Good job!',
                text: 'Lead deleted successfully!',
            });
            return id; // Return the ID of the deleted lead
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response?.data?.message || 'Something went wrong!',
            });
            return rejectWithValue(err.response?.data || 'An error occurred');
        }
    }
);


// Lead slice
const LeadSlice = createSlice({
    name: 'Lead',
    initialState: {
        Lead: [], // Initialize as an empty array to hold leads
        singleLead: null, // Initialize as null
        error: null,
        loading: false
      },
      
    extraReducers: (builder) => {
        builder
            // Handle adding a lead
            .addCase(addLead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addLead.fulfilled, (state, action) => {
                state.loading = false;
                state.Lead = [...state.Lead, action.payload];
            })
            .addCase(addLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Handle fetching all leads
            .addCase(getAll.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.loading = false;
                state.Lead = action.payload;
            })
            .addCase(getAll.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Handle fetching a single lead
            .addCase(getSingleLead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSingleLead.fulfilled, (state, action) => {
                state.loading = false;
                state.singleLead = action.payload; // Store single lead separately
            })
              
            .addCase(getSingleLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Handle updating a lead
            .addCase(updateLead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateLead.fulfilled, (state, action) => {
                state.loading = false;
                // Update the lead in the array
                state.Lead = state.Lead.map(lead =>
                    lead._id === action.payload._id ? action.payload : lead
                );
            })
            .addCase(updateLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Handle deleting a lead
            .addCase(deleteLead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteLead.fulfilled, (state, action) => {
                state.loading = false;
                state.Lead = state.Lead.data.filter(lead => lead._id !== action.payload);
            })
            .addCase(deleteLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
            

    }
});

export default LeadSlice.reducer;
