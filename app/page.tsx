"use client"

import Image from "next/image"
import versusGIF from "@/assets/versus.gif"
import charizard from "@/assets/pokedex/charizard.png"
import charizard_default from "@/assets/attacks/charizard/default.gif"
import pikachu_default from "@/assets/attacks/pikachu/default.gif"
import HOCBattle from "@/component/HOCBattle"
import { useEffect, useState } from "react"
export default function Home() {
  const [ loading, setLoading ] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    },2000)
  },[])
  const showBattleField = () => {
    return <div className="h-screen w-full flex flex-col ">
      <div className="basis-1/2 bg-red-400 flex justify-end items-center">
      <div className="flex flex-row gap-5 p-10">
        <div className="flex flex-col ">
      <div className="flex flex-col w-[80%] bg-[#DCD8FC] rounded-b-md">
        <div className="flex flex-row items-center border border-[#5141A4]">
        <div className="w-full p-2 text-xs font-semibold">CHARIZARD</div>
        <div className="bg-[#5141A4] py-2 w-24 text-center text-sm text-white">Lv. 24</div>
        </div>
        <div className="w-full bg-white rounded-b-md shadow-lg border-2 border-[#5141A4] h-5"><div className="w-[90%] bg-green-600 h-4 rounded-bl-md" /></div>
      </div>
      <Image src={charizard_default} height={400} width={400} alt="charizard_default" className="h-fit" />
            
      </div>
      <div className="flex flex-col">
        <button className="">Skill 1</button>
        <button>Skill 1</button>
        <button>Skill 1</button>
      </div>
          </div>
     
      </div>
      <div className="basis-1/2 bg-green-200">
      <Image src={pikachu_default} height={300} width={300} alt="pikachu_default" className="-scale-x-100" />
</div>
        
       
    </div>
  }
  return (
   <div>{!loading? <HOCBattle/> : showBattleField()}</div>
  )
}
