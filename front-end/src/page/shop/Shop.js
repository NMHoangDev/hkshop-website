import React from "react";
import styles from "./Shop.module.scss";
import classnames from "classnames/bind";

import NavigationBar from "../../components/navigation/NavigationBar";
import Slider from "../../components/slider/Slider";
import BasicTabs from "../../components/selection/Selection";
import SearchBar from "../../components/search-bar/SearchBar";
import Footer from "../../components/footer/Footer";

const cx = classnames.bind(styles);
function Shop() {
  return (
    <div className={cx("wrapper")}>
      <header>
        <NavigationBar />
      </header>
      <div className={cx("searchBar")}>
        <SearchBar />
      </div>
      <div className="store-wrapper">
        <h1 className={cx("title")}>CỬA HÀNG</h1>
        <div className={cx("selection")}>
          <BasicTabs />
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Shop;
