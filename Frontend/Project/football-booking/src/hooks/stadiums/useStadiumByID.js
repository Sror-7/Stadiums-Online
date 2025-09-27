import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { getStadiumInfoByID } from "../../features/stadium/stadiumThunk";
export function useStadiumByID(stadiumID) {
  const dispatch = useDispatch();
  const [stadium, setStadium] = useState([]);

  async function LoadStadiumInformation() {
    const result = await dispatch(getStadiumInfoByID({ stadiumId: stadiumID }));

    if (getStadiumInfoByID.fulfilled.match(result)) {
      setStadium(result.payload);
    }
  }
  useEffect(() => {
    LoadStadiumInformation();
  }, []);

  return { stadium };
}
