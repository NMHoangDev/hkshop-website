import React from "react";
import styles from "./SideMenu.module.scss";
import classnames from "classnames/bind";
import logo from "../navigation/logo/logo.png";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";

const cx = classnames.bind(styles);
export default function SideMenu() {
  return (
    <div className={cx("wrapper")}>
      <header className={cx("logo")}>
        <img src={logo} />
      </header>
    </div>
  );
}
