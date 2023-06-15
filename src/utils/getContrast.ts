import { type RGB } from "~/types/rgb";
import getLuminanace from "./getLuminance";

const getContrast = (rgb1: RGB, rgb2: RGB) => {
  const luminanceFront = getLuminanace(rgb1);
  const luminanceBack = getLuminanace(rgb2);
  return luminanceBack > luminanceFront
    ? (luminanceFront + 0.05) / (luminanceBack + 0.05)
    : (luminanceBack + 0.05) / (luminanceFront + 0.05);
};

export default getContrast;
