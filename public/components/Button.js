import React from "react";

const Button = ({ children, className, onClick, disabled }) => {
  return (
    <button
      className={`p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;