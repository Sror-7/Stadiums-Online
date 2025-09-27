import { createSlice } from "@reduxjs/toolkit";
import {
  handleAddNewPerson,
  handleUpdatePerson,
  handleGetPersonInfoByID,
} from "./personReducer";
const personSlice = createSlice({
  initialState: {
    value: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    handleAddNewPerson(builder);
    handleUpdatePerson(builder);
    handleGetPersonInfoByID(builder);
  },
});

export const {} = personSlice.actions;
export default personSlice.reducer;
