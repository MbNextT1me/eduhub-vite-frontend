import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Outlet } from "react-router-dom";
import { sessionModel } from "~/entities/session";
import { APP_NAME } from "~/shared/config/env";

export const PrivateLayout = () => {
  const user = sessionModel.getUserCache();
  const logout = sessionModel.useLogout();

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div">
            {APP_NAME}
          </Typography>
          <Box sx={{ width: "100%" }} />
          <Typography variant="h6" component="div">
            {user.username}
          </Typography>
          <IconButton size="large" color="inherit" onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Outlet />
    </>
  );
};
