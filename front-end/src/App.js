import "./App.css";
import HomePage from "./page/homepage/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Shop from "./page/shop/Shop";
import SignIn from "./page/sign-in/SignIn";
import SignUp from "./page/sign-up/SignUp";
import DetailPage from "./page/detailpage/DetailPage";
import ShoppingCart from "./page/shoppingcart/Shoppingcart";
import CheckOut from "./page/check-out/CheckOut";
import OrderPage from "./page/order/OrderPage";
import Dashboard from "./page/dashboard/DashBoard.js";
import ProductAdminPage from "./page/dashboard/product/ProductAdminPage.js";
import OrderAdminPage from "./page/dashboard/orders/OrderAdminPage.js";
import AccountAdmin from "./page/dashboard/account/AccountAdmin.js";
import ErrorPage from "./page/error/ErrorPage.js";
import Test from "./page/testChatGPT/Dashboard.js";
function App() {
  const account = JSON.parse(localStorage.getItem("account"));
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/detail-page/:id" element={<DetailPage />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/my-order" element={<OrderPage />} />
          <Route path="/test" element={<Test />} />
          {account != null && account.role == "admin" ? (
            <Route path="/dashboard" element={<Dashboard />} />
          ) : null}
          {account != null && account.role == "admin" ? (
            <Route path="/admin/products" element={<ProductAdminPage />} />
          ) : null}
          {account != null && account.role == "admin" ? (
            <Route path="/admin/orders" element={<OrderAdminPage />} />
          ) : null}
          {account != null && account.role == "admin" ? (
            <Route path="/admin/customer" element={<AccountAdmin />} />
          ) : null}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
