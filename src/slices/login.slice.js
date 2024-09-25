import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Thunk pour gérer la connexion utilisateur
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ loginData, rememberMe }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/login', loginData);

      if (response.status === 200) {
        const token = response.data.body.token;

        if (token) {
          // Stocker le token en fonction de l'option Remember Me
          if (rememberMe) {
            localStorage.setItem('token', token);
          } else {
            sessionStorage.setItem('token', token);
          }

          const userResponse = await axios.get('http://localhost:3001/api/v1/user/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (userResponse.status === 200) {
            return {
             firstName: userResponse.data.body.firstName,
              lastName: userResponse.data.body.lastName,
              email: userResponse.data.body.email,
              userName: userResponse.data.body.userName,
              token: token,
            };
          } else {
            return rejectWithValue("Impossible de récupérer les infos de l'utilisateur");
          }
        } else {
          return rejectWithValue("Token non trouvé");
        }
      } else {
        return rejectWithValue("Identifiants de connexion invalides");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Une erreur est survenue');
    }
  }
);

export const loginSlice = createSlice({
    name: "userlogin",
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
    extraReducers: (builder) => {
      // Si la connexion est réussie
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.email = action.payload.email;
        state.userName = action.payload.userName;
        state.token = action.payload.token;
        state.isConnected = true;
        state.error = null;
      });
      builder.addCase(loginUser.rejected, (state, action) => {
        state.isConnected = false;
        state.error = action.payload || 'Une erreur est survenue';
      });
    },
});

export default loginSlice.reducer;