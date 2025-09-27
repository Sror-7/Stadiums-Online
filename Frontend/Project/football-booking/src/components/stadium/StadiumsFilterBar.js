import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
export function StadiumFilterBar({ setSearchName }) {
  const [searchTextfield, setSearchTextfield] = useState("");
  function handleSearchClick() {
    setSearchName(searchTextfield);
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
        gap: 2,
      }}
      style={{
        borderBottom: "1px solid #00000029",
        paddingBottom: "15px",
        marginBottom: "30px",
      }}
    >
      <TextField
        label="Search at stadium"
        variant="outlined"
        value={searchTextfield}
        onChange={(e) => setSearchTextfield(e.target.value)}
      />
      <Button size="small" variant="contained" onClick={handleSearchClick}>
        Search
      </Button>{" "}
    </Box>
  );
}
