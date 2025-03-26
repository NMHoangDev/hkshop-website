import React, { useEffect, useState } from "react";
import styles from "./AccountAdmin.module.scss";
import classnames from "classnames/bind";
import Stat from "../../../components/stats/Stat";
import axios from "axios";
import SideMenu from "../components/SideMenu";
import { NavigateNextOutlined } from "@mui/icons-material";
import TableProduct from "../components/table/TableProduct";
import { Button } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Backdrop from "@mui/material/Backdrop";

import FormAddProduct from "../components/formAddProduct/FormAddProduct";
import CloseIcon from "@mui/icons-material/Close";
import TableAccount from "../components/table/TableAccount";
import UserChart from "../components/chart/UserChart";

const cx = classnames.bind(styles);

function AccountAdmin() {
  const [stats, setStats] = useState({});
  const [open, setOpen] = React.useState(false);
  const [dataChart, setDataChart] = React.useState({});
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/admin/get-stats-info").then((response) => {
      setStats(response.data);
      console.log(response.data);
    });
  }, []);
  React.useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/admin/user/list-user-information")
      .then((response) => {
        setDataChart({
          have: response.data.percentageUsersHasHkPay,
          noHave: response.data.percentageUsersHasNoHkPay,
        });
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
            <NavigateNextOutlined />
            DashBoard/Account
          </h1>
          <div></div>
          <div></div>
          <div></div>
        </header>
        <div className={cx("wrapper-header")}>
          <header className={cx("stats")}>
            <Stat
              name={"Tài khoản"}
              value={stats.users}
              unit={"tài khoản"}
              color="#2b3a4a"
              icon="user"
            />
          </header>
        </div>
        <section className={cx("revenue")}>
          <h1>Tài khoản</h1>

          <hr></hr>
          <div className={cx("table")}>
            <TableAccount />
          </div>
        </section>
      </div>
    </div>
  );
}

export default AccountAdmin;
