import React, { useRef } from "react";
// import './Slider.module.scss'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Autoplay, Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/swiper-bundle.css";
import styles from "./Slider.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);
export const Slider = () => {
  const sliders = [
    {
      image:
        "https://img.freepik.com/free-photo/phone-with-black-friday-inscription-table_23-2147957608.jpg?t=st=1729086933~exp=1729090533~hmac=98bae917434deb34482f55151e1283ddaa9aab080192b5c50e2eb9d78a851988&w=1060",
      title: "Khám Phá Công Nghệ Đỉnh Cao Từ Những Thương Hiệu Hàng Đầu",
      subtitle:
        "Cập nhật các dòng điện thoại mới nhất với giá ưu đãi. Trải nghiệm hiệu suất mạnh mẽ, thiết kế tinh tế và dịch vụ chuyên nghiệp. Đặt niềm tin vào chất lượng – nâng tầm phong cách của bạn ngay hôm nay!",
      description: "",
    },
    {
      image:
        "https://img.freepik.com/free-photo/big-tablets-with-ribbons_23-2147959943.jpg?t=st=1729087021~exp=1729090621~hmac=58c1f027af6fdd924d0761a9f455322ee664675fa2f98c5bf39cb99c67b46914&w=1060",
      title: "Công Nghệ Trong Tầm Tay Bạn",
      subtitle:
        "Trải nghiệm sự khác biệt với các dòng điện thoại đa dạng, phù hợp mọi nhu cầu. Từ chụp ảnh, giải trí, đến công việc – tìm thấy ngay chiếc điện thoại hoàn hảo của bạn tại đây!",
    },
    {
      image:
        "https://img.freepik.com/free-photo/smartphone-near-laptop-shopping-trolley_23-2147957087.jpg?t=st=1729087093~exp=1729090693~hmac=30013ec4fe6b2466009513807bc24f5a898f819dbff66c3974b2ea538466b008&w=996",
      title: "Mua Sắm Thông Minh – Sở Hữu Dễ Dàng",
      subtitle:
        "Mua điện thoại dễ dàng với chương trình trả góp lãi suất thấp. Nhanh chóng, tiện lợi, sản phẩm chất lượng đảm bảo – dành riêng cho bạn!",
    },
  ];
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        speed={600}
        parallax={true}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className={cx("mySwiper")}
      >
        {sliders.map((slide) => (
          <SwiperSlide key={slide.image} className={cx("swiper-slide")}>
            <div className={cx("content")}>
              <div className={cx("sub-content")}>
                <div className={cx("title")} data-swiper-parallax="-300">
                  <p>{slide.title}</p>
                </div>
                <div className={cx("subtitle")} data-swiper-parallax="-200">
                  <p>{slide.subtitle}</p>
                </div>
              </div>
            </div>
            <img src={slide.image} alt={slide.title} />
            <div className={cx("overlay")}>.</div>
          </SwiperSlide>
        ))}
        <div className={cx("autoplay-progress")} slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
};

export default Slider;
