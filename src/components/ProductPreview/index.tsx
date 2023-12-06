import { Button, Image, Modal } from "antd";
import { ProductType } from "../../types";
import { useState, useEffect } from "react";
import { renderStar } from "../../utils";
import dayjs from "dayjs";
import { IoHeartOutline } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";

type Props = {
  product: ProductType | undefined;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

function ProductPreview({ product, visible, setVisible }: Props) {
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    if (visible) {
      setSrc(product?.images.split(",")[0]);
    }
  }, [visible]);

  return (
    <Modal
      open={visible}
      onCancel={() => setVisible(false)}
      footer={false}
      className="container__modal--preview"
      width={1440}
      closable={false}
    >
      <div className="p-8">
        <div className="flex gap-8">
          <div className="w-[40%] aspect-square flex-shrink-0">
            <Image.PreviewGroup>
              <Image
                className="w-full h-full rounded-lg overflow-hidden object-cover"
                src={src}
                alt=""
              />
              <div className="flex h-[100px] overflow-auto gap-2 mt-4 scroll__h-5">
                {product?.images.split(",").map((src: string) => (
                  <Image
                    src={src}
                    key={src}
                    className="rounded-md max-w-[100px] cursor-pointer h-full w-full aspect-square object-cover"
                    onClick={() => setSrc(src)}
                    alt=""
                  />
                ))}
              </div>
            </Image.PreviewGroup>
          </div>
          <div>
            <h3 className="text-yellow">{product?.brand}</h3>
            <h3 className="text-[26px]">{product?.name}</h3>
            <div className="flex items-center gap-4 mt-4">
              <span>{renderStar(product?.star ?? 0)}</span>
              <span>•</span>
              <span className="relative top-[1px]">{product?.sold} đã bán</span>
              {!!product?.like && (
                <>
                  <span>•</span>
                  <span>{product?.like} lượt thích</span>
                </>
              )}
            </div>
            <div className="flex gap-2 items-center">
              {product?.sale != 0 && (
                <del className="text-[22px]">
                  {Intl.NumberFormat().format(
                    (product?.price ?? 0) +
                      ((product?.price ?? 0) * (product?.sale ?? 0)) / 100 ?? 0
                  )}{" "}
                  ₫
                </del>
              )}
              <span className="text-[32px] text-primary font-bold">
                {Intl.NumberFormat().format(product?.price ?? 0)} ₫
              </span>
            </div>
            <h3 className="mt-5">
              Hạn sử dụng: {dayjs(product?.createdAt).format("DD/MM/YYYY")}
            </h3>
            <div className="mt-2">
              <h3>
                Công dụng:{" "}
                <span
                  dangerouslySetInnerHTML={{ __html: product?.info ?? "" }}
                  className="wrap__html"
                />
              </h3>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                size="large"
                className="text-yellow border-yellow text-[28px] flex items-center justify-center w-[44px] flex-shrink-0"
                icon={<IoHeartOutline />}
              />
              <Button
                size="large"
                type="primary"
                className="w-full bg-yellow flex items-center justify-center"
                icon={<FaCartShopping />}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-[24px] font-semibold mb-2">Thông tin chi tiết</h2>
          <div
            className="wrap__html"
            dangerouslySetInnerHTML={{ __html: product?.description ?? "" }}
          />
        </div>
      </div>
    </Modal>
  );
}

export default ProductPreview;
