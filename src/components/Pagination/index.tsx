import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

interface IPagination {
  totalPage: number;
  page: number;
  setPage: (page: number) => void;
  elementPerPage: number;
}

function Pagination({ totalPage, page, setPage, elementPerPage }: IPagination) {
  return (
    <div className="flex items-center gap-1">
      <div
        className={`w-[40px] h-[40px] flex items-center cursor-pointer justify-center border border-yellow rounded-md hover:bg-[#ff886315] ${
          page == 1 && "cursor-default hover:bg-transparent pointer-events-none"
        }`}
        onClick={() => setPage(page - 1)}
      >
        <span className="relative left-1">
          <MdArrowBackIos />
        </span>
      </div>
      {Array(Math.ceil(totalPage / elementPerPage))
        .fill(0)
        .map((_: any, index: number) => (
          <div
            key={index}
            className={`w-[40px] h-[40px] flex items-center justify-center hover:bg-[#ff886315] border cursor-pointer border-yellow rounded-md ${
              page === index + 1 &&
              "text-yellow cursor-default hover:bg-transparent"
            }`}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </div>
        ))}

      <div
        className={`w-[40px] h-[40px] flex items-center cursor-pointer justify-center border border-yellow rounded-md hover:bg-[#ff886315] ${
          page == Math.ceil(totalPage / elementPerPage) &&
          "cursor-default hover:bg-transparent pointer-events-none"
        }`}
        onClick={() => setPage(page + 1)}
      >
        <MdArrowForwardIos />
      </div>
    </div>
  );
}

export default Pagination;
