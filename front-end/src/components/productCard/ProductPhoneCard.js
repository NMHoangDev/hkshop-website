import React from "react";
import formatNumberWithCommas from "../../helper/formatNumber";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MemoryIcon from "@mui/icons-material/Memory";
import ScreenshotMonitorIcon from "@mui/icons-material/ScreenshotMonitor";
import Battery4BarIcon from "@mui/icons-material/Battery4Bar";
import StorageIcon from "@mui/icons-material/Storage";
import SdStorageIcon from "@mui/icons-material/SdStorage";
import SettingsInputAntennaIcon from "@mui/icons-material/SettingsInputAntenna";
import classnames from "classnames/bind";
import styles from "./ProductPhoneCard.module.scss";
import { Link } from "react-router-dom";

const cx = classnames.bind(styles);
function ProductPhoneCard({
  id,
  name,
  price,
  nameChip,
  screenSize,
  pin,
  rom,
  ram,
  frequency,
  url_image,
}) {
  return (
    <Card
      sx={{
        width: "280px", // Cố định chiều rộng
        height: "450px", // Cố định chiều cao
        margin: "16px auto",
        padding: "12px",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Đổ bóng nhẹ
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Giữ mọi thứ cân đối
      }}
    >
      <CardMedia
        sx={{
          height: "180px", // Cố định chiều cao hợp lý
          width: "100%", // Chiều rộng tự động theo thẻ
          objectFit: "contain", // Đảm bảo hình ảnh không bị mất phần nào
          margin: "auto",
          borderRadius: "8px",
        }}
        image={url_image || "https://via.placeholder.com/250"} // Dùng hình ảnh thay thế nếu url_image bị lỗi
        title={name}
      />
      <CardContent sx={{ textAlign: "center", padding: "8px 0" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            color: "#FF7F50",
            fontWeight: 600,
            fontSize: "18px",
            marginBottom: "4px", // Giảm khoảng cách dưới
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            color: "#FF7F50",
            fontWeight: "bold",
            fontSize: "16px",
            marginBottom: "12px", // Giảm khoảng cách dưới giá
          }}
        >
          {formatNumberWithCommas(price)} đ
        </Typography>
        <div className={cx("tech-specifications")}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className={"chip"}>
              <MemoryIcon /> {nameChip}
            </p>
            <p className={"chip"}>
              <StorageIcon /> {rom} GB
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className={"chip"}>
              <ScreenshotMonitorIcon /> {screenSize} inches
            </p>
            <p className={"chip"}>
              <SdStorageIcon /> {ram} GB
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className={"chip"}>
              <Battery4BarIcon /> {pin} mAh
            </p>
            <p className={"chip"}>
              <SettingsInputAntennaIcon /> {frequency}Hz
            </p>
          </div>
        </div>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", marginTop: "4px" }}>
        <Link to={`/detail-page/${id}?id-product=${id}`}>
          <Button className={cx("buy-now-button")} sx={{ color: "#fff" }}>
            Mua ngay
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default ProductPhoneCard;
