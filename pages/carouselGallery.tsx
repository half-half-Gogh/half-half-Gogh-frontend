import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import temp1 from '/public/images/Paint12.jpeg';
import temp2 from '/public/images/Paint11.jpeg';
import temp3 from '/public/images/Paint13.jpeg';
import temp4 from '/public/images/Paint14.jpeg';
import crown from '/public/images/crown.png';
import Image from 'next/image';
import styles from "../styles/mygallery.module.css";
import { AiFillLike } from "react-icons/ai";

const DIVIDER_HEIGHT = 5;

const carouselGallery = () => {
  const router = useRouter();
  const userName = router.query.username;
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  return (
    <div className={styles.App}>
      
      <header className={styles.Header}>
        <div>
          { /*
          <div style={{border: '2px solid white', width: "90%", marginLeft: "5%"}}></div> */ }
          <h2 style={{margin: '5% 0px', fontFamily: "SEBANG_Gothic_Bold, cursive", fontSize: '2.2rem', color: "white", textAlign: 'center', textShadow: '2px 2px 5px black'}}>{userName} 미술관</h2>     
        </div>
      </header>
      <footer className={styles.footer}>
        <button 
          className={styles.buttonStyle}
          onClick={() => router.push('/MyCanvas')}>
          그림 그리기
        </button>
        <button className={styles.buttonStyle}>
          새로운 미술관 만들기
        </button>
      </footer>
      <style jsx>
        {`
   
        `}
      </style>
    </div>
  );
}

export default carouselGallery;