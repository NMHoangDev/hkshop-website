import React from "react";
import styles from "./GlobalStyle.module.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(styles);
function GlobalStyle({ children }) {
  return <div className={cx("wrapper")}>{children}</div>;
}

export default GlobalStyle;
