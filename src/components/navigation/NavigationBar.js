import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Tooltip from "@mui/material/Tooltip";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddShoppingCartTwoToneIcon from "@mui/icons-material/AddShoppingCartTwoTone";
import Avatar from "@mui/material/Avatar";
import logo from "./logo/logo.png";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function NavigationBar() {
  const [value, setValue] = React.useState(0);

  // handle clck log out btn
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // ------------
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <nav style={{ position: "fixed", zIndex: 99, width: "100%", top: 0 }}>
      <Box sx={{ width: "100%", backgroundColor: "#FF7F50" }}>
        <BottomNavigation
          sx={{
            backgroundColor: "#fffff",
            display: "flex",
            justifyContent: "end",
            borderBottom: " solid 1px #ccc",
          }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={logo}
            sx={{
              marginRight: "300px",
              width: 54,
              height: 54,
            }}
          />
          <BottomNavigationAction
            label="Trang chủ"
            icon={<HomeIcon />}
            href="/"
            sx={{ color: "#FF7F50", caretColor: "#FF7F50" }}
          />

          <BottomNavigationAction
            label="Liên hệ"
            icon={<ContactSupportIcon />}
            sx={{ color: "#FF7F50", caretColor: "#FF7F50" }}
          />
          <BottomNavigationAction
            label="Giới thiệu"
            icon={<LocationOnIcon />}
            sx={{ color: "#FF7F50", caretColor: "#FF7F50" }}
          />
          <BottomNavigationAction
            label="Cửa hàng"
            icon={<AddBusinessIcon />}
            sx={{ color: "#FF7F50", caretColor: "#FF7F50" }}
            href="/shop"
          />

          {/* <BottomNavigationAction label="Đăng nhập" icon={<LoginIcon />} /> */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  p: 0,
                  marginTop: "7px",
                  marginRight: "60px",
                  marginLeft: "20px",
                }}
              >
                <Avatar alt="Remy Sharp" src={logo} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* menu  */}
        </BottomNavigation>
      </Box>
      {/* notification  */}
    </nav>
  );
}

export default NavigationBar;
