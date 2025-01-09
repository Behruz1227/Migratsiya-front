import React from "react";
import Loading from "./loading";

const LoadingDiv: React.FC = () => {
  return (
    <div
      className={`rounded-lg border border-[#0086D1] flex justify-center items-center p-4 transition-colors ${"bg-white hover:shadow-md"}`}
    >
      <Loading/>
    </div>
  );
};

export default LoadingDiv;
