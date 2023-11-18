import { bg2, news } from "../../../assets/images";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";

function News() {
  const swiperRef = useRef<any>(null);
  return (
    <div
      className="flex justify-center items-center bg-no-repeat bg-contain bg-grey bg-center"
      style={{ backgroundImage: `url(${bg2})` }}
    >
      <div className="max-w-default w-full bg-grey  mb-[80px]">
        <h2 className="text-yellow font-pacifico text-[36px] uppercase m-0 mt-[80px] mb-10">
          Tin tức
        </h2>
        <Swiper
          spaceBetween={4}
          slidesPerView={3}
          className="swiper-news"
          loop={true}
          onSwiper={(swiper: any) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation]}
        >
          <SwiperSlide>
            <div className="bg-black m-5 cursor-pointer transition-transform duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="hover:scale-105 transition-transform duration-300">
                <img src={news} alt="" />
              </div>
              <div className="px-10 py-5 h-[330px] flex flex-col justify-between">
                <div className="relative">
                  <div className="text-base">
                    <h3 className="mb-2 leading-[28px]">
                      Starbucks sẽ chính thức ra mắt "Spring Blossom"
                    </h3>
                  </div>
                  <div className="leading-[24px] text-grey overflow-hidden whitespace-pre-wrap line-clamp-4 text-ellipsis">
                    Từ ngày 10/3/2023, Starbucks sẽ chính thức ra mắt dòng sản
                    phẩm cafe mới mang tên "Spring Blossom" tại các cửa hàng
                    trên toàn thế giới. Đây là một loại cafe được chế biến từ
                    hạt Arabica chất lượng cao kết hợp với hương vị hoa anh đào
                    tươi ngon, tạo nên một hương vị thơm ngon đặc biệt cho mùa
                    xuân. Ngoài ra, Starbucks cũng sẽ cập nhật menu với các loại
                    cafe phong phú hơn cho khách hàng lựa chọn, bao gồm cả các
                    loại cafe không chất kích thích và thức uống đá xay mới.
                    Khách hàng cũng có thể tùy chọn sữa đặc biệt để thêm vị ngọt
                    hoặc sữa hạt điều thơm ngon cho đồ uống của mình. Để đón
                    mừng sự ra mắt của dòng sản phẩm mới này, Starbucks sẽ áp
                    dụng chương trình giảm giá 10% cho tất cả các sản phẩm cafe
                    và đồ uống mới trong vòng 3 ngày đầu tiên, từ ngày 10/3 đến
                    ngày 12/3/2023. Đây chắc chắn là một tin vui cho những tín
                    đồ của cafe và Starbucks.
                  </div>
                </div>
                <div className="flex w-full border-t-[2px] border-grey pt-3 justify-between items-center font-semibold">
                  <div className="text-base">12.03.2023</div>
                  <div className="text-[12px] max-w-1/2 line-clamp-1 text-right text-ellipsis cursor-pointer">
                    <span>Coffee, Starbucks, Spring Blossom</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-black m-5 cursor-pointer transition-transform duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="hover:scale-105 transition-transform duration-300">
                <img src={news} alt="" />
              </div>
              <div className="px-10 py-5 h-[330px] flex flex-col justify-between">
                <div className="relative">
                  <div className="text-base">
                    <h3 className="mb-2 leading-[28px]">
                      Starbucks sẽ chính thức ra mắt "Spring Blossom"
                    </h3>
                  </div>
                  <div className="leading-[24px] text-grey overflow-hidden whitespace-pre-wrap line-clamp-4 text-ellipsis">
                    Từ ngày 10/3/2023, Starbucks sẽ chính thức ra mắt dòng sản
                    phẩm cafe mới mang tên "Spring Blossom" tại các cửa hàng
                    trên toàn thế giới. Đây là một loại cafe được chế biến từ
                    hạt Arabica chất lượng cao kết hợp với hương vị hoa anh đào
                    tươi ngon, tạo nên một hương vị thơm ngon đặc biệt cho mùa
                    xuân. Ngoài ra, Starbucks cũng sẽ cập nhật menu với các loại
                    cafe phong phú hơn cho khách hàng lựa chọn, bao gồm cả các
                    loại cafe không chất kích thích và thức uống đá xay mới.
                    Khách hàng cũng có thể tùy chọn sữa đặc biệt để thêm vị ngọt
                    hoặc sữa hạt điều thơm ngon cho đồ uống của mình. Để đón
                    mừng sự ra mắt của dòng sản phẩm mới này, Starbucks sẽ áp
                    dụng chương trình giảm giá 10% cho tất cả các sản phẩm cafe
                    và đồ uống mới trong vòng 3 ngày đầu tiên, từ ngày 10/3 đến
                    ngày 12/3/2023. Đây chắc chắn là một tin vui cho những tín
                    đồ của cafe và Starbucks.
                  </div>
                </div>
                <div className="flex w-full border-t-[2px] border-grey pt-3 justify-between items-center font-semibold">
                  <div className="text-base">12.03.2023</div>
                  <div className="text-[12px] max-w-1/2 line-clamp-1 text-right text-ellipsis cursor-pointer">
                    <span>Coffee, Starbucks, Spring Blossom</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-black m-5 cursor-pointer transition-transform duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="hover:scale-105 transition-transform duration-300">
                <img src={news} alt="" />
              </div>
              <div className="px-10 py-5 h-[330px] flex flex-col justify-between">
                <div className="relative">
                  <div className="text-base">
                    <h3 className="mb-2 leading-[28px]">
                      Starbucks sẽ chính thức ra mắt "Spring Blossom"
                    </h3>
                  </div>
                  <div className="leading-[24px] text-grey overflow-hidden whitespace-pre-wrap line-clamp-4 text-ellipsis">
                    Từ ngày 10/3/2023, Starbucks sẽ chính thức ra mắt dòng sản
                    phẩm cafe mới mang tên "Spring Blossom" tại các cửa hàng
                    trên toàn thế giới. Đây là một loại cafe được chế biến từ
                    hạt Arabica chất lượng cao kết hợp với hương vị hoa anh đào
                    tươi ngon, tạo nên một hương vị thơm ngon đặc biệt cho mùa
                    xuân. Ngoài ra, Starbucks cũng sẽ cập nhật menu với các loại
                    cafe phong phú hơn cho khách hàng lựa chọn, bao gồm cả các
                    loại cafe không chất kích thích và thức uống đá xay mới.
                    Khách hàng cũng có thể tùy chọn sữa đặc biệt để thêm vị ngọt
                    hoặc sữa hạt điều thơm ngon cho đồ uống của mình. Để đón
                    mừng sự ra mắt của dòng sản phẩm mới này, Starbucks sẽ áp
                    dụng chương trình giảm giá 10% cho tất cả các sản phẩm cafe
                    và đồ uống mới trong vòng 3 ngày đầu tiên, từ ngày 10/3 đến
                    ngày 12/3/2023. Đây chắc chắn là một tin vui cho những tín
                    đồ của cafe và Starbucks.
                  </div>
                </div>
                <div className="flex w-full border-t-[2px] border-grey pt-3 justify-between items-center font-semibold">
                  <div className="text-base">12.03.2023</div>
                  <div className="text-[12px] max-w-1/2 line-clamp-1 text-right text-ellipsis cursor-pointer">
                    <span>Coffee, Starbucks, Spring Blossom</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-black m-5 cursor-pointer transition-transform duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="hover:scale-105 transition-transform duration-300">
                <img src={news} alt="" />
              </div>
              <div className="px-10 py-5 h-[330px] flex flex-col justify-between">
                <div className="relative">
                  <div className="text-base">
                    <h3 className="mb-2 leading-[28px]">
                      Starbucks sẽ chính thức ra mắt "Spring Blossom"
                    </h3>
                  </div>
                  <div className="leading-[24px] text-grey overflow-hidden whitespace-pre-wrap line-clamp-4 text-ellipsis">
                    Từ ngày 10/3/2023, Starbucks sẽ chính thức ra mắt dòng sản
                    phẩm cafe mới mang tên "Spring Blossom" tại các cửa hàng
                    trên toàn thế giới. Đây là một loại cafe được chế biến từ
                    hạt Arabica chất lượng cao kết hợp với hương vị hoa anh đào
                    tươi ngon, tạo nên một hương vị thơm ngon đặc biệt cho mùa
                    xuân. Ngoài ra, Starbucks cũng sẽ cập nhật menu với các loại
                    cafe phong phú hơn cho khách hàng lựa chọn, bao gồm cả các
                    loại cafe không chất kích thích và thức uống đá xay mới.
                    Khách hàng cũng có thể tùy chọn sữa đặc biệt để thêm vị ngọt
                    hoặc sữa hạt điều thơm ngon cho đồ uống của mình. Để đón
                    mừng sự ra mắt của dòng sản phẩm mới này, Starbucks sẽ áp
                    dụng chương trình giảm giá 10% cho tất cả các sản phẩm cafe
                    và đồ uống mới trong vòng 3 ngày đầu tiên, từ ngày 10/3 đến
                    ngày 12/3/2023. Đây chắc chắn là một tin vui cho những tín
                    đồ của cafe và Starbucks.
                  </div>
                </div>
                <div className="flex w-full border-t-[2px] border-grey pt-3 justify-between items-center font-semibold">
                  <div className="text-base">12.03.2023</div>
                  <div className="text-[12px] max-w-1/2 line-clamp-1 text-right text-ellipsis cursor-pointer">
                    <span>Coffee, Starbucks, Spring Blossom</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-black m-5 cursor-pointer transition-transform duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="hover:scale-105 transition-transform duration-300">
                <img src={news} alt="" />
              </div>
              <div className="px-10 py-5 h-[330px] flex flex-col justify-between">
                <div className="relative">
                  <div className="text-base">
                    <h3 className="mb-2 leading-[28px]">
                      Starbucks sẽ chính thức ra mắt "Spring Blossom"
                    </h3>
                  </div>
                  <div className="leading-[24px] text-grey overflow-hidden whitespace-pre-wrap line-clamp-4 text-ellipsis">
                    Từ ngày 10/3/2023, Starbucks sẽ chính thức ra mắt dòng sản
                    phẩm cafe mới mang tên "Spring Blossom" tại các cửa hàng
                    trên toàn thế giới. Đây là một loại cafe được chế biến từ
                    hạt Arabica chất lượng cao kết hợp với hương vị hoa anh đào
                    tươi ngon, tạo nên một hương vị thơm ngon đặc biệt cho mùa
                    xuân. Ngoài ra, Starbucks cũng sẽ cập nhật menu với các loại
                    cafe phong phú hơn cho khách hàng lựa chọn, bao gồm cả các
                    loại cafe không chất kích thích và thức uống đá xay mới.
                    Khách hàng cũng có thể tùy chọn sữa đặc biệt để thêm vị ngọt
                    hoặc sữa hạt điều thơm ngon cho đồ uống của mình. Để đón
                    mừng sự ra mắt của dòng sản phẩm mới này, Starbucks sẽ áp
                    dụng chương trình giảm giá 10% cho tất cả các sản phẩm cafe
                    và đồ uống mới trong vòng 3 ngày đầu tiên, từ ngày 10/3 đến
                    ngày 12/3/2023. Đây chắc chắn là một tin vui cho những tín
                    đồ của cafe và Starbucks.
                  </div>
                </div>
                <div className="flex w-full border-t-[2px] border-grey pt-3 justify-between items-center font-semibold">
                  <div className="text-base">12.03.2023</div>
                  <div className="text-[12px] max-w-1/2 line-clamp-1 text-right text-ellipsis cursor-pointer">
                    <span>Coffee, Starbucks, Spring Blossom</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-black m-5 cursor-pointer transition-transform duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="hover:scale-105 transition-transform duration-300">
                <img src={news} alt="" />
              </div>
              <div className="px-10 py-5 h-[330px] flex flex-col justify-between">
                <div className="relative">
                  <div className="text-base">
                    <h3 className="mb-2 leading-[28px]">
                      Starbucks sẽ chính thức ra mắt "Spring Blossom"
                    </h3>
                  </div>
                  <div className="leading-[24px] text-grey overflow-hidden whitespace-pre-wrap line-clamp-4 text-ellipsis">
                    Từ ngày 10/3/2023, Starbucks sẽ chính thức ra mắt dòng sản
                    phẩm cafe mới mang tên "Spring Blossom" tại các cửa hàng
                    trên toàn thế giới. Đây là một loại cafe được chế biến từ
                    hạt Arabica chất lượng cao kết hợp với hương vị hoa anh đào
                    tươi ngon, tạo nên một hương vị thơm ngon đặc biệt cho mùa
                    xuân. Ngoài ra, Starbucks cũng sẽ cập nhật menu với các loại
                    cafe phong phú hơn cho khách hàng lựa chọn, bao gồm cả các
                    loại cafe không chất kích thích và thức uống đá xay mới.
                    Khách hàng cũng có thể tùy chọn sữa đặc biệt để thêm vị ngọt
                    hoặc sữa hạt điều thơm ngon cho đồ uống của mình. Để đón
                    mừng sự ra mắt của dòng sản phẩm mới này, Starbucks sẽ áp
                    dụng chương trình giảm giá 10% cho tất cả các sản phẩm cafe
                    và đồ uống mới trong vòng 3 ngày đầu tiên, từ ngày 10/3 đến
                    ngày 12/3/2023. Đây chắc chắn là một tin vui cho những tín
                    đồ của cafe và Starbucks.
                  </div>
                </div>
                <div className="flex w-full border-t-[2px] border-grey pt-3 justify-between items-center font-semibold">
                  <div className="text-base">12.03.2023</div>
                  <div className="text-[12px] max-w-1/2 line-clamp-1 text-right text-ellipsis cursor-pointer">
                    <span>Coffee, Starbucks, Spring Blossom</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default News;
