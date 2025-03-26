import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import styles from "./SearchBar.module.scss";
import classnames from "classnames/bind";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import formatDate from "../../helper/formatDate";
const cx = classnames.bind(styles);
function SearchBar({ countItems }) {
  const [countCartItems, setCountCartItems] = React.useState(0);
  const [notifys, setNotifys] = React.useState([]);
  const [countNotify, setCountNotify] = React.useState(0);
  const [searchData, setSearchData] = React.useState([]);
  const account = JSON.parse(localStorage.getItem("account"));

  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

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
  const settings = [
    "Cá nhân",
    "Tài khoản HKPay",
    "Đơn hàng của bạn",
    "Đăng xuất",
  ];

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/cart/count-cart-item?id-customer=${account.id}`
      )
      .then((response) => {
        setCountCartItems(response.data.countCartItems);
      });
    axios
      .get(`http://127.0.0.1:8000/cart/get-cart-item?idCustomer=${account.id}`)
      .then((response) => {
        const result = response.data.cart_items;
        console.log(result);
        result.map((item) => {
          setCountNotify((pre) => pre + 1);
          return {
            imageUrl: item.phone.imagesUrl,
            name: item.phone.name,
          };
        });
        setNotifys(result);
      });
  }, [countItems]);
  function handleOnClickOption(event) {
    // Kiểm tra nếu phần tử tồn tại, sau đó lấy id

    navigate(`/detail-page/${event.target.id}?id-product=${event.target.id}`); // "myStrongTag"
  }
  function handleChangeSearchInput(newValue) {
    // Xử lý giá trị mới của `Autocomplete`

    console.log(newValue);

    // Gọi API khi người dùng nhập vào ô tìm kiếm

    axios
      .get(`http://127.0.0.1:8000/product/search-by-name?name=${newValue}`)
      .then(function (response) {
        console.log(response.data.products);
        setSearchData(response.data.products);
      });
  }

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
          options={searchData}
          // Đảm bảo `searchValue` không bị `undefined`
          onInputChange={(event, newInputValue) => {
            handleChangeSearchInput(newInputValue);
            // Thực hiện các thao tác khác nếu cần
          }}
          getOptionLabel={(option) => option.name || ""} // Xử lý nếu `option.title` bị thiếu
          renderOption={(props, option) => (
            <li {...props} style={{ padding: "10px" }} key={option.id}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="https://bizweb.dktcdn.net/100/177/937/products/iphone-xs-gold-400x460-1.png?v=1725085611530"
                  style={{ width: "30px", height: "30px" }}
                  alt="image access"
                />
                <strong
                  onClick={(event) => handleOnClickOption(event)} // Gọi hàm `handleOnClickOption` với `option`
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                  id={option.id}
                >
                  {option.name || ""}
                </strong>
              </div>
            </li>
          )}
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
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </div>

      <div>
        {" "}
        <Link to="/cart">
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
            <Badge
              badgeContent={countCartItems}
              sx={{ color: "#FF7F50", caret: "#FF7F50" }}
            >
              <span>Giỏ hàng</span> <ShoppingCartIcon />
            </Badge>
          </Button>
        </Link>
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
