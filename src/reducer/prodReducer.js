import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';

// Async thunk to handle product addition
export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3000/api/add-product', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            Swal.fire({
                icon: 'success',
                title: 'Good job!',
                text: 'Product added successfully!',
            });

            return response.data; // Return the data for fulfilled state
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response?.data?.message || 'Something went wrong!',
            });

            return rejectWithValue(err.response.data); // Return error for rejected state
        }
    }
);

// Async thunk to handle fetching all products
export const getAllProduct = createAsyncThunk(
    'product/getAllProduct',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:3000/api/getAllProduct');
            return response.data; // Return the data for fulfilled state
        } catch (err) {
            return rejectWithValue(err.response.data); // Return error for rejected state
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: [], // Initialize as an empty array
        error: null,
        loading: false
    },
    reducers: {
        // Define regular synchronous reducers if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                // Assuming the payload from addProduct is the added product
                state.product = [...state.product, action.payload]; // Add the new product to the list
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Store the error message
            })
            .addCase(getAllProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload; // Replace the product list with the fetched data
            })
            .addCase(getAllProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Store the error message
            });
    }
});

export default productSlice.reducer;
