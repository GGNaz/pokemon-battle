import bug from "@/assets/types/bug.svg";
import dark from "@/assets/types/dark.svg";
import dragon from "@/assets/types/dragon.svg";
import electric from "@/assets/types/electric.svg";
import fairy from "@/assets/types/fairy.svg";
import fire from "@/assets/types/fire.svg";
import flying from "@/assets/types/flying.svg";
import ghost from "@/assets/types/ghost.svg";
import grass from "@/assets/types/grass.svg";
import ground from "@/assets/types/ground.svg";
import ice from "@/assets/types/ice.svg";
import normal from "@/assets/types/normal.svg";
import poison from "@/assets/types/poison.svg";
import psychic from "@/assets/types/psychic.svg";
import rock from "@/assets/types/rock.svg";
import steel from "@/assets/types/steel.svg";
import water from "@/assets/types/water.svg";
import fighting from "@/assets/types/fighting.svg";
export const checkTypes = (type: string) => {
  switch (type) {
    case "grass":
      return "bg-grass";
    case "normal":
      return "bg-normal";
    case "flying":
      return "bg-flying";
    case "poison":
      return "bg-poison";
    case "ground":
      return "bg-ground";
    case "rock":
      return "bg-rock";
    case "bug":
      return "bg-bug";
    case "ghost":
      return "bg-ghost";
    case "steel":
      return "bg-steel";
    case "fire":
      return "bg-fire";
    case "water":
      return "bg-water";
    case "electric":
      return "bg-electric";
    case "fighting":
      return "bg-fighting";
    case "psychic":
      return "bg-psychic";
    case "ice":
      return "bg-ice";
    case "dragon":
      return "bg-dragon";
    case "dark":
      return "bg-dark";
    case "fairy":
      return "bg-fairy";
    case "unknown":
      return "bg-unknown";
  }
};

export const checkTextTypes = (type: string) => {
  switch (type) {
    case "grass":
      return "grass";
    case "normal":
      return "normal";
    case "flying":
      return "flying";
    case "poison":
      return "poison";
    case "ground":
      return "ground";
    case "rock":
      return "rock";
    case "bug":
      return "bug";
    case "ghost":
      return "ghost";
    case "steel":
      return "steel";
    case "fire":
      return "fire";
    case "water":
      return "water";
    case "electric":
      return "electric";
    case "fighting":
      return "fighting";
    case "psychic":
      return "psychic";
    case "ice":
      return "ice";
    case "dragon":
      return "dragon";
    case "dark":
      return "dark";
    case "fairy":
      return "fairy";
    case "unknown":
      return "unknown";
  }
};

export const backgroundColor = (type: string) => {
  switch (type) {
    case "grass":
      return "bg-green-800";
    case "normal":
      return "bg-gray-800";
    case "flying":
      return "bg-green-800";
    case "poison":
      return "bg-green-800";
    case "ground":
      return "bg-green-800";
    case "rock":
      return "bg-green-800";
    case "bug":
      return "bg-green-800";
    case "ghost":
      return "bg-green-800";
    case "steel":
      return "bg-green-800";
    case "fire":
      return "bg-green-800";
    case "water":
      return "bg-green-800";
    case "electric":
      return "bg-green-800";
  }
};

export const checkStats = ({ name }: any) => {
  switch (name) {
    case "hp":
      return "HP";
    case "attack":
      return "ATK";
    case "defense":
      return "DEF";
    case "special-attack":
      return "S-ATK";
    case "special-defense":
      return "S-DEF";
    case "speed":
      return "SPD";
  }
};

export const checkIconType = (type: any) => {
  switch (type) {
    case "grass":
      return grass;
    case "normal":
      return normal;
    case "flying":
      return flying;
    case "poison":
      return poison;
    case "ground":
      return ground;
    case "rock":
      return rock;
    case "bug":
      return bug;
    case "ghost":
      return ghost;
    case "steel":
      return steel;
    case "fire":
      return fire;
    case "water":
      return water;
    case "electric":
      return electric;
    case "fighting":
      return fighting;
    case "psychic":
      return psychic;
    case "ice":
      return ice;
    case "dragon":
      return dragon;
    case "dark":
      return dark;
    case "fairy":
      return fairy;
    // case "unknown":
    //   return unknown
  }
};
