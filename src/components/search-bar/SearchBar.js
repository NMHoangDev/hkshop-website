import React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import styles from "./SearchBar.module.scss";
import classnames from "classnames/bind";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
const cx = classnames.bind(styles);
function SearchBar() {
  return (
    <div className={cx("wrapper")}>
      <div>
        {" "}
        <Button
          variant="outlined"
          sx={{
            width: "58px",
            height: "58px",
            top: "24%",
            left: "20%",
            position: "absolute",
            margin: 0,
            borderRight: "none",
          }}
        >
          <SearchIcon />
        </Button>
      </div>
      <div>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={top100Films.map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search input"
              sx={{
                width: "30%",
                height: "60%",
                position: "absolute",
                top: "25%",
                left: "25%",
                borderColor: "#FF7F50",
              }}
              slotProps={{
                input: {
                  ...params.InputProps,
                  type: "search",
                },
              }}
            />
          )}
        />
      </div>
      <div>
        {" "}
        <Button
          variant="outlined"
          sx={{
            width: "58px",
            height: "58px",
            top: "24%",
            right: "35%",
            position: "absolute",
            margin: 0,
            color: "#FF7F50",
            caret: "#FF7F50",
            borderColor: "#FF7F50",
            border: "none",
          }}
        >
          <Badge badgeContent={1} sx={{ color: "#FF7F50", caret: "#FF7F50" }}>
            <CircleNotificationsIcon />
          </Badge>
        </Button>
      </div>
      <div>
        {" "}
        <Button
          variant="outlined"
          sx={{
            width: "58px",
            height: "58px",
            top: "24%",
            right: "30%",
            position: "absolute",
            margin: 0,
            color: "#FF7F50",
            caret: "#FF7F50",
            borderColor: "#FF7F50",
            border: "none",
          }}
        >
          <Badge badgeContent={1} sx={{ color: "#FF7F50", caret: "#FF7F50" }}>
            <ShoppingCartIcon />
          </Badge>
        </Button>
      </div>
    </div>
  );
}

export default SearchBar;
const top100Films = [
  { title: "Iphone 15 Pro Max", year: 1994 },
  { title: "Iphone 12 Pro Max", year: 1972 },
  { title: "SamSung Galaxy SS7", year: 1974 },
];
