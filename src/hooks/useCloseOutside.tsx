import { useEffect, useRef } from "react";

const useCloseOutside = (handler: any) => {
  const domNode: any = useRef();

  useEffect(() => {
    const handleClick = (e: any) => {
      if (!domNode?.current?.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  return domNode;
};

export default useCloseOutside;
