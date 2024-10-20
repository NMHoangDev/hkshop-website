import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import TabletAndroidIcon from "@mui/icons-material/TabletAndroid";
import WatchIcon from "@mui/icons-material/Watch";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import MouseIcon from "@mui/icons-material/Mouse";
import MainStore from "../main-store/MainStorePhone";
import MainStoreLapTop from "../main-store/MainStoreLapTop";

function Selection(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

Selection.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="selection Tab"
          sx={{}}
        >
          <Tab
            label="Điện thoại"
            {...a11yProps(0)}
            icon={<PhoneAndroidIcon />}
            sx={{ color: "#FF7050" }}
          />
          <Tab
            label="LapTop"
            {...a11yProps(1)}
            sx={{ color: "#FF7050" }}
            icon={<LaptopMacIcon />}
          />
          <Tab
            label="Tablet"
            {...a11yProps(2)}
            sx={{ color: "#FF7050" }}
            icon={<TabletAndroidIcon />}
          />
          <Tab
            label="Đồng hồ"
            {...a11yProps(3)}
            sx={{ color: "#FF7050" }}
            icon={<WatchIcon />}
          />
          <Tab
            label="Tai nghe"
            {...a11yProps(4)}
            sx={{ color: "#FF7050" }}
            icon={<HeadphonesIcon />}
          />
          <Tab
            label="Bàn phím"
            {...a11yProps(5)}
            sx={{ color: "#FF7050" }}
            icon={<KeyboardIcon />}
          />
          <Tab
            label="Chuột"
            {...a11yProps(6)}
            sx={{ color: "#FF7050" }}
            icon={<MouseIcon />}
          />
        </Tabs>
      </Box>
      <Selection value={value} index={0}>
        <MainStore />
      </Selection>
      <Selection value={value} index={1}>
        <MainStoreLapTop />
      </Selection>
      <Selection value={value} index={2}>
        Tablet
      </Selection>
      <Selection value={value} index={3}>
        Đồng hồ
      </Selection>
      <Selection value={value} index={4}>
        Tai nghe
      </Selection>
      <Selection value={value} index={5}>
        Bàn phím
      </Selection>
      <Selection value={value} index={6}>
        Chuột
      </Selection>
    </Box>
  );
}
