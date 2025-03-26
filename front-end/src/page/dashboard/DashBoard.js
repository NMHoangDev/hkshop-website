import React, { useEffect, useState } from "react";
import classnames from "classnames/bind";
import styles from "./DashBoard.module.scss";
import SideMenu from "./components/SideMenu";
import Stat from "../../components/stats/Stat";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import TablePagination from "./components/table/Table";
import TableDetailForDashBoard from "./components/table/Table";
import axios from "axios";

const cx = classnames.bind(styles);

function Dashboard() {
  const [stats, setStats] = useState({});
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/admin/get-stats-info").then((response) => {
      setStats(response.data);
      console.log(response.data);
    });
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("side-menu")}>
        <SideMenu />
      </div>
      <div className={cx("main-Store")}>
        <header className={cx("header")}>
          <h1 className={cx("location")}>
            <NavigateNextIcon />
            DashBoard/Home
          </h1>
          <div></div>
          <div></div>
          <div></div>
        </header>
        <header className={cx("stats")}>
          <Stat
            name={"Tài khoản"}
            value={stats.users}
            unit={"tài khoản"}
            color="#6e4f4a"
            icon="user"
          />
          <Stat
            name={"Khách hàng"}
            value={stats.customers}
            unit={"khách hàng"}
            color="#8b2e3a"
            icon="customer"
          />
          <Stat
            name={"Đơn hàng"}
            value={stats.orders}
            unit={"đơn hàng"}
            color="#4a4a4a"
            icon="order"
          />
          <Stat
            name={"Sản phẩm"}
            value={stats.products}
            unit={"sản phẩm"}
            color="#2b3a4a"
            icon="product"
          />
          <Stat
            name={"Doanh thu"}
            value={stats.revenue}
            unit={"VND"}
            color="#6e4f4a"
            icon="revenue"
          />
        </header>
        <section className={cx("revenue")}>
          <h1>Khách hàng</h1>
          <hr></hr>
          <div className={cx("table")}>
            <TableDetailForDashBoard />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
