import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import axios from "axios";
import formatNumberWithCommas from "../../../../helper/formatNumber";
import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import TechInfoTable from "../tech_info/TechInfoTable";
import FormUpdateProduct from "../formUpdateProduct/FormUpdateProduct";
import CloseIcon from "@mui/icons-material/Close";
import { Notyf } from "notyf";
import CustomerInfo from "../infomationCustomer/CustomerInfo";
import InvoicePDF from "../../../../components/InvoicePDF/InvoicePDF";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { PDFDownloadLink } from "@react-pdf/renderer";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const handleOnclickChange = (event) => {};

export default function TableOrder() {
  const [rows, setRows] = React.useState([]);
  const [percentage, setPercentage] = React.useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(0);
  const notyf = new Notyf();

  const handleOpen = (event) => {
    setOpen(event.target.name);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [status, setStatus] = React.useState("");

  const handleChange = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);

    axios
      .patch(`http://127.0.0.1:8000/admin/orders/update-status-order`, {
        id: event.target.name,
        status: event.target.value,
      })
      .then((response) => {
        axios
          .get("http://127.0.0.1:8000/admin/orders/list-orders")
          .then((response) => {
            console.log(response.data.orders);
            setRows(response.data.orders);
          });
      });
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  React.useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/admin/orders/list-orders")
      .then((response) => {
        console.log(response.data.orders);
        setRows(response.data.orders);
        setPercentage({
          COD: response.data.percentagePaymentWithCOD,
          hkPay: response.data.percentagePaymentWithHkPay,
        });
      });
  }, []);
  const invoice = {
    id: 1,
    items: [
      { name: "iPhone 15", quantity: 1, price: 1200 },
      { name: "Charger", quantity: 2, price: 50 },
    ],
    total: 1300,
  };

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table
        sx={{ minWidth: 500, width: "100%" }}
        aria-label="custom pagination table"
      >
        <TableBody>
          <TableRow key={"header"}>
            <TableCell
              component="th"
              scope="row"
              sx={{ border: "solid 1px #ccc" }}
            >
              ID
            </TableCell>
            <TableCell
              style={{ width: 160 }}
              align="center"
              sx={{ border: "solid 1px #ccc" }}
            >
              Sản phẩm
            </TableCell>
            <TableCell
              style={{ width: 160 }}
              align="center"
              sx={{ border: "solid 1px #ccc" }}
            >
              Số lương sản phẩm
            </TableCell>

            <TableCell
              style={{ width: 160 }}
              align="center"
              sx={{ border: "solid 1px #ccc" }}
            >
              Tổng tiền
            </TableCell>
            <TableCell
              style={{ width: 160 }}
              align="center"
              sx={{ border: "solid 1px #ccc" }}
            >
              Thông tin khách hàng
            </TableCell>
            <TableCell
              style={{ width: 160 }}
              align="center"
              sx={{ border: "solid 1px #ccc" }}
            >
              Hình thức thanh toán
            </TableCell>
            <TableCell
              style={{ width: 160 }}
              align="center"
              sx={{ border: "solid 1px #ccc" }}
            >
              Xử lí đơn hàng
            </TableCell>
            <TableCell
              style={{ width: 160 }}
              align="center"
              sx={{ border: "solid 1px #ccc" }}
            >
              Xuất hóa đơn
            </TableCell>
          </TableRow>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell
                component="th"
                scope="row"
                sx={{ border: "solid 1px #ccc" }}
              >
                {row.id}
              </TableCell>
              <TableCell
                style={{ width: 160 }}
                align="center"
                sx={{ border: "solid 1px #ccc" }}
              >
                {/* {row.name} */}
                {row.order_items.map((item) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "solid 1px #ccc",
                        padding: "4px",
                        margin: "4px",
                      }}
                    >
                      <img
                        src={item.imageUrl}
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "4px",
                        }}
                      />
                      <h1 style={{ fontSize: "15px" }}>{item.name}</h1>
                    </div>
                  );
                })}
              </TableCell>
              <TableCell
                style={{ width: 160 }}
                align="center"
                sx={{ border: "solid 1px #ccc" }}
              >
                {row.total_quantity}
              </TableCell>
              <TableCell
                style={{ width: 160 }}
                align="center"
                sx={{ border: "solid 1px #ccc" }}
              >
                {formatNumberWithCommas(row.total_amount)} VND
              </TableCell>
              <TableCell
                style={{ width: 160 }}
                align="center"
                sx={{ border: "solid 1px #ccc" }}
              >
                <Button
                  variant="contained"
                  sx={{ background: "#ff7050" }}
                  onClick={handleOpen}
                  name={row.id}
                >
                  Xem
                </Button>
                <Backdrop
                  sx={(theme) => ({
                    color: "#fff",
                    zIndex: theme.zIndex.drawer + 1,
                    opacity: 0.2,
                  })}
                  open={open == row.id}
                  onClick={handleClose}
                >
                  <CustomerInfo infoCustomer={row.info_customer[0]} />
                </Backdrop>
              </TableCell>
              <TableCell
                style={{ width: 160 }}
                align="center"
                sx={{ border: "solid 1px #ccc" }}
              >
                {row.method_payment == "COD"
                  ? "Thanh toán bằng tiền mặt"
                  : "Thanh toán bằng VNPAY"}
              </TableCell>
              <TableCell
                style={{ width: 160 }}
                align="center"
                sx={{ border: "solid 1px #ccc" }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Tình trạng
                  </InputLabel>
                  <Select
                    labelId="select_status"
                    id="select_status"
                    name={row.id}
                    value={row.status}
                    label="Tình trạng"
                    onChange={handleChange}
                  >
                    <MenuItem value={"not_paid"} name={row.id}>
                      Chưa thanh toán
                    </MenuItem>
                    <MenuItem value={"finish"} name={row.id}>
                      Đã Thanh toán{" "}
                    </MenuItem>
                    <MenuItem value={"delivery"} name={row.id}>
                      {" "}
                      Đang giao
                    </MenuItem>
                    <MenuItem value={"cancel"} name={row.id}>
                      Đã hủy
                    </MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell
                style={{ width: 160 }}
                align="center"
                sx={{ border: "solid 1px #ccc" }}
              >
                <PDFDownloadLink
                  document={<InvoicePDF invoice={row} />}
                  fileName={`invoice-${row.id}.pdf`}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Xử lí PDF..." : "Xuất hóa đơn"
                  }
                </PDFDownloadLink>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow sx={{ width: "1000px" }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={7}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              sx={{ width: "100%" }}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
