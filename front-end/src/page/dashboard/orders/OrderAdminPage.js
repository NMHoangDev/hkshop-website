import React, { useEffect, useState } from "react";
import styles from "./OrderAdminPage.module.scss";
import classnames from "classnames/bind";
import Stat from "../../../components/stats/Stat";
import axios from "axios";
import SideMenu from "../components/SideMenu";
import { NavigateNextOutlined } from "@mui/icons-material";
import TableProduct from "../components/table/TableProduct";
import { Button } from "@mui/material";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import FormAddProduct from "../components/formAddProduct/FormAddProduct";
import CloseIcon from "@mui/icons-material/Close";
import TableOrder from "../components/table/TableOrder";
import OrderChartPayment from "../components/chart/OrderChartPayment";
import OrderLineChartRevenue from "../components/chart/OrderLineChartRevenue";
import { fontSize, textAlign } from "@mui/system";

const cx = classnames.bind(styles);

function OrderAdminPage() {
  const [stats, setStats] = useState({});
  const [open, setOpen] = React.useState(false);
  const [percentage, setPercentage] = React.useState({});
  const [dataLineChart, setDataLineChart] = React.useState([]);
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
    axios
      .get("http://127.0.0.1:8000/admin/orders/list-orders")
      .then((response) => {
        console.log(response.data);
        setPercentage({
          COD: response.data.percentagePaymentWithCOD,
          hkPay: response.data.percentagePaymentWithHkPay,
        });
      });
    axios
      .get("http://127.0.0.1:8000/admin/orders/get-revenue")
      .then((response) => {
        setDataLineChart(response.data.daysRevenue);
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
            DashBoard/Đơn hàng
          </h1>
          <div></div>
          <div></div>
          <div></div>
        </header>

        <section className={cx("revenue")}>
          <h1 style={{ textAlign: "center" }}>Thống kê biểu đồ</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                width: "330px",
                height: "330px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                border: "solid 1px #ccc",
                borderRadius: "5px",
                boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
              }}
            >
              <h7 style={{ textAlign: "center" }}>
                Tương quan hình thức thanh toán
              </h7>
              <OrderChartPayment dataNew={percentage} />
            </div>
            <div
              style={{
                width: "630px",
                height: "330px",
                border: "solid 1px #ccc",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h7 style={{ textAlign: "center" }}>Doanh thu</h7>
              <OrderLineChartRevenue dataLineChart={dataLineChart} />
            </div>
          </div>
          <h1>Quản lí đơn hàng</h1>

          <hr></hr>
          <div className={cx("table")}>
            <TableOrder />
          </div>
        </section>
      </div>
    </div>
  );
}

export default OrderAdminPage;
