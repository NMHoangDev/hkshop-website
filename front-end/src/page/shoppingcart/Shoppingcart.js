import React, { useEffect } from "react";
import classnames from "classnames/bind";
import styles from "./Shoppingcart.module.scss";
import ProductForCart from "../../components/productforcart/ProductForCart.js";

import { Link } from "react-router-dom";
import NavigationBar from "../../components/navigation/NavigationBar";
import Footer from "../../components/footer/Footer";
import formatNumberWithCommas from "../../helper/formatNumber";
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "../../components/search-bar/SearchBar.js";
const link = document.createElement("link");
link.rel = "stylesheet";
link.href =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css";
const cx = classnames.bind(styles);

function ShoppingCart() {
  return (
    <div className={cx("baoboc")}>
      {" "}
      <NavigationBar />
      <div className={cx("  ")}>
        <div style={{}}>
          <ProductForCart />
        </div>
        <br className={cx("clearBoth")} />
      </div>
      <div className={cx("footer")}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col-12")}>
              <div className={cx("inner-content")}>
                <div className={cx("inner-left")}>
                  <Link to="/shop">
                    <div className={cx("row", "row-sm", "bt-order")}>
                      <a
                        className={cx(
                          "btn",
                          "btn-danger",
                          "btn-block",
                          "btn-blue"
                        )}
                        href="#"
                        style={{ width: "400px", margin: "auto" }}
                      >
                        {" "}
                        Tiếp tục mua sản phẩm khác tại cửa hàng{" "}
                      </a>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default ShoppingCart;
