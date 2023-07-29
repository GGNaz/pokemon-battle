"use client";

import Image from "next/image";
import versusGIF from "@/assets/versus.gif";
import charizard from "@/assets/pokedex/charizard.png";
import charizard_default from "@/assets/attacks/charizard/default.gif";
import charizard_skill2 from "@/assets/attacks/charizard/skill2.gif";
import pikachu_default from "@/assets/attacks/pikachu/default.gif";
import pikachu_skill2 from "@/assets/attacks/pikachu/skill2.gif";
import HOCBattle from "@/component/HOCBattle";
// import forest_battle from "@/assets/background/forest_battle.jpg";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [useSkill, setUseSkill] = useState<any>(pikachu_default);
  const [playerTurn, setPlayerTurn] = useState<number>(1);
  console.log("🚀 ~ file: page.tsx:17 ~ Home ~ playerTurn:", playerTurn);
  const [useSkillBot, setUseSkillBot] = useState<any>(charizard_default);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  }, []);

  useEffect(() => {
    if (useSkill !== pikachu_default) {
      const timer = setInterval(() => {
        setInterval(() => {
          setUseSkillBot(charizard_skill2);
        }, 1000);
        setUseSkill(pikachu_default);
      }, 1800);
      return () => clearInterval(timer);
    }
  }, [useSkill]);

  useEffect(() => {
    if (useSkillBot !== charizard_default) {
      const timer = setTimeout(() => {
        setUseSkillBot(charizard_default);
      }, 1800);

      return () => clearTimeout(timer);
    } else {
    }
  }, [useSkillBot]);

  const showBattleField = () => {
    return (
      <div className="h-screen w-full flex flex-row bg-[url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/dccf9b3c-e552-4a19-ba30-2b86db58123e/dcewmcd-61655f8d-e893-45cc-9886-c8d1c9503371.png/v1/fill/w_1024,h_527,q_80,strp/forest_battle_background_by_aamatniekss_dcewmcd-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTI3IiwicGF0aCI6IlwvZlwvZGNjZjliM2MtZTU1Mi00YTE5LWJhMzAtMmI4NmRiNTgxMjNlXC9kY2V3bWNkLTYxNjU1ZjhkLWU4OTMtNDVjYy05ODg2LWM4ZDFjOTUwMzM3MS5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.5dxJyWYKf42J-QDbSwroSssDATAqhLtnHsYLc-XBHNo)] bg-center bg-cover">
        <div className="absolute bottom-0 right-0 z-10 bg-gradient-to-tl from-black/80 h-screen w-full" />
        <div className="basis-1/2 h-full w-full">
          <div className="font-semibold flex flex-col justify-end pb-20 items-center h-full relative">
            {useSkillBot !== charizard_default && (
              <Image
                src={useSkillBot}
                height={300}
                width={300}
                alt="pikachu_default"
                className="  absolute right-0 bottom-32"
              />
            )}
            {useSkill === pikachu_default && (
              <div className="flex flex-col gap-2 items-center">
                <Image
                  src={useSkill}
                  height={150}
                  width={150}
                  alt="pikachu_default"
                  className="-scale-x-100"
                />

                <div className="flex flex-col w-48">
                  <div className="flex justify-between border border-[#5141A4]/70 bg-[#DCD8FC] rounded-tl-lg">
                    <div className="text-xs p-1 text-[#5141A4]">PIKACHU</div>
                    <div className="bg-[#5141A4] text-white text-xs p-1">
                      Lv. 12
                    </div>
                  </div>
                  <div className="border-4 border-[#5141A4] rounded-full h-4 w-full bg-[#DCD8FC] -mt-1">
                    <div className="bg-green-600 w-[80%] h-2 rounded-full" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* <div className="flex flex-row gap-5 p-10">
            <div className="flex flex-col ">
              <div className="flex flex-col w-[80%] bg-[#DCD8FC] rounded-b-md">
                <div className="flex flex-row items-center border border-[#5141A4]">
                  <div className="w-full p-2 text-xs font-semibold">
                    CHARIZARD
                  </div>
                  <div className="bg-[#5141A4] py-2 w-24 text-center text-sm text-white">
                    Lv. 24
                  </div>
                </div>
                <div className="w-full bg-white rounded-b-md shadow-lg border-2 border-[#5141A4] h-5">
                  <div className="w-[90%] bg-green-600 h-4 rounded-bl-md" />
                </div>
              </div>
              <Image
                src={charizard_default}
                height={400}
                width={400}
                alt="charizard_default"
                className="h-fit"
              />
            </div>
            <div className="flex flex-col">
              <button className="">Skill 1</button>
              <button>Skill 1</button>
              <button>Skill 1</button>
            </div>
          </div> */}
        </div>
        <div className="basis-1/2  h-full w-full">
          <div className="font-semibold flex flex-col justify-center  items-center h-full relative">
            {useSkill !== pikachu_default && (
              <Image
                src={useSkill}
                height={150}
                width={150}
                alt="pikachu_default"
                className="-scale-x-100  absolute left-20"
              />
            )}
            {/* <Image
              src={charizard_default}
              height={300}
              width={300}
              alt="charizard_default"
              className="h-fit"
            /> */}
            {/* <div>image here</div> */}
            {useSkillBot === charizard_default && (
              <div className="flex flex-col gap-2  items-center">
                <Image
                  src={useSkillBot}
                  height={300}
                  width={300}
                  alt="charizard_default"
                  className="h-fit"
                />
                {/* <div>image here</div> */}
                <div className="flex flex-col w-48">
                  <div className="flex justify-between border border-[#5141A4]/70 bg-[#DCD8FC] rounded-tl-lg">
                    <div className="text-xs p-1 text-[#5141A4]">CHARIZARD</div>
                    <div className="bg-[#5141A4] text-white text-xs p-1">
                      Lv. 24
                    </div>
                  </div>
                  <div className="border-4 border-[#5141A4] rounded-full h-4  bg-[#DCD8FC] -mt-1">
                    <div className="bg-red-600 w-[20%] h-2 rounded-full" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-5 right-5 z-20">
          <div className="grid grid-cols-4 gap-2">
            <button className="bg-[#5141A4] text-white text-sm py-2 px-5 rounded-md">
              Skill 1
            </button>
            <button
              className="bg-[#5141A4] text-white text-sm py-2 px-5 rounded-md"
              onClick={() => setUseSkill(pikachu_skill2)}
            >
              Skill 2
            </button>
            <button className="bg-[#5141A4] text-white text-sm py-2 px-5 rounded-md">
              Skill 3
            </button>
            <button className="bg-[#5141A4] text-white text-sm py-2 px-5 rounded-md">
              Skill 4
            </button>
          </div>
        </div>
      </div>
    );
  };
  return <div>{!loading ? <HOCBattle /> : showBattleField()}</div>;
}
