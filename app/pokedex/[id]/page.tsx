"use client";
import { checkIconType, checkStats, checkTypes } from "@/utils/BgColorPokeType";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import * as RiIcons from "react-icons/ri";
import useSWR from "swr";
import * as Io5icons from "react-icons/io5";
import HOCLoading from "@/component/HOCLoading";
const fetcher = (url: string) =>
  fetch(url, { next: { revalidate: 60 } }).then((res) => res.json());

const PokemonImage = (data: any) => {
  // const { data, error, isLoading } = useSWR(
  //   `https://pokeapi.co/api/v2/pokemon/${id}/`,
  //   fetcher
  // );
  const { sprites, types } = data ?? {};
  console.log("🚀 ~ file: page.tsx:20 ~ PokemonImage ~ sprites:", sprites);

  return (
    <div
      className={` flex  flex-col justify-center items-center  h-full w-fit`}
    >
      <div className="relative flex flex-col ">
        {sprites?.other?.home?.front_default && (
          <div className="bg-gradient-radial from-slate-950/70 via-transparent to-transparent w-full h-20 absolute -bottom-8 z-10" />
        )}

        {sprites?.other?.home?.front_default ? (
          <Image
            src={sprites?.other?.home?.front_default}
            alt={sprites?.back_shiny_female}
            height={400}
            width={400}
            className="h-[25rem] w-[25rem] z-20"
          />
        ) : (
          <HOCLoading />
        )}
      </div>
    </div>
  );
};
interface CardProps {
  name: string;
  url: string;
}

interface PokeTypeProps {
  slot: 1;
  type: CardProps;
}

export default function ViewPokemon({ params: { id } }: any) {
  const router = useRouter();
  const { data: info } = useSWR(
    [
      // `https://pokeapi.co/api/v2/pokemon-species/${id}/`,
      `https://pokeapi.co/api/v2/pokemon/${id}/`,
    ],
    fetcher
  );
  // const { data: poke } = useSWR(
  //   [
  //     // `https://pokeapi.co/api/v2/pokemon-species/${id}/`,
  //     `https://pokeapi.co/api/v2/evolution-chain/1`,
  //   ],
  //   fetcher
  // );
  // console.log(
  //   "🚀 ~ file: page.tsx:72 ~ ViewPokemon ~ pokasdqweqweqweqwe:",
  //   poke
  // );
  const { name, stats, types } = info ?? {};

  return (
    <div
      className={`h-full md:h-screen flex justify-center items-center w-full  ${checkTypes(
        types?.length >= 0 && types[0]?.type?.name
      )}`}
    >
      <div className="max-w-6xl w-full flex flex-col gap-10 ">
        <div className="flex flex-col  w-fit  px-5 ">
          <button
            className={`flex flex-row gap-2 p-2 text-white rounded-lg items-center w-fit text-lg hover:text-black justify-center`}
            onClick={() => router.back()}
          >
            <Io5icons.IoArrowBack />
            <span>Back</span>
          </button>
          <div className="text-5xl md:text-6xl lg:text-8xl font-black text-white/90 drop-shadow-2xl">
            {name?.toUpperCase()}
          </div>
        </div>

        <div className="flex flex-col gap-2 md:flex-row w-full">
          <div className="flex flex-col gap-5 w-full justify-center items-center">
            <PokemonImage {...info} />
          </div>
          <div className="w-full flex flex-col gap-3 rounded-t-3xl p-5 md:p-0 bg-white md:bg-transparent">
            <div className="text-xl text-gray-600 md:text-white font-semibold">
              TYPE
            </div>
            <div className="flex flex-row gap-2 w-full">
              {types?.map((data: PokeTypeProps) => {
                return (
                  <div
                    key={data.slot}
                    className={`${checkTypes(
                      data?.type?.name
                    )}  border-2 rounded-full  flex flex-row gap-3 capitalize justify-center items-center text-white px-3 py-1`}
                  >
                    {" "}
                    <Image
                      src={checkIconType(data?.type?.name)}
                      alt={data?.type?.name}
                      height={100}
                      width={100}
                      className={`h-5 w-5  `}
                    />
                    <span>{data?.type?.name}</span>
                  </div>
                );
              })}
            </div>
            <div className="text-xl text-gray-600 md:text-white font-semibold">
              BASE STAT
            </div>
            <div className=" text-md flex flex-col gap-3  ">
              {stats?.map(({ base_stat, stat }: any, index: number) => {
                return (
                  <div className="grid grid-cols-12 gap-2" key={index}>
                    <div className="col-span-3 text-gray-600 font-medium">
                      {" "}
                      {checkStats(stat)?.toUpperCase()}
                    </div>

                    <div className="col-span-6 bg-gray-200 w-full rounded-full">
                      <div
                        className={` ${checkTypes(
                          types?.length >= 0 && types[0]?.type?.name
                        )} rounded-full h-full px-2 shadow-lg flex flex-row gap-2 border-2 text-white`}
                        style={{ width: `${base_stat / 3}%` }}
                      ></div>
                    </div>
                    <div className="col-span-3 text-gray-700 text-sm">
                      {base_stat}/300
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="basis-2/6 p-10">sdasd</div> */}
    </div>
  );
  // <div className="h-screen flex flex-row w-full bg-red-200">
}
