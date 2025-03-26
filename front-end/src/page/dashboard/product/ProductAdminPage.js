import React, { useEffect, useState } from "react";
import styles from "./ProductAdminPage.module.scss";
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
import ProductBrandChart from "../components/chart/ProductChart";
import { textAlign } from "@mui/system";
import FormAddRam from "../components/formAddRam/FormAddRam";
import FormAddRom from "../components/formAddRom/FormAddRom";
import FormAddColor from "../components/formAddColor/FormAddRam";

const cx = classnames.bind(styles);

function ProductAdminPage() {
  const [stats, setStats] = useState({});
  const [open, setOpen] = React.useState(false);
  const [openRam, setOpenRam] = React.useState(false);
  const [openRom, setOpenRom] = React.useState(false);
  const [openColor, setOpenColor] = React.useState(false);
  const [dataChart, setDataChart] = React.useState({});
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseRam = () => {
    setOpenRam(false);
  };
  const handleOpenRam = () => {
    setOpenRam(true);
  };
  const handleCloseRom = () => {
    setOpenRom(false);
  };
  const handleOpenRom = () => {
    setOpenRom(true);
  };
  const handleCloseColor = () => {
    setOpenColor(false);
  };
  const handleOpenColor = () => {
    setOpenColor(true);
  };
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/admin/get-stats-info").then((response) => {
      setStats(response.data);

      console.log(response.data);
    });
    axios
      .get("http://127.0.0.1:8000/admin/product/list-product")
      .then((response) => {
        setDataChart({
          totalQuantity: response.data.totalProduct,
          apple: response.data.productsApple,
          samsung: response.data.productsSamsung,
          vivo: response.data.productsVivo,
          xiaomi: response.data.productsXiaomi,
          oppo: response.data.productsOppo,
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
            DashBoard/Product
          </h1>
          <div></div>
          <div></div>
          <div></div>
        </header>
        <h1
          style={{
            textAlign: "center",
            padding: "4px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          Biểu đồ tương quan
        </h1>
        <div className={cx("wrapper-header")}>
          <header className={cx("stats")}>
            <Stat
              name={"Sản phẩm"}
              value={stats.products}
              unit={"sản phẩm"}
              color="#2b3a4a"
              icon="product"
            />
          </header>
          <div
            style={{
              width: "500px",
              height: "400px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h8 style={{ textAlign: "center" }}>
              So Sánh Số lượng sản phẩm của hãng Kỹ Thuật
            </h8>
            <ProductBrandChart dataSet={dataChart} />
          </div>
        </div>
        <section className={cx("revenue")}>
          <h1>Sản phẩm</h1>
          <div className={cx("wrapper_add_btn")}>
            <div>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#FF7050",
                  margin: "20px",
                  height: "60px",
                }}
                onClick={handleOpen}
              >
                Thêm sản phẩm
                <ControlPointIcon />
              </Button>
              <Backdrop
                sx={(theme) => ({
                  color: "#fff",
                  zIndex: theme.zIndex.drawer + 1,
                })}
                open={open}
              >
                <div
                  style={{ position: "absolute", right: "4px", top: "4px" }}
                  onClick={handleClose}
                >
                  <CloseIcon />
                </div>
                <FormAddProduct />
              </Backdrop>
            </div>
            <div>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#28A745",
                  margin: "20px",
                  height: "60px",
                }}
                onClick={handleOpenRam}
              >
                Thêm loại ram
                <ControlPointIcon />
              </Button>
              <Backdrop
                sx={(theme) => ({
                  color: "#fff",
                  zIndex: theme.zIndex.drawer + 1,
                })}
                open={openRam}
              >
                <div
                  style={{ position: "absolute", right: "4px", top: "4px" }}
                  onClick={handleCloseRam}
                >
                  <CloseIcon />
                </div>
                <FormAddRam />
              </Backdrop>
            </div>
            <div>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#B0BEC5",
                  margin: "20px",
                  height: "60px",
                }}
                onClick={handleOpenRom}
              >
                Thêm loại Rom
                <ControlPointIcon />
              </Button>
              <Backdrop
                sx={(theme) => ({
                  color: "#fff",
                  zIndex: theme.zIndex.drawer + 1,
                })}
                open={openRom}
              >
                <div
                  style={{ position: "absolute", right: "4px", top: "4px" }}
                  onClick={handleCloseRom}
                >
                  <CloseIcon />
                </div>
                <FormAddRom />
              </Backdrop>
            </div>
            <div>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#FFA500",
                  margin: "20px",
                  height: "60px",
                }}
                onClick={handleOpenColor}
              >
                Thêm màu
                <ControlPointIcon />
              </Button>
              <Backdrop
                sx={(theme) => ({
                  color: "#fff",
                  zIndex: theme.zIndex.drawer + 1,
                })}
                open={openColor}
              >
                <div
                  style={{ position: "absolute", right: "4px", top: "4px" }}
                  onClick={handleCloseColor}
                >
                  <CloseIcon />
                </div>
                <FormAddColor />
              </Backdrop>
            </div>
          </div>
          <hr></hr>
          <div className={cx("table")}>
            <TableProduct />
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProductAdminPage;
