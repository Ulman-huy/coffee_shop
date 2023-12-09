import { useContext, useEffect, useState } from "react";
import { ProductType } from "../../types";
import { GET } from "../../service";
import { GlobalContext } from "../../context";
import ProductItem from "../../components/ProductItem";

function Wishlist() {
  const [wishlist, setWishlist] = useState<ProductType[]>([]);
  const { setLoading, setProductPreview, setIsPreview }: any =
    useContext(GlobalContext);

  const getWishlist = async () => {
    const options = {
      url: "product/like",
    };
    setLoading(true);
    await GET(options)
      .then((response) => {
        if (response) setWishlist(response);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <div
      style={{ minHeight: "calc(100vh - 529px)" }}
      className="flex justify-center"
    >
      {wishlist.length ? (
        <div className="flex gap-8 max-w-default w-full items-start">
          <div className="rounded-lg flex-1">
            <h3 className="text-[22px] font-semibold">
              Sản phẩm yêu thích (
              <span className="text-yellow">{wishlist.length}</span>)
            </h3>
            <div className="mt-4 grid grid-cols-4">
              {wishlist.map((item) => (
                <ProductItem
                  product={item}
                  setProductPreview={setProductPreview}
                  setVisible={setIsPreview}
                  preview
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center min-h-[220px] justify-center">
          <p className="text-[24px]">Không có sản phẩm yêu thích nào. Oops!</p>
        </div>
      )}
    </div>
  );
}

export default Wishlist;
