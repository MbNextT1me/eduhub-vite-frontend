import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export const PublicLayout = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
    }}
  >
    <Container maxWidth="xs">
      <Outlet />
    </Container>
  </Box>
);
