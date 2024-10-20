import React from "react";
import styles from "./HighLight.module.scss";
import classnames from "classnames/bind";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const cx = classnames.bind(styles);
function HighLight({ title, content }) {
  return (
    <div className={cx("wrapper ")}>
      <div className={cx("line")}></div>
      <h1 className={cx("title")}>{title}</h1>
      <section className={cx("highlight-item-wrapper")}>
        <div>
          <Card sx={{ maxWidth: 240 }}>
            <CardMedia
              sx={{ height: "260px", objectFit: "contain" }}
              image="https://cdn2.fptshop.com.vn/unsafe/iphone_15_a9308b6994.png"
              title="Iphone 15 Pro Max"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ color: "#FF7F50", caret: "#FF7F50" }}
              >
                Iphone 15 Pro Max
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Ốp lưng chính hãng Apple giảm thêm 300K khi mua kèm iPhone (áp
                dụng tuỳ model)
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="outlined"
                sx={{ color: "#FF7F50", caret: "#FF7F50" }}
              >
                Xem ngay tại cửa hàng
              </Button>
            </CardActions>
          </Card>
        </div>
        <div>
          <Card sx={{ maxWidth: 240 }}>
            <CardMedia
              sx={{ height: "260px", objectFit: "contain" }}
              image="https://cdn2.fptshop.com.vn/unsafe/iphone_15_a9308b6994.png"
              title="Iphone 15 Pro Max"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ color: "#FF7F50", caret: "#FF7F50" }}
              >
                Iphone 15 Pro Max
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Ốp lưng chính hãng Apple giảm thêm 300K khi mua kèm iPhone (áp
                dụng tuỳ model)
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="outlined"
                sx={{
                  color: "#FF7F50",
                  caret: "#FF7F50",
                  borderColor: "#FF7F50",
                }}
              >
                Xem ngay tại cửa hàng
              </Button>
            </CardActions>
          </Card>
        </div>
        <div>
          <Card sx={{ maxWidth: 240 }}>
            <CardMedia
              sx={{ height: "260px", objectFit: "contain" }}
              image="https://cdn2.fptshop.com.vn/unsafe/iphone_15_a9308b6994.png"
              title="Iphone 15 Pro Max"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ color: "#FF7F50", caret: "#FF7F50" }}
              >
                Iphone 15 Pro Max
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Ốp lưng chính hãng Apple giảm thêm 300K khi mua kèm iPhone (áp
                dụng tuỳ model)
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="outlined"
                sx={{
                  color: "#FF7F50",
                  caret: "#FF7F50",
                  borderColor: "#FF7F50",
                }}
              >
                Xem ngay tại cửa hàng
              </Button>
            </CardActions>
          </Card>
        </div>
        <div>
          <Card sx={{ maxWidth: 240 }}>
            <CardMedia
              sx={{ height: "260px", objectFit: "contain" }}
              image="https://cdn2.fptshop.com.vn/unsafe/iphone_15_a9308b6994.png"
              title="Iphone 15 Pro Max"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ color: "#FF7F50", caret: "#FF7F50" }}
              >
                Iphone 15 Pro Max
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Ốp lưng chính hãng Apple giảm thêm 300K khi mua kèm iPhone (áp
                dụng tuỳ model)
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="outlined"
                sx={{
                  color: "#FF7F50",
                  caret: "#FF7F50",
                  borderColor: "#FF7F50",
                }}
              >
                Xem ngay tại cửa hàng
              </Button>
            </CardActions>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default HighLight;
