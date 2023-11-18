import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedIcon,
  TwitterIcon,
} from "../../../components/Icons";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useRef } from "react";

const reviews = [
  {
    text: "Mình thường xuyên ghé qua cửa hàng coffee này và thật sự rất hài lòng về chất lượng cà phê ở đây. Nhân viên phục vụ cực kì nhiệt tình và vui vẻ, không gian quán rộng rãi và đầy đủ tiện nghi. Sẽ quay lại đây lần nữa trong tương lai.",
    name: "Coral Bay",
    job: "Desginer",
  },
  {
    text: "Mình rất ấn tượng về cửa hàng cà phê này. Đồ uống rất ngon, giá cả hợp lý, không gian quán cực kì đẹp và ấm áp. Nhân viên phục vụ thân thiện và tận tình. Sẽ giới thiệu đến bạn bè và quay lại đây nếu có dịp.",
    name: "Mystic Falls",
    job: "Writer",
  },
  {
    text: "Mình cực kì thích quán coffee này! Cà phê rất ngon, không gian quán rộng rãi và thoải mái, và phục vụ rất tốt. Nhân viên ở đây rất nhiệt tình và giúp đỡ khách hàng khi cần. Chắc chắn sẽ quay lại đây mỗi khi muốn thư giãn.",
    name: "Blue Harbor",
    job: "Blogger",
  },
  {
    text: "Cửa hàng coffee này thật sự tuyệt vời! Đồ uống ngon và hợp túi tiền, không gian quán rất đẹp và trang trí tinh tế. Nhân viên phục vụ cực kì chuyên nghiệp và thân thiện. Sẽ giới thiệu đến bạn bè và gia đình của mình.",
    name: "Ocean Breeze",
    job: "Tiktoker",
  },
];

function Reviews() {
  const swiperRef = useRef<any>(null);

  return (
    <div className=" bg-black flex justify-center">
      <div className="p-[60px] max-w-default w-full">
        <h2 className="text-yellow font-pacifico text-[36px] uppercase m-0 text-center mb-2">
          Đánh giá
        </h2>
        <div className="relative group">
          <Swiper
            spaceBetween={30}
            className="swiper-reviews"
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper: any) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Autoplay]}
          >
            {reviews.map((review: any, index: number) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center justify-center select-none">
                  <div className="w-[80px] h-[80px] rounded-full overflow-hidden my-2">
                    <img
                      src="https://i.quotev.com/sn6v67yx4cgq.jpg"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className="text-grey text-center max-w-[680px]">
                    <i className="leading-[25px]">{review.text}</i>
                  </div>
                  <div className="mt-4 text-lg font-semibold">
                    <p className="m-0">{review.name}</p>
                  </div>
                  <p className="mt-1 text-yellow font-semibold">{review.job}</p>
                  <div className="flex mt-2 gap-2">
                    <a
                      href=""
                      className="text-white hover:text-primary transition-colors duration-300 h-[15px] w-[15px] text-[14px]"
                    >
                      <TwitterIcon />
                    </a>
                    <a
                      href=""
                      className="text-white hover:text-primary transition-colors duration-300 h-[15px] w-[15px] text-[14px]"
                    >
                      <LinkedIcon />
                    </a>
                    <a
                      href=""
                      className="text-white hover:text-primary transition-colors duration-300 h-[15px] w-[15px] text-[14px]"
                    >
                      <FacebookIcon />
                    </a>
                    <a
                      href=""
                      className="text-white hover:text-primary transition-colors duration-300 h-[15px] w-[15px] text-[14px]"
                    >
                      <InstagramIcon />
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute top-1/2 -translate-y-1/2 justify-between flex w-full z-[10] opacity-0 group-hover:opacity-100 transition-opacity">
            <div
              onClick={() => swiperRef.current.slidePrev()}
              className="text-[32px] hover:text-primary cursor-pointer transition-colors"
            >
              <FaAngleLeft />
            </div>
            <div
              onClick={() => swiperRef.current.slideNext()}
              className="text-[32px] hover:text-primary cursor-pointer transition-colors"
            >
              <FaAngleRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
