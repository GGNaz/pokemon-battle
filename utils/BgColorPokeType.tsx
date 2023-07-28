export const checkTypes = (type: string) => {
  console.log("🚀 ~ file: BgColorPokeType.tsx:2 ~ checkTypes ~ type:", type);
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
