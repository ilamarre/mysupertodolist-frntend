import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { pseudo: null, password: null, token: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      
      state.value.pseudo = action.payload.pseudo;
      state.value.password = action.payload.password
      state.value.token = action.payload.token; // Ajoute le token
     },
     logout: (state) => {
    
       state.value.pseudo = null;
       state.value.password = null;
       state.value.token = null; // Supprime le token token
     },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
