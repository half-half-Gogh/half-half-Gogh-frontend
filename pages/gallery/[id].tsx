import React, { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import temp1 from "/public/images/temp1.png";
import frame from "/public/images/frame2.png";
import Spotlight from "/public/images/spotlight.jpeg";
import Image from "next/image";
import styles from "../../styles/mygallery.module.css";

const DIVIDER_HEIGHT = 5;

const mygallery = () => {
  const router = useRouter();
  const userName = router.query.username;
  const outerDivRef = useRef<any>(null);

  useEffect(() => {
    const wheelHandler = (e: any) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log("현재 1페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log("현재 2페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
        } else {
          // 현재 3페이지
          console.log("현재 3페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log("현재 1페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log("현재 2페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else {
          // 현재 3페이지
          console.log("현재 3페이지, up");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
        }
      }
    };
    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);
  return (
    <div ref={outerDivRef} className={styles.App}>
      <div className={styles.Header}>
        <div
          style={{ border: "2px solid white", width: "90%", marginLeft: "5%" }}
        ></div>
        <h2
          style={{
            margin: "5px 0px",
            fontFamily: "SEBANG_Gothic_Bold, cursive",
            color: "white",
          }}
        >
          {userName} 미술관
        </h2>
      </div>
      <div className={styles.footer}>
        <button
          className={styles.buttonStyle}
          onClick={() => router.push("/MyCanvas")}
        >
          그림 그리기
        </button>
        <button className={styles.buttonStyle}>새로운 미술관 만들기</button>
      </div>
      <div className={styles.inner}>
        <Image src={frame} />
      </div>
      <div className="divider"></div>
      <div className={styles.inner}>
        <Image src={frame} />
      </div>
      <div className="divider"></div>
      <div className={styles.inner}>
        <Image src={frame} />
      </div>
      <div className="divider"></div>

      <style jsx>{``}</style>
    </div>
  );
};

export default mygallery;
