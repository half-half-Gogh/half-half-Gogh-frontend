import React, { useState } from 'react';
import { useRouter } from 'next/router';
import temp1 from '/public/images/temp1.png';
import frame from '/public/images/frame2.png';
import Spotlight from '/public/images/spotlight.jpeg';
import Image from 'next/image';
import styles from "../styles/mygallery.module.css";

const mygallery = () => {
  const router = useRouter();
  const userName = router.query.username;

  return (
    <div className={styles.App}>
      <div className={styles.Header}>
        <h2>{userName} 미술관</h2> 
      </div>
      <div className={styles.footer}>
        <button 
          className={styles.buttonStyle}
          onClick={() => router.push('/MyCanvas')}>
          그림 그리기
        </button>
        <button className={styles.buttonStyle}>
          새로운 미술관 만들기
        </button>
      </div>
      <style jsx>
        {`
          * {
            border: 1px solid black;
          }
        `}
      </style>
    </div>
  );
}

export default mygallery;