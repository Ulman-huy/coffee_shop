import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { slider_3, slider_4 } from "../../../../assets/images";

function Slider() {
  const pagination = {
    clickable: true,
    renderBullet: function (_index: number, className: string) {
      return '<span class="' + className + '"></span>';
    },
  };
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      pagination={pagination}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="swiper-product"
    >
      <SwiperSlide>
        <img
          src={slider_3}
          alt="Slider 1"
          className="w-full h-[40vh] object-cover object-center"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={slider_4}
          alt="Slider 2"
          className="w-full h-[40vh] object-cover object-center"
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src={slider_3}
          alt="Slider 1"
          className="w-full h-[40vh] object-cover object-center"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={slider_4}
          alt="Slider 2"
          className="w-full h-[40vh] object-cover object-center"
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default Slider;
