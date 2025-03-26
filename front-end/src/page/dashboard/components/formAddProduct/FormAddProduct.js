import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, FormGroup, Radio, RadioGroup } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { display, fontSize, lineHeight, textAlign } from "@mui/system";
import { Close, Info, RampLeftSharp } from "@mui/icons-material";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import axios from "axios";
import zIndex from "@mui/material/styles/zIndex";
import { Notyf } from "notyf";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import classnames from "classnames/bind";
import styles from "./FormAddProduct.module.scss";
import CloseIcon from "@mui/icons-material/Close";

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

function FormAddProduct() {
  const [infoProduct, setInfoProduct] = useState({
    rams: [],
    roms: [],
    colors: [],
  });
  const [base64Images, setBase64Image] = useState([]);
  const handleDeleteSelection = (event, indexDelete) => {
    setBase64Image(base64Images.filter((_, index) => index !== indexDelete));
  };

  const handleImageChange = (event) => {
    const files = event.target.files; // Lấy danh sách file được chọn
    if (files && files.length > 0) {
      const newImages = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push(e.target.result);
          // Sau khi tất cả file được đọc xong, cập nhật state
          if (newImages.length === files.length) {
            setBase64Image((prevBase64Image) => [
              ...prevBase64Image,
              ...newImages,
            ]);
          }
        };
        reader.readAsDataURL(file); // Đọc file dưới dạng Base64
      });
    }
  };
  const images = [
    "https://hatocase.com/wp-content/uploads/2022/08/in-op-lung-iphone-14-pro-max-yeu-cau-anh-dai-dien.jpg",
    "https://cdn.tgdd.vn/Products/Images/42/200533/iphone-11-pro-max-vang-1-1-750x500.jpg",
  ];
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
  const handleSubmit = () => {
    const data = { ...infoProduct, images_url: base64Images };
    axios
      .post("http://127.0.0.1:8000/admin/product/create-product", data)
      .then((response) => {
        if (response.data.product) {
          notyf.success("Thanh cong");
        }
      });
  };

  useEffect(() => {
    console.log(base64Images);
  }, [base64Images]);
  return (
    <form
      className="wrapper"
      style={{
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        overflowY: "auto",
        overflowX: "hidden",
        maxHeight: "600px",
        maxWidth: "800px",
        width: "fit-content",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Thêm Sản Phẩm Mới
      </h2>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          "& > :not(style)": { width: "100%" },
        }}
      >
        <TextField
          id="outlined-basic"
          label="Tên sản phẩm"
          variant="outlined"
          value={infoProduct.name}
          onChange={handleChangeValue}
          name="name"
        />
        <TextField
          id="outlined-basic"
          label="Hãng điện thoại"
          variant="outlined"
          value={infoProduct.brand}
          onChange={handleChangeValue}
          name="brand"
        />
        <Box sx={{ display: "flex", gap: "16px" }}>
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
        <TextField
          id="outlined-basic"
          label="Công nghệ màn hình"
          variant="outlined"
          value={infoProduct.tech_screen}
          name="tech_screen"
          onChange={handleChangeValue}
        />
        <Box sx={{ display: "flex", gap: "16px" }}>
          <TextField
            id="outlined-basic"
            label="Tần số quét màn hình (Hz)"
            variant="outlined"
            value={infoProduct.frequency}
            onChange={handleChangeValue}
            name="frequency"
          />
          <TextField
            id="filled-basic"
            label="Kích thước màn hình (inches)"
            variant="filled"
            onChange={handleChangeValue}
            value={infoProduct.screen}
            name="screen"
          />
        </Box>
        <Box sx={{ display: "flex", gap: "16px" }}>
          <TextField
            id="outlined-basic"
            label="Dung lượng pin (mAh)"
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
        <TextField
          id="outlined-basic"
          label="Tên Chip"
          variant="outlined"
          value={infoProduct.nameChip}
          onChange={handleChangeValue}
          name="nameChip"
        />
        <TextField
          id="outlined-basic"
          label="Độ phân giải (pixels)"
          variant="outlined"
          value={infoProduct.resolution}
          name="resolution"
          onChange={handleChangeValue}
        />
      </Box>

      <h4 style={{ marginTop: "20px", marginBottom: "10px", color: "#555" }}>
        Cấu hình RAM:
      </h4>
      <RadioGroup
        sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
        aria-labelledby="ram-options"
      >
        {["3", "4", "6", "8", "12"].map((value) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Checkbox />}
            label={`${value}GB`}
            sx={{
              color: "#333",
              "& .MuiSvgIcon-root": { color: "#ff7050" },
            }}
            onClick={handleCheckBoxRam}
            checked={infoProduct.rams.includes(value)}
          />
        ))}
      </RadioGroup>

      <h4 style={{ marginTop: "20px", marginBottom: "10px", color: "#555" }}>
        Cấu hình ROM:
      </h4>
      <RadioGroup
        sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
        aria-labelledby="rom-options"
      >
        {["32", "64", "128", "256", "512", "1"].map((value) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Checkbox />}
            label={`${value}${value === "1" ? "TB" : "GB"}`}
            sx={{
              color: "#333",
              "& .MuiSvgIcon-root": { color: "#ff7050" },
            }}
            onClick={handleCheckBoxRom}
            checked={infoProduct.roms.includes(value)}
          />
        ))}
      </RadioGroup>

      <h4 style={{ marginTop: "20px", marginBottom: "10px", color: "#555" }}>
        Màu sắc:
      </h4>
      <RadioGroup
        sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
        aria-labelledby="color-options"
      >
        {[
          { value: "blue", label: "Xanh da trời" },
          { value: "red", label: "Đỏ" },
          { value: "white", label: "Trắng" },
          { value: "black", label: "Đen" },
        ].map((color) => (
          <FormControlLabel
            key={color.value}
            value={color.value}
            control={<Checkbox />}
            label={color.label}
            sx={{
              color: "#333",
              "& .MuiSvgIcon-root": { color: color.value },
            }}
            onClick={handleCheckBoxColor}
            checked={infoProduct.colors.includes(color.value)}
          />
        ))}
      </RadioGroup>

      <h4 style={{ marginTop: "20px", marginBottom: "10px", color: "#555" }}>
        Upload hình ảnh:
      </h4>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={{
          backgroundColor: "#ff7050",
          "&:hover": { backgroundColor: "#e6644f" },
        }}
      >
        Upload files
        <VisuallyHiddenInput
          type="file"
          onChange={handleImageChange}
          multiple
        />
      </Button>
      <div
        className={cx("wrapper_image")}
        style={{ display: "flex", gap: "16px", marginTop: "20px" }}
      >
        {base64Images.map((image, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              width: "100px",
              height: "100px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <CloseIcon
              sx={{
                position: "absolute",
                top: "2px",
                right: "2px",
                cursor: "pointer",
                backgroundColor: "#e6644f",
                color: "#fff",
                borderRadius: "50%",
                zIndex: 1000,
              }}
              onClick={(event) => handleDeleteSelection(event, index)}
            />
            <img
              src={image}
              alt="Uploaded"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#ff7050",
            width: "200px",
            height: "50px",
            fontSize: "16px",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#e6644f" },
          }}
        >
          Tạo mới sản phẩm
        </Button>
      </div>
    </form>
  );
}

export default FormAddProduct;
