import styles from "../styles/MyCanvas.module.css";
import { CirclePicker } from "react-color";
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
      <CirclePicker
        color={pickerColor}
        circleSize={23}
        onChange={(color) => pickerChange(color.hex)}
      ></CirclePicker>
    </div>
  );
};
export default Picker;
