import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import { useNavigate } from "react-router-dom";

const mainListItems = [
  { text: "Trang chủ", icon: <HomeRoundedIcon /> },
  { text: "Quản lí tài khoản", icon: <HelpRoundedIcon /> },
  { text: "Đơn hàng và doanh thu", icon: <PeopleRoundedIcon /> },
  { text: "Sản phẩm", icon: <AssignmentRoundedIcon /> },
];

const secondaryListItems = [{ text: "Đánh giá", icon: <InfoRoundedIcon /> }];

export default function MenuContent() {
  const [active, setActive] = React.useState(0);
  const navigate = useNavigate();
  function handleOnClickSideMenu(event, index) {
    setActive(index);
    switch (index) {
      case 0: {
        navigate("/dashboard");
        break;
      }
      case 1: {
        navigate("/admin/customer");
        break;
      }
      case 2: {
        navigate("/admin/orders");

        break;
      }
      case 3: {
        navigate("/admin/products");
        break;
      }
      default: {
        return 0;
      }
    }
  }
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={index === active}
              onClick={(e) => {
                handleOnClickSideMenu(e, index);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
