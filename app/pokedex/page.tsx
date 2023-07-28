"use client";
import useSWR from "swr";
import React, { useState } from "react";
import * as CgIcons from "react-icons/cg";
// import { checkTypes } from "@/utils/BgColorPokeType";
import Link from "next/link";
import Image from "next/image";
import { checkStats, checkTypes } from "@/utils/BgColorPokeType";
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
  const [selectedTab, setSelectedtab] = useState<SeletedTabProps>({
    showLabel: "info",
  });
  console.log("🚀 ~ file: page.tsx:14 ~ Card ~ Card:", data);
  const { sprites, height, types, stats, id, abilities } = data ?? {};
  console.log("🚀 ~ file: page.tsx:28 ~ Card ~ types:", types);

  const tabShown = (tabName: string, id: number) => {
    setSelectedtab({
      id: id,
      showLabel: tabName,
    });
  };

  return (
    <div
      className={` relative shadow-lg  flex rounded-xl  overflow-hidden  cursor-pointer ${checkTypes(
        types?.length >= 0 && types[0]?.type?.name
      )}`}
    >
      <div className=" h-full flex flex-col justify-center w-full">
        <div className="capitalize font-extrabold text-white text-2xl p-5">
          {" "}
          {name}
        </div>
        <Link
          className="px-5 relative flex items-center justify-center"
          href={`/pokedex/${name}`}
        >
          <Image
            src={sprites?.other?.home?.front_default}
            alt={sprites?.other?.home?.front_default}
            className="h-40 w-40 z-20 -mb-4 transition-all duration-300 hover:scale-125 hover:z-40"
            height={500}
            width={500}
          />
          <CgIcons.CgPokemon
            className={`h-60 w-60 absolute  text-white/20 z-10`}
          />
        </Link>
        <div className="bg-white shadow-xl w-full h-full flex flex-col rounded-t-2xl p-5 gap-5">
          <div className="grid grid-cols-2 text-xs items-center bg-gray-100 rounded-full z-30">
            <div
              className={`${
                selectedTab.showLabel === "info"
                  ? checkTypes(types?.length >= 0 && types[0]?.type?.name) +
                    " text-white"
                  : ""
              } text-center rounded-full p-1 `}
              onClick={() => tabShown("info", id)}
            >
              Info
            </div>
            <div
              className={`${
                selectedTab?.id === id && selectedTab.showLabel === "abilities"
                  ? checkTypes(types?.length >= 0 && types[0]?.type?.name) +
                    " text-white"
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
                    <div>
                      Skill {index + 1}: {ability?.name}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className=" text-xs flex flex-col gap-2">
              {stats?.map(({ base_stat, stat }: any, index: number) => {
                return (
                  <div className="grid grid-cols-12 " key={index}>
                    <div className="col-span-4">
                      {checkStats(stat)?.toUpperCase()}
                    </div>

                    <div className="col-span-8 bg-gray-200 w-full rounded-full">
                      <div
                        className={` ${checkTypes(
                          types?.length >= 0 && types[0]?.type?.name
                        )} rounded-full h-full text-black px-2 shadow-lg`}
                        style={{ width: `${base_stat}%` }}
                      >
                        {base_stat}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* <div className="flex flex-row gap-1 text-sm bg-white">
            {types?.map(({ type }: any, index: number) => (
              <div className={`${checkTypes(type?.name)}`} key={index}>
                {type?.name?.toUpperCase()}
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default function Pokedex() {
  const { data, error, isLoading } = useSWR(
    "https://pokeapi.co/api/v2/pokemon/?limit=50",
    fetcher
  );
  console.log("🚀 ~ file: page.tsx:9 ~ Pokedex ~ data:", data);

  return (
    <div className="h-full w-full flex justify-center bg-slate-100 py-5">
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
