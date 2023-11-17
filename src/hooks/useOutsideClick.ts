import { useState, useEffect, useRef } from "react";

function useOutsideClick() {
  const [show, setShow] = useState<boolean>(false);
  const ref = useRef<any>();
  useEffect(() => {
    const handleClick = (e: any) => {
      if (ref?.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [ref]);

  return { ref, show, setShow };
}

export default useOutsideClick;
