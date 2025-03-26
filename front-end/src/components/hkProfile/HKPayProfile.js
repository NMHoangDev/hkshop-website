import React, { useEffect, useState } from "react";
import styles from "./HKpayProfile.module.scss";
import classnames from "classnames/bind";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import formatNumberWithCommas from "../../helper/formatNumber";
import axios from "axios";

// or via CommonJS

const cx = classnames.bind(styles);

function HKPayProfile() {
  const Swal = require("sweetalert2");
  const [information, setInformation] = useState({
    name: "",
    email: "",
    hkCode: "",
  });
  const [disabled, setDisabled] = useState({
    name: true,
    password: true,
    email: true,
    hkCode: true,
    balance: 0,
  });
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const [base64Images, setBase64Image] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/1/12/User_icon_2.svg"
  );
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setBase64Image((preBase64Image) => {
          return e.target.result;
        });
        // Lưu chuỗi Base64 vào state
      };

      reader.readAsDataURL(file); // Đọc file dưới dạng Base64
    }
  };
  const handleOnChangeInput = (event) => {
    switch (event.target.name) {
      case "name": {
        setInformation({ ...information, name: event.target.value });

        break;
      }
      case "email": {
        setInformation({ ...information, email: event.target.value });

        break;
      }
      case "password": {
        setInformation({ ...information, password: event.target.value });

        break;
      }
      case "hkCode": {
        setInformation({ ...information, hkCode: event.target.value });

        break;
      }
      default: {
        return true;
      }
    }
  };
  const account = JSON.parse(localStorage.getItem("account"));
  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/admin/user/get-user-information?id=${account.id}`
      )
      .then((response) => {
        console.log(response.data.user);
        setInformation({
          name: response.data.user.name,
          email: response.data.user.email,
          hkCode: response.data.user._hk_pay_code,
          balance: response.data.user.account_balance,
        });
        if (response.data.user.avatar != null) {
          setBase64Image(response.data.user.avatar);
        }
      });
  }, []);
  const handleSubmit = (event) => {
    axios
      .patch("http://127.0.0.1:8000/admin/user/update-user-information", {
        ...information,
        avatar: base64Images,
        id: account.id,
      })
      .then((response) => {
        alert(response.data.updated);
      });
  };

  return (
    <form className={cx("wrapper")}>
      <h1 className={cx("title")}>Thông tin cá nhân</h1>
      <div className={cx("wrapper-avatar")}>
        <img src={base64Images} alt="Avatar" className={cx("avatar")} />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<AddAPhotoIcon />}
          sx={{ backgroundColor: "#FF7050", marginTop: "10px" }}
        >
          Đổi ảnh đại diện
          <VisuallyHiddenInput
            type="file"
            onChange={handleImageChange}
            multiple
          />
        </Button>
      </div>
      <div className={cx("information")}>
        <TextField
          id="outlined-basic"
          label="Số tiền muốn nạp"
          variant="outlined"
          sx={{ margin: "10px" }}
          name="name"
          value={information.name}
          onChange={handleOnChangeInput}
        />
      </div>
      <div className={cx("balance")}>
        <h9>
          Số dư tài khoán KHPay: {formatNumberWithCommas(information.balance)}{" "}
          xu
        </h9>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <Button
          variant="contained"
          sx={{ backgroundColor: "#FF7050" }}
          onClick={(event) => {
            handleSubmit(event);
          }}
        >
          Nạp
        </Button>
      </div>
    </form>
  );
}

export default HKPayProfile;
