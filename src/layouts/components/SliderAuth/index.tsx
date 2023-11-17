import { cafein_fin, slider_1, slider_2 } from "../../../assets/images";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/navigation';

import { Autoplay, EffectFlip } from "swiper/modules";

function SliderAuth() {
  return (
    <Swiper
      slidesPerView={1}
      loop={true}
      pagination={false}
      effect={'flip'}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, EffectFlip]}
      className="mySwiper"
    >
      <SwiperSlide>
        <img className="w-full h-full object-cover" src={slider_1} />
      </SwiperSlide>
      <SwiperSlide>
        <img className="w-full h-full object-cover" src={cafein_fin} />
      </SwiperSlide>
      <SwiperSlide>
        <img className="w-full h-full object-cover" src={slider_2} />
      </SwiperSlide>
    </Swiper>
  );
}

export default SliderAuth;
