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
import PowerIcon from "@mui/icons-material/Power";
import classnames from "classnames/bind";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import ScaleIcon from "@mui/icons-material/Scale";

import styles from "./ProductLapTopCard.module.scss";

const cx = classnames.bind(styles);
function ProductLapTopCard() {
  return (
    <div>
      <Card sx={{ maxWidth: 300, width: 280, marginTop: 3, marginLeft: 3 }}>
        <CardMedia
          sx={{
            height: "250px",
            width: 250,
            objectFit: "cover",
            margin: "auto",
            borderRadius: "10px",
          }}
          image="https://cdn.hoanghamobile.com/i/preview-np-V2/Uploads/ImageHightlight/5562_dell-inspiron-15-3520-71043874/artboard-1.png"
          title="MSI GF63 12UCX-841VN"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              color: "#FF7F50",
              caret: "#FF7F50",
              textAlign: "center",
            }}
          >
            MSI GF63 12UCX-841VN
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              color: "#FF7F50",
              caret: "#FF7F50",
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            {formatNumberWithCommas(24100000)} đ
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <div className={cx("tech-specifications")}>
              <div>
                <p className={"chip"} style={{ marginBottom: "2px" }}>
                  <MemoryIcon /> <space></space> Intel Celeron
                </p>
                <p className={"chip"} style={{ marginBottom: "2px" }}>
                  <ScreenshotMonitorIcon /> <space></space> 15.6 inch
                </p>
                <p className={"chip"} style={{ marginBottom: "2px" }}>
                  <PowerIcon /> <space></space> 1 khe
                </p>
                <p className={"chip"} style={{ marginBottom: "2px" }}>
                  <SettingsInputAntennaIcon /> <space></space> 120Hz
                </p>
              </div>
              <div>
                <p className={"chip"} style={{ marginBottom: "2px" }}>
                  <StorageIcon /> <space></space> 256 GB
                </p>
                <p className={"chip"} style={{ marginBottom: "2px" }}>
                  <SdStorageIcon /> <space></space> 12GB
                </p>
                <p className={"chip"} style={{ marginBottom: "2px" }}>
                  <GraphicEqIcon /> <space></space> RTX 2050
                </p>
                <p className={"chip"} style={{ marginBottom: "2px" }}>
                  <ScaleIcon /> <space></space> 1.98kg
                </p>
              </div>
            </div>
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            sx={{
              color: "#fff",
              caret: "#fff",
              background: "#FF7F50",
              textAlign: "center",
              margin: "auto",
              marginBottom: 2,
            }}
          >
            Mua ngay
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default ProductLapTopCard;
