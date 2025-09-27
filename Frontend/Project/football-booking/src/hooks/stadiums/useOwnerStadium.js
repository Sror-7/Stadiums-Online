import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { getStadiumInfoByLoggedUser } from "../../features/stadium/stadiumThunk";
export function useOwnerStadium() {
  const dispatch = useDispatch();
  const [stadium, setStadium] = useState([]);

  async function LoadStadiumInformation() {
    const result = await dispatch(getStadiumInfoByLoggedUser());

    if (getStadiumInfoByLoggedUser.fulfilled.match(result)) {
      setStadium(result.payload);
    }
  }
  useEffect(() => {
    LoadStadiumInformation();
  }, []);

  return { stadiumInfo: stadium };
}
