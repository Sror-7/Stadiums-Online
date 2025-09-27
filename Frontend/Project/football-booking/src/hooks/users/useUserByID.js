import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { getUserInfoByID } from "../../features/user/userThunk";
export function useUserByID() {
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);

  async function LoadUserInformation() {
    const result = await dispatch(getUserInfoByID());

    if (getUserInfoByID.fulfilled.match(result)) {
      setUser(result.payload);
    }
  }
  useEffect(() => {
    LoadUserInformation();
  }, []);

  return { user };
}
