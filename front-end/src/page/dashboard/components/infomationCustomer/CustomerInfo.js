import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function CustomerInfo({ infoCustomer }) {
  console.log(infoCustomer);
  function createData(name, desc) {
    return { name, desc };
  }

  const rows = [
    createData("ID tài khoản", infoCustomer.id_account),
    createData("Tên ", infoCustomer.name),
    createData("Số điện thoại", infoCustomer.phone_number),
    createData("Email", infoCustomer.email),
    createData("Địa chỉ", infoCustomer.address),
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} size="small" aria-label="a dense table">
        <TableBody>
          <TableHead sx={{ width: "100%" }}>
            <TableRow sx={{ width: "100%" }}>
              <TableCell sx={{ width: "100%" }}>
                <p
                  style={{
                    fontSize: "20px",
                    textTransform: "uppercase",
                    width: "100%",
                  }}
                >
                  Thông tin khách hàng
                </p>
              </TableCell>
            </TableRow>
          </TableHead>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ width: "40%" }}>
                {row.name}
              </TableCell>
              <TableCell align="center">
                {!Array.isArray(row.desc)
                  ? row.desc
                  : row.desc.reduce((acc, item) => acc + "  /  " + item) +
                    "  (GB)"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
