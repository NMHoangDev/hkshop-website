import React, { useEffect } from "react";
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
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import user from "./user/user.jpg";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { Close } from "@mui/icons-material";
import ProfileForm from "../profileForm/ProfileForm";
import HKPayProfile from "../hkProfile/HKPayProfile";

function NavigationBar() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  // handle clck log out btn

  const [avatar, setAvatar] = React.useState("");
  const [displayProfileBackDrop, setDisplayProfileBackDrop] =
    React.useState(false);

  const handleCloseProlifeBackDrop = () => {
    setDisplayProfileBackDrop(false);
  };

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/admin/user/get-user-information?id=${account.id}`
      )
      .then((response) => {
        if (response.data.user.avatar != null) {
          setAvatar(response.data.user.avatar);
        }
      });
  }, []);

  // ------------
  const settings = ["Cá nhân", "Đơn hàng của bạn", "Đăng xuất"];
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (event, value) => {
    setAnchorElUser(null);
    if (value === "Đăng xuất") {
      localStorage.removeItem("account");
      navigate("/sign-in");
    } else if (value === "Đơn hàng của bạn") {
      navigate("/my-order");
    } else if (value === "Cá nhân") {
      setDisplayProfileBackDrop(true);
    }
  };
  const account = JSON.parse(localStorage.getItem("account"));

  return (
    <nav
      style={{
        position: "fixed",
        zIndex: 99,
        width: "100%",
        top: 0,
        zIndex: 999,
      }}
    >
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
            label="Cửa hàng"
            icon={<AddBusinessIcon />}
            sx={{ color: "#FF7F50", caretColor: "#FF7F50" }}
            href="/shop"
          />

          {account ? (
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
                  <Avatar alt="Remy Sharp" src={avatar == "" ? user : avatar} />
                  <h1
                    style={{
                      fontSize: "16px",
                      marginBottom: 0,
                      marginLeft: "6px",
                    }}
                  >
                    {account.name}
                  </h1>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px", width: "400px" }}
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
                  <MenuItem
                    key={setting}
                    onClick={(event) => {
                      handleCloseUserMenu(event, setting);
                    }}
                    sx={{ width: "200px" }}
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Button
              variant="contained"
              sx={{
                background: "#ff7050",
                marginRight: "40px",
                height: "40px",
                marginTop: "auto",
                marginBottom: "auto",
              }}
              onClick={() => {
                navigate("/sign-in");
              }}
            >
              Đăng nhập
            </Button>
          )}
          {/* menu  */}
        </BottomNavigation>
      </Box>
      {/* notification  */}
      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={displayProfileBackDrop}
      >
        <Button
          onClick={(event) => {
            handleCloseProlifeBackDrop(event);
          }}
          sx={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <CloseIcon />
        </Button>
        <ProfileForm userInfo={account} />
      </Backdrop>
    </nav>
  );
}

export default NavigationBar;
