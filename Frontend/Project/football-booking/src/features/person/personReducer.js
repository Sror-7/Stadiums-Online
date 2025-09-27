import {
  AddNewPerson,
  updatePersonInfo,
  getPersonInfoByID,
} from "./personThunk";
export const handleAddNewPerson = (builder) => {
  builder
    .addCase(AddNewPerson.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.value = [];
    })
    .addCase(AddNewPerson.fulfilled, (state, action) => {
      state.loading = false;
    })
    .addCase(AddNewPerson.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
};
export const handleGetPersonInfoByID = (builder) => {
  builder
    .addCase(getPersonInfoByID.pending, (state) => {
      state.loading = true;
      state.error = null;
      //   state.value = [];
    })
    .addCase(getPersonInfoByID.fulfilled, (state, action) => {
      state.loading = false;
    })
    .addCase(getPersonInfoByID.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
};
export const handleUpdatePerson = (builder) => {
  builder
    .addCase(updatePersonInfo.pending, (state) => {
      state.loading = true;
      state.error = null;
      //   state.value = [];
    })
    .addCase(updatePersonInfo.fulfilled, (state, action) => {
      state.loading = false;
    })
    .addCase(updatePersonInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
};
