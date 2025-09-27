import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllStadiums } from "../../features/stadium/stadiumThunk";
import { useState, useMemo } from "react";
export function useStadiums() {
  const dispatch = useDispatch();
  const [stadiums, setStadiums] = useState([]);
  const [searchName, setSearchName] = useState("");
  const filteredStadiums = useMemo(() => {
    switch (searchName) {
      case "": {
        return stadiums;
      }
      default: {
        return stadiums.filter((stadium) => stadium.name === searchName);
      }
    }
  }, [searchName, stadiums]);
  async function LoadStadiumsList() {
    const result = await dispatch(getAllStadiums());

    if (getAllStadiums.fulfilled.match(result)) {
      console.log("fullFillled: ");
      setStadiums(result.payload);
    }
  }
  useEffect(() => {
    LoadStadiumsList();
  }, []);

  return { stadiums: filteredStadiums, setSearchName };
}
