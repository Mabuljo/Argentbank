import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk pour mettre à jour l'userName de l'utilisateur via l'API
export const updateUserName = createAsyncThunk(
  "userUpdate/updateUserName",
  async ({ newUserName }, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.token; // Récupérer le token depuis User slice
      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        {userName: newUserName }, // Remplacer userName par newUserName
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.body;

    } catch (error) {
      return rejectWithValue(error.response?.data || 'Une erreur est survenue');
    }
  }
);

const userUpdateSlice = createSlice({
  name: "userUpdate",
  initialState: {
    updateSuccess: false,
    updateError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(updateUserName.fulfilled, (state) => {
      state.updateSuccess = true; // Indique que la mise à jour a réussi
      state.updateError = null;
    })
    .addCase(updateUserName.rejected, (state, action) => {
        state.updateError = action.error.message;
    });
},
});

export default userUpdateSlice.reducer;