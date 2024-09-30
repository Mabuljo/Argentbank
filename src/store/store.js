import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/user.slice";
import loginReducer from "../slices/login.slice"
import userUpdateReducer from "../slices/userUpdate.slice"

export default configureStore({
  reducer: {
    userLogin: loginReducer,
    user: userReducer,
    userUpdate: userUpdateReducer,
  },
});
