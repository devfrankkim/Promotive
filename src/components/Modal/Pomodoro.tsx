import React, { useState } from "react";

type TModalPomodoro = {
  children: any;
  isOpen: any;
  close: any;
};

const ModalPomodoro = ({ children, isOpen }: TModalPomodoro) => {
  return (
    isOpen && (
      <div
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    )
  );
};

export default ModalPomodoro;
