import React from "react";

export const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-28 h-28 border-4 border-black border-dashed rounded-full animate-spin"></div>
    </div>
  );
};
