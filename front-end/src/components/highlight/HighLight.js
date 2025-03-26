import React from "react";
import styles from "./HighLight.module.scss";
import classnames from "classnames/bind";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AdverCard from "../adverCard/AdverCard";
import YouTube from "react-youtube";
import video from "../../asset/iphone.mp4";
import oppo from "../../asset/oppo.mp4";
import samsung from "../../asset/samsung.mp4";
import xiaomi from "../../asset/xiaomi.mp4";
import PhoneCardHome from "../phoneCardHome/PhoneCardHome";

const cx = classnames.bind(styles);
function HighLight({ title, content }) {
  const opts = {
    height: "360",
    width: "640",
    controls: 0,
    modestbranding: 1,
    playerVars: { autoplay: 1, loop: 1, mute: 1, playlist: "Rl1R_UfQLkA" },
  };
  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("title")}>Dành cho bạn</h1>
      <section className={cx("highlight")}>
        <div className={cx("advertisement")}>
          <AdverCard
            img={
              "https://cdn.hoanghamobile.com/i/home/Uploads/2024/11/09/honor-200.png"
            }
          />
          <AdverCard
            img={
              "https://cdn.hoanghamobile.com/i/home/Uploads/2024/11/15/sanphamhot-14t-4.png"
            }
          />
          <AdverCard
            img={
              "https://cdn.hoanghamobile.com/i/home/Uploads/2024/11/07/sanphamhot-s23-ultra-1.png"
            }
          />
          <AdverCard
            img={
              "https://cdn.hoanghamobile.com/i/home/Uploads/2024/11/13/sanphamhot-m1-5.png"
            }
          />
        </div>
        <div className={cx("main-highlight")}>
          <div className={cx("row")}>
            <div className={cx("card")}>
              <PhoneCardHome
                id={37}
                name={"Iphone 14 Plus"}
                price={3100000}
                km1={"Giảm giá đến 5 %"}
                km2={"Thu cũ mua mới"}
                num={12}
                img={
                  "https://apple.ngocnguyen.vn/cdn/images/202308/goods_img/iphone-14-pro-chinh-hang-G15202-1693118835749.jpg"
                }
              />
              <PhoneCardHome
                img="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture//Apro/Apro_product_33035/iphone-15-128gb_main_586_1020.png.webp"
                name={"Iphone 15"}
                price={22000000}
                km1={"Tặng kèm tai nghe lên đến 2 triệu đồng"}
                km2={"Giảm giá lên đến 300,000đ"}
                id={34}
                num={4}
              />
            </div>
            <div>
              <video
                width="640"
                height="360"
                src={video}
                loop
                muted
                autoPlay
                style={{ borderRadius: "4px" }}
              >
                {" "}
                Trình duyệt của bạn không hỗ trợ thẻ video.{" "}
              </video>
            </div>
          </div>
          <div className={cx("row")}>
            <div>
              <video
                width="640"
                height="360"
                src={oppo}
                loop
                muted
                autoPlay
                style={{ borderRadius: "4px" }}
              >
                {" "}
                Trình duyệt của bạn không hỗ trợ thẻ video.{" "}
              </video>
            </div>
            <div className={cx("card")}>
              <PhoneCardHome
                img={
                  "https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture//Apro/Apro_product_34039/samsung-galaxy-_main_969_1020.png.webp"
                }
                name={"Samsung Galaxy S24 Ultra 5G"}
                km1={"Tặng kèm voucher trị giá 300k"}
                km2={"Giảm giá 10% sản phẩm"}
                num={2}
                id={41}
              />
              <PhoneCardHome
                img={
                  "https://didongmoi.com.vn/upload/images/product/samsung/samsung-galaxy-z-flip5-gia-re-6.jpg"
                }
                name={"Samsung Galaxy S24 Ultra 5G"}
                km1={"Tặng kèm voucher trị giá 300k"}
                km2={"Giảm giá 10% sản phẩm"}
                num={4}
                id={43}
              />
            </div>
          </div>
          <div className={cx("row")}>
            <div className={cx("card")}>
              <PhoneCardHome
                img={
                  "https://didongmoi.com.vn/upload/images/product/samsung/samsung-galaxy-z-flip5-gia-re-6.jpg"
                }
                name={"Samsung Galaxy S24 Ultra 5G"}
                km1={"Tặng kèm voucher trị giá 300k"}
                km2={"Giảm giá 10% sản phẩm"}
                num={4}
                id={43}
              />
              <PhoneCardHome
                img={
                  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-reno10-pro-plus-tim.png"
                }
                name={"Oppo Reno 10 Pro+"}
                km1={"Tặng kèm voucher trị giá 400k"}
                km2={"Flashsales kịch sàn"}
                num={6}
                id={56}
              />
            </div>
            <div>
              <video
                width="640"
                height="360"
                src={samsung}
                loop
                muted
                autoPlay
                style={{ borderRadius: "4px" }}
              >
                {" "}
                Trình duyệt của bạn không hỗ trợ thẻ video.{" "}
              </video>
            </div>
          </div>
          <div className={cx("row")}>
            <div>
              <video
                width="640"
                height="360"
                src={xiaomi}
                loop
                muted
                autoPlay
                style={{ borderRadius: "4px" }}
              >
                {" "}
                Trình duyệt của bạn không hỗ trợ thẻ video.{" "}
              </video>
            </div>
            <div className={cx("card")}>
              <PhoneCardHome
                img={
                  "https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture//Apro/Apro_product_35193/xiaomi-14t-12gb_main_722_1020.png.webp"
                }
                name={"Xiaomi Redmi K60 Ultra"}
                km1={"Tặng kèm voucher trị giá 400k"}
                km2={"Flashsales kịch sàn trong ngày nay"}
                num={6}
                id={53}
              />
              <PhoneCardHome
                img={
                  "https://cdn.hoanghamobile.com/i/previewV2/Uploads/2024/06/04/redmi-12-3.png"
                }
                name={"Xiaomi Redmi 12C"}
                km1={"Tặng kèm voucher trị giá 400k"}
                km2={"Flashsales kịch sàn trong ngày nay"}
                num={3}
                id={54}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HighLight;
