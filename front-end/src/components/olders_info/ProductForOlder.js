import React from "react";
import classnames from "classnames/bind";
import styles from "./ProductForOlder.module.scss";
import formatNumberWithCommas from "../../helper/formatNumber";
const cx = classnames.bind(styles);

function ProductForOlder({ name, imageUrl, quantity, price, ram, rom, color }) {
  console.log(ram, rom);
  return (
    <div className={cx("container")}>
      <div className={cx("main_container")}>
        <div className={cx("nameProduct")}>
          <div className={cx("back")} id={cx("cartImage")}>
            <img className={cx("product-img")} alt="123" src={imageUrl} />
          </div>

          <a
            href="/khay-hop-mut-son-mai/bo-ba-bo-3-hu-man-ve-hoa-mai-do-mnv-qt09-qua-tet-2-myngheviet.vn/"
            id={cx("product_name")}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {name} {`(${ram} GB / ${rom} GB / `}
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: color,
                borderRadius: "50%",
                marginLeft: "2px",
              }}
            ></div>
            {") "}
          </a>

          {/* <span className={cx("alert-text", "bold")}></span> */}
        </div>
        <div className={cx("cartUnitDisplay")}>
          {formatNumberWithCommas(price)}{" "}
        </div>
        <div className={cx("cartQuantity")}>
          {quantity}
          <span className={cx("alert-text", "bold")}></span>
        </div>

        <div className={cx("cartTotalDisplay")}>
          {formatNumberWithCommas(price * quantity)} VNĐ
        </div>
      </div>
    </div>
  );
}

export default ProductForOlder;
