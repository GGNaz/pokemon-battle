"use client";
import useSWR from "swr";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import Lottie from "lottie-react";
import * as MdIcons from "react-icons/md";
import * as BsIcon from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import {
  checkIconType,
  checkStats,
  checkTextTypes,
  checkTypes,
} from "@/utils/BgColorPokeType";
import HOCLoading from "@/component/HOCLoading";
import { useSearchParams } from "next/navigation";
import * as Io5icons from "react-icons/io5";
import emptySearch from "@/assets/loading/emptysearch.json";
const fetcher = (url: string) =>
  fetch(url, { next: { revalidate: 60 } }).then((res) => res.json());

interface CardProps {
  name: string;
  url: string;
  setShowLoading?: any;
}

interface PokeTypeProps {
  slot: 1;
  pokemon: CardProps;
}

interface SeletedTabProps {
  id?: number;
  showLabel?: string;
}

const Card = ({ name, url, setShowLoading }: CardProps) => {
  const { data, error, isLoading } = useSWR(url, fetcher);

  const [selectedTab, setSelectedtab] = useState<SeletedTabProps>({
    showLabel: "info",
  });

  const { sprites, height, types, stats, id, abilities, weight } = data ?? {};

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
      className={` relative shadow-lg h-full  flex rounded-xl  overflow-hidden w-full  cursor-pointer ${checkTypes(
        pokeTypeName
      )}`}
    >
      <div className=" h-full flex flex-col justify-center w-full">
        <div className="  grid grid-cols-3 gap-2 p-2 relative">
          {types?.map(({ type }: any, index: number) => {
            return (
              <div
                className={`flex flex-row gap-1 h-fit justify-center items-center  ${checkTypes(
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
          <div className="text-right absolute top-1 right-2 font-extrabold text-xl text-white">
            #{id}
          </div>
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
              onClick={() => setShowLoading(true)}
            />
          ) : (
            <div className="h-40 w-40 -mb-4 z-20 flex justify-center items-center">
              <HOCLoading />
            </div>
          )}

          <MdIcons.MdOutlineCatchingPokemon
            className={`h-56 w-56 -rotate-12 absolute text-white/20 z-10`}
          />
        </Link>
        <div className="bg-white shadow-xl w-full h-full flex flex-col rounded-t-2xl p-5 gap-2">
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

const Pokedex = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window?.innerWidth : 0
  );

  const [searchPoke, setSearchPoke] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const searchParams = useSearchParams();
  const query = searchParams.get("search");
  const [filteredPoke, setFilteredPoke] = useState([]);

  const { data, error, isLoading } = useSWR(
    `https://pokeapi.co/api/v2/type/${query}`,
    fetcher
  );

  const [showLoading, setShowLoading] = useState<boolean>(false);

  useEffect(() => {
    if (searchPoke && searchPoke !== "") {
      const findAll = data?.pokemon?.filter((data: PokeTypeProps) =>
        data.pokemon?.name.includes(searchPoke)
      );
      setFilteredPoke(findAll);
    } else {
      setFilteredPoke(data?.pokemon);
    }
    setCurrentPage(1);
  }, [searchPoke, data]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const checkWindowSize = (size: number) => {
    if (size <= 782) return 2;
    else if (size >= 783 && size <= 1018) return 4;
    else return 8;
  };

  const itemsPerPage = checkWindowSize(windowWidth);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(filteredPoke?.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const getPageRange = () => {
    const maxPage = Math.ceil(data?.pokemon?.length / 5);
    const middlePage = Math.ceil(5 / 2);

    if (currentPage <= middlePage) {
      return pageNumbers.slice(0, 5);
    } else if (currentPage > maxPage - middlePage) {
      return pageNumbers.slice(maxPage - 5);
    } else {
      return pageNumbers.slice(
        currentPage - middlePage - 1,
        currentPage + middlePage
      );
    }
  };

  const showPokeList = () => {
    return filteredPoke?.slice(indexOfFirstItem, indexOfLastItem);
  };

  return (
    <div className="h-full w-full flex justify-center ">
      {showLoading && (
        <div className="bg-red-700 fixed top-0 left-0 flex justify-center items-center h-screen w-full z-50">
          <HOCLoading />
        </div>
      )}
      <div className=" w-full h-screen max-w-6xl flex flex-col gap-2">
        <div className=" w-full h-full flex flex-row gap-4 p-2 justify-start lg:justify-center">
          {/* {filteredPoke?.length > 0 && ( */}
          <div
            className={`flex flex-col h-full justify-center ${
              filteredPoke?.length > 0 ? "visible" : "invisible"
            } `}
          >
            <button
              onClick={() =>
                currentPage > 1 && handlePageChange(currentPage - 1)
              }
              className={`${checkTypes(
                query ?? "default"
              )} drop-shadow-2xl rounded-l-full  h-40 p-2  text-white hover:text-gray-500`}
            >
              <Io5icons.IoChevronBack className="text-2xl " />
            </button>
          </div>
          {/* )} */}
          <div className="flex flex-col gap-5 w-full ">
            <div className="">
              <Link
                className={`flex flex-row gap-2 p-2 text-white rounded-lg items-center w-fit text-sm hover:text-black justify-center ${checkTypes(
                  query ?? "default"
                )}`}
                href={"/"}
              >
                <Io5icons.IoArrowBack />
                <span>Back to Main Page</span>
              </Link>
            </div>
            <div className="flex flex-col md:flex-row justify-start md:justify-between gap-3">
              <div className="capitalize font-black text-gray-600  text-xl  md:text-4xl ">
                List of {query} Pokemon
              </div>
              <div>
                <div className="relative">
                  <BsIcon.BsSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={searchPoke}
                    onChange={(e) => setSearchPoke(e.target.value)}
                    className="py-2 px-10 focus:outline-none border border-gray-200 rounded-md w-full"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
              {showPokeList()?.map(({ pokemon }: any, index: number) => (
                <div key={index} className="col-span-1">
                  <Card {...pokemon} setShowLoading={setShowLoading} />
                </div>
              ))}
            </div>
            {filteredPoke?.length <= 0 && (
              <div className="h-[70vh] flex justify-center items-center w-full ">
                <div className="flex flex-col gap-3 justify-center items-center">
                  <Lottie animationData={emptySearch} loop={false} />
                  <div className="text-xl text-gray-400 font-medium">
                    No pokemon found.
                  </div>
                </div>
              </div>
            )}
            {isLoading && (
              <div className="h-[40vh] justify-center items-center w-full ">
                Fetching Pokemon, please wait...
              </div>
            )}

            <div className=" flex justify-center items-center gap-0 md:gap-2">
              {getPageRange()?.length > 0 &&
                getPageRange()?.map((data) => (
                  <button
                    className={`
                   ${
                     currentPage === data
                       ? `text-white transition-all duration-150  scale-105 font-bold ${checkTypes(
                           query ?? "default"
                         )}`
                       : "hover:font-semibold"
                   }
                   p-2 rounded-full w-8 h-8 text-xs `}
                    onClick={() => handlePageChange(data)}
                    key={data}
                  >
                    {data}
                  </button>
                ))}
            </div>
          </div>

          <div
            className={`flex flex-col h-full justify-center ${
              filteredPoke?.length > 0 ? "visible" : "invisible"
            } `}
          >
            <button
              onClick={() =>
                currentPage < pageNumbers.length &&
                handlePageChange(currentPage + 1)
              }
              className={`${checkTypes(
                query ?? "default"
              )} drop-shadow-2xl rounded-r-full h-40 p-2  text-white hover:text-gray-500`}
            >
              <Io5icons.IoChevronForward className="text-2xl " />
            </button>
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default Pokedex;
