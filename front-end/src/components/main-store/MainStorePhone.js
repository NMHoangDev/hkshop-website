import React, { useEffect, useState } from "react";

import classnames from "classnames/bind";
import styles from "./MainStore.module.scss";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import formatNumberWithCommas from "../../helper/formatNumber.js";
import Pagination from "@mui/material/Pagination";
import ProductCard from "../productCard/ProductPhoneCard.js";
import ProductPhoneCard from "../productCard/ProductPhoneCard.js";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Footer from "../footer/Footer.js";
import { Button } from "@mui/material";
const cx = classnames.bind(styles);

function MainStore() {
  const mainMemories = [4, 6, 8, 12];
  const hzArray = [60, 90, 120, 144, 165];
  const pinArray = [3000, 4000, 5000, 6000, 7000];
  const screen = [7, 8, 9, 10];
  const [checkedRam, setCheckedRam] = useState(0);
  const [priceRangeValue, setPriceRangeValue] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [screenSize, setScreenSize] = useState(0);
  const [pin, setPin] = useState(0);
  const [phones, setPhones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [lastPageOnFilter, setLastPageOnFilter] = useState(0);
  const [isOnFilter, setIsOnFilter] = useState(0);
  const [currentPageOnFilter, setCurrentPageOnFilter] = useState(1);
  const handleChange = (event, value) => {
    event.preventDefault();
    if (isOnFilter) {
      setCurrentPageOnFilter(value);
    } else {
      setCurrentPage(value);
    }
  };

  const handleChangeSortCheckBox = (event) => {
    // eslint-disable-next-line default-case

    switch (event.target.name) {
      case "mainMemories": {
        if (event.target.value !== checkedRam) {
          setCheckedRam(event.target.value);
        } else {
          setCheckedRam(0);
        }
        return 0;
      }
      case "frequency": {
        if (event.target.value !== frequency) {
          setFrequency(event.target.value);
        } else {
          setFrequency(0);
        }
        return 0;
      }
      case "pin": {
        if (event.target.value !== pin) {
          setPin(event.target.value);
        } else {
          setPin(0);
        }
        return 0;
      }
      case "screenSize": {
        if (event.target.value !== screenSize) {
          setScreenSize(event.target.value);
        } else {
          setScreenSize(0);
        }
        return 0;
      }
      // eslint-disable-next-line no-fallthrough
      default: {
        console.log("DEfault");
      }
    }
  };
  function valuetext(value) {
    return `${value}°C`;
  }
  function handleChangePrice(event) {
    event.preventDefault();
    setPriceRangeValue(event.target.value);
  }
  function handleOnClickFilter(event) {
    console.log(
      "onClickFilter:",
      checkedRam,
      pin,
      frequency,
      screenSize,
      priceRangeValue
    );
    axios
      .get(
        `http://127.0.0.1:8000/filter-product?ram=${checkedRam}&price=${priceRangeValue}&frequency=${frequency}&pin=${pin}&screenSize=${screenSize}&page=${currentPageOnFilter}`
      )
      .then((response) => {
        console.log(response.data.products.data);
        setPhones(response.data.products.data);
        setIsOnFilter(1);
        setLastPageOnFilter(response.data.products.last_page);
        setCurrentPageOnFilter(1);
      });
  }
  function handleOnClickRemoveFilter(event) {
    event.preventDefault();
    setIsOnFilter(0);
    setCheckedRam(0);
    setScreenSize(0);
    setFrequency(0);
    setPin(0);
    setPriceRangeValue(0);
  }
  useEffect(() => {
    if (isOnFilter) {
      axios
        .get(
          `http://127.0.0.1:8000/filter-product?price=${priceRangeValue}&frequency=${frequency}&pin=${pin}&screenSize=${screenSize}&page=${currentPageOnFilter}`
        )
        .then((response) => {
          console.log(response.data.products.data);
          setPhones(response.data.products.data);
        });
    } else {
      axios
        .get(`http://127.0.0.1:8000/get-products?page=${currentPage}`)
        .then((response) => {
          setPhones(response.data.products.data);
          setLastPage(response.data.products.last_page);
          console.log(phones);
        });
    }
  }, [currentPage, currentPageOnFilter, isOnFilter]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("main-shop")}>
        <div className={cx("categories")}>
          {/* Start Categories */}

          {/* End Categories */}
          {/* --------------------------- */}
          {/* Start Price */}
          <h1 className={cx("title")}>GIÁ TIỀN</h1>
          <div className={cx("gach-ngang")}></div>
          <div className={cx("price-categories")}>
            <form className={cx("price-element")}>
              <label htmlFor="priceRange">
                Tầm giá: {formatNumberWithCommas(priceRangeValue)} VND
              </label>
              <Slider
                aria-label="Temperature"
                defaultValue={30}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                shiftStep={30}
                step={1000000}
                marks
                min={1000000}
                max={40000000}
                name="priceRange"
                onChange={handleChangePrice}
                value={priceRangeValue}
              />
            </form>
          </div>
          {/* End Price */}
          {/* ----------- */}
          {/* Start Freqency */}
          <h1 className={cx("title")}>TẦN SỐ QUÉT (HZ)</h1>
          <div className={cx("gach-ngang")}></div>
          <div className={cx("type-categories")}>
            {hzArray.map((element) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={frequency == element ? true : false}
                      name="frequency"
                      value={element}
                      onChange={handleChangeSortCheckBox}
                    />
                  }
                  label={`${element} Hz`}
                />
              );
            })}
          </div>
          {/* End Frequency */}
          <h1 className={cx("title")}>DUNG LƯỢNG PIN (mAh)</h1>
          <div className={cx("gach-ngang")}></div>
          <div className={cx("type-categories")}>
            {pinArray.map((element) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={pin == element ? true : false}
                      name="pin"
                      value={element}
                      onChange={handleChangeSortCheckBox}
                    />
                  }
                  label={`Dưới ${element} mAh`}
                />
              );
            })}
          </div>
          {/* End Pin */}
          <h1 className={cx("title")}>KÍCH THƯỚC MÀN HÌNH </h1>
          <div className={cx("gach-ngang")}></div>
          <div className={cx("type-categories")}>
            {screen.map((element) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={screenSize == element ? true : false}
                      name="screenSize"
                      value={element}
                      onChange={handleChangeSortCheckBox}
                    />
                  }
                  label={`Dưới ${element} inch`}
                />
              );
            })}
          </div>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#FF7050", width: "100%" }}
            onClick={handleOnClickFilter}
          >
            Lọc sản phẩm
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFF",
              width: "100%",
              marginTop: "20px",
              color: "#FF7050",
            }}
            onClick={handleOnClickRemoveFilter}
          >
            Quay lại
          </Button>
        </div>
        <div className={cx("list-Products")}>
          <div className={cx("sort-Bar")}>
            <h1>
              Chúng tôi mang đến cho các bạn những sản phẩm công nghệ tân tiến
              nhất
            </h1>
          </div>
          <div className={cx("product-Item-list")}>
            {phones.map((element) => {
              return (
                <ProductCard
                  name={element.name}
                  price={element.price}
                  screenSize={element.screen}
                  nameChip={element.nameChip}
                  pin={element.pin}
                  ram={element.ram}
                  rom={128}
                  frequency={element.frequency}
                  id={element.id}
                  url_image={element.image_urls[0]}
                />
              );
              // return element.name;
            })}
          </div>
          <div className={cx("controller-Page")}>
            <Stack spacing={2}>
              <Pagination
                count={isOnFilter == 1 ? lastPageOnFilter : lastPage}
                page={isOnFilter == 1 ? currentPageOnFilter : currentPage}
                onChange={handleChange}
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainStore;
