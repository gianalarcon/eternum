import { Resources } from "../types";

export const findResourceById = (value: number) => {
  return resources.find((e) => e.id === value);
};

export const findResourceIdByTrait = (trait: string) => {
  // @ts-ignore
  return resources.find((e) => e?.trait === trait).id;
};

export const resources: Array<Resources> = [
  {
    trait: "Lords",
    value: 253,
    colour: "#ec4899",
    colourClass: "",
    id: 253,
    description: "Lords.",
    img: "",
  },
  {
    trait: "Wood",
    value: 5015,
    colour: "#78350f",
    colourClass: "bg-gradient-to-l from-yellow-900 via-yellow-900 to-yellow-900 text-white",
    id: 1,
    description: "Wood is the backbone of civilization. Fire, industry, and shelter spawned from its sinew and sap.",
    img: "https://github.com/BibliothecaForAdventurers/voxel-resources/blob/main/compressed/wood.gif?raw=true",
  },

  {
    trait: "Stone",
    value: 3941,
    colour: "#e0e0e0",
    colourClass: "bg-gradient-to-r from-neutral-700 via-stone-700 to-stone-700 text-white",
    id: 2,
    description: "Stone masonry is a culture bending the bones of the earth itself to their own purpose.",
    img: "https://github.com/BibliothecaForAdventurers/voxel-resources/blob/main/compressed/stone.gif?raw=true",
  },
  {
    trait: "Coal",
    value: 3833,
    colour: "#757575",
    colourClass: "bg-gradient-to-b from-gray-900 to-gray-900 bg-gradient-to-r",
    id: 3,
    description:
      "Coal is the only answer when fire is not enough to stave off the gnawing, winter cold or the ravenous demands of iron forges.",
    img: "https://github.com/BibliothecaForAdventurers/voxel-resources/blob/main/compressed/coal.gif?raw=true",
  },
  {
    trait: "Copper",
    value: 2643,
    colour: "#f59e0b",
    colourClass: "bg-gradient-to-r from-amber-700 via-orange-600 to-orange-800",
    id: 4,
    description:
      "The malleability of copper is a strength. A copper axe will crush a skull as easily as a copper pot sizzles an egg.",
    img: "https://github.com/BibliothecaForAdventurers/voxel-resources/blob/main/compressed/copper.gif?raw=true",
  },
  {
    trait: "Obsidian",
    value: 2216,
    colour: "#000000",
    colourClass: "bg-gradient-to-r from-gray-900 via-gray-900 to-black",
    id: 5,
    description:
      "Hard and brittle, obsidian can be honed to a razors edge nanometers wide, parting armor on an atomic level. The preferred material of assassins and cheap jewelers.",
    img: "https://github.com/BibliothecaForAdventurers/voxel-resources/blob/main/compressed/obsidian.gif?raw=true",
  },
  {
    trait: "Silver",
    value: 1741,
    colour: "#eeeeee",
    colourClass: "bg-gradient-to-r from-gray-400 to-gray-600 text-white",
    id: 6,
    description: "The luster and rarity of silver draws out the basest instinct of laymen and nobility alike. Greed.",
    img: "https://github.com/BibliothecaForAdventurers/voxel-resources/blob/main/compressed/silver.gif?raw=true",
  },

  {
    trait: "Ironwood",
    value: 1179,
    colour: "#b91c1c",
    colourClass: "bg-gradient-to-r from-rose-900 via-rose-900 to-black",
    id: 7,
    description:
      "Metallic minerals drawn from the ironwood’s deep delving roots are the source of its legendary hardness and appearance.",
    img: "https://github.com/BibliothecaForAdventurers/voxel-resources/blob/main/compressed/ironwood.gif?raw=true",
  },
  {
    trait: "Cold Iron",
    value: 957,
    colour: "#fca5a5",
    colourClass: "bg-gradient-to-r from-gray-800 via-gray-700 to-blue-900",
    id: 8,
    description:
      "Something has infected this metallic ore with a cruel chill and an extraordinary thirst for the warmth of living things.",
    img: "https://github.com/BibliothecaForAdventurers/voxel-resources/blob/main/compressed/cold%20iron.gif?raw=true",
  },
  {
    trait: "Gold",
    value: 914,
    colour: "#fcd34d",
    colourClass: "bg-gradient-to-r from-yellow-200 to-yellow-500 text-yellow-800",
    id: 9,
    description: "Ripped from its million-year geological womb within the earth to be hoarded in mortal coffers.",
    img: "https://github.com/BibliothecaForAdventurers/voxel-resources/blob/main/compressed/gold.gif?raw=true",
  },
  {
    trait: "Hartwood",
    value: 594,
    colour: "#fca5a5",
    colourClass: "bg-gradient-to-r from-red-900 via-yellow-800 to-yellow-800",
    id: 10,
    description:
      "Revered by the Orders of Cunning, hartwood is only cut in dire circumstance. It bleeds like any mortal and some claim to hear voices from its sap long after being tapped from the trunk.",
    img: "https://github.com/BibliothecaForAdventurers/voxel-resources/blob/main/compressed/hartwood.gif?raw=true",
  },
  {
    trait: "Diamonds",
    value: 300,
    colour: "#ccbcfb",
    colourClass: "bg-gradient-to-tl from-transparent via-gray-200 to-gray-100 text-black",
    id: 11,
    description:
      "Diamonds carry the hardness of obsidian, the strength of cold iron, and the preciousness of gold. Blood is easily spilled in its name.",
    img: "https://github.com/BibliothecaForAdventurers/voxel-resources/blob/main/compressed/diamond.gif?raw=true",
  },
  {
    trait: "Sapphire",
    value: 247,
    colour: "#3b82f6",
    colourClass: "bg-gradient-to-tl from-blue-200 via-blue-700 to-blue-800 text-white",
    id: 12,
    description:
      "Sapphires are given birth from titanic forces that crush and grind for thousands of years in a hellscape of heat and pressure. The result is a gemstone accustomed to both pain and beauty.",
    img: "https://github.com/BibliothecaForAdventurers/voxel-resources/blob/main/compressed/sapphire.gif?raw=true",
  },
  {
    trait: "Ruby",
    value: 239,
    colour: "#dc2626",
    colourClass: "bg-gradient-to-tl from-rose-900 via-red-700 to-pink-400",
    id: 13,
    description:
      "Rubies are the chimeric fusion of metal alloys and oxygen. This hybrid of metal and minerals is often scarcer than the lives of those who seek it.",
    img: "https://github.com/BibliothecaForAdventurers/voxel-resources/blob/main/compressed/ruby.gif?raw=true",
  },
  {
    trait: "Deep Crystal",
    value: 239,
    colour: "#93c5fd",
    colourClass: "bg-radial-at-br from-purple-900 via-black to-purple-900",
    id: 14,
    description:
      "Deep crystal was imprisoned from the mortal world by a timeless geode, the source of these formations have confounded scholars for centuries. Strange vibrations can be felt when held.",
    img: "https://github.com/BibliothecaForAdventurers/voxel-resources/blob/main/compressed/deep%20crystal.gif?raw=true",
  },
  {
    trait: "Ignium",
    value: 172,
    colour: "#ef4444",
    colourClass: "bg-radial-at-t from-red-600 via-black to-red-700 text-red-200",
    id: 15,
    description:
      "Some horrible power has irrevocably scarred this ignium stone with an infernal radiation that evaporates water and skin alike.",
    img: "https://github.com/BibliothecaForAdventurers/voxel-resources/blob/main/compressed/ignium.gif?raw=true",
  },
  {
    trait: "Ethereal Silica",
    value: 162,
    colour: "#10b981",
    colourClass: "bg-radial-at-tr from-purple-500 via-fuchsia-600 to-sky-100",
    id: 16,
    description:
      "Ethereal silica is a glass that funnels and bends light in ways that deviate from known physics. Those exposed for long periods of time experience an all- consuming lethargic bliss.",
    img: "https://github.com/BibliothecaForAdventurers/voxel-resources/blob/main/compressed/ethereal%20silica.gif?raw=true",
  },
  {
    trait: "True Ice",
    value: 139,
    colour: "#ffffff",
    colourClass: "bg-gradient-to-tl from-cyan-900 via-blue-500 to-sky-300",
    id: 17,
    description:
      "True ice does not melt, it is carved like living stone from frozen abyssal caverns far beneath the earth. Many a careless mason has lost their life when placing this near Ignium.",
    img: "https://github.com/BibliothecaForAdventurers/voxel-resources/blob/main/compressed/true%20ice.gif?raw=true",
  },
  {
    trait: "Twilight Quartz",
    value: 111,
    colour: "#6d28d9",
    colourClass: "bg-radial-at-bl from-purple-900 via-purple-500 to-purple-900",
    id: 18,
    description:
      "Fortunately, this gemstone grows deep within the earth, far away from the soft flesh of mortal kind. Its elegance hides a tendency to rapidly engulf organic matter it encounters in a matter of hours.",
    img: "https://github.com/BibliothecaForAdventurers/voxel-resources/blob/main/compressed/twilight%20quartz.gif?raw=true",
  },
  {
    trait: "Alchemical Silver",
    value: 93,
    colour: "#bdbdbd",
    colourClass: "bg-radial-at-t from-blue-50 via-cyan-500 to-cyan-100 shimmer text-white fast",
    id: 19,
    description:
      "Alchemical Silver is found pooled beneath battlegrounds from a forgotten, lost era. It can retain an almost unlimited amount of potential energy, making it the perfect catalyst for those delving into the mysteries of the universe.",
    img: "https://github.com/BibliothecaForAdventurers/voxel-resources/blob/main/compressed/alchemical%20silver.gif?raw=true",
  },
  {
    trait: "Adamantine",
    value: 55,
    colour: "#1e3a8a",
    colourClass: "bg-conic-to-t from-emerald-700 via-yellow-500 to-emerald-900 shimmer slow",
    id: 20,
    description:
      "Adamantine forms around ontological anomalies like the immune response of a planetary entity. It contains the supernatural strength to contain such terrors from spreading. Woe to those who shortsightedly take it from its original purpose.",
    img: "https://github.com/BibliothecaForAdventurers/voxel-resources/blob/main/adamantine.gif?raw=true",
  },
  {
    trait: "Mithral",
    value: 37,
    colour: "#60a5fa",
    colourClass: "bg-radial-at-r from-blue-400 via-blue-100 to-teal-500 shimmer text-blue-800 fast",
    id: 21,
    description:
      "This otherworldly metal has the strength of adamantine but is lighter than air. The pieces are held in place by strange gravitational core. Those who spend much time with it slowly succumb to neurotic delusions of a rapturous, divine apocalypse.",
    img: "https://github.com/BibliothecaForAdventurers/voxel-resources/blob/main/compressed/mithral.gif?raw=true",
  },
  {
    trait: "Dragonhide",
    value: 23,
    colour: "#ec4899",
    colourClass: "bg-gradient-to-tl from-rose-500 via-violet-900 to-rose-800 shimmer fast",
    id: 22,
    description:
      "Dragons are the hidden guardians of our reality. No mortal can witness their work, lest they be purged by dragonfire. If you find one of these scales, flee. Only death can be found in their presence or by the forces they fight in secret.",
    img: "https://github.com/BibliothecaForAdventurers/voxel-resources/blob/main/compressed/dragonhide.gif?raw=true",
  },
  {
    trait: "Wheat",
    value: 254,
    colour: "#ec4899",
    colourClass: "",
    id: 254,
    description: "Wheat.",
    img: "https://github.com/BibliothecaForAdventurers/voxel-resources/blob/main/compressed/wheat.gif?raw=true",
  },

  {
    trait: "Fish",
    value: 255,
    colour: "#ec4899",
    colourClass: "",
    id: 255,
    description: "Fish.",
    img: "https://github.com/BibliothecaForAdventurers/voxel-resources/blob/main/compressed/.gif?raw=true",
  },
];

