"use client";
import useSWR from "swr";
import React, { useState } from "react";
import * as MdIcons from "react-icons/md";
// import { checkTypes } from "@/utils/BgColorPokeType";
import Link from "next/link";
import Image from "next/image";
import { checkIconType, checkStats, checkTypes } from "@/utils/BgColorPokeType";
import HOCLoading from "@/component/HOCLoading";
const fetcher = (url: string) =>
  fetch(url, { next: { revalidate: 60 } }).then((res) => res.json());

interface CardProps {
  name: string;
  url: string;
}

interface SeletedTabProps {
  id?: number;
  showLabel?: string;
}

const Card = ({ name, url }: CardProps) => {
  console.log("🚀 ~ file: page.tsx:21 ~ Card ~ url:", url);
  const { data, error, isLoading } = useSWR(url, fetcher);
  console.log("🚀 ~ file: page.tsx:25 ~ Card ~ data:", data);
  const [selectedTab, setSelectedtab] = useState<SeletedTabProps>({
    showLabel: "info",
  });

  const { sprites, height, types, stats, id, abilities, weight } = data ?? {};
  console.log("🚀 ~ file: page.tsx:30 ~ Card ~ types:", types);

  const tabShown = (tabName: string, id: number) => {
    setSelectedtab({
      id: id,
      showLabel: tabName,
    });
  };
  const pokeTypeName = types?.length >= 0 && types[0]?.type?.name;

  return (
    <div
      key={name}
      className={` relative shadow-lg  flex rounded-xl  overflow-hidden  cursor-pointer ${checkTypes(
        pokeTypeName
      )}`}
    >
      <div className=" h-full flex flex-col justify-center w-full">
        <div className="  grid grid-cols-3 gap-2 p-2">
          {types?.map(({ type }: any, index: number) => {
            return (
              // <div className="grid grid-cols-12 " key={index}>
              //   <div className="col-span-4">
              //     {checkStats(stat)?.toUpperCase()}
              //   </div>

              //   <div className="col-span-8 bg-gray-200 w-full rounded-full">
              //     <div
              //       className={` ${checkTypes(
              //         pokeTypeName
              //       )} rounded-full h-full text-black px-2 shadow-lg`}
              //       style={{ width: `${base_stat / 2}%` }}
              //     >
              //       {base_stat}
              //     </div>
              //   </div>
              // </div>
              <div
                className={`flex flex-row gap-1  justify-center items-center ${checkTypes(
                  type?.name
                )} rounded-full border p-1`}
                key={index}
              >
                <Image
                  src={checkIconType(type?.name)}
                  alt={type?.name}
                  height={100}
                  width={100}
                  className={`h-4 w-4  `}
                />
                <div className="text-white capitalize text-xs">
                  {type?.name}
                </div>
              </div>
            );
          })}
        </div>

        <Link
          className="px-5 relative flex items-center justify-center"
          href={`/pokedex/${name}`}
        >
          {sprites?.other?.home?.front_default ? (
            <Image
              src={sprites?.other?.home?.front_default}
              alt={sprites?.other?.home?.front_default}
              className="h-40 w-40 z-20 -mb-4 transition-all duration-300 hover:scale-125 hover:z-40 drop-shadow-2xl"
              height={500}
              width={500}
            />
          ) : (
            <div className="h-40 w-40">
              <HOCLoading />
            </div>
          )}

          {/* <Image
            src={checkIconType(pokeTypeName)}
            alt={pokeTypeName}
            height={100}
            width={100}
            className={`h-36 w-36 absolute  text-red-500 z-10`}
          /> */}
          <MdIcons.MdOutlineCatchingPokemon
            className={`h-56 w-56 -rotate-12 absolute text-white/20 z-10`}
          />
        </Link>
        <div className="bg-white shadow-xl w-full h-full flex flex-col rounded-t-2xl p-5 gap-2">
          {/* <div className="grid grid-cols-2 text-xs items-center bg-gray-100 rounded-full z-30">
            <div
              className={`${
                selectedTab.showLabel === "info"
                  ? checkTypes(pokeTypeName) + " text-white"
                  : ""
              } text-center rounded-full p-1 `}
              onClick={() => tabShown("info", id)}
            >
              Type
            </div>

            <div
              className={`${
                selectedTab?.id === id && selectedTab.showLabel === "abilities"
                  ? checkTypes(pokeTypeName) + " text-white"
                  : ""
              } text-center rounded-full p-1 text-black`}
              onClick={() => tabShown("abilities", id)}
            >
              Abilities
            </div>
          </div>
          {selectedTab?.id === id && selectedTab.showLabel === "abilities" ? (
            <div className=" flex flex-col gap-2">
              {abilities?.map(({ ability }: any, index: number) => {
                return (
                  <div
                    key={index}
                    className={`flex flex-row rounded-full capitalize p-2 bg-gray-100 text-xs`}
                  >
                    <div>{ability?.name}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            
          )} */}

          {/* <div className="flex flex-row gap-1 text-sm bg-white">
            {types?.map(({ type }: any, index: number) => (
              <div className={`${checkTypes(type?.name)}`} key={index}>
                {type?.name?.toUpperCase()}
              </div>
            ))}
          </div> */}
          <div className="capitalize font-extrabold text-gray-600 text-xl text-center">
            {" "}
            {name}
          </div>
          <div className="grid grid-cols-2 divide-x-2">
            <div className="flex flex-col justify-center items-center">
              <div className="text-md font-medium">{height}m</div>
              <div className="text-gray-400 text-xs">Height</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="text-md font-medium">{weight}kg</div>
              <div className="text-gray-400 text-xs">Weight</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Pokedex() {
  const { data, error, isLoading } = useSWR(
    "https://pokeapi.co/api/v2/pokemon/?limit=200",
    fetcher
  );
  console.log("🚀 ~ file: page.tsx:9 ~ Pokedex ~ data:", data);

  return (
    <div className="h-full w-full flex justify-center bg-slate-100 py-5">
      {/* {isLoading && (
        <div className="bg-red-700 absolute top-0 left-0 h-full w-full z-50">
          <HOCLoading />
        </div>
      )} */}
      <div className=" w-full h-full max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {data?.results?.map((data: CardProps) => (
            <Card {...data} />
          ))}
        </div>
      </div>
    </div>
  );
}
