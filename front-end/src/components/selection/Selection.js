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
        </Tabs>
      </Box>
      <Selection value={value} index={0}>
        <MainStore />
      </Selection>
    </Box>
  );
}
