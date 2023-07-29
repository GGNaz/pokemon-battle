import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/loading/animation_lknkfhm3.json";
export default function HOCLoading() {
  return (
    <Lottie
      animationData={loadingAnimation}
      loop={true}
      className="h-20 w-20"
    />
  );
}