/* eslint-disable @typescript-eslint/naming-convention */

export enum ResourcesIds {
  Wood = 1,
  Stone = 2,
  Coal = 3,
  Copper = 4,
  Obsidian = 5,
  Silver = 6,
  Ironwood = 7,
  ColdIron = 8,
  Gold = 9,
  Hartwood = 10,
  Diamonds = 11,
  Sapphire = 12,
  Ruby = 13,
  DeepCrystal = 14,
  Ignium = 15,
  EtherealSilica = 16,
  TrueIce = 17,
  TwilightQuartz = 18,
  AlchemicalSilver = 19,
  Adamantine = 20,
  Mithral = 21,
  Dragonhide = 22,
  Lords = 253,
  Wheat = 254,
  Fish = 255,
}

export const Guilds = ["Harvesters", "Miners", "Collectors", "Hunters"];

export const resourcesByGuild = {
  [Guilds[0]]: [
    ResourcesIds.Wood,
    ResourcesIds.Stone,
    ResourcesIds.Coal,
    ResourcesIds.Ironwood,
    ResourcesIds.Hartwood,
    ResourcesIds.TrueIce,
  ],
  [Guilds[1]]: [
    ResourcesIds.Copper,
    ResourcesIds.Silver,
    ResourcesIds.Gold,
    ResourcesIds.ColdIron,
    ResourcesIds.AlchemicalSilver,
    ResourcesIds.Adamantine,
  ],
  [Guilds[2]]: [
    ResourcesIds.Diamonds,
    ResourcesIds.Sapphire,
    ResourcesIds.Ruby,
    ResourcesIds.DeepCrystal,
    ResourcesIds.TwilightQuartz,
  ],
  [Guilds[3]]: [
    ResourcesIds.Obsidian,
    ResourcesIds.Ignium,
    ResourcesIds.EtherealSilica,
    ResourcesIds.Mithral,
    ResourcesIds.Dragonhide,
  ],
};

