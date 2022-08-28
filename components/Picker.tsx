import styles from "../styles/MyCanvas.module.css";
import { SketchPicker } from "react-color";
type Props = {
  setPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pickerColor: string;
  pickerChange: (color: string) => void;
};
const Picker = ({ setPickerOpen, pickerColor, pickerChange }: Props) => {
  return (
    <div className={styles.popover}>
      <div
        className={styles.cover}
        onClick={() => {
          setPickerOpen(false);
        }}
      />
      <SketchPicker
        color={pickerColor}
        onChange={(color) => pickerChange(color.hex)}
      ></SketchPicker>
    </div>
  );
};
export default Picker;
