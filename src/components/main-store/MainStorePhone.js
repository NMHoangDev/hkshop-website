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
const cx = classnames.bind(styles);

function MainStore() {
  const mainMemories = [4, 6, 32, 64, 128, 256, 512, 1000];
  const hzArray = [60, 90, 120, 144, 165];
  const pinArray = [3000, 4000, 5000, 6000, 7000];
  const [checkedRam, setCheckedRam] = useState(0);
  const [priceRangeValue, setPriceRangeValue] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [pin, setPin] = useState(0);

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
  return (
    <div className={cx("wrapper")}>
      <div className={cx("slider-shop")}>
        <h1>SHOP</h1>
      </div>
      <div className={cx("main-shop")}>
        <div className={cx("categories")}>
          {/* Start Categories */}
          <h1 className={cx("title")}>Bộ nhớ trong</h1>
          <div className={cx("gach-ngang")}></div>
          <div className={cx("type-categories")}>
            {mainMemories.map((element) => {
              if (element == 1000) {
                element = 1;
              }
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedRam == element ? true : false}
                      onChange={handleChangeSortCheckBox}
                      name="mainMemories"
                      value={element}
                    />
                  }
                  label={element == 1 ? element + "TB" : element + "GB"}
                />
              );
            })}
          </div>
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
                step={500000}
                marks
                min={1000000}
                max={50000000}
                name="priceRange"
                onChange={handleChangePrice}
              />

              <button className={cx("filter_Btn")} type="submit">
                Tìm kiếm
              </button>
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
        </div>
        <div className={cx("list-Products")}>
          <div className={cx("sort-Bar")}>
            <h1>
              Chúng tôi mang đến cho các bạn những sản phẩm công nghệ tân tiến
              nhất
            </h1>
          </div>
          <div className={cx("product-Item-list")}>
            <ProductPhoneCard />
            <ProductPhoneCard />
            <ProductPhoneCard />
            <ProductPhoneCard />
          </div>
          <div className={cx("controller-Page")}>
            <Pagination count={10} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainStore;
