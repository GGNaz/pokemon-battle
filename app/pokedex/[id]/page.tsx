"use client";
import { checkStats, checkTypes } from "@/utils/BgColorPokeType";
import Image from "next/image";
import React, { ReactNode } from "react";
import * as RiIcons from "react-icons/ri";
import useSWR from "swr";
const fetcher = (url: string) =>
  fetch(url, { next: { revalidate: 60 } }).then((res) => res.json());

const PokemonImage = (data: any) => {
  // const { data, error, isLoading } = useSWR(
  //   `https://pokeapi.co/api/v2/pokemon/${id}/`,
  //   fetcher
  // );
  const { sprites, types } = data ?? {};

  return (
    <div
      className={` flex  flex-col justify-center items-center  h-full w-full`}
    >
      <div className="relative flex flex-col">
        {/* <CgIcons.CgPokemon className={`h-96 w-96 absolute  text-white/20 z-10`} /> */}
        <div className="bg-gradient-radial from-slate-950/70 via-transparent to-transparent w-full h-20 absolute -bottom-8 z-10" />
        <Image
          src={sprites?.other?.home?.front_default}
          alt={sprites?.back_shiny_female}
          height={400}
          width={400}
          className="h-96 w-96 z-20"
        />
      </div>
    </div>
  );
};

export default function ViewPokemon({ params: { id } }: any) {
  const { data, error, isLoading } = useSWR(
    [
      // `https://pokeapi.co/api/v2/pokemon-species/${id}/`,
      `https://pokeapi.co/api/v2/pokemon/${id}/`,
    ],
    fetcher
  );
  console.log("🚀 ~ file: page.tsx:9 ~ AWWWWWWWWWWWWWWWWW ~ data:", data);
  const { name, stats, types } = data ?? {};

  console.log("🚀 ~ file: page.tsx:9 ~ ViewPokemon ~ data:", data);
  return (
    <div className="h-screen flex flex-row  w-full bg-green-800">
      <div className="basis-2/6  flex flex-col p-10">
        <div className="text-8xl font-black text-white drop-shadow-2xl">
          {name?.toUpperCase()}
        </div>
        <div className=" text-md flex flex-col gap-5 pt-10 max-w-sm">
          {stats?.map(({ base_stat, stat }: any, index: number) => {
            return (
              <div className="grid grid-cols-12 " key={index}>
                <div className="col-span-12 bg-gray-200 w-full rounded-full">
                  <div
                    className={` ${checkTypes(
                      types?.length >= 0 && types[0]?.type?.name
                    )} rounded-full h-full text-black p-2 shadow-lg flex flex-row gap-2`}
                    style={{ width: `${base_stat}%` }}
                  >
                    {/* <RiIcons.RiSwordFill className="text-4xl " />{" "} */}
                    {checkStats(stat)?.toUpperCase()}
                  </div>
                  {/* <div className="text-right">123</div> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="basis-2/6 ">
        <PokemonImage {...data} />
      </div>
      <div className="basis-2/6 border">asdasd</div>
    </div>
  );
  // <div className="h-screen flex flex-row w-full bg-red-200">
}
