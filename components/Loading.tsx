import React, { useEffect } from "react";
import Ring from "../public/images/Eclipse.gif";
import Logo from "../public/images/title_img.png";
import Circle from "../public/images/circle.png";
import Image from "next/image";
import styles from "../styles/Loading.module.css";

const Loading = () => {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
      }}
    >
      <div className={styles.icon}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            style={{
              border: "3px solid #3e4356",
              borderRadius: "50%",
              height: "50px",
              width: "50px",
            }}
          >
            <Image src={Circle} width={50} height={50} />
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Image src={Logo} width={30} height={30} />
        </div>
      </div>
    </div>
  );
};

export default Loading;
