import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
      user: null,
      token: null
    },
    reducers :{}
})

export default userSlice.reducer;