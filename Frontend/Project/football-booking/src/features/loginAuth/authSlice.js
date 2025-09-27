import { createSlice } from "@reduxjs/toolkit";
import { handleLogin } from "./authReducer";
const authSlice = createSlice({
  name: "auths",
  initialState: {
    loading: false,
    error: null,
    isUserLogged: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    handleLogin(builder);
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
