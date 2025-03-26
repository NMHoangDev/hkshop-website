import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./Cart_transport.module.scss";
import classnames from "classnames/bind";
import { Button } from "@mui/material";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const cx = classnames.bind(styles);

function Cart_transport({ onGetValue }) {
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [showDropdown3, setShowDropdown3] = useState(false);
  const [selectedAddress1, setSelectedAddress1] = useState(
    "Chọn Tỉnh/Thành phố"
  );
  const [selectedAddress2, setSelectedAddress2] = useState("Chọn Quận/Huyện");
  const [selectedAddress3, setSelectedAddress3] = useState("Chọn Phường/Xã");
  const [data, setData] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    note: "",
  });

  const [selectedDiv, setSelectedDiv] = useState(null);

  const handleDropdown1Click = () => {
    setShowDropdown1(!showDropdown1);
    setShowDropdown2(false);
    setShowDropdown3(false);
    setSelectedDiv(1);
  };

  const handleDropdown2Click = () => {
    setShowDropdown1(false);
    setShowDropdown2(!showDropdown2);
    setShowDropdown3(false);
    setSelectedDiv(2);
  };

  const handleDropdown3Click = () => {
    setShowDropdown1(false);
    setShowDropdown2(false);
    setShowDropdown3(!showDropdown3);
    setSelectedDiv(3);
  };

  const handleDropdown1Select = (address) => {
    setSelectedAddress1(address);
    setSelectedDiv(1);
    setShowDropdown1(false);
  };

  const handleDropdown2Select = (address) => {
    setSelectedAddress2(address);
    setSelectedDiv(2);
    setShowDropdown2(false);
  };

  const handleDropdown3Select = (address) => {
    setSelectedAddress3(address);
    setSelectedDiv(3);
    setShowDropdown3(false);
  };

  const [activeDiv, setActiveDiv] = useState(null);

  const handleOutsideClick = (event) => {
    // Kiểm tra xem có một div "active" hiện tại hay không
    if (activeDiv !== null) {
      // Kiểm tra xem người dùng có nhấn vào ngoài các div ".quan", ".huyen" và ".xa" hay không
      if (
        !event.target.closest(".quan") &&
        !event.target.closest(".huyen") &&
        !event.target.closest(".xa")
      ) {
        // Nếu đúng, ẩn các menu dropdown và đặt lại các biến trạng thái
        setShowDropdown1(false);
        setShowDropdown2(false);
        setShowDropdown3(false);

        // setActiveDiv(null);
        // setSelectedDiv(null);
      }
    }
  };
  const handleChangeValue = function (event) {
    switch (event.target.name) {
      case "name": {
        setData({
          ...data,
          name: event.target.value,
        });
        return 0;
      }
      case "address": {
        setData({
          ...data,
          address: event.target.value,
        });
        return 0;
      }
      case "phoneNumber": {
        setData({
          ...data,
          phoneNumber: event.target.value,
        });
        return 0;
      }

      case "note": {
        setData({
          ...data,
          note: event.target.value,
        });
        return 0;
      }

      default: {
        return 0;
      }
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!data.name === "" || !data.address === "" || !data.phoneNumber === "") {
      Swal.fire({
        icon: "error",
        title: "Opps..",
        text: "Bạn chưa xác nhận thông tin, hay xác nhận thông tin trước khi sang bước tiếp theo",
      });
    } else {
      onGetValue(data);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <div className={cx("Cart_transport")} onSubmit={handleSubmit}>
      <form method="POST" style={{ width: "100%" }}>
        <div className={cx("topic")}>Thông tin vận chuyển</div>
        <div className={cx("name_phone")}>
          <div className={cx("name")}>
            <div className={cx("topic_text")}>Họ và tên</div>
            <div className={cx("text")}>
              <input
                type="text"
                placeholder="Nhập tên của bạn"
                name="name"
                value={data.name}
                onChange={handleChangeValue}
              />
            </div>
          </div>
          <div className={cx("phone")}>
            <div className={cx("topic_text")}>Số điện thoại</div>
            <div className={cx("text")}>
              <input
                type="text"
                placeholder="Nhập số điện thoại của bạn"
                name="phoneNumber"
                value={data.phoneNumber}
                onChange={handleChangeValue}
              />
            </div>
          </div>
        </div>

        <div className={cx("address")}>
          <div className={cx("topic_text")}>Địa chỉ</div>
          <div className={cx("text")}>
            <div className={cx("address")}>
              <input
                type="text"
                placeholder="Địa chỉ(ví dụ:352 Mai Đăng Chơn, phường Hòa Quý)"
                name="address"
                value={data.address}
                onChange={handleChangeValue}
              />
            </div>
          </div>
        </div>
        {/* Lỡ css cho cái class address r thêm vô đổi thành note hắn éo ăn css nha, thông cảm, mãi iu */}
        <div className={cx("address")}>
          <div className={cx("topic_text")}>Ghi chú</div>
          <div className={cx("text")}>
            <div className={cx("address")}>
              <input
                type="text"
                placeholder="Ghi chú"
                name="note"
                value={data.note}
                onChange={handleChangeValue}
              />
            </div>
          </div>
        </div>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FF7050",
            width: "100%",
            marginTop: "20px",
          }}
          type="submit"
        >
          Xác nhận
        </Button>
      </form>
    </div>
  );
}

export default Cart_transport;
