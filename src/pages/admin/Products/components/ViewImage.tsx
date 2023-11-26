import { Col, Image, Row } from "antd";
import { useState, useEffect } from "react";

type ViewImageTypes = React.ComponentProps<"div"> & {
  images: string;
};

function ViewImage({ images }: ViewImageTypes) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    setSrc(images.split(",")[0]);
  }, [images]);
  return (
    <div className="w-full min-h-[500px]">
      <Image.PreviewGroup>
        <Image src={src} className="w-full h-auto aspect-square" alt="" />
        <Row className="flex-nowrap gap-3">
          {images.split(",").map((src: string) => (
            <Col
              className="w-[60px] h-[60px]"
              key={src}
              onClick={() => setSrc(src)}
            >
              <Image
                className="w-[60px] h-[60px] cursor-pointer"
                src={src}
                preview={false}
                alt=""
              />
            </Col>
          ))}
        </Row>
      </Image.PreviewGroup>
    </div>
  );
}

export default ViewImage;
