"use client";
import {
  backgroundColor,
  checkIconType,
  checkTypes,
} from "@/utils/BgColorPokeType";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import React, { useState, useEffect } from "react";
import * as BsIcon from "react-icons/bs";
const fetcher = (url: string) =>
  fetch(url, { next: { revalidate: 60 } }).then((res) => res.json());

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
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
  const { data, error, isLoading } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/?limit=1000`,
    fetcher
  );
  const [filteredPoke, setFileredPoke] = useState([]);
  interface CardProps {
    name: string;
    url: string;
  }

  useEffect(() => {
    if (search && search !== "") {
      const findAll = data?.results?.filter((data: CardProps) =>
        data.name.includes(search)
      );
      setFileredPoke(findAll);
    }
  }, [search, data?.results]);

  console.log("🚀 ~ file: page.tsx:79 ~ Home ~ data:", data);
  return (
    <div className="flex justify-start md:justify-center items-start p-4 md:p-0 md:items-center h-screen w-full">
      <div className="max-w-3xl  w-full flex flex-col gap-5">
        <div className="text-3xl font-semibold text-gray-500">
          What pokemon are you looking for?
        </div>
        <div className="relative">
          <BsIcon.BsSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
            className="py-2 px-10 focus:outline-none border border-gray-200 rounded-md w-full"
            placeholder="Search pokemon name..."
          />
          {filteredPoke?.length > 0 && search !== "" && search && (
            <div className="absolute mt-2 max-h-56 h-fit bg-white shadow-xl w-full z-10 rounded-lg overflow-y-scroll divide-y flex flex-col">
              {filteredPoke?.map(({ name }: CardProps) => (
                <Link
                  key={name}
                  href={`/pokedex/${name}`}
                  className="capitalize p-2  hover:bg-gray-100"
                >
                  {name}
                </Link>
              ))}
            </div>
          )}
          {filteredPoke?.length === 0 && search !== "" && (
            <div className="absolute mt-2 text-gray-400 bg-white shadow-xl w-full z-10 rounded-lg p-2 overflow-y-scroll divide-y flex flex-col">
              No pokemon found.
            </div>
          )}
        </div>
        <div className="grid grid-cols-4 gap-5 ">
          {typeList?.map(({ label }, index) => (
            <Link
              className={`${checkTypes(
                label
              )} rounded-2xl relative p-5 col-span-1 shadow-lg overflow-hidden cursor-pointer`}
              key={index}
              href={{
                pathname: "/pokedex",
                query: {
                  search: label,
                },
              }}
            >
              <div className="text-white hidden md:flex">
                {label?.toUpperCase()}
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src={checkIconType(label)}
                  alt={label}
                  height={400}
                  width={400}
                  className=" flex md:absolute h-fit md:h-16 w-16 bottom-0 md:-bottom-3 right-1"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
