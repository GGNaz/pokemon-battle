"use client";
import {
  backgroundColor,
  checkIconType,
  checkTypes,
} from "@/utils/BgColorPokeType";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React from "react";
import * as BsIcon from "react-icons/bs";
export default function Home() {
  const router = useRouter();
  const typeList = [
    {
      label: "grass",
    },
    {
      label: "normal",
    },
    {
      label: "flying",
    },
    {
      label: "poison",
    },
    {
      label: "ground",
    },
    {
      label: "rock",
    },
    {
      label: "bug",
    },
    {
      label: "ghost",
    },
    {
      label: "steel",
    },
    {
      label: "fire",
    },
    {
      label: "water",
    },
    {
      label: "electric",
    },
    {
      label: "fighting",
    },
    {
      label: "psychic",
    },
    {
      label: "ice",
    },
    {
      label: "dragon",
    },
    {
      label: "dark",
    },
    {
      label: "fairy",
    },
    // {
    //   label: "shadow",
    // },
  ];
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="max-w-3xl  w-full flex flex-col gap-5">
        <div className="text-3xl font-semibold text-gray-500">
          What are you looking for?
        </div>
        <div className="relative">
          <BsIcon.BsSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            className="py-2 px-10 focus:outline-none border border-gray-200 rounded-md w-full"
            placeholder="Search pokemon, types, moves..."
          />
        </div>
        <div className="grid grid-cols-4 gap-5">
          {typeList?.map(({ label }, index) => (
            <Link
              className={`${checkTypes(
                label
              )} rounded-2xl relative p-5 col-span-1 shadow-lg overflow-hidden cursor-pointer`}
              key={index}
              href={{
                pathname: "/pokedex",
                query: label,
              }}
            >
              <div className="text-white ">{label?.toUpperCase()}</div>
              <div>
                <Image
                  src={checkIconType(label)}
                  alt={label}
                  height={400}
                  width={400}
                  className="absolute h-16 w-16 -bottom-3 right-1"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
