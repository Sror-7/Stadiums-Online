import { store } from "../app/store";
import { IsStadiumNameAvailable } from "../features/stadium/stadiumThunk";

export const isStadiumNameAvailable = async (stadiumName, stadiumID) => {
  const dispatch = store.dispatch;
  const checkNameAction = await dispatch(
    IsStadiumNameAvailable({ stadiumName, stadiumID: stadiumID })
  );

  if (IsStadiumNameAvailable.rejected.match(checkNameAction)) {
    return false;
  }

  return true;
};
