import React, { useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import formatNumberWithCommas from "../../helper/formatNumber";
import { Font } from "@react-pdf/renderer";
import formatDate from "../../helper/formatDate";

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf", // Font từ Google Fonts
});

// Định dạng styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Roboto",
    fontSize: 12,
    color: "#333",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#4CAF50", // Màu xanh lá làm nổi bật header
  },
  table: {
    display: "table",
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5", // Màu nền nhẹ cho header
    borderBottom: "1px solid #ddd",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #eee",
  },
  tableCellHeader: {
    flexGrow: 1,
    fontWeight: "bold",
    fontSize: 10,
    padding: 8,
    textAlign: "center",
  },
  tableCell: {
    flexGrow: 1,
    padding: 8,
    fontSize: 10,
    textAlign: "center",
  },
  footer: {
    marginTop: 20,
    textAlign: "right",
    fontSize: 12,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  section: {
    marginBottom: 20,
  },
  paymentStatus: {
    marginTop: 30,
    fontSize: 14,
    textAlign: "center",
    color: "#4CAF50",
    fontWeight: "bold",
  },
  stampContainer: {
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  stampImage: {
    width: 100,
    height: 100,
  },
});
const formatToVietnamTime = (utcDateString) => {
  if (!utcDateString) return "N/A"; // Trả về giá trị mặc định nếu chuỗi bị null hoặc undefined

  try {
    const date = new Date(utcDateString); // Chuyển chuỗi thời gian thành đối tượng Date
    const options = {
      timeZone: "Asia/Ho_Chi_Minh", // Múi giờ Việt Nam
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    // Định dạng theo giờ Việt Nam
    return new Intl.DateTimeFormat("vi-VN", options).format(date);
  } catch (error) {
    console.error("Lỗi định dạng thời gian:", error);
    return "N/A"; // Trả về "N/A" nếu có lỗi
  }
};

// Component tạo PDF
const InvoicePDF = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <Text style={styles.header}>Hóa đơn #{invoice.id}</Text>

      {/* Thông tin đơn hàng */}
      <View style={styles.section}>
        <Text>
          Ngày đặt hàng:{" "}
          {formatToVietnamTime(invoice?.order_items?.[0]?.created_at) || "N/A"}
        </Text>

        <Text>
          Tên khách hàng: {invoice?.info_customer?.[0]?.name || "N/A"}
        </Text>
        <Text>Địa chỉ: {invoice?.info_customer?.[0]?.address || "N/A"}</Text>
        <Text>
          Email khách hàng: {invoice?.info_customer?.[0]?.email || "N/A"}
        </Text>
      </View>

      {/* Table */}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableCellHeader}>Sản phẩm</Text>
          <Text style={styles.tableCellHeader}>Số lượng</Text>
          <Text style={styles.tableCellHeader}>Đơn giá (VND)</Text>
          <Text style={styles.tableCellHeader}>Tổng tiền (VND)</Text>
        </View>

        {/* Table Rows */}
        {invoice.order_items.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCell}>{item.name}</Text>
            <Text style={styles.tableCell}>{item.quantity}</Text>
            <Text style={styles.tableCell}>
              {formatNumberWithCommas(item.price)} VND
            </Text>
            <Text style={styles.tableCell}>
              {formatNumberWithCommas(item.quantity * item.price)} VND
            </Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Tổng tiền thanh toán: {formatNumberWithCommas(invoice.total_amount)} VND
      </Text>

      {/* Payment Status */}
      <Text style={styles.paymentStatus}>
        Trạng thái: {invoice.status === "not_paid" && "Chưa thanh toán"}
        {invoice.status === "delivery" && "Đang giao hàng"}
        {invoice.status === "finish" && "Đã thanh toán"}
      </Text>

      {/* Payment Confirmation Stamp */}
      <View style={styles.stampContainer}>
        {invoice.status === "finish" && (
          <Image
            style={styles.stampImage}
            src="https://png.pngtree.com/png-vector/20230208/ourmid/pngtree-paid-stamp-vector-illustration-png-image_6585127.png" // Đường dẫn hoặc link ảnh con dấu
          />
        )}
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;
