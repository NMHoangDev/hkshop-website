import { Button, TextField } from "@mui/material";
import { width } from "@mui/system";
import axios from "axios";
import { Notyf } from "notyf";
import React from "react";

function FormAddRam() {
  const [value, setValue] = React.useState("");
  const notyf = new Notyf();
  const handleChangeValue = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = () => {
    axios
      .post("http://127.0.0.1:8000/admin/product/create-type-ram", {
        type_ram: value,
      })
      .then((response) => {
        if (response.data.status) {
          notyf.success("Thêm loại ram thành công");
        }
      });
  };
  return (
    <div
      style={{
        width: "300px",
        backgroundColor: "#fff",
        height: "200px",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <TextField
        id="outlined-basic"
        label="Loại Ram(GB)"
        variant="outlined"
        sx={{ width: "100%" }}
        value={value}
        name="resolution"
        onChange={handleChangeValue}
      />
      <Button
        variant="contained"
        sx={{ marginTop: "20px", backgroundColor: "#4A4A4A" }}
        onClick={() => {
          handleSubmit();
        }}
      >
        Thêm loại ram
      </Button>
    </div>
  );
}

export default FormAddRam;
