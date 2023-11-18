import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import {
  trademark1,
  trademark10,
  trademark11,
  trademark2,
  trademark3,
  trademark4,
  trademark5,
  trademark6,
  trademark7,
  trademark8,
  trademark9,
} from "../../../assets/images";

const trademarks = [
  trademark1,
  trademark2,
  trademark3,
  trademark4,
  trademark5,
  trademark6,
  trademark7,
  trademark8,
  trademark9,
  trademark10,
  trademark11,
];

function Trademark() {
  return (
    <div className="h-[315px] flex items-center justify-center bg-grey mt-[80px]">
      <div className="max-w-default w-full">
        <Swiper
          spaceBetween={30}
          className="swiper-trademark"
          slidesPerView={5}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {trademarks.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <img
                className="w-[250px] h-[75px] object-contain"
                src={item}
                alt={`trademark ${index}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Trademark;
