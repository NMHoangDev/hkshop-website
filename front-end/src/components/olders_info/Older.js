import React, { useEffect, useState } from "react";
import classnames from "classnames/bind";
import styles from "./Older.module.scss";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { FaUser } from "react-icons/fa6";
import ProductForOlder from "./ProductForOlder";
import formatNumberWithCommas from "../../helper/formatNumber";
import { IoMdSchool } from "react-icons/io";
const cx = classnames.bind(styles);
function Older({ cartItems, informationCustomer }) {
  const [isExpanded, setIsExpanded] = useState(true);
  let totalCost = 0;
  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };
  useEffect(() => {
    console.log(informationCustomer);
    console.log(cartItems);
  }, []);
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
                Họ và tên: <span>{informationCustomer.name}</span>
              </p>
              <p>
                Phone Number: <span>{informationCustomer.phoneNumber}</span>
              </p>
              <p>
                Địa chỉ: <span>{informationCustomer.address}</span>
              </p>
            </div>
            <div className={cx("older_status")}>
              <p>
                Hình thức thanh toán:{" "}
                <span>
                  {informationCustomer.methodPayment == "COD"
                    ? "Thanh toán khi nhân hàng"
                    : "Thanh toán bằng VN Pay"}
                </span>
              </p>
              <p>
                Ghi chú: <span>{informationCustomer.note}</span>
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
      </div>
      {isExpanded && (
        <div className={cx("detail_older")}>
          <div className={cx("header-detail")}>
            <div className={cx("product")}>Sản phẩm</div>
            <div className={cx("unit-price")}>Đơn giá</div>
            <div className={cx("quantity")}>Số lượng</div>
            <div className={cx("total")}>Thành giá</div>
          </div>
          {cartItems.map((cartItem) => {
            if ("isChecked" in cartItem && cartItem.isChecked == true) {
              totalCost = cartItem.price * cartItem.quantity + totalCost;

              return (
                <ProductForOlder
                  name={cartItem.name}
                  imageUrl={cartItem.imageUrl}
                  quantity={cartItem.quantity}
                  price={cartItem.price}
                  ram={cartItem.ram}
                  rom={cartItem.rom}
                  color={cartItem.color}
                />
              );
            } else if (!("isChecked" in cartItem)) {
              totalCost = cartItem.price * cartItem.quantity + totalCost;
              return (
                <ProductForOlder
                  name={cartItem.name}
                  imageUrl={cartItem.image_urls[1]}
                  quantity={cartItem.quantity}
                  price={cartItem.price}
                  ram={cartItem.ram}
                  rom={cartItem.rom}
                  color={cartItem.color}
                />
              );
            }
          })}

          <div id={cx("cartSubTotal")}>
            {/* Tổng tiền thanh toán: 123456 VNĐ <span>Đã thanh toán</span> */}
            <div id={cx("text")}>Tổng tiền thanh toán:</div>
            <div id={cx("value")}>
              {formatNumberWithCommas(totalCost)} VNĐ{" "}
              <span>(Chưa thanh toán)</span>
            </div>
            {/* //  <div id={cx("dathanhtoan")}>(Đã thanh toán)</div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Older;
