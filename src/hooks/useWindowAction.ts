import { useEffect, useState } from "react";

function useWindowAction() {
  const [width, setWidth] = useState<number>();
  const [scrollY, setScrollY] = useState<number>();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, []);
  return { width, scrollY };
}

export default useWindowAction;
