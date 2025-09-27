import AddStadiumForm from "../../components/stadium/AddStadiumForm";
import { Typography } from "@mui/material";
export function AddNewStadium() {
  return (
    <div style={{ backgroundColor: "#f3f4f6" }}>
      <div
        style={{
          backgroundColor: "#2f6937",
          color: "white",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Add New Stadium
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          Fill in the details below to list your stadium
        </Typography>
      </div>

      <AddStadiumForm />
    </div>
  );
}
