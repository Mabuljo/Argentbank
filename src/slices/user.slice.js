import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { updateUserName } from './userUpdate.slice';

//Thunk pour vérifier et récupérer les infos utilisateur s'il y a un token stocké dans local/sessionStorage (gestion du rafraichissement de la page)
export const fetchUserByToken = createAsyncThunk(
  'user/fetchUserByToken',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (token) {
      try {
        const userResponse = await axios.get('http://localhost:3001/api/v1/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (userResponse.status === 200) {
          return {
            firstName: userResponse.data.body.firstName,
            lastName: userResponse.data.body.lastName,
            userName: userResponse.data.body.userName,
            token: token,
          };
        } else {
          return rejectWithValue("Impossible de récupérer les informations utilisateur.");
        }
      } catch (error) {
        return rejectWithValue(error.response?.data || "Erreur lors de la récupération des informations utilisateur.");
      }
    } else {
      return rejectWithValue("Aucun token trouvé.");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    firstName: '',
    lastName: '',
    userName: '',
    token: '',
    isConnected: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.firstName = '';
      state.lastName = '';
      state.userName = '';
      state.token = '';
      state.isConnected = false;
      sessionStorage.removeItem('token');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    // Si la récupération a réussi via le token
    builder.addCase(fetchUserByToken.fulfilled, (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.userName = action.payload.userName;
      state.token = action.payload.token;
      state.isConnected = true;
      state.error = null;
    })
    .addCase(fetchUserByToken.rejected, (state, action) => {
      state.isConnected = false;
      state.error = action.payload || 'Erreur lors du chargement des informations utilisateur';
    })
    
    // Met à jour le userName après l'action de mise à jour réussie
    .addCase(updateUserName.fulfilled, (state, action) => {
      state.userName = action.payload.userName; // Met à jour l'username après une modification réussie
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
