import { useState } from "react";
import { bg1, discover_1, discover_2 } from "../../assets/images";
import { Link } from "react-router-dom";
import { FaChevronRight, FaTag } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa";

const tabs = ["Tất cả", "Coffee", "Tea", "Blog"];
const subTabs = [
  {
    title: "Coffee",
    tabs: ["Chuyện Cà Phê", "Pha Cà Phê"],
  },
  {
    title: "Tea",
    tabs: ["Pha Trà", "Câu chuyện về trà"],
  },
  {
    title: "Blog",
    tabs: ["In The Mood", "Review", "Human of TCH"],
  },
];

function Discover() {
  const [tabActive, setTabActive] = useState(tabs[1]);
  return (
    <div className="flex flex-col items-center">
      <h4 className="mb-3 text-[22px]">Chuyện Nhà</h4>
      <div className="w-[32px] h-[3px] bg-yellow"></div>
      <p className="max-w-[588px] text-grey text-center text-[14px] mt-[10px]">
        coffeeHouse sẽ là nơi mọi người xích lại gần nhau, đề cao giá trị kết
        nối con người và sẻ chia thân tình bên những tách cà phê, ly trà đượm
        hương, truyền cảm hứng về lối sống hiện đại.
      </p>
      <ul className="mt-6 flex gap-4">
        {tabs.map((tab: any) => (
          <li
            key={tab}
            onClick={() => setTabActive(tab)}
            className={`h-[44px] flex justify-center items-center border w-[120px] rounded-[30px] cursor-pointer font-semibold transition-all duration-300 ${
              tabActive === tab
                ? "text-white bg-yellow border-yellow"
                : "hover:text-yellow border-white "
            }`}
          >
            {tab}
          </li>
        ))}
      </ul>
      <div className="mt-11">
        {tabActive == tabs[0] && (
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-3 max-w-default w-full gap-8 flex-nowrap mb-[92px]">
              <DiscoverItem
                width="100%"
                height="370px"
                image={discover_1}
                tag={false}
              />
              <div className="col-span-2">
                <DiscoverItem
                  width="100%"
                  height="433px"
                  image={discover_2}
                  tag={false}
                />
              </div>
            </div>
            <div
              className="grid grid-cols-discover gap-[80px] pb-[40px]"
              style={{ backgroundImage: `url(${bg1})` }}
            >
              <img
                src={discover_1}
                className="rounded-md relative top-[-40px]"
                alt=""
              />
              <div className="mr-[160px] pt-10">
                <h4 className="mb-6 font-semibold text-lg before:contents-[' '] relative before:absolute ml-3 before:w-[3px] before:h-full before:bg-yellow before:-left-3">
                  Coffee
                </h4>
                <div className="flex flex-col gap-5">
                  <DiscoverItem
                    width="100%"
                    height="200px"
                    image={discover_1}
                    row
                    tag={true}
                  />
                  <DiscoverItem
                    width="100%"
                    height="200px"
                    image={discover_1}
                    row
                    tag={true}
                  />
                  <DiscoverItem
                    width="100%"
                    height="200px"
                    image={discover_1}
                    row
                    tag={true}
                  />
                  <div className="flex justify-center pt-2">
                    <button className="px-[44px] py-[10px] bg-white text-yellow uppercase text-[14px] font-semibold rounded-lg hover:opacity-95 transition-opacity">
                      TÌM HIỂU THÊM
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-discover-reverse gap-[80px] bg-black py-10 mb-[80px]">
              <div className="ml-[160px] pt-10">
                <h4 className="mb-6 font-semibold text-lg before:contents-[' '] relative before:absolute ml-3 before:w-[3px] before:h-full before:bg-yellow before:-left-3">
                  Tea
                </h4>
                <div className="flex flex-col gap-5">
                  <DiscoverItem
                    width="100%"
                    height="200px"
                    image={discover_1}
                    row
                    tag={true}
                  />
                  <DiscoverItem
                    width="100%"
                    height="200px"
                    image={discover_1}
                    row
                    tag={true}
                  />
                  <DiscoverItem
                    width="100%"
                    height="200px"
                    image={discover_1}
                    row
                    tag={true}
                  />
                  <div className="flex justify-center pt-2">
                    <button className="px-[44px] py-[10px] bg-white text-yellow uppercase text-[14px] font-semibold rounded-lg hover:opacity-95 transition-opacity">
                      TÌM HIỂU THÊM
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <img src={discover_1} className="rounded-md" alt="" />
              </div>
            </div>
            <div
              className="grid grid-cols-discover gap-[80px] pb-[40px]"
              style={{ backgroundImage: `url(${bg1})` }}
            >
              <img
                src={discover_1}
                className="rounded-md relative top-[-40px]"
                alt=""
              />
              <div className="mr-[160px] pt-10">
                <h4 className="mb-6 font-semibold text-lg before:contents-[' '] relative before:absolute ml-3 before:w-[3px] before:h-full before:bg-yellow before:-left-3">
                  Blog
                </h4>
                <div className="flex flex-col gap-5">
                  <DiscoverItem
                    width="100%"
                    height="200px"
                    image={discover_1}
                    row
                    tag={true}
                  />
                  <DiscoverItem
                    width="100%"
                    height="200px"
                    image={discover_1}
                    row
                    tag={true}
                  />
                  <DiscoverItem
                    width="100%"
                    height="200px"
                    image={discover_1}
                    row
                    tag={true}
                  />
                  <div className="flex justify-center pt-2">
                    <button className="px-[44px] py-[10px] bg-white text-yellow uppercase text-[14px] font-semibold rounded-lg hover:opacity-95 transition-opacity">
                      TÌM HIỂU THÊM
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {tabActive !== tabs[0] && (
          <div className="min-w-[1100px] flex flex-nowrap justify-between relative">
            <div className="max-w-[745px] w-full flex flex-col gap-6">
              <DiscoverItem
                width="100%"
                height="180px"
                image={discover_1}
                row
                tag={true}
              />
              <DiscoverItem
                width="100%"
                height="180px"
                image={discover_1}
                row
                tag={true}
              />
              <DiscoverItem
                width="100%"
                height="180px"
                image={discover_1}
                row
                tag={true}
              />
              <DiscoverItem
                width="100%"
                height="180px"
                image={discover_1}
                row
                tag={true}
              />
              <DiscoverItem
                width="100%"
                height="180px"
                image={discover_1}
                row
                tag={true}
              />
              <div className="flex gap-2 py-8">
                <div className="w-[45px] h-[45px] flex items-center rounded-md justify-center font-medium cursor-pointer text-grey hover:text-yellow duration-300 transition-colors border border-grey hover:border-yellow">
                  <FaChevronLeft />
                </div>
                <div className="w-[45px] h-[45px] flex items-center rounded-md justify-center font-medium cursor-pointer text-grey hover:text-yellow duration-300 transition-colors border border-grey hover:border-yellow">
                  1
                </div>
                <div className="w-[45px] h-[45px] flex items-center rounded-md justify-center font-medium cursor-pointer text-grey hover:text-yellow duration-300 transition-colors border border-grey hover:border-yellow">
                  2
                </div>
                <div className="w-[45px] h-[45px] flex items-center rounded-md justify-center font-medium cursor-pointer text-grey hover:text-yellow duration-300 transition-colors border border-grey hover:border-yellow">
                  3
                </div>
                <div className="w-[45px] h-[45px] flex items-center rounded-md justify-center font-medium cursor-pointer text-grey hover:text-yellow duration-300 transition-colors border border-grey hover:border-yellow">
                  ...
                </div>
                <div className="w-[45px] h-[45px] flex items-center rounded-md justify-center font-medium cursor-pointer text-grey hover:text-yellow duration-300 transition-colors border border-grey hover:border-yellow">
                  10
                </div>
                <div className="w-[45px] h-[45px] flex items-center rounded-md justify-center font-medium cursor-pointer text-grey hover:text-yellow duration-300 transition-colors border border-grey hover:border-yellow">
                  <FaChevronRight />
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-end">
              <div className="sticky top-[92px]">
                {subTabs.map((sub: any) => (
                  <div key={sub.title}>
                    <h5 className="font-semibold text-yellow mt-1 text-lg">
                      {sub.title}
                    </h5>
                    {sub.tabs.map((tab: string) => (
                      <p
                        key={tab}
                        className="cursor-pointer hover:text-yellow transition-all duration-300 mt-1 hover:translate-x-1 font-medium"
                        onClick={() => setTabActive(sub.title)}
                      >
                        {tab}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const DiscoverItem = ({ image, tag, width, row, height }: any) => {
  return (
    <div className={`${row && "flex gap-6"}`}>
      <Link to="detail">
        <img
          style={{ height: height, width: width }}
          className="object-cover rounded-[10px] min-w-[360px]"
          src={image}
          alt=""
        />
      </Link>
      <div>
        <Link to="detail">
          <h4 className="text-lg uppercase mt-2 hover:text-yellow transition-colors duration-300">
            SIGNATURE BY THE COFFEE HOUSE - "DẤU ẤN" MỚI CỦA NHÀ CÀ PHÊ
          </h4>
        </Link>
        <p className="text-[14px] mt-1">19/01/2023</p>
        <p className="text-[14px] text-grey mt-1 line-clamp-2">
          Ngày 11.01.2023, Chuỗi The Coffee House thông báo cửa hàng SIGNATURE
          by The Coffee House chính thức khai trương tại trung tâm thương mại
          Crescent Mall, Nguyễn Văn Linh, Quận...
        </p>
        {tag && (
          <div className="flex text-[13px] text-yellow gap-3 items-center mt-2">
            <span className="rotate-90 inline-block">
              <FaTag />
            </span>
            <p>inthemood</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
