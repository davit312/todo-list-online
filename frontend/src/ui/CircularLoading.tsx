import { CircularProgress, Box } from "@mui/material";

function CircularLoading() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
}

export default CircularLoading;
