import React, { useState } from "react";
import styles from "./Cart_Pay.module.scss";
import classnames from "classnames/bind";
import img_vanchuyen from "./IMG/icon_vanchuyen.png";
import img_zalopay from "./IMG/icon_zalopay.png";
import img_momo from "./IMG/icon_momo.png";
import img_vnpay from "./IMG/icon_vnpay.png";
import img_pay from "../../components/navigation/logo/logo.png";

const cx = classnames.bind(styles);

function CartPay({ onChangeRadio }) {
  const [isCheckRadioCOD, setIsCheckRadioCOD] = useState(false);
  const [isCheckRadioVNPay, setIsCheckRadioVNPay] = useState(false);

  function handleChange(event) {
    const { name } = event.target;
    if (name === "COD") {
      setIsCheckRadioCOD(true);
      setIsCheckRadioVNPay(false);
      onChangeRadio({ method: "COD" });
    } else if (name === "vnpay") {
      setIsCheckRadioCOD(false);
      setIsCheckRadioVNPay(true);
      onChangeRadio({ method: "vnpay" });
    }
  }
  return (
    <div className={cx("Cart_Pay")}>
      <div className={cx("topic")}>Thông tin vận chuyển</div>
      <div className={cx("pay")}>
        <div className={cx("pay_1")}>
          <div id={cx("radio")}>
            <input
              id={cx("input_radio")}
              type="radio"
              name="COD"
              onChange={handleChange}
              checked={isCheckRadioCOD}
            />
          </div>
          <div id={cx("img")}>
            <img src={img_vanchuyen} />
          </div>
          <div id={cx("text")}>
            <div className={cx("name_text")}>COD</div>
            <div className={cx("text")}>Thanh toán khi nhận hàng</div>
          </div>
        </div>

        <div className={cx("pay_3")}>
          <div id={cx("radio")}>
            <input
              id={cx("input_radio")}
              type="radio"
              name="vnpay"
              onClick={handleChange}
              checked={isCheckRadioVNPay}
            />
          </div>
          <div id={cx("img")}>
            <img src={img_vnpay} />
          </div>
          <div id={cx("text")}>
            <div className={cx("name_text")}>VN Pay</div>
            <div className={cx("text")}>Thanh toán bằng VNPay</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPay;
