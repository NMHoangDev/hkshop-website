import React, { useEffect, useState } from "react";
import styles from "./DetailPage.module.scss";
import classnames from "classnames/bind";
import NavigationBar from "../../components/navigation/NavigationBar";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Footer from "../../components/footer/Footer";
import SearchBar from "../../components/search-bar/SearchBar";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

import CardActionArea from "@mui/material/CardActionArea";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import DiscountIcon from "@mui/icons-material/Discount";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useRef } from "react";
import { Notyf } from "notyf";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import RateCard from "../dashboard/components/rate/RateCard";
import { display } from "@mui/system";
import FormAddRating from "../../components/Form Add Rating/FormAddRating";
import { Backdrop, Rating } from "@mui/material";
import formatNumberWithCommas from "../../helper/formatNumber";

const cx = classnames.bind(styles);

function DetailPage() {
  const [sim, setSim] = React.useState("");
  const [colors, setColors] = useState([]);
  const [rams, setRams] = useState([]);
  const [roms, setRoms] = useState([]);
  const [detailPhone, setDetailPhone] = useState({});
  const [mainImage, setMainImage] = useState("");
  const [subsidiaryImage, setSubsidiaryImage] = useState("");
  const [rates, setRate] = useState([]); // Update subsidiary image
  const [countCartItems, setCountCartItems] = React.useState(0);

  const [itemData, setItemData] = React.useState([]);
  const [selection, setSelection] = React.useState({
    ram: "",
    rom: "",
    color: "",
  });
  const handleDisplayBackDrop = (value) => {
    setOpen(value);
  };

  const navigate = useNavigate();
  const notyf = new Notyf({
    duration: 4000,
  });
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id-product");
    console.log(id);
    axios
      .get(`http://127.0.0.1:8000/get-detail-product?id=${id}`)
      .then((response) => {
        setDetailPhone(response.data.detail[0]);
        console.log(response.data.detail[0]);
        setMainImage(response.data.detail[0].image_urls[0]);
        setItemData(response.data.detail[0].image_urls);
      });

    axios
      .get(
        `http://127.0.0.1:8000/product/get-selection-product-by-id?id_product=${id}`
      )
      .then((response) => {
        console.log(response.data);
        setColors(response.data.colors);
        setRams(response.data.rams);
        setRoms(response.data.roms);
      });
  }, []);
  function createData(name, desc) {
    return { name, desc };
  }

  const rows = [
    createData("Chip xử lý", detailPhone.nameChip),
    createData("RAM ", rams),
    createData("Bộ nhớ trong", roms),
    createData("Hỗ trợ 5G", " Có"),
    createData(
      "Độ phân giải màn hình ngoài",
      `${detailPhone.resolution} pixels`
    ),
    createData(
      "Độ phân giải màn hình chính",
      `${detailPhone.resolution} pixels`
    ),
    createData("Công nghệ màn hình", detailPhone.tech_screen),
    createData("Kích thước", `${detailPhone.screen} inches`),
    createData("Dung lượng pin", `${detailPhone.pin}mAh`),
    createData("Cổng kết nối", " Type-C"),
  ];
  const mainImageRef = useRef(null);
  // Lấy slug từ URL
  function handleChangeImage(event) {
    // const mainImage = document.getElementById("main-image");
    console.log(event.target.src);
    setMainImage(event.target.src);
    console.log(event.target.name === mainImage);
  }
  function handleClickAddCartButton(event) {
    const account = JSON.parse(localStorage.getItem("account"));
    const data = {
      idProduct: detailPhone.id,
      idCustomer: account.id,
      price: detailPhone.price,
      quantity: 1,
      status: "not-paid",
      ram: selection.ram,
      rom: selection.rom,
      color: selection.color,
    };
    if (!account) {
      navigate("/sign-in");
      notyf.error("Vui lòng đăng nhập để mua sản phẩm");
    } else {
      if (
        selection.ram === "" ||
        selection.rom === "" ||
        selection.color === ""
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Vui lòng chọn màu, ram, bộ nhớ trong bạn mong muốn!",
        });
      } else {
        axios
          .post("http://127.0.0.1:8000/cart/add-item-to-cart", data)
          .then((response) => {
            console.log(response.data);
            Swal.fire({
              title: "Sản phẩm đã được thêm vào giỏ hàng!!",
              width: 600,
              padding: "3em",
              color: "#716add",
              background:
                "#fff url(https://sweetalert2.github.io/#examplesimages/trees.png)",
              backdrop: `
              rgba(0,0,123,0.4)
              url("https://sweetalert2.github.io/#examplesimages/nyan-cat.gif")
              left top
              no-repeat
            `,
            });
          });

        axios
          .get(
            `http://127.0.0.1:8000/cart/count-cart-item?id-customer=${account.id}`
          )
          .then((response) => {
            setCountCartItems(response.data.countCartItems);
          });
      }
    }
  }
  function handleChangeCheckedBox(event) {
    switch (event.target.name) {
      case "ram": {
        setSelection({ ...selection, ram: event.target.value });
        break;
      }
      case "rom": {
        setSelection({ ...selection, rom: event.target.value });
        break;
      }
      case "color": {
        setSelection({ ...selection, color: event.target.value });
        break;
      }
      default: {
        return false;
      }
    }
  }
  console.log(detailPhone);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id-product");
    axios
      .get(`http://127.0.0.1:8000/products/list-rate?id_product=${id}`)
      .then((response) => {
        console.log(response.data.rates);
        setRate(response.data.rates);
      });
  }, []);

  return (
    <div className={cx("wrapper")}>
      <header className={cx("nav-bar")}>
        <NavigationBar />
      </header>
      <section
        style={{
          borderBottom: "solid 1px #FF7050",
        }}
      >
        <SearchBar countItems={countCartItems} />
      </section>
      <section className={cx("main-detail")}>
        <div className={cx("images-product")}>
          {/* Ảnh chính */}
          <div className={cx("main-image-container")}>
            <img
              src={mainImage}
              alt="Iphone"
              loading="lazy"
              className={cx("main-image")}
              ref={mainImageRef}
            />
          </div>

          {/* Danh sách ảnh nhỏ */}
          <div className={cx("image-list")}>
            {itemData.map((item, index) => (
              <div
                key={index}
                className={cx("image-item", {
                  selected: mainImage === item, // Đánh dấu ảnh đang chọn
                })}
                onClick={() => setMainImage(item)} // Cập nhật ảnh chính khi click
              >
                <img
                  src={item}
                  alt={`Thumbnail ${index}`}
                  loading="lazy"
                  className={cx("thumbnail-image")}
                />
              </div>
            ))}
          </div>

          {/* Thông số kỹ thuật */}
          <div className={cx("technical-specifications")}>
            <TableContainer component={Paper}>
              <Table aria-label="a dense table" className={cx("table")}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <p className={cx("table-header")}>Thông số kĩ thuật</p>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">
                        {!Array.isArray(row.desc)
                          ? row.desc
                          : row.desc.map((rowItem, index) => {
                              if (rowItem.ram) {
                                return ` | ${rowItem.ram} GB | `;
                              }
                              if (rowItem.rom) {
                                return ` | ${rowItem.rom} GB | `;
                              }
                              return null;
                            })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        <section className={cx("information-detail")}>
          <h1 className={cx("name-product")}>{detailPhone.name}</h1>
          <hr></hr>
          <p className={cx("price")}>
            {formatNumberWithCommas(detailPhone.price)} VND
          </p>

          <div
            style={{
              color: "#000",
              display: "flex",
              alignItems: "center",
              padding: "4px",
            }}
          >
            {detailPhone.rate == 0 ? (
              "Chưa có đánh giá nào"
            ) : (
              <div>
                <h5
                  style={{ fontStyle: "oblique", textDecoration: "underline" }}
                >
                  {detailPhone.rate}
                </h5>
                <Rating
                  name="read-only"
                  value={Math.round(detailPhone.rate)}
                  readOnly
                  sx={{ marginBottom: "10px", marginLeft: "4px" }}
                />
              </div>
            )}
          </div>
          <div className={cx("information-detail")}>
            {/* Color Options */}
            <FormControl>
              <FormLabel id="color-label" className={cx("color-label")}>
                Color:
              </FormLabel>
              <div className={cx("radio-group")}>
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className={cx("color-option")}
                    onClick={() =>
                      setSelection({ ...selection, color: color.color })
                    }
                  >
                    <div
                      className={cx("color-circle", {
                        selected: selection.color === color.color,
                      })}
                      style={{
                        backgroundColor: color.color,
                      }}
                    ></div>
                    <span>{color.color.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </FormControl>

            {/* RAM Options */}
            <FormControl>
              <FormLabel id="ram-label" className={cx("ram-label")}>
                Ram:
              </FormLabel>
              <div className={cx("option-group")}>
                {rams.map((ram, index) => (
                  <label key={index} className={cx("option")}>
                    <input
                      type="radio"
                      name="ram"
                      value={ram.ram}
                      onChange={handleChangeCheckedBox}
                      checked={selection.ram == ram.ram}
                    />
                    <span>{`${ram.ram} GB`}</span>
                  </label>
                ))}
              </div>
            </FormControl>

            {/* Storage Options */}
            <FormControl>
              <FormLabel id="rom-label" className={cx("rom-label")}>
                Bộ nhớ trong:
              </FormLabel>
              <div className={cx("option-group")}>
                {roms.map((rom, index) => (
                  <label key={index} className={cx("option")}>
                    <input
                      type="radio"
                      name="rom"
                      value={rom.rom}
                      onChange={handleChangeCheckedBox}
                      checked={selection.rom == rom.rom}
                    />
                    <span>{`${rom.rom} GB`}</span>
                  </label>
                ))}
              </div>
            </FormControl>
          </div>

          <div className={"discount"}>
            <Card sx={{ maxWidth: 345, marginTop: "20px", margin: "auto" }}>
              <CardContent>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", marginTop: "4px" }}
                >
                  <TaskAltIcon sx={{ color: "#FF7050", marginTop: "4px" }} />{" "}
                  <space></space> Dán cường lực miễn phí
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", marginTop: "4px" }}
                >
                  <TaskAltIcon sx={{ color: "#FF7050" }} /> <space></space> Giảm
                  10% phụ kiện mua kèm
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", marginTop: "4px" }}
                >
                  <TaskAltIcon sx={{ color: "#FF7050" }} /> <space></space> Máy
                  cũ đổi mới trợ giá
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", marginTop: "4px" }}
                >
                  <TaskAltIcon sx={{ color: "#FF7050" }} /> <space></space> Cài
                  đặt phần mềm miễn phí trọn đời
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", marginTop: "4px" }}
                >
                  <TaskAltIcon sx={{ color: "#FF7050" }} /> <space></space> Giao
                  hàng COD toàn quốc
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className={cx("button-group")}>
            <Button
              variant="contained"
              sx={{
                width: "100%",
                marginTop: "10px",
                height: "50px",
                backgroundColor: "#FF7050",
              }}
              onClick={() => {
                const encodedCartItem = encodeURIComponent(
                  JSON.stringify([
                    {
                      ...detailPhone,
                      quantity: 1,
                      isNotCartItem: true,
                      idProduct: detailPhone.id,
                      ram: Number(selection.ram),
                      rom: Number(selection.rom),
                      ram: Number(selection.ram),
                    },
                  ])
                );
                if (
                  selection.ram === "" ||
                  selection.rom === "" ||
                  selection.color === ""
                ) {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Vui lòng chọn màu, ram, bộ nhớ trong bạn mong muốn!",
                  });
                } else {
                  navigate(`/checkout?data=${encodedCartItem}`);
                }
              }}
              className={cx("MuiButton-root")}
            >
              Đặt mua ngay
            </Button>
            <Button
              variant="outlined"
              href="#outlined-buttons"
              sx={{
                width: "100%",
                marginTop: "10px",
                height: "50px",
                color: "#FF7050",
              }}
              onClick={handleClickAddCartButton}
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
          <Card sx={{ width: "100%", marginTop: "20px" }}>
            <CardActionArea>
              <CardContent sx={{ padding: 0, width: "100%" }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    backgroundColor: "#f8bcae",
                    padding: 0,
                    height: "50px",
                    lineHeight: "50px",
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#FF7050",
                  }}
                >
                  <p style={{ marginLeft: "30px" }}>
                    <CardGiftcardIcon
                      sx={{
                        marginRight: "10px",
                        fontSize: "30px",
                        marginBottom: " 8px",
                      }}
                    />
                    Ưu đãi tại HK SHOP
                  </p>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#ff7050",
                    paddingTop: "10px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <p>
                    <DiscountIcon
                      sx={{
                        marginRight: "10px",
                        maxWidth: "95%",
                        marginBottom: " 8px",
                      }}
                    />
                    Thu cũ điện thoại gập hỗ trợ thêm 4 triệu đồng/Thu cũ điện
                    thoại khác hỗ trợ tới 3 triệu đồng{" "}
                    <Link to="/buy-old">(Xem chi tiết)</Link>
                  </p>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#ff7050",
                    paddingTop: "10px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <p>
                    <DiscountIcon
                      sx={{
                        marginRight: "10px",
                        maxWidth: "95%",
                        marginBottom: " 8px",
                      }}
                    />
                    Tặng 1 năm Phone Care+
                  </p>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#ff7050",
                    paddingTop: "10px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <p>
                    <DiscountIcon
                      sx={{
                        marginRight: "10px",
                        maxWidth: "95%",
                        marginBottom: " 8px",
                      }}
                    />
                    Tặng Đồng hồ Samsung Galaxy Watch FE/Apple Watch trị giá
                    4.990.000
                  </p>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#ff7050",
                    paddingTop: "10px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <p>
                    <DiscountIcon
                      sx={{
                        marginRight: "10px",
                        maxWidth: "95%",
                        marginBottom: " 8px",
                      }}
                    />
                    Giảm tới 300.000đ cho đơn hàng từ 2.000.000đ khi thanh toán
                    chuyển khoản
                  </p>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#ff7050",
                    paddingTop: "10px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <p>
                    <DiscountIcon
                      sx={{
                        marginRight: "10px",
                        maxWidth: "95%",
                        marginBottom: " 8px",
                      }}
                    />
                    Trả góp tới 06 tháng không lãi suất, trả trước 0 đồng.
                  </p>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </section>
      </section>
      <section className={cx("rate")}>
        <h1
          className={"rate-title"}
          style={{ textAlign: "center", marginTop: 10 }}
        >
          Đánh giá
        </h1>

        <hr></hr>
        <div className={cx("wrapper-rate")}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              sx={{ width: "300px", height: "60px", margin: "auto" }}
              onClick={handleOpen}
            >
              {" "}
              Đánh giá sản phẩm
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
              <FormAddRating
                idProduct={detailPhone.id}
                onDisplayBackdrop={handleDisplayBackDrop}
              />
            </Backdrop>
          </div>

          {rates.map((rate) => {
            return (
              <RateCard
                name={rate.name[0]}
                comment={rate.comment}
                avatar={rate.avatar[0]}
                dateRate={rate.date_rate}
                imageUrlList={rate.image_rates}
                star={rate.star}
              />
            );
          })}
        </div>
      </section>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default DetailPage;
