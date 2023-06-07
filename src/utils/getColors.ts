import { type Color } from "~/types/color";
import getLuminanace from "./getLuminance";
import hexToRGB from "./hexToRGB";
import lightenDarkenHexColor from "./lightenDarkenHexColor";

const getColors = ({
  prefix,
  suffix,
  halfNumberForFirstAndLast,
  numberInterval,
  variants,
  backgroundHex,
  textLightHex,
  textDarkHex,
}: {
  prefix: string;
  suffix: string;
  halfNumberForFirstAndLast: boolean;
  numberInterval: number;
  variants: number;
  backgroundHex: string;
  textLightHex: string;
  textDarkHex: string;
}) => {
  const items: Color[] = geneteItems({
    prefix,
    suffix,
    halfNumberForFirstAndLast,
    numberInterval,
    variants,
  });
  const textLightRGB = hexToRGB(textLightHex);
  const textDarkRGB = hexToRGB(textDarkHex);

  if (textLightRGB && textDarkRGB) {
    const textLightLuminance = getLuminanace(textLightRGB);
    const textDarkLuminance = getLuminanace(textDarkRGB);

    items.forEach((item) => {
      item.background = lightenDarkenHexColor(backgroundHex, item.percentage);
      const backgroundRGB = hexToRGB(item.background);
      if (backgroundRGB) {
        const BackgroundLuminance = getLuminanace(backgroundRGB);

        item.light = {
          value: textLightHex,
          ratio:
            BackgroundLuminance > textLightLuminance
              ? (textLightLuminance + 0.05) / (BackgroundLuminance + 0.05)
              : (BackgroundLuminance + 0.05) / (textLightLuminance + 0.05),
        };

        item.dark = {
          value: textDarkHex,
          ratio:
            BackgroundLuminance > textDarkLuminance
              ? (textDarkLuminance + 0.05) / (BackgroundLuminance + 0.05)
              : (BackgroundLuminance + 0.05) / (textDarkLuminance + 0.05),
        };

        item.ideal =
          item.light && item.dark
            ? item.light.ratio > item.dark.ratio
              ? item.dark
              : item.light
            : undefined;
      }
    });
  }

  return items;
};

const geneteItems = ({
  prefix,
  suffix,
  halfNumberForFirstAndLast,
  numberInterval,
  variants,
}: {
  prefix: string;
  suffix: string;
  halfNumberForFirstAndLast: boolean;
  numberInterval: number;
  variants: number;
}) => {
  const total = variants * 2 + 1;
  const items: Color[] = [];
  const percentage = 100 / (variants ? variants * 2 : 1);
  for (let i = 0; i < total; i++) {
    if (halfNumberForFirstAndLast && total > 1) {
      if (i === 0) {
        items.push({
          name: `${prefix}${numberInterval / 2}${suffix}`,
          percentage: (variants - i) * percentage - percentage / 2,
        });
      } else if (i + 1 === total) {
        items.push({
          name: `${prefix}${
            numberInterval * (i - 1) + numberInterval / 2
          }${suffix}`,
          percentage: (variants - i + 1) * percentage - percentage / 2,
        });
      } else {
        items.push({
          name: `${prefix}${numberInterval * i}${suffix}`,
          percentage: (variants - i) * percentage,
        });
      }
    } else {
      items.push({
        name: `${prefix}${numberInterval * i}${suffix}`,
        percentage: (variants - i) * percentage,
      });
    }
  }
  return items;
};

export default getColors;
