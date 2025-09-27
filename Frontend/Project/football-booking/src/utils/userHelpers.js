import { store } from "../app/store";
import {
  IsEmailAvailable,
  IsUsernameAvailable,
} from "../features/user/userThunk";
export const isUserNameAvailable = async (username, userId) => {
  const dispatch = store.dispatch;
  const checkUsernameAction = await dispatch(
    IsUsernameAvailable({ username, userid: userId })
  );

  if (IsUsernameAvailable.rejected.match(checkUsernameAction)) {
    return false;
  }

  return true;
};
export const isEmailAvailable = async (email, userId) => {
  const dispatch = store.dispatch;
  const checkEmailAction = await dispatch(
    IsEmailAvailable({ email, userid: userId })
  );

  if (IsEmailAvailable.rejected.match(checkEmailAction)) {
    return false;
  }

  return true;
};
