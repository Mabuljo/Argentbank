import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
      user: '',
      token: ''
    },
    reducers :{}
})

export default userSlice.reducer;