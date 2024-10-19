import { combineReducers } from '@reduxjs/toolkit';
import companyReducer from './slices/companySlice';

const rootReducer = combineReducers({
  company: companyReducer,
});

export default rootReducer;
