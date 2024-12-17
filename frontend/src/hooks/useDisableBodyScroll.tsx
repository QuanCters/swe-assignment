"use client";
import { useEffect } from "react";

const useDisableBodyScroll = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup overflow setting khi modal đóng hoặc component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]); // Chạy lại khi trạng thái `isOpen` thay đổi
};

export default useDisableBodyScroll;
