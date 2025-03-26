import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function TechInfoTable({ techinfo }) {
  function createData(name, desc) {
    return { name, desc };
  }

  const rows = [
    createData("Chip xử lý", techinfo.nameChip || "N/A"),
    createData("RAM", techinfo.rams || "N/A"),
    createData("Bộ nhớ trong", techinfo.roms || "N/A"),
    createData("Hỗ trợ 5G", techinfo.support5G ? "Có" : "Không"),
    createData("Độ phân giải màn hình ngoài", techinfo.resolution || "N/A"),
    createData("Độ phân giải màn hình chính", techinfo.resolution || "N/A"),
    createData("Công nghệ màn hình", techinfo.tech_screen || "N/A"),
    createData("Kích thước", `${techinfo.screen || "N/A"} inches`),
    createData("Dung lượng pin", `${techinfo.pin || "N/A"} mAh`),
    createData("Cổng kết nối", techinfo.connector || "Type-C"),
  ];

  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
    >
      <Table
        sx={{ width: "100%" }}
        size="small"
        aria-label="technical specifications table"
      >
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={2}
              sx={{
                fontSize: "18px",
                fontWeight: "bold",
                textTransform: "uppercase",
                textAlign: "center",
                color: "#555",
                padding: "16px",
                backgroundColor: "#f5f5f5",
              }}
            >
              Thông số kỹ thuật
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:hover": { backgroundColor: "#fafafa" } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#333",
                  padding: "12px",
                  borderBottom: "1px solid #e0e0e0",
                  width: "40%",
                }}
              >
                {row.name}
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontSize: "14px",
                  color: "#555",
                  padding: "12px",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                {Array.isArray(row.desc)
                  ? row.desc.join(" / ") + " (GB)"
                  : row.desc || "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
