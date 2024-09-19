import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Créer un thunk pour la connexion utilisateur
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/login', loginData);

      if (response.status === 200) {
        const token = response.data.body.token;

        if (token) {

          localStorage.setItem('token', token); // Stocker le token dans le localStorage

          // Deuxième appel pour obtenir les infos de l'utilisateur
          const userResponse = await axios.get('http://localhost:3001/api/v1/user/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (userResponse.status === 200) {
            // Si l'appel est réussi, retourne les informations de l'utilisateur
            return {
              firstName: userResponse.data.body.firstName,
              lastName: userResponse.data.body.lastName,
              email: userResponse.data.body.email,
              userName: userResponse.data.body.userName,
              token: token,  // Conserver le token dans le payload
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
  reducers: {
    logout: (state) =>{
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.userName = '';
      state.token = '';
      state.isConnected = false;
    },
  },
  extraReducers: (builder) => {
    // si la connexion "Thunk" est réussie
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.token = action.payload.token;
      state.isConnected= true;
      state.error = null;
    });
    
    // si erreur lors de la connexion "Thunk"
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isConnected= false;
      state.error = action.payload || 'Une erreur est survenue';
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
