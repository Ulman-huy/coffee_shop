import { cafein_fin, slider_1, slider_2 } from "../../../assets/images";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const slider = [
  {
    title: "Bắt đầu một ngày mới với ly cafe",
    subTitle:
      "Uống cafe vào buổi sáng giúp tăng sự tập trung và trí nhớ, kích thích trái tim và tuần hoàn, giảm cảm giác buồn ngủ.",
    image: slider_2,
    to: "",
  },
  {
    title: "Nơi sẻ chia vui buồn cùng bạn",
    subTitle:
      "Bên ly cà phê phin đang tí tách rơi, người ta trải lòng mình trong những tâm sự vui buồn, những ký ức tưởng chừng đã ngủ quên.",
    image: cafein_fin,
    to: "",
  },
  {
    title: "Chậm lại để suy ngẫm",
    subTitle:
      "Muốn nếm vị cà phê phải chờ đợi pha chế, đó là nét tinh hoa được chắt chiu lại mỗi giây sống chậm với cuộc đời.",
    image: slider_1,
    to: "",
  },
];

function Slider() {
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '"></span>';
    },
  };
  return (
    <Swiper
      spaceBetween={30}
      effect={"fade"}
      pagination={pagination}
      modules={[EffectFade, Pagination]}
      className="swiper-home"
    >
      {slider.map((slide: any, index: number) => (
        <SwiperSlide key={index}>
          <div
            className="w-full flex items-center justify-center bg-black"
            style={{ height: "calc(100vh - 140px)" }}
          >
            <div className="max-w-default w-full flex items-center justify-between">
              <div className="max-w-[450px] w-full">
                <h1 className="text-yellow uppercase text-[32px] mt-0">
                  {slide.title}
                </h1>
                <h3 className="text-base font-medium leading-[18px] mb-[24px]">
                  {slide.subTitle}
                </h3>
                <Link
                  to={slide.to}
                  className="bg-primary px-6 py-2 mt-3 font-semibold rounded-[5px] cursor-pointer z-[10] hover:opacity-90"
                >
                  Xem thêm
                </Link>
              </div>
              <div className="max-w-[450px] w-full">
                <img
                  src={slide.image}
                  width="450px"
                  alt=""
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slider;
