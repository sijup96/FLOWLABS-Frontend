import { combineReducers } from '@reduxjs/toolkit';
import companyReducer from './slices/companySlice'
// import authReducer from './features/auth/authSlice';


const rootReducer = combineReducers({
company:companyReducer,
});

export default rootReducer;
