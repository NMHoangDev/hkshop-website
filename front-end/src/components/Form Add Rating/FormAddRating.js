import React from "react";
import styles from "./FormAddRating.module.scss";
import classnames from "classnames/bind";
import { Button, Rating, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Notyf } from "notyf";

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

const cx = classnames.bind(styles);

function FormAddRating({ idProduct, onDisplayBackdrop }) {
  const [star, setStar] = React.useState(0);
  const [base64Images, setBase64Image] = React.useState([]);
  const [comment, setComment] = React.useState("");
  const handleDeleteSelection = (event, indexDelete) => {
    setBase64Image(base64Images.filter((_, index) => index !== indexDelete));
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setBase64Image((preBase64Image) => {
          return [...preBase64Image, e.target.result];
        });
        // Lưu chuỗi Base64 vào state
      };

      reader.readAsDataURL(file); // Đọc file dưới dạng Base64
    }
  };
  const handleChangeComment = (event) => {
    setComment(event.target.value);
  };
  const notyf = new Notyf();
  const handleSubmit = () => {
    const account = JSON.parse(localStorage.getItem("account"));
    const data = {
      id_user: account.id,
      id_product: idProduct,
      star: star,
      comment: comment,
      images: base64Images,
    };
    console.log(data);
    axios
      .post("http://127.0.0.1:8000/products/create-rate", data)
      .then((response) => {
        if (response.data.status) {
          notyf.success("Đánh giá thành công");
          onDisplayBackdrop(false);
        }
      });
  };
  return (
    <div className={cx("wrapper")}>
      <h1 style={{ textAlign: "center", marginTop: "10px", color: "#000" }}>
        Đánh giá sản phẩm
      </h1>
      <Rating
        name="simple-controlled"
        value={star}
        onChange={(event, newValue) => {
          setStar(newValue);
        }}
      />
      <TextField
        label="Bình luận"
        sx={{ margin: "10px", width: "300px" }}
        value={comment}
        onChange={handleChangeComment}
      />
      <h4 style={{ color: "#000", textAlign: "left" }}>Hình ảnh:</h4>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        sx={{ margin: "10px" }}
        onChange={handleImageChange}
      >
        Chọn hình ảnh
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => console.log(event.target.files)}
          multiple
        />
      </Button>
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
      <Button
        variant="outlined"
        sx={{ width: "150px", height: "60px" }}
        onClick={handleSubmit}
      >
        Đánh giá
      </Button>
    </div>
  );
}

export default FormAddRating;
