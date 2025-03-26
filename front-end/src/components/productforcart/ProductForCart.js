import React, { useEffect, useState } from "react";
import classnames from "classnames/bind";
import styles from "./ProductForCart.module.scss";
import ProductModel from "../productmodel/ProductModel";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
const cx = classnames.bind(styles);

function ProductForCart() {
  const [cartItems, setCartItems] = useState([]);
  const [checkedCartItems, setCheckedCartItems] = useState([]);
  const [totalPriceCostOfItem, setTotalPriceCostOfItem] = useState([]);
  const navigate = useNavigate();
  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const account = JSON.parse(localStorage.getItem("account"));
  let total_amount = 0;
  useEffect(() => {
    let count = 0;
    axios
      .get(`http://127.0.0.1:8000/cart/get-cart-item?idCustomer=${account.id}`)
      .then((response) => {
        const cartItemsArray = response.data.cart_items;

        const infoItems = cartItemsArray.map((item) => {
          count++;
          return {
            ...item.phone,
            quantity: item.quantity,
            id: item.id,
            max_quantity: item.phone.quantity,
            idProduct: item.phone.id,
            isChecked: false,
            color: item.color,
            ram: item.ram,
            rom: item.rom,
            imageUrl: item.image_url,
          };
        });
        console.log(infoItems);
        console.log(count);
        setCartItems(infoItems);
      });
  }, []);
  const handleCheckedFromCartItems = (value) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === value.id ? { ...item, isChecked: value.checked } : item
      )
    );
  };

  function handleChangeQuantity(value) {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === value.id ? { ...item, quantity: value.quantity } : item
      )
    );
  }
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  function handleCheckOutBtn(event) {
    const hasCartItemChecked = cartItems.find(
      (item) => item.isChecked === true
    );
    if (hasCartItemChecked) {
      Swal.fire({
        title: "Bạn chắc chắn muốn thanh toán các sản phẩm này?",

        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FF7050",
        cancelButtonColor: "#d33",
        confirmButtonText: "Vâng, tôi chắc chắn",
      }).then((result) => {
        if (result.isConfirmed) {
          const encodedCartItem = encodeURIComponent(JSON.stringify(cartItems));
          navigate(`/checkout?data=${encodedCartItem}`);
        }
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Opps...",
        text: "Có vẻ bạn chưa chọ sản phẩm nào để thanh toán, hãy lựa chọn sản phẩm mình muốn và tiến hành thanh toán ngay nào! Love u <3",
      });
    }
  }

  return (
    <div className={cx("container")}>
      <div id={cx("centercontent-wrapper")}>
        <div id="shoppingCartDefault" className={cx("centerColumn")}>
          <header>
            <h1 id={cx("cartDefaultHeading")} style={{ marginTop: "100px" }}>
              Giỏ hàng
            </h1>
          </header>
          <div className={cx("table-wrapper")}>
            <div className={cx("table-responsive")}>
              <table
                cellspacing="0"
                cellpadding="0"
                id={cx("cartContentsDisplay")}
                className={cx("table", "table-hover")}
              >
                <tbody>
                  <tr className={cx("tableHeading")}>
                    <th id={cx("scProductsHeading")}>Sản phẩm</th>
                    <th className={cx("tbl-center")} id={cx("scUnitHeading")}>
                      Giá tiền
                    </th>
                    <th
                      className={cx("tbl-center")}
                      id={cx("scQuantityHeading")}
                    >
                      SL
                    </th>
                    <th
                      className={cx("tbl-center")}
                      id={cx("scUpdateQuantity")}
                    ></th>

                    <th className={cx("tbl-center")} id={cx("scTotalHeading")}>
                      Tổng số tiền sản phẩm.
                    </th>
                    <th
                      className={cx("tbl-center")}
                      id={cx("scRemoveHeading")}
                    ></th>
                  </tr>
                </tbody>
              </table>
              <div id={cx("container")}>
                {cartItems.map((item) => {
                  return (
                    <div className={cx("cardForCard")}>
                      <ProductModel
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        urlImg={item.imageUrl}
                        id={item.id}
                        totalCost={item.total_price}
                        maxQuantity={item.max_quantity}
                        onCheckedChange={handleCheckedFromCartItems}
                        // onPriceCost={handleCheckedPriceCost}
                        onChangeQuantity={handleChangeQuantity}
                        color={item.color}
                        ram={item.ram}
                        rom={item.rom}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <br className={cx("clearBoth")} />
        </div>
      </div>

      <div
        className={cx("row", "row-sm", "bt-order", "btn-shop")}
        style={{ width: "400px", margin: "auto", backgroundColor: "#FF7050" }}
        onClick={handleCheckOutBtn}
      >
        <button className={cx("btn", "btn-danger", "btn-block", "btn-red")}>
          {" "}
          Tiến hành thanh toán
        </button>
      </div>
    </div>
  );
}
export default ProductForCart;
