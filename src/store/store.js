import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/usersReducer'
export const store = configureStore({
  reducer: {
    User: userReducer,
  },
})