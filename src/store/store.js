import { configureStore } from '@reduxjs/toolkit'
import prodReducer from '../reducer/prodReducer';
import LeadReducer from '../reducer/LeadReducer';



const store = configureStore({
    reducer: {
        Product: prodReducer,
        Lead: LeadReducer
    }
})

export default store;