import React from "react";
import classnames from "classnames/bind";
import styles from "./AdverCard.module.scss";

const cx = classnames.bind(styles);

function AdverCard({ img }) {
  return (
    <div className={cx("wrapper")}>
      <img src={img} alt="adver" className={cx("img")} />
    </div>
  );
}

export default AdverCard;
