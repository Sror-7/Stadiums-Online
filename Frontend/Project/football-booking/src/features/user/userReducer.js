import { addNewUser } from "./userThunk";
import { getUserInfoByID } from "./userThunk";
import { getUserInfoByUsernameAndPassword } from "./userThunk";
export const handleNewUserReducers = (builder) => {
  builder
    .addCase(addNewUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.value = [];
    })
    .addCase(addNewUser.fulfilled, (state, action) => {
      state.loading = false;
    })
    .addCase(addNewUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
};
export const handleGetUserInfoByID = (builder) => {
  builder
    .addCase(getUserInfoByID.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.currentUserInfo = [];
    })
    .addCase(getUserInfoByID.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUserInfo = action.payload;
      state.isUserLogged = true;
    })
    .addCase(getUserInfoByID.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
};
export const handleGetUserInfoByUsernameAndPassowrd = (builder) => {
  builder
    .addCase(getUserInfoByUsernameAndPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.value = [];
    })
    .addCase(getUserInfoByUsernameAndPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUserInfo = action.payload;
      state.isUserLogged = true;
    })
    .addCase(getUserInfoByUsernameAndPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
};
