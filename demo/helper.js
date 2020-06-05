import { groupBy, random } from "lodash";
import { colors, icons, names } from "./constants";

export const getMockSectionsForList = () => {
  const mockList = names.sort().map((name) => {
    return {
      name,
      icon: {
        color: getRandomColor(),
        name: getRandomIcon(),
      },
    };
  });
  const lexicalData = groupBy(mockList, (item) =>
    item.name.charAt(0).match(/[a-z]/i) // isLetter
      ? item.name.charAt(0).toUpperCase()
      : "#"
  );
  return Object.keys(lexicalData).map((k) => {
    return {
      title: k,
      data: lexicalData[k],
    };
  });
};

export const getRandomIcon = () => icons[random(icons.length - 1)];

export const getRandomColor = () => colors[random(colors.length - 1)];
