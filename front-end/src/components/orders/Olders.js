import React, { useEffect, useState } from "react";
import classnames from "classnames/bind";
import styles from "./Olders.module.scss";
import Older from "./Older.js";
const cx = classnames.bind(styles);
function Olders({ orders }) {
  console.log(orders);

  return (
    <div className={cx("wrapper")}>
      {orders.map((orderSimilars, index) => {
        console.log(orderSimilars);
        return (
          <div key={index}>
            <Older orderItems={orderSimilars.items} />
          </div>
        );
      })}
    </div>
  );
}

export default Olders;
