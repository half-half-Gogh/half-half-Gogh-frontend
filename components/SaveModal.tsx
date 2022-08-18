import styles from "../styles/MyCanvas.module.css";
import Modal from "react-modal";
import React, { useRef, useEffect, useState } from "react";
type Props = {
  modalOpen: boolean;
  saveImage: () => void;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const SaveModal = ({ modalOpen, saveImage, setModalOpen }: Props) => {
  const [userGallery, setUserGallery] = useState(false);
  const [isSave, setIsSave] = useState(false);
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
      {isSave ? (
        <div className={styles.galleryBtnZone}>
          <div className={styles.galleryBtnDiv}>
            <button
              className={styles.galleryBtn}
              onClick={() => {
                setModalOpen(false);
              }}
            >
              내 미술관 만들기
            </button>
          </div>
          <div className={styles.galleryBtnDiv}>
            <button
              className={styles.galleryBtn}
              onClick={() => {
                setModalOpen(false);
              }}
            >
              뭐시기 미술관 둘러보기
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>저장하시겠습니까?</p>
          <div className={styles.saveBtnZone}>
            <button
              className={styles.saveBtn}
              onClick={() => {
                saveImage();
                setIsSave(true);
              }}
            >
              네
            </button>
            <button
              className={styles.saveBtn}
              onClick={() => setModalOpen(false)}
            >
              아니오
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};
export default SaveModal;
