import * as React from "react";
import NavigationBar from "../../components/navigation/NavigationBar";
import styles from "./HomePage.module.scss";
import classnames from "classnames/bind";
import Slider from "../../components/slider/Slider";
import SearchBar from "../../components/search-bar/SearchBar";
import HighLight from "../../components/highlight/HighLight";
import GlobalStyle from "../../globalstyles/GlobalStyle";

const cx = classnames.bind(styles);

function HomePage() {
  return (
    <GlobalStyle>
      <div className={cx("wrapper")}>
        <header className="header">
          <NavigationBar />
        </header>
        <section className={cx("search-bar")}>
          <SearchBar />
        </section>
        <section className={cx("slider")}>
          <Slider />
        </section>
        <section className={cx("highlight")}>
          <HighLight title={"Điện thoại bán chạy nhất"} />
        </section>
        <section className={cx("highlight")}>
          <HighLight title={"Đồng hồ bán chạy nhất"} />
        </section>
        <section className={cx("highlight")}>
          <HighLight title={"LapTop bán chạy nhất"} />
        </section>
      </div>
    </GlobalStyle>
  );
}

export default HomePage;
