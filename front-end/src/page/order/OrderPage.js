import React, { useEffect } from "react";
import styles from "./OrderPage.module.scss";
import classnames from "classnames/bind";
import Olders from "../../components/orders/Olders.js";
import NavigationBar from "../../components/navigation/NavigationBar.js";
import axios from "axios";
import SearchBar from "../../components/search-bar/SearchBar.js";
const cx = classnames.bind(styles);

function OrderPage() {
  const [orders, setOrders] = React.useState([]);
  const account = JSON.parse(localStorage.getItem("account"));
  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/orders/get-orders-by-order-id?id_customer=${account.id}`
      )
      .then((response) => {
        const orders = response.data.order_items;
        console.log(response.data);

        const groupedItems = orders.reduce((acc, item) => {
          const orderId = item.order_id; // Lấy order_id từ item

          // Kiểm tra nếu nhóm với order_id hiện tại đã tồn tại chưa
          if (!acc[orderId]) {
            acc[orderId] = []; // Nếu chưa có, khởi tạo một mảng mới
          }
          acc[orderId].push(item); // Thêm item vào mảng tương ứng với order_id
          return acc;
        }, {});
        const result = Object.keys(groupedItems).map((key) => {
          return {
            order_id: key,
            items: groupedItems[key], // Mảng các item có cùng order_id
          };
        });
        setOrders(result);
      });
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("navigation")}>
        <NavigationBar />
      </div>
      <div>
        <SearchBar />
      </div>

      <div className={cx("order")}>
        <Olders orders={orders} />
      </div>
    </div>
  );
}

export default OrderPage;
