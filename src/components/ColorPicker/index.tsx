import classNames from "classnames";
import { HexColorInput, HexColorPicker } from "react-colorful";
import styles from "./index.module.scss";

const ColorPicker = ({
  color,
  onChange,
}: {
  color: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="grid gap-2">
      <HexColorPicker
        color={color}
        onChange={onChange}
        className={classNames("!w-auto", styles.hexcolorpicker)}
      />
      <HexColorInput
        color={color}
        onChange={onChange}
        className="w-full border border-gray-500"
      />
    </div>
  );
};
export default ColorPicker;
