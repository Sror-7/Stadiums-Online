import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AddNewPersonAPI,
  UpdatePersonAPI,
  updatePersonImageAPI,
  getPersonInfoByIDAPI,
} from "../../api/personAPI";
export const AddNewPerson = createAsyncThunk(
  "person/addNewPerson",
  async (personData, thunkAPI) => {
    try {
      console.log("test thunk", personData);
      const response = await AddNewPersonAPI(personData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updatePersonInfo = createAsyncThunk(
  "person/updatePersonInfo",
  async ({ id, patchData }, thunkAPI) => {
    try {
      const res = await UpdatePersonAPI({ id, patchData });
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Update failed");
    }
  }
);
export const updatePersonImage = createAsyncThunk(
  "person/updatePersonImage",
  async ({ id, imageFile }, thunkAPI) => {
    try {
      const res = await updatePersonImageAPI({ id, imageFile });
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Update failed");
    }
  }
);
export const getPersonInfoByID = createAsyncThunk(
  "person/getPersonInfo",
  async (personID, thunkAPI) => {
    try {
      const response = await getPersonInfoByIDAPI(personID);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
