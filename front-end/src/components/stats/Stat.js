import React from "react";
import styles from "./Stat.module.scss";
import classnames from "classnames/bind";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import formatNumberWithCommas from "../../helper/formatNumber";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { style } from "@mui/system";

const cx = classnames.bind(styles);

function Stat({ name, value, icon, unit, color }) {
  return (
    <div className={cx("wrapper")} style={{ color: color }}>
      <div className={cx("info")}>
        <section className={cx("title")}>{name}</section>
        {icon === "revenue" ? (
          <Tippy content={`${formatNumberWithCommas(value)} VNĐ`}>
            <section className={cx("value")}>
              {formatNumberWithCommas(value)}{" "}
            </section>
          </Tippy>
        ) : (
          <section className={cx("value")}>
            {formatNumberWithCommas(value)}{" "}
          </section>
        )}
        <section className={cx("unit")}>{unit} </section>
      </div>
      <div className={cx("icon")}>
        {icon == "user" && (
          <h1>
            {" "}
            <PersonIcon />
          </h1>
        )}
        {icon == "customer" && (
          <h1>
            {" "}
            <FaceRetouchingNaturalIcon />
          </h1>
        )}
        {icon == "order" && (
          <h1>
            {" "}
            <ReceiptLongIcon />
          </h1>
        )}
        {icon == "revenue" && (
          <h1>
            {" "}
            <CurrencyExchangeIcon />
          </h1>
        )}
        {icon == "product" && (
          <h1>
            {" "}
            <PhoneAndroidIcon />
          </h1>
        )}
      </div>
    </div>
  );
}

export default Stat;
