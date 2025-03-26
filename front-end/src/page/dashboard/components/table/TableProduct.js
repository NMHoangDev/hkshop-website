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

const rows = [
  createData("Cupcake", 305, 3.7),
  createData("Donut", 452, 25.0),
  createData("Eclair", 262, 16.0),
  createData("Frozen yoghurt", 159, 6.0),
  createData("Gingerbread", 356, 16.0),
  createData("Honeycomb", 408, 3.2),
  createData("Ice cream sandwich", 237, 9.0),
  createData("Jelly Bean", 375, 0.0),
  createData("KitKat", 518, 26.0),
  createData("Lollipop", 392, 0.2),
  createData("Marshmallow", 318, 0),
  createData("Nougat", 360, 19.0),
  createData("Oreo", 437, 18.0),
];
const handleOnclickChange = (event) => {};

export default function TableProduct() {
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(0);
  const [openUpdateBackDrop, setOpenUpdateBackDrop] = React.useState(false);
  const notyf = new Notyf();

  const handleCloseUpdateBackdrop = () => {
    setOpenUpdateBackDrop(0);
  };
  const handleOpen = (event) => {
    setOpen(event.target.name);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenUpdateBackdrop = (event) => {
    setOpenUpdateBackDrop(event.target.name);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleDeleteProduct = (event) => {
    axios
      .delete(
        `http://127.0.0.1:8000/admin/product/delete-product?id=${event.target.name}`
      )
      .then((response) => {
        if (response.data.status) {
          notyf.success("Xóa sản phẩm thành công");
          axios
            .get("http://127.0.0.1:8000/admin/product/list-product")
            .then((response) => {
              setRows(response.data.products);
            });
        } else {
          notyf.error("Xóa sản phẩm thất bại");
        }
      });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  React.useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/admin/product/list-product")
      .then((response) => {
        console.log(response.data.products);
        setRows(response.data.products);
      });
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "100%",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Table
        sx={{
          minWidth: 500,
          width: "100%",
          "& th": {
            backgroundColor: "#f5f5f5",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: "14px",
            border: "solid 1px #ccc",
            textAlign: "center",
            padding: "12px",
          },
          "& td": {
            border: "solid 1px #ccc",
            textAlign: "center",
            padding: "12px",
            fontSize: "14px",
          },
          "& tr:hover": {
            backgroundColor: "#fafafa",
          },
        }}
        aria-label="custom pagination table"
      >
        <TableBody>
          <TableRow key={"header"}>
            <TableCell>ID</TableCell>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>Giá tiền</TableCell>
            <TableCell>Hãng</TableCell>
            <TableCell>Đánh giá</TableCell>
            <TableCell>Thông số kĩ thuật</TableCell>
            <TableCell colSpan={2}>Hành động</TableCell>
          </TableRow>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{formatNumberWithCommas(row.price)}</TableCell>
              <TableCell>{row.brand}</TableCell>
              <TableCell>{row.rate} sao</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  sx={{
                    background: "#ff7050",
                    fontSize: "12px",
                    padding: "8px 16px",
                    "&:hover": {
                      backgroundColor: "#e6644f",
                    },
                  }}
                  onClick={handleOpen}
                  name={row.id}
                >
                  Xem thông số kĩ thuật
                </Button>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    opacity: 0.2,
                  }}
                  open={open == row.id}
                  onClick={handleClose}
                >
                  <TechInfoTable techinfo={row} />
                </Backdrop>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#2196f3",
                    color: "#2196f3",
                    fontSize: "12px",
                    padding: "8px 16px",
                    "&:hover": {
                      borderColor: "#1976d2",
                      color: "#1976d2",
                    },
                  }}
                  onClick={handleOpenUpdateBackdrop}
                  name={row.id}
                >
                  Cập nhật
                </Button>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={openUpdateBackDrop == row.id}
                >
                  <div
                    style={{
                      position: "absolute",
                      right: "4px",
                      top: "4px",
                      cursor: "pointer",
                    }}
                    onClick={handleCloseUpdateBackdrop}
                  >
                    <CloseIcon />
                  </div>
                  <FormUpdateProduct infoProductDetail={row} />
                </Backdrop>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{
                    fontSize: "12px",
                    padding: "8px 16px",
                    "&:hover": {
                      backgroundColor: "rgba(255, 0, 0, 0.1)",
                    },
                  }}
                  name={row.id}
                  onClick={handleDeleteProduct}
                >
                  Xóa
                </Button>
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
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={7}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
