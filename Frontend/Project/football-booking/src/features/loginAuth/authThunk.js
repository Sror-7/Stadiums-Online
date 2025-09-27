import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginAPI, SignInAPI } from "../../api/authAPI";
export const login = createAsyncThunk(
  "auth/login",
  async ({ identifier, password }, thunkAPI) => {
    try {
      const response = await LoginAPI({ identifier, password });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data, thunkAPI) => {
    try {
      const response = await SignInAPI(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