// if it's labor, then remove 28 to get the icon resource id
export const getIconResourceId = (resourceId: number, isLabor: boolean) => {
  return isLabor ? resourceId - 28 : resourceId;
};

export const initialResources = [
  872.17, 685.39, 666.61, 459.65, 385.39, 302.78, 205.04, 166.43, 158.96, 103.3, 52.17, 42.96, 41.57, 41.57, 29.91,
  28.17, 24.17, 19.3, 16.17, 9.57, 6.43, 4,
];

export const resourceProb = [
  0.2018109, 0.1585915, 0.1542455, 0.1063581, 0.0891751, 0.0700604, 0.0474447, 0.0385111, 0.0367807, 0.0239034,
  0.0120724, 0.0099396, 0.0096177, 0.0096177, 0.0069215, 0.0065191, 0.0055936, 0.0044668, 0.0037425, 0.0022133,
  0.0014889, 0.0009256,
];

// (1247400000 / 43608500) * 0.2018109
// (415800000 / 43608500) * 0.2018109
export const foodProb = [5.7727, 1.9242];

const LEVELING_COST_MULTIPLIER = 1.25;

// guild 1, 2, 3, 4
export const getBuildingsCost = (guild: number) => {
  const costs = [
    [1, 126000, 2, 99016, 3, 96303, 7, 29622, 10, 14924, 17, 3492, 254, 1890000, 255, 630000], // guild 1
    [4, 66404, 6, 43742, 8, 24044, 9, 22964, 19, 2337, 20, 1382, 254, 1890000, 255, 630000], // guild 2
    [11, 7537, 12, 6206, 13, 6005, 14, 6005, 18, 2789, 254, 1890000, 255, 630000], // guild 3
    [5, 55676, 15, 4321, 16, 4070, 21, 930, 22, 578, 254, 1890000, 255, 630000], // guild 4
  ];

  const baseAmounts = costs[guild - 1];

  const costResources = [];
  for (let i = 0; i < baseAmounts.length; i = i + 2) {
    costResources.push({
      resourceId: baseAmounts[i],
      amount: Math.floor(baseAmounts[i + 1]),
    });
  }
  return costResources;
};

