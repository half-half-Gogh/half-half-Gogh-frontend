import styles from "../styles/MyCanvas.module.css";
import Modal from "react-modal";

type Props = {
  modalOpen: boolean;
  saveImage: () => void;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const SaveModal = ({ modalOpen, saveImage, setModalOpen }: Props) => {
  return (
    <Modal
      isOpen={modalOpen}
      closeTimeoutMS={500}
      overlayClassName={{
        base: styles.overlayBase,
        afterOpen: styles.overlayAfter,
        beforeClose: styles.overlayBefore,
      }}
      className={{
        base: styles.contentBase,
        afterOpen: styles.contentAfter,
        beforeClose: styles.contentBefore,
      }}
    >
      <p>저장하시겠습니까?</p>
      <div className={styles.modalBtnZone}>
        <button className={styles.modalBtn} onClick={() => saveImage()}>
          네
        </button>
        <button className={styles.modalBtn} onClick={() => setModalOpen(false)}>
          아니오
        </button>
      </div>
    </Modal>
  );
};
export default SaveModal;
