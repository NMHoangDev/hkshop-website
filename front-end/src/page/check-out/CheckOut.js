import React, { useEffect, useState } from "react";
import classnames from "classnames/bind";
import styles from "./CheckOut.module.scss";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NavigationBar from "../../components/navigation/NavigationBar";
import { Link, useLocation } from "react-router-dom";
import Cart_transport from "../../components/Cart_Information_Transport/Cart_transport";
import CartPay from "../../components/Cart_Pay/Cart_Pay";
import Olders from "../../components/olders_info/Olders";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
const cx = classnames.bind(styles);

const steps = [
  "Nhập thông tin và địa chỉ ",
  "Lựa chọn hình thức thanh toán",
  "Xác nhận đơn hàng",
  "Tiến hành thanh toán",
];

function CheckOut() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [informationCustomer, setInformationCustomer] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    note: "",
    methodPayment: "",
  });

  const data = queryParams.get("data");
  const cartItems = data ? JSON.parse(decodeURIComponent(data)) : [];
  const account = JSON.parse(localStorage.getItem("account"));

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (activeStep == 2 && informationCustomer.methodPayment == "vnpay") {
      let total_price = 0;
      cartItems.map((item) => {
        total_price = total_price + item.price * item.quantity;
      });
      let total_amount = 0;
      cartItems.map((item) => {
        total_amount = total_amount + item.price * item.quantity;
        return item;
      });

      const data = {
        id_customer: account.id,
        total_amount: total_amount,
        status:
          informationCustomer.methodPayment === "COD" ? "not_paid" : "delivery",
        method_payment: informationCustomer.methodPayment,
        name: informationCustomer.name,
        phone_number: informationCustomer.phoneNumber,
        address: informationCustomer.address,
        note: informationCustomer.note,
      };
      axios
        .post("http://127.0.0.1:8000/orders/create-order", data)
        .then((response) => {
          console.log(response.data);
          cartItems.map(async (item) => {
            await axios.post("http://127.0.0.1:8000/orders/create-order-item", {
              order_id: response.data.order_id,
              id_product: item.idProduct,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              total_amount: item.quantity * item.price,
              imageUrl: item.imagesUrl,
              ram: item.ram,
              rom: item.rom,
              color: item.color,
            });
            if (!("isNotCartItem" in item)) {
              axios.delete(
                `http://127.0.0.1:8000/cart/remove-cart-item?id=${item.id}`
              );
            }
          });
        });

      axios
        .post("http://127.0.0.1:8000/payment/payment-with_vnPay", {
          order_id: Math.floor(Math.random() * 1000000),
          total_amount: total_price,
        })
        .then(function (response) {
          window.location.href = response.data.data;
        })
        .catch(function (error) {
          console.log("There was an error!", error);
        });
      // Check OTP CODE
    } else if (activeStep == 2 && informationCustomer.methodPayment == "COD") {
      Swal.fire({
        title: "Đã đặt hàng thành công",
        text: "Vui lòng chuẩn bị tiền mặt để thanh toán",
        icon: "success",
      });
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    } else {
      if (
        informationCustomer.name != "" &&
        informationCustomer.address != "" &&
        informationCustomer.phoneNumber != ""
      ) {
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Vui lòng nhập thông tin để sang bước tiếp theo",
        });
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
    console.log(informationCustomer);
  };

  const handleGetValue = (data) => {
    setInformationCustomer(data);
  };

  function handleChangeMethodPayment(data) {
    setInformationCustomer({
      ...informationCustomer,
      methodPayment: data.method,
    });
  }
  function handleCreateOrder(event) {}

  useEffect(() => {
    console.log(informationCustomer);
    console.log(cartItems);
  }, [informationCustomer]);

  useEffect(() => {
    console.log(account.id);

    if (activeStep === 3 && informationCustomer.methodPayment === "COD") {
      let total_amount = 0;
      cartItems.map((item) => {
        total_amount = total_amount + item.price * item.quantity;
        return item;
      });

      const data = {
        id_customer: account.id,
        total_amount: total_amount,
        status:
          informationCustomer.methodPayment === "COD" ? "not_paid" : "delivery",
        method_payment: informationCustomer.methodPayment,
        name: informationCustomer.name,
        phone_number: informationCustomer.phoneNumber,
        address: informationCustomer.address,
        note: informationCustomer.note,
      };
      axios
        .post("http://127.0.0.1:8000/orders/create-order", data)
        .then((response) => {
          console.log(response.data);
          cartItems.map(async (item) => {
            await axios.post("http://127.0.0.1:8000/orders/create-order-item", {
              order_id: response.data.order_id,
              id_product: item.idProduct,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              total_amount: item.quantity * item.price,
              imageUrl: item.imagesUrl,
              ram: item.ram,
              rom: item.rom,
              color: item.color,
            });
            if (!("isNotCartItem" in item)) {
              axios.delete(
                `http://127.0.0.1:8000/cart/remove-cart-item?id=${item.id}`
              );
            }
          });
        });
    }
    console.log(activeStep);
  }, [activeStep]);
  useEffect(() => {
    const query = queryParams.get("vnp_ResponseCode");

    if (query === "00") {
      setActiveStep(3);
      Swal.fire({
        title: "Đã đặt hàng thành công",
        text: "Cảm ơn bạn đã đặt hàng tại HKShop",
        icon: "success",
      });
    }
  }, []);

  return (
    <div>
      <header className={cx("nav_bar")}>
        <NavigationBar />
      </header>

      <section className={cx("main-check-out-page")}>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Đơn hàng đã hoàn thành, trở về trang chủ{" "}
                <Link to="/">Trang chủ</Link>
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                {activeStep === 0 && (
                  <div>
                    <Cart_transport onGetValue={handleGetValue} />
                  </div>
                )}
                {activeStep === 1 && (
                  <div>
                    <CartPay onChangeRadio={handleChangeMethodPayment} />
                  </div>
                )}
                {activeStep === 2 && (
                  <div>
                    <Olders
                      cartItems={cartItems}
                      informationCustomer={informationCustomer}
                    />
                  </div>
                )}
                {activeStep === 3 && (
                  <div>
                    Đã hoàn thành đơn hàng,{" "}
                    <Link to="/shop">Tiếp tục mua hàng</Link>
                  </div>
                )}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                {activeStep !== 3 && (
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                )}
                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </section>
    </div>
  );
}

export default CheckOut;