export const getLevelingCost = (newLevel: number): { resourceId: number; amount: number }[] => {
  const costMultiplier = LEVELING_COST_MULTIPLIER ** Math.floor((newLevel - 1) / 4);

  const rem = newLevel % 4;

  const baseAmounts =
    rem === 0
      ? // level 4 (resource tier 3)
        [16, 24421, 17, 20954, 18, 16733, 19, 14020, 20, 8291, 21, 5578, 22, 3467]
      : rem === 1
        ? // level 1 (food)
          [254, 11340000, 255, 3780000]
        : rem === 2
          ? // level 2 (resource tier 1)
            [1, 756000, 2, 594097, 3, 577816, 4, 398426, 5, 334057, 6, 262452, 7, 177732]
          : rem === 3
            ? // level 3 (resource tier 2)
              [8, 144266, 9, 137783, 10, 89544, 11, 45224, 12, 37235, 13, 36029, 14, 36029, 15, 25929]
            : [];

  const costResources = [];
  for (let i = 0; i < baseAmounts.length; i = i + 2) {
    costResources.push({
      resourceId: baseAmounts[i],
      amount: Math.floor(baseAmounts[i + 1] * costMultiplier),
    });
  }
  return costResources;
};

// min number of realms that would be needed to collaborate to build a hyperstructure
const HYPERSTRUCTURE_LEVELING_MULTIPLIER = 25;

export const getHyperstructureResources = (currentLevel: number): { resourceId: number; amount: number }[] => {
  let resourcesList = getLevelingCost(currentLevel + 1);
  return resourcesList.map(({ resourceId, amount }) => ({
    resourceId,
    amount: Math.floor(amount * HYPERSTRUCTURE_LEVELING_MULTIPLIER),
  }));
};

interface WeightMap {
  [key: number]: number;
}
// weight in kg
export const WEIGHTS: WeightMap = {
  1: 1,
  2: 1,
  3: 1,
  4: 1,
  5: 1,
  6: 1,
  7: 1,
  8: 1,
  9: 1,
  10: 1,
  11: 1,
  12: 1,
  13: 1,
  14: 1,
  15: 1,
  16: 1,
  17: 1,
  18: 1,
  19: 1,
  20: 1,
  21: 1,
  22: 1,
  253: 0.001,
  254: 0.1,
  255: 0.1,
};
