import styles from "../styles/MyCanvas.module.css";
import Modal from "react-modal";
import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from "react";
type Props = {
  modalOpen: boolean;
  saveImage: () => void;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  galleryName: string;
  drawer: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
const SaveModal = ({
  modalOpen,
  saveImage,
  setModalOpen,
  galleryName,
  drawer,
  setLoading,
}: Props) => {
  const [userGallery, setUserGallery] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const router = useRouter();
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
      <div>
        <p style={{ color: "#3e4356" }}>저장하시겠습니까?</p>
        <div className={styles.saveBtnZone}>
          <button
            className={styles.saveBtn}
            onClick={() => {
              setLoading(true);
              saveImage();
              router.push({
                //pathname: "/mygallery",
                pathname: `/gallery/${galleryName}`,
                query: { username: galleryName },
              });
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
      <style jsx>
        {`
          p {
            color: "#3e4356";
          }
        `}
      </style>
    </Modal>
  );
};
export default SaveModal;
