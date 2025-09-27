import { createSlice } from "@reduxjs/toolkit";
import { handleNewUserReducers } from "./userReducer";
import { handleGetUserInfoByID } from "./userReducer";
import { handleGetUserInfoByUsernameAndPassowrd } from "./userReducer";
const userSlice = createSlice({
  name: "users",
  initialState: {
    value: [],
    currentUserInfo: [],
    isUserLogged: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    handleNewUserReducers(builder);
    handleGetUserInfoByID(builder);
    handleGetUserInfoByUsernameAndPassowrd(builder);
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
