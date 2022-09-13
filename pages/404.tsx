import title from "/public/images/title_img.png";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../styles/404.module.css";
import { useRouter } from "next/router";
const Page404 = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const router = useRouter();
  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);
  return (
    <div className={"container"}>
      <div>
        <Image src={title} />
        {windowSize.width < 363 ? (
          windowSize.width < 281 ? (
            <h1
              style={{
                fontSize: "1.0rem",
                color: "#3e4356",
                marginTop: "-5px",
                fontFamily: "SEBANG_Gothic_Bold, cursive",
              }}
            >
              404 | 유효하지 않은 페이지 입니다.
            </h1>
          ) : (
            <h1
              style={{
                fontSize: "1.5rem",
                color: "#3e4356",
                marginTop: "-7px",
                fontFamily: "SEBANG_Gothic_Bold, cursive",
              }}
            >
              404 | 유효하지 않은 페이지 입니다.
            </h1>
          )
        ) : (
          <h1
            style={{
              fontSize: "1.5rem",
              color: "#3e4356",
              marginTop: "-10px",
              fontFamily: "SEBANG_Gothic_Bold, cursive",
            }}
          >
            404 | 유효하지 않은 페이지 입니다.
          </h1>
        )}
      </div>

      <style jsx>
        {`
          .container {
            max-width: 500px;
            max-height: 900px;
            position: absolute;
            width: 90%;
            top:39.5%;
            left: 50%;
            transform: translate(-50%, -50%);
            justify-content: center;
            align-items: center;
            text-align: center;
            overflow-y: auto;`}
      </style>
    </div>
  );
};

export default Page404;
