import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, FormGroup, Radio, RadioGroup } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { display, fontSize, lineHeight, textAlign } from "@mui/system";
import { Info, RampLeftSharp } from "@mui/icons-material";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import axios from "axios";
import zIndex from "@mui/material/styles/zIndex";
import { Notyf } from "notyf";
import classnames from "classnames/bind";
import styles from "./FormUpdateProduct.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const cx = classnames.bind(styles);

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function FormUpdateProduct({ infoProductDetail }) {
  const [infoProduct, setInfoProduct] = useState(infoProductDetail);
  const [base64Images, setBase64Image] = useState(infoProductDetail.image_url);

  const notyf = new Notyf();

  const handleCheckBoxRam = (event) => {
    setInfoProduct((prevInfoProduct) => {
      const newRams = prevInfoProduct.rams.includes(event.target.value)
        ? prevInfoProduct.rams.filter((ram) => ram != event.target.value)
        : [...prevInfoProduct.rams, event.target.value];

      return {
        ...prevInfoProduct,
        rams: newRams,
      };
    });
  };
  const handleCheckBoxRom = (event) => {
    setInfoProduct((prevInfoProduct) => {
      const newRoms = prevInfoProduct.roms.includes(event.target.value)
        ? prevInfoProduct.roms.filter((rom) => rom != event.target.value)
        : [...prevInfoProduct.roms, event.target.value];

      return {
        ...prevInfoProduct,
        roms: newRoms,
      };
    });
  };
  const handleCheckBoxColor = (event) => {
    setInfoProduct((prevInfoProduct) => {
      const newColors = prevInfoProduct.colors.includes(event.target.value)
        ? prevInfoProduct.colors.filter((color) => color != event.target.value)
        : [...prevInfoProduct.colors, event.target.value];

      return {
        ...prevInfoProduct,
        colors: newColors,
      };
    });
  };
  const handleChangeValue = (event) => {
    console.log(infoProduct);
    setInfoProduct((prevInfoProduct) => {
      return { ...prevInfoProduct, [event.target.name]: event.target.value };
    });
  };
  const handleDeleteSelection = (event, indexDelete) => {
    setBase64Image(base64Images.filter((_, index) => index !== indexDelete));
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setBase64Image((preBase64Image) => {
            return [...preBase64Image, e.target.result];
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = () => {
    console.log(infoProduct.name);
    axios
      .patch("http://127.0.0.1:8000/admin/product/update-product", {
        ...infoProduct,
        images_url: base64Images,
      })
      .then((response) => {
        if (response.data.status) {
          notyf.success("Cập nhật thành công");
        } else {
          notyf.error("Cập nhật thất bại");
        }
      });
  };
  return (
    <form
      className="wrapper"
      style={{
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "5px",
        overflowY: "auto",
        overflowX: "hidden",
        maxHeight: "600px",
        width: "fit-content",
      }}
    >
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 2, width: "100%" } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Tên sản phẩm"
          variant="outlined"
          sx={{ width: "20%" }}
          value={infoProduct.name}
          onChange={handleChangeValue}
          name="name"
        />
        <TextField
          id="outlined-basic"
          label="Hãng điện thoại"
          variant="outlined"
          sx={{ width: "20%" }}
          value={infoProduct.brand}
          onChange={handleChangeValue}
          name="brand"
        />
      </Box>

      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 2, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Giá tiền"
          variant="outlined"
          value={infoProduct.price}
          name="price"
          onChange={handleChangeValue}
        />
        <TextField
          id="filled-basic"
          label="Số lượng"
          variant="filled"
          value={infoProduct.quantity}
          name="quantity"
          onChange={handleChangeValue}
        />
      </Box>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 2, width: "100%" } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Công nghệ màn hình"
          variant="outlined"
          value={infoProduct.tech_screen}
          name="tech_screen"
          onChange={handleChangeValue}
        />
      </Box>

      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 2, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Tần số quét màn hình(Hz)"
          variant="outlined"
          value={infoProduct.frequency}
          onChange={handleChangeValue}
          name="frequency"
        />
        <TextField
          id="filled-basic"
          label="Kích thước màn hình(inches)"
          variant="filled"
          onChange={handleChangeValue}
          value={infoProduct.screen}
          name="screen"
        />
      </Box>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 2, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Dung lượng pin(mAh)"
          variant="outlined"
          value={infoProduct.pin}
          name="pin"
          onChange={handleChangeValue}
        />
        <TextField
          id="filled-basic"
          label="Hệ điều hành"
          variant="filled"
          value={infoProduct.os}
          name="os"
          onChange={handleChangeValue}
        />
      </Box>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 2, width: "100%" } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Tên Chip"
          variant="outlined"
          sx={{ width: "20%" }}
          value={infoProduct.nameChip}
          onChange={handleChangeValue}
          name="nameChip"
        />
      </Box>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 2, width: "100%" } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Độ phân giải(pixels)"
          variant="outlined"
          sx={{ width: "20%" }}
          value={infoProduct.resolution}
          name="resolution"
          onChange={handleChangeValue}
        />
      </Box>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        sx={{ display: "flex", justifyContent: "flex-start" }}
      >
        <h4 style={{ color: "#000", textAlign: "left" }}>Ram:</h4>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <FormControlLabel
            value="3"
            control={<Radio />}
            label="3GB"
            sx={{ color: "#000" }}
            checked={infoProduct.rams.includes("3")}
            onClick={handleCheckBoxRam}
          />
          <FormControlLabel
            value="4"
            checked={infoProduct.rams.includes("4")}
            control={<Radio />}
            label="4GB"
            onClick={handleCheckBoxRam}
            sx={{ color: "#000" }}
          />
          <FormControlLabel
            value="6"
            control={<Radio />}
            label="6GB"
            onClick={handleCheckBoxRam}
            checked={infoProduct.rams.includes("6")}
            sx={{ color: "#000" }}
          />
          <FormControlLabel
            value="8"
            control={<Radio />}
            label="8GB"
            onClick={handleCheckBoxRam}
            checked={infoProduct.rams.includes("8")}
            sx={{ color: "#000" }}
          />
          <FormControlLabel
            value="12"
            control={<Radio />}
            label="12GB"
            onClick={handleCheckBoxRam}
            checked={infoProduct.rams.includes("12")}
            sx={{ color: "#000" }}
          />
        </div>
      </RadioGroup>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        sx={{ display: "flex", justifyContent: "flex-start" }}
      >
        <h4 style={{ color: "#000", marginTop: "10px", textAlign: "left" }}>
          Rom:
        </h4>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <FormControlLabel
            value="32"
            control={<Radio />}
            label="32GB"
            checked={infoProduct.roms.includes("32")}
            sx={{ color: "#000" }}
            onClick={handleCheckBoxRom}
          />
          <FormControlLabel
            value="64"
            control={<Radio />}
            label="64GB"
            checked={infoProduct.roms.includes("64")}
            sx={{ color: "#000" }}
            onClick={handleCheckBoxRom}
          />
          <FormControlLabel
            value="128"
            control={<Radio />}
            label="128GB"
            sx={{ color: "#000" }}
            checked={infoProduct.roms.includes("128")}
            onClick={handleCheckBoxRom}
          />
          <FormControlLabel
            value="256"
            control={<Radio />}
            label="256GB"
            sx={{ color: "#000" }}
            onClick={handleCheckBoxRom}
            checked={infoProduct.roms.includes("256")}
          />
          <FormControlLabel
            value="512"
            control={<Radio />}
            label="512GB"
            sx={{ color: "#000" }}
            onClick={handleCheckBoxRom}
            checked={infoProduct.roms.includes("512")}
          />
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="1TB"
            sx={{ color: "#000" }}
            onClick={handleCheckBoxRom}
            checked={infoProduct.roms.includes("1")}
          />
        </div>
      </RadioGroup>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        sx={{ display: "flex", justifyContent: "flex-start" }}
      >
        <h4 style={{ color: "#000", textAlign: "left" }}>Color:</h4>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <FormControlLabel
            value="blue"
            control={<Radio />}
            label="Xanh da trời"
            sx={{ color: "#000" }}
            onClick={handleCheckBoxColor}
            checked={infoProduct.colors.includes("blue")}
          />
          <FormControlLabel
            value="red"
            control={<Radio />}
            label="Đỏ"
            sx={{ color: "#000" }}
            onClick={handleCheckBoxColor}
            checked={infoProduct.colors.includes("red")}
          />
          <FormControlLabel
            value="white"
            control={<Radio />}
            label="Trắng"
            sx={{ color: "#000" }}
            onClick={handleCheckBoxColor}
            checked={infoProduct.colors.includes("white")}
          />
          <FormControlLabel
            value="black"
            control={<Radio />}
            label="Đen"
            sx={{ color: "#000" }}
            onClick={handleCheckBoxColor}
            checked={infoProduct.colors.includes("black")}
          />
        </div>
      </RadioGroup>
      <Box>
        <h4 style={{ color: "#000" }}>Upload hình ảnh:</h4>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          onChange={handleImageChange}
          sx={{ margin: "20px" }}
        >
          Chọn hình ảnh
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => console.log(event.target.files)}
            multiple
          />
        </Button>
      </Box>
      <div className={cx("wrapper_image")}>
        {base64Images.map((image, index) => {
          return (
            <div className={cx("image")}>
              <CloseIcon
                sx={{
                  color: "#000",
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  borderRadius: "50%",
                  backgroundColor: "#ccc",
                }}
                onClick={(event) => handleDeleteSelection(event, index)}
              />
              <img alt="ảnh điện thoại" src={image} id={index} />
            </div>
          );
        })}
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      ></div>

      <Button variant="contained" onClick={handleSubmit}>
        Xác nhận cập nhật
      </Button>
    </form>
  );
}

export default FormUpdateProduct;
