import React, { useEffect, useState } from "react";
import classnames from "classnames/bind";
import styles from "./Older.module.scss";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { FaUser } from "react-icons/fa6";
import ProductForOlder from "./ProductForOlder";
import { FourMp } from "@mui/icons-material";
import formatNumberWithCommas from "../../helper/formatNumber";
import { Button } from "@mui/material";
import axios from "axios";
const cx = classnames.bind(styles);
function Older({ orderItems }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [products, setProducts] = useState(orderItems);
  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };
  const handleCancelOrder = (id) => {
    axios.patch("http://127.0.0.1:8000/orders/cancel-order", {
      id: orderItems[0].order_id,
    });
  };
  let total_amount = 0;

  console.log(products);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("main-older")}>
        <div className={cx("info_older")}>
          <div className={cx("topic_older")}>
            <div className={cx("icon")}>
              <FiShoppingCart />
            </div>
            <div id={cx("topic")}>
              Thông Tin Đơn Hàng
              <div id={cx("boder")}></div>
            </div>
          </div>

          <div className={cx("infor_tranf")}>
            <div>
              <p>
                Mã đơn hàng: <span>{orderItems[0].order_id}</span>
              </p>
              <p>
                Ngày đặt hàng: <span>{orderItems[0].order_day}</span>
              </p>
              <p>
                Dự kiến giao hàng:{" "}
                <span>{orderItems[0].order_received_day}</span>
              </p>
            </div>
            <div className={cx("older_status")}>
              <p>
                {orderItems[0].status === "finish" && "Đã hoàn thành"}
                {orderItems[0].status === "cancel" && "Đã hủy"}
                {orderItems[0].status === "delivery" &&
                  "Đang trong quá trình vận chuyển"}
                {orderItems[0].status === "paid" &&
                  "Đang trong quá trình vận chuyển"}
              </p>
            </div>
          </div>
        </div>
        <div className={cx("btn_detail_older")}>
          <button className={cx("button")} type="button" onClick={handleClick}>
            <span className={cx("text")}>Chi tiết đơn hàng</span>
            <span className={cx("icon")}>
              <div className={cx("cg")}>
                {isExpanded ? <FaAngleUp /> : <FaAngleDown />}
              </div>
            </span>
          </button>
        </div>
        <Button
          variant="outlined"
          onClick={() => {
            handleCancelOrder();
          }}
        >
          Hủy đơn hàng
        </Button>
      </div>

      {isExpanded ? (
        <div className={cx("detail_older")}>
          <div className={cx("header-detail")}>
            <div className={cx("product")}>Sản phẩm</div>
            <div className={cx("unit-price")}>Đơn giá</div>
            <div className={cx("quantity")}>Số lượng</div>
            <div className={cx("total")}>Thành giá</div>
          </div>
          {products.map((product) => {
            total_amount = total_amount + product.quantity * product.price;
            return (
              <ProductForOlder
                name={product.name_item}
                imageUrl={product.imageUrl}
                quantity={product.quantity}
                price={product.price}
                ram={product.ram}
                rom={product.rom}
                color={product.color}
              />
            );
          })}
          <div id={cx("cartSubTotal")}>
            {/* Tổng tiền thanh toán: 123456 VNĐ <span>Đã thanh toán</span> */}
            <div id={cx("text")}>Tổng tiền thanh toán:</div>
            <div id={cx("value")}>
              {formatNumberWithCommas(total_amount)}
              {" VNĐ "}
              <span>
                {orderItems[0].method_payment == "COD" &&
                orderItems[0].status == "delivery"
                  ? "Chưa thanh toán"
                  : "Đã thanh toán"}
              </span>
            </div>
            {/* //  <div id={cx("dathanhtoan")}>(Đã thanh toán)</div> */}
          </div>
          <div className={cx("receiver_info")}>
            <div className={cx("topic_user")}>
              <div className={cx("icon")}>
                <FaUser />
              </div>
              <div id={cx("topic")}>
                Thông tin người nhận <div id={cx("boder")}></div>
              </div>
            </div>
            <p>
              Số điện thoại: <span>(+84) {products[0].phone_number}</span>
            </p>
            <p>
              Họ và tên người nhận: <span>{products[0].name}</span>
            </p>
            <p>
              Địa chỉ: <span>{products[0].address}</span>
            </p>
            <p>
              Ghi chú: <span>{products[0].note}</span>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Older;
