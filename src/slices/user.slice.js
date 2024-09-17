import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Créer un thunk pour la connexion utilisateur
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/login', loginData);
      console.log("Response data:", response.data);

      if (response.status === 200) {
        const token = response.data.body.token;
        if (token) {
          localStorage.setItem('token', token);
          return response.data.body;
        } else {
          return rejectWithValue('Token not found in response');
        }
      } else {
        return rejectWithValue('Invalid login credentials');
      }
    } catch (error) {
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
      state.isConnected= false;
      state.error = action.payload || 'An error occurred';
    });
  },
  },
);

export default userSlice.reducer;
