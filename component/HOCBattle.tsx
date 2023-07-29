"use client";

import Image from "next/image";
import versusGIF from "@/assets/versus.gif";
import charizard from "@/assets/pokedex/charizard.png";
import pikachu from "@/assets/pokedex/pikachu.png";
export default function HOCBattle() {
  return (
    <div className="h-screen w-full flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 flex w-full h-full justify-center items-center z-10 animate__animated animate__zoomIn">
        <div>
          <Image src={versusGIF} height={400} width={400} alt="versus" />
        </div>
      </div>
      <div className="basis-1/2 ">
        <div className="bg-[url(https://thumbs.gfycat.com/OrdinaryUnkemptHornbill-size_restricted.gif)] bg-center bg-cover  bg-no-repeat h-full w-full animate__animated  animate__fadeInRight flex justify-end overflow-hidden">
          <div className="absolute p-10 z-20">
            <Image src={charizard} height={500} width={500} alt="charizard" />
          </div>
          <div className=" flex flex-col justify-center items-center p-5  h-full z-10">
            <div className="text-9xl text-white font-black">CHARIZARD</div>
          </div>
        </div>
      </div>
      <div className="basis-1/2 ">
        <div className="bg-[url(https://thumbs.gfycat.com/CreamyCornyCapeghostfrog-size_restricted.gif)] bg-center bg-cover  bg-no-repeat h-full w-full animate__animated  animate__fadeInLeft flex justify-start overflow-hidden">
          <div className="absolute py-10 px-20 z-20">
            <Image src={pikachu} height={500} width={500} alt="pikachu" />
          </div>
          <div className=" flex flex-col justify-center items-center p-5 h-full z-10">
            <div className="text-9xl text-white font-black">PIKACHU</div>
          </div>
        </div>
      </div>
    </div>
  );
}
