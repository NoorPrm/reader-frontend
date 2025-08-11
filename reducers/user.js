import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    token: null,
    username: null,
    email: null,
    statut: null,
    profilPicture: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
      state.value.statut = action.payload.statut;
      state.value.profilPicture = action.payload.profilPicture;
    },
  }
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
