import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Créer un thunk pour la connexion utilisateur
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/login', loginData);

      if (response.ok) {
        localStorage.setItem('token', response.data.token);  // Stocke le token dans le localStorage
        return response.data;
      } 
      
    } catch (error) {
      // Si une erreur survient, rejeter la promesse avec le message d'erreur
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userName: '',
    token: '',
    isConnected: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // si la connexion est réussie
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.token = action.payload.token;
      state.isConnected= true;
      state.error = null;
    });
    
    // si erreur lors de la connexion
    builder.addCase(loginUser.rejected, (state, action) => {

    });
  },
  },
);

export default userSlice.reducer;
