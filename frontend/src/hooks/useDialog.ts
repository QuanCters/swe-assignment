import { useRef } from "react";
import useDisableBodyScroll from "./useDisableBodyScroll";

export function useDialog(onClose: () => void) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useDisableBodyScroll(dialogRef.current?.open ?? true);

  const handleOutsideClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      onClose();
    }
  };

  return { dialogRef, handleOutsideClick };
}
