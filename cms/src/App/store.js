import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../Features/authSlice'
import adminReducer from '../Features/adminSlice'
import courseReducer from '../Features/courseSlice'
import paymentReducer from '../Features/paymentSlice'

const store=configureStore({
    reducer:{
        auth:authReducer,
        admin:adminReducer,
        course:courseReducer,
        payment:paymentReducer
    }
})

export default store