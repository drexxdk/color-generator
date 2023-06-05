import { type RGB } from "~/types/rgb";

const getValue = (v: number) => {
    v /= 255;
      return v <= 0.03928
        ? v / 12.92
      : Math.pow( (v + 0.055) / 1.055, 2.4 );
}

const getLuminanace =(rgb: RGB) => {
    rgb.red = getValue(rgb.red) * 0.2126;
    rgb.green = getValue(rgb.green) * 0.7152;
    rgb.blue = getValue(rgb.blue) * 0.0722;
    return rgb.red + rgb.green + rgb.blue;
  }
  export default getLuminanace;