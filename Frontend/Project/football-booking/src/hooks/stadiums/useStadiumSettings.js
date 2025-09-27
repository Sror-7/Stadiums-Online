import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { getStadiumSettingsByStadiumID } from "../../features/stadium/stadiumThunk";
export function useStadiumSettings() {
  const dispatch = useDispatch();
  const [stadiumSettings, setStadiumSettings] = useState([]);

  async function LoadStadiumSettingsInformation() {
    const result = await dispatch(getStadiumSettingsByStadiumID());

    if (getStadiumSettingsByStadiumID.fulfilled.match(result)) {
      setStadiumSettings(result.payload);
    }
  }
  useEffect(() => {
    LoadStadiumSettingsInformation();
  }, []);

  return { stadiumSettings };
}
