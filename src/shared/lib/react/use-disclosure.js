import { useState } from "react";

export const useDisclosure = (initialState, callbacks) => {
  const [isOpen, setIsOpen] = useState(Boolean(initialState));

  const open = () => {
    setIsOpen(true);
    callbacks?.onOpen?.();
  };

  const close = () => {
    setIsOpen(false);
    callbacks?.onClose?.();
  };

  const toggle = (toSet) => {
    if (typeof toSet === "undefined") {
      setIsOpen((prev) => !prev);
      return;
    }
    setIsOpen(toSet);
  };

  return [isOpen, { open, close, toggle }];
};
