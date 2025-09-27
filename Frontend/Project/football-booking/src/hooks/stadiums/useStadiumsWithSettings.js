import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState, useMemo } from "react";
import { getAllStadiumsWithSettings } from "../../features/stadium/stadiumThunk";
export function useStadiumsWithSettings() {
  const dispatch = useDispatch();
  const [stadiumsWithSettings, setStadiumsWithSettings] = useState([]);
  const [searchName, setSearchName] = useState("");
  const filteredStadiums = useMemo(() => {
    switch (searchName) {
      case "": {
        return stadiumsWithSettings;
      }
      default: {
        return stadiumsWithSettings.filter(
          (stadium) => stadium.name === searchName
        );
      }
    }
  }, [searchName, stadiumsWithSettings]);
  async function LoadStadiumsList() {
    const result = await dispatch(getAllStadiumsWithSettings());

    if (getAllStadiumsWithSettings.fulfilled.match(result)) {
      setStadiumsWithSettings(result.payload);
    }
  }
  useEffect(() => {
    LoadStadiumsList();
  }, []);

  return { stadiums: filteredStadiums, setSearchName };
}
