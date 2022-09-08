import styles from "../styles/MyCanvas.module.css";
import { CompactPicker } from "react-color";
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
      <CompactPicker
        color={pickerColor}
        onChange={(color) => pickerChange(color.hex)}
      ></CompactPicker>
    </div>
  );
};
export default Picker;
