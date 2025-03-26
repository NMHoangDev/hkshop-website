import * as React from "react";
import NavigationBar from "../../components/navigation/NavigationBar";
import styles from "./HomePage.module.scss";
import classnames from "classnames/bind";
import Slider from "../../components/slider/Slider";
import SearchBar from "../../components/search-bar/SearchBar";
import HighLight from "../../components/highlight/HighLight";
import GlobalStyle from "../../globalstyles/GlobalStyle";
import Footer from "../../components/footer/Footer";

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
        <section className={cx("highlight1")}>
          <HighLight />
        </section>
        <div className={cx("footer")}>
          <Footer />
        </div>
      </div>
    </GlobalStyle>
  );
}

export default HomePage;
