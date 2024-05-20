import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Outlet, Link } from "react-router-dom";
import { sessionModel } from "~/entities/session";
import { APP_NAME } from "~/shared/config/env";
import { privateRoutes } from "~/shared/config/routes";

export const PrivateLayout = () => {
  const user = sessionModel.getUserCache();
  const logout = sessionModel.useLogout();

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              color: "inherit",
              "&, &:focus, &:hover, &:visited, &:link, &:active": {
                textDecoration: "none",
              },
            }}
            component={Link}
            to={privateRoutes.root()}
          >
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
