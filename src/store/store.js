import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/user.slice";
import loginReducer from "../slices/login.slice"

export default configureStore({
  reducer: {
    userLogin: loginReducer,
    user: userReducer,
  },
});
