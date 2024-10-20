import React, { useEffect, useState } from "react";

import classnames from "classnames/bind";
import styles from "./MainStore.module.scss";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import formatNumberWithCommas from "../../helper/formatNumber.js";
import Pagination from "@mui/material/Pagination";
import ProductCard from "../productCard/ProductPhoneCard.js";
import SearchBar from "../search-bar/SearchBar.js";
import ProductLapTopCard from "../productCard/ProductLapTopCard.js";
const cx = classnames.bind(styles);

function MainStoreLapTop() {
  const ram = [4, 8, 12, 16, 18, 32, 64];
  const featureSpecials = [
    { id: 1, name: "Văn phòng - Sinh viên" },
    { id: 2, name: "Đồ họa - Kĩ thuật" },
    { id: 3, name: "Mỏng nhẹ" },
    { id: 4, name: "LapTop Gamming" },
    { id: 5, name: "LapTop AI" },
    { id: 6, name: "Cảm ứng" },
  ];
  const cpuArray = [
    { id: 1, name: "Intel Celeron" },
    { id: 2, name: "Snapdragon X Elite" },
    { id: 3, name: "Apple M1" },
    { id: 4, name: "Apple M2" },
    { id: 5, name: "AMD Ryzen 3" },
    { id: 6, name: "Apple M3" },
    { id: 7, name: "Intel Core i3" },
    { id: 8, name: "Intel Core i5" },
    { id: 9, name: "Intel Core Ultra 5" },
    { id: 10, name: "Intel Core i7" },
    { id: 11, name: "Intel Core Ultra 7" },
    { id: 12, name: "Intel Core i9" },
    { id: 13, name: "Intel Core Ultra 9" },
  ];
  const mainMemories = [128, 256, 512, 1];
  const hzArray = [60, 90, 120, 144, 165, 240];
  const screen = [
    {
      id: 1,
      from: 11.6,
      to: 14.0,
    },
    {
      id: 2,
      from: 14.0,
      to: 16.0,
    },
    {
      id: 3,
      from: 16.0,
      to: 24,
    },
  ];

  const [checkedFeature, setCheckedFeature] = useState(0);
  const [priceRangeValue, setPriceRangeValue] = useState(0);
  const [frequencyChecked, setFrequencyChecked] = useState(0);
  const [cpuChecked, setCpuChecked] = useState(0);
  const [ramChecked, setRamChecked] = useState(0);
  const [screenChecked, setScreen] = useState(0);
  const [mainMemoriesChecked, setMainMemoriesChecked] = useState(0);

  const handleChangeSortCheckBox = (event) => {
    // eslint-disable-next-line default-case

    switch (event.target.name) {
      case "features": {
        if (event.target.value !== checkedFeature) {
          setCheckedFeature(event.target.value);
        } else {
          setCheckedFeature(0);
        }
        return 0;
      }
      case "ram": {
        if (event.target.value !== ramChecked) {
          setRamChecked(event.target.value);
        } else {
          setRamChecked(0);
        }
        return 0;
      }
      case "frequency": {
        if (event.target.value !== frequencyChecked) {
          setFrequencyChecked(event.target.value);
        } else {
          setFrequencyChecked(0);
        }
        return 0;
      }
      case "cpu": {
        if (event.target.value !== cpuChecked) {
          setCpuChecked(event.target.value);
        } else {
          setCpuChecked(0);
        }
        return 0;
      }
      case "mainMemories": {
        if (event.target.value !== mainMemoriesChecked) {
          setMainMemoriesChecked(event.target.value);
        } else {
          setMainMemoriesChecked(0);
        }
        return 0;
      }
      case "screen": {
        if (event.target.value !== screenChecked) {
          setScreen(event.target.value);
        } else {
          setScreen(0);
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
          <h1 className={cx("title")}>TÍNH NĂNG ĐẶC BIỆT</h1>
          <div className={cx("gach-ngang")}></div>
          <div className={cx("type-categories")}>
            {featureSpecials.map((element) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedFeature == element.id ? true : false}
                      onChange={handleChangeSortCheckBox}
                      name="features"
                      value={element.id}
                    />
                  }
                  label={element.name}
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
          {/* Start Ram */}
          <h1 className={cx("title")}>RAM </h1>
          <div className={cx("gach-ngang")}></div>
          <div className={cx("type-categories")}>
            {ram.map((element) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ramChecked == element ? true : false}
                      name="ram"
                      value={element}
                      onChange={handleChangeSortCheckBox}
                    />
                  }
                  label={`${element} GB`}
                />
              );
            })}
          </div>
          {/* End Ram */}
          {/* Start Frenquency */}
          <h1 className={cx("title")}>TẦN SỐ QUÉT (HZ) </h1>
          <div className={cx("gach-ngang")}></div>
          <div className={cx("type-categories")}>
            {hzArray.map((element) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={frequencyChecked == element ? true : false}
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
          {/* End Frenquency */}
          {/* Start CPU */}
          <h1 className={cx("title")}>Công nghệ CPU</h1>
          <div className={cx("gach-ngang")}></div>
          <div className={cx("type-categories")}>
            {cpuArray.map((element) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={cpuChecked == element.id ? true : false}
                      name="cpu"
                      value={element.id}
                      onChange={handleChangeSortCheckBox}
                    />
                  }
                  label={` ${element.name} `}
                />
              );
            })}
          </div>
          {/* End CPU */}
          {/* Start Main Memories */}
          <h1 className={cx("title")}>Ổ cứng mặc định </h1>
          <div className={cx("gach-ngang")}></div>
          <div className={cx("type-categories")}>
            {mainMemories.map((element) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={element == mainMemoriesChecked ? true : false}
                      name="mainMemories"
                      value={element}
                      onChange={handleChangeSortCheckBox}
                    />
                  }
                  label={
                    element != 1 ? `${element} GB SSD` : `${element} TB SSD`
                  }
                />
              );
            })}
          </div>
          {/* End Main Memories */}
          {/* Start  Screen  */}
          <h1 className={cx("title")}>Kích thước màn hình </h1>
          <div className={cx("gach-ngang")}></div>
          <div className={cx("type-categories")}>
            {screen.map((element) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={screenChecked == element.id ? true : false}
                      name="screen"
                      value={element.id}
                      onChange={handleChangeSortCheckBox}
                    />
                  }
                  label={`Từ ${element.from} inch đến ${element.to} inch`}
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
            <ProductLapTopCard />
            <ProductLapTopCard />
            <ProductLapTopCard />
            <ProductLapTopCard />
          </div>
          <div className={cx("controller-Page")}>
            <Pagination count={10} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainStoreLapTop;
