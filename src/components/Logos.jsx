import { Box, Divider } from "@mui/material";
import { SYNECTIC_LOGO, CAPITOLE_LOGO } from "../utils/logos.js";

const Logos = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        mb: 2,
      }}
    >
      <Box
        component="img"
        src={SYNECTIC_LOGO}
        alt="Synectic"
        sx={{ height: 30 }}
      />
      <Divider orientation="vertical" flexItem />
      <Box
        component="img"
        src={CAPITOLE_LOGO}
        alt="Capitole"
        sx={{ height: 30 }}
      />
    </Box>
  );
};

export default Logos;
