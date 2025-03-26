import React, { useEffect, useState } from "react";
import classnames from "classnames/bind";
import styles from "./ProductModel.module.scss";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import formatNumberWithCommas from "../../helper/formatNumber";
import { useNavigate } from "react-router-dom";

const cx = classnames.bind(styles);

function ProductModel({
  name,
  urlImg,
  quantity,
  onPriceCost,
  price,
  id,
  maxQuantity,
  onCheckedChange,
  onChangeQuantity,
  color,
  rom,
  ram,
}) {
  const [quantityItem, setQuantityItem] = useState(quantity);
  const [totalprice, setTotalPrice] = useState(quantityItem * price);

  const navigate = useNavigate();

  const handlePlusClick = (event) => {
    if (quantityItem < maxQuantity) {
      axios
        .patch("http://127.0.0.1:8000/cart/update-quantity-cart-item", {
          type: "increase",
          id: id,
        })
        .then((response) => {
          setQuantityItem((prevQuantity) => {
            const newQuantity = prevQuantity + 1;

            // Sử dụng `newQuantity` để đảm bảo giá trị cập nhật

            return newQuantity;
          });
        })
        .catch((error) => {
          console.error("Error updating quantity:", error);
        });
    } else {
      Swal.fire({
        title: `Số lượng chỉ có ${maxQuantity} sản phẩm`,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
    }
  };
  const handleMinusClick = (event) => {
    if (quantityItem > 1) {
      axios
        .patch("http://127.0.0.1:8000/cart/update-quantity-cart-item", {
          type: "decrease",
          id: id,
        })
        .then(async (response) => {
          console.log(response.data);
          setQuantityItem((prevQuantity) => prevQuantity - 1);
        });
    } else {
      Swal.fire({
        title: "Bạn chắc chắn?",
        text: `Bạn muốn xóa sản phẩm ${name} khỏi giỏ hàng`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Không",
        confirmButtonText: "Vâng, tôi chắc chắn!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .patch("http://127.0.0.1:8000/cart/update-quantity-cart-item", {
              type: "decrease",
              id: id,
            })
            .then(async (response) => {
              console.log(response.data);
              // setQuantityItem((prevQuantity) => prevQuantity - 1);
              await Swal.fire({
                title: "Đã xóa",
                text: "Sản phẩm đã được xóa khỏi giỏ hàng",
                icon: "success",
              });
              window.location.reload();
            });
        }
      });
    }
  };
  const handleRemoveCartItem = (event) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF7050",
      cancelButtonColor: "#d33",
      cancelButtonText: "Không",
      confirmButtonText: "Vâng, chắc chắn!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://127.0.0.1:8000/cart/remove-cart-item?id=${id}`)
          .then(async (response) => {
            await Swal.fire({
              title: "Đã xóa thành công!",
              text: "Sản phẩm đã được xóa khỏi giỏ hàng.",
              icon: "success",
            });
            window.location.reload();
          });
      }
    });
  };
  let valueChecked = {
    checked: false,
    id: id,
    totalPrice: quantityItem * price,
  };
  const handleChangeCheckBox = (event) => {
    onCheckedChange({
      id: id,
      checked: event.target.checked,
    });
  };
  useEffect(() => {
    onChangeQuantity({
      id: id,
      totalPrice: quantityItem * price,
      quantity: quantityItem,
    });
    // onChangeQuantity(quantityItem);
  }, [quantityItem]);
  return (
    <div className={cx("container")}>
      <div className={cx("nameProduct")}>
        <div className={cx("back")} id={cx("cartImage")}>
          <input
            className={cx("cb")}
            type="checkbox"
            onChange={handleChangeCheckBox}
            name={id}
          />
          <img
            className={cx("product-img")}
            title={name}
            alt={name}
            src={urlImg}
          />
        </div>

        <p
          href=""
          id={cx("product_name")}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {name}
          {`(${ram} GB/${rom} GB/ `}
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: color,
              borderRadius: "50%",
              marginLeft: "2px",
            }}
          ></div>{" "}
          {`)`}
        </p>

        {/* <span className={cx("alert-text", "bold")}></span> */}
      </div>
      <div className={cx("cartUnitDisplay")}>
        {formatNumberWithCommas(price)}{" "}
      </div>
      <div className={cx("cartQuantity")}>
        <span onClick={handleMinusClick}>-</span>
        <input
          type="number"
          className={cx("inputQuantity")}
          value={quantityItem}
          name="quantityInput"
          min={1}
          disabled
        />
        <span onClick={handlePlusClick}>+</span>
        {/* <span className={cx("alert-text", "bold")}></span> */}
      </div>
      <div className={cx("cartQuantityUpdate")}>
        <input
          className={cx("change")}
          type="image"
          rel="2"
          title="Thay đổi số lượng"
          alt=""
          src="https://quatetmynghe.com/www/images/refresh.png"
        />
      </div>
      <div className={cx("cartTotalDisplay")}>
        {formatNumberWithCommas(price * quantityItem)} VND
      </div>
      <div
        className={cx("cartRemoveItemDisplay")}
        onClick={handleRemoveCartItem}
      >
        <img
          className={cx("remove-product-img")}
          title=" Xóa sản phẩm "
          alt=""
          src="https://quatetmynghe.com/www/images/cross.png"
        />
      </div>
    </div>
  );
}

export default ProductModel;
