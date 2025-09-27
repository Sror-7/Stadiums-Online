import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  UpdateUserAPI,
  ChangeUserPasswordAPI,
  getUserInfoByUsernameAndPasswordAPI,
  IsEmailAvailableAPI,
  fetchUserInfoByID,
  signInNewUser,
} from "../../api/userAPI";
import {
  IsUsernameAvailableAPI,
  IsPasswordCorrectAPI,
} from "../../api/userAPI";
export const addNewUser = createAsyncThunk(
  "user/addNewUser",
  async (userData, thunkAPI) => {
    try {
      const response = await signInNewUser(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getUserInfoByID = createAsyncThunk(
  "user/getUserInfo",
  async (thunkAPI) => {
    try {
      const response = await fetchUserInfoByID();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// export const getUserInfoByID = createAsyncThunk(
//   "user/getUserInfo",
//   async (userID, thunkAPI) => {
//     // console.log("id: ", userID);
//     try {
//       const response = await fetchUserInfoByID(userID);
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );
export const IsUsernameAvailable = createAsyncThunk(
  "user/getUserAvailablity",
  async ({ username, userid }, thunkAPI) => {
    try {
      const response = await IsUsernameAvailableAPI(username, userid);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const IsEmailAvailable = createAsyncThunk(
  "user/getUserAvailablity",
  async ({ email, userId }, thunkAPI) => {
    console.log("thunk email");
    try {
      const response = await IsEmailAvailableAPI(email, userId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const IsPassowrdCorrect = createAsyncThunk(
  "user/checkPasswordIfCorrect",
  async ({ password }, thunkAPI) => {
    try {
      const response = await IsPasswordCorrectAPI({ password });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getUserInfoByUsernameAndPassword = createAsyncThunk(
  "user/getUserInfoByUsernameAndPassword",
  async ({ Username, Password }, thunkAPI) => {
    try {
      const response = await getUserInfoByUsernameAndPasswordAPI(
        Username,
        Password
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const UpdateUser = createAsyncThunk(
  "user/updateUser",
  async (data, thunkAPI) => {
    try {
      const res = await UpdateUserAPI(data);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Update failed");
    }
  }
);
export const ChangeUserPassword = createAsyncThunk(
  "user/changePassword",
  async ({ current, newPassword }, thunkAPI) => {
    try {
      const res = await ChangeUserPasswordAPI({ current, newPassword });
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Change failed");
    }
  }
);
