import React from "react";
import styles from "./PhoneCardHome.module.scss";
import classnames from "classnames/bind";
import { fontWeight } from "@mui/system";
import formatNumberWithCommas from "../../helper/formatNumber";
import { useNavigate } from "react-router-dom";

const cx = classnames.bind(styles);

function PhoneCardHome({ id, name, price, km1, km2, num, img }) {
  const navigate = useNavigate();
  const randomNumber = Math.floor(Math.random() * 12) + 1;

  return (
    <div
      className={cx("wrapper")}
      onClick={() => {
        navigate(`/detail-page/${id}?id-product=${id}`);
      }}
    >
      <img src={img} style={{ width: "100%", height: "250px" }} />
      <h4 styles={{}} className={cx("title")}>
        {name}
      </h4>
      <h4
        styles={{}}
        className={cx("title")}
        style={{
          color: "#fd475a",
        }}
      >
        {formatNumberWithCommas(price)} đ
      </h4>
      <div className={cx("wrapper-sale")}>
        <span
          style={{
            backgroundColor: "#FFDFD4",
            color: "#FC521D",
            padding: "6px",
          }}
          className={cx("km-span")}
        >
          {" "}
          KM
        </span>
        <span title="GIảm thêm 400.000đ" style={{ lineHeight: "24px" }}>
          {km1}
        </span>
      </div>
      <div className={cx("wrapper-sale")}>
        <span
          style={{ backgroundColor: "#FFDFD4", color: "#FC521D" }}
          className={cx("km-span")}
        >
          {" "}
          KM
        </span>
        <span title="GIảm thêm 400.000đ" style={{ lineHeight: "24px" }}>
          {km2}
        </span>
      </div>
      <div className={cx("wrapper-sale")}>
        <span
          title="GIảm thêm 400.000đ"
          style={{
            lineHeight: "24px",
            margin: "auto",
            fontWeight: "800",
            color: "#FC521D",
          }}
        >
          +{num} Ưu đãi khác
        </span>
      </div>
    </div>
  );
}

export default PhoneCardHome;
