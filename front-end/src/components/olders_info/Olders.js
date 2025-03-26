import React from "react";
import classnames from "classnames/bind";
import styles from "./Olders.module.scss";
import Older from "./Older";
const cx = classnames.bind(styles);
function Olders({ cartItems, informationCustomer }) {
  return (
    <div className={cx("wrapper")}>
      <Older cartItems={cartItems} informationCustomer={informationCustomer} />
    </div>
  );
}

export default Olders;
