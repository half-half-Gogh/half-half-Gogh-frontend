import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import temp1 from '/public/images/Paint12.jpeg';
import temp2 from '/public/images/Paint11.jpeg';
import temp3 from '/public/images/Paint13.jpeg';
import temp4 from '/public/images/Paint14.jpeg';
import temp5 from '/public/images/Paint15.jpeg';
import footer from '/public/images/footer.jpeg';
import frame from '/public/images/frame3.png';
import crown from '/public/images/crown.png';
import background from '/public/images/background.jpeg';
import Image from 'next/image';
import styles from "../styles/mygallery.module.css";
import { AiFillLike } from "react-icons/ai";
import axios from 'axios';
import { TiMediaPlayReverseOutline } from 'react-icons/ti';

const DIVIDER_HEIGHT = 5;

const mygallery = () => {
  const router = useRouter();
  const userName = router.query.username;
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [pictures, setPictures] = useState<Array<string>>([]);

  useEffect(() => {
    if (window.innerWidth <= 500) {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    } else {
      console.log(window.innerWidth);
      console.log(window.innerHeight);
      setWindowSize({
        width: 500,
        height: window.innerHeight,
      });
    }
  }, []);

  const postText = () => {
    axios
    .post("http://175.123.140.225:4000/im/imgResponse", {
      galleryName: '조준영',
    })
    .then((res) => {
      console.log(res.data);
      setPictures((pictures) => [...pictures, ...res.data.pResult]);
      console.log(pictures);
      console.log("zㅋㅋ");
    })
    .catch((err) => {
      console.error(err);
    });
  };

  useEffect(() => {
    postText();
  }, []);

  /*
  const pictures : any = [
    {
      imageSrc: temp5,
      like: '5',
      drawer: '김형국'
    },
    {
      imageSrc: temp2,
      like: '5',
      drawer: '김형국'
    },
    {
      imageSrc: temp3,
      like: '5',
      drawer: '김형국'
    },
    {
      imageSrc: temp4,
      like: '5',
      drawer: '김형국'
    },
    {
      imageSrc: temp1,
      like: '5',
      drawer: '김형국'
    },
  ];
*/
  const rendering = () => {
    const result = [];
    for (let i = 0; i < pictures.length; i++) {
      if (i == 0)
      {
        result.push(
          <div>
            <div style={{width: windowSize.width * 0.70, height: windowSize.width * 0.70, justifyContent: 'center', alignItems: 'center', border: '30px ridge rgb(253, 179, 140)', boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',}}>
              <Image src={`http://175.123.140.225:4000/${pictures[i]}`} layout={"fixed"} height={windowSize.width * 0.70} width={windowSize.width * 0.70} unoptimized={true}/>
            </div>
            <div style={{display: 'block', width: '100%', marginTop: '10px', textAlign: 'right', marginBottom: windowSize.width * 0.15}}>
              <div style={{display: 'inline-flex', backgroundColor: 'rgba(253, 179, 140, 0.3)', borderRadius: '5px'}}>
                <p style={{margin: '0px 5px'}}>dd | </p>
                <AiFillLike size="1rem" color="black"/>
                <p style={{margin: '0px 5px'}}> dd</p>
              </div>
            </div>
          </div>); 
      } else {
        result.push(
          <div>
            <div style={{display: 'flex', width: '100%', marginBottom: windowSize.width * 0.15, justifyContent: 'space-between'}}>
              <div style={{display: 'inline', width: windowSize.width * 0.35, height: windowSize.width * 0.35, justifyContent: 'center', alignItems:' center', border: '10px ridge rgb(253, 179, 140)', boxShadow: '0px 0px 8px 2px rgba(0, 0, 0, 0.1)'}}>
                <Image src={`http://175.123.140.225:4000/${pictures[i]}`} layout={"fixed"} height={windowSize.width * 0.35} width={windowSize.width * 0.35} unoptimized={true}/>
                <div style={{display: 'block', width: '100%', marginTop: '10px', textAlign: 'right', marginLeft: '10px'}}>
                  <div style={{display: 'inline-flex', backgroundColor: 'rgba(253, 179, 140, 0.3)', borderRadius: '5px'}}>
                    <p style={{margin: '0px 5px'}}>dd | </p>
                    <AiFillLike size="1rem" color="black"/>
                    <p style={{margin: '0px 5px'}}> dd</p>
                  </div>
                </div>
              </div>
              <div style={{display: 'inline', width: windowSize.width * 0.35, height: windowSize.width * 0.35, justifyContent: 'center', alignItems:' center', border: '10px ridge rgb(253, 179, 140)', boxShadow: '0px 0px 8px 2px rgba(0, 0, 0, 0.1)'}}>
                <Image src={`http://175.123.140.225:4000/${pictures[i+1]}`} layout={"fixed"} height={windowSize.width * 0.35} width={windowSize.width * 0.35} unoptimized={true}/>
                <div style={{display: 'block', width: '100%', marginTop: '10px', textAlign: 'right', marginLeft: '10px'}}>
                  <div style={{display: 'inline-flex', backgroundColor: 'rgba(253, 179, 140, 0.3)', borderRadius: '5px'}}>
                  <p style={{margin: '0px 5px'}}>s | </p>
                    <AiFillLike size="1rem" color="black"/>
                    <p style={{margin: '0px 5px'}}> s</p>
                  </div>
                </div>
              </div>  
            </div>
          </div>
        );
        i++;
      }
    }
    return result;
  };

  useEffect(() => {
    console.log(windowSize.width, windowSize.height);
  }, [windowSize])
  
  return (
    <div className={styles.App}>
      <div style={{width: windowSize.width * 0.70 + 60, margin: '18vh 0px', justifyContent: 'center', alignItems:' center', textAlign: 'center', zIndex: '2'}}>
        <article style={{width: windowSize.width * 0.70 + 60, justifyContent: 'center', alignItems:' center'}}>
          {rendering()}
        { /* 
          <div style={{marginBottom: '-16px'}}>
            <Image src={crown} layout={"fixed"} height={windowSize.width * 0.2} width={windowSize.width * 0.2}/>
          </div>
          <div style={{width: windowSize.width * 0.70, height: windowSize.width * 0.70, justifyContent: 'center', alignItems: 'center', border: '30px ridge rgb(253, 179, 140)', boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',}}>
            <Image src={temp5} layout={"fixed"} height={windowSize.width * 0.70} width={windowSize.width * 0.70}/>
          </div>
          <div style={{display: 'block', width: '100%', marginTop: '10px', textAlign: 'right', marginBottom: windowSize.width * 0.15}}>
            <div style={{display: 'inline-flex', backgroundColor: 'rgba(253, 179, 140, 0.3)', borderRadius: '5px'}}>
              <p style={{margin: '0px 5px'}}>서창희 | </p>
              <AiFillLike size="1rem" color="black"/>
              <p style={{margin: '0px 5px'}}> 14</p>
            </div>
          </div>
          <div style={{display: 'flex', width: '100%', marginBottom: windowSize.width * 0.15, justifyContent: 'space-between'}}>
            <div style={{display: 'inline', width: windowSize.width * 0.35, height: windowSize.width * 0.35, justifyContent: 'center', alignItems:' center', border: '10px ridge rgb(253, 179, 140)', boxShadow: '0px 0px 8px 2px rgba(0, 0, 0, 0.1)'}}>
              <Image src={temp1} layout={"fixed"} height={windowSize.width * 0.35} width={windowSize.width * 0.35}/>
              <div style={{display: 'block', width: '100%', marginTop: '10px', textAlign: 'right', marginLeft: '10px'}}>
                <div style={{display: 'inline-flex', backgroundColor: 'rgba(253, 179, 140, 0.3)', borderRadius: '5px'}}>
                  <p style={{margin: '0px 5px'}}>조준영 | </p>
                  <AiFillLike size="1rem" color="black"/>
                  <p style={{margin: '0px 5px'}}> 9</p>
                </div>
              </div>
            </div>
            <div style={{display: 'inline', width: windowSize.width * 0.35, height: windowSize.width * 0.35, justifyContent: 'center', alignItems:' center', border: '10px ridge rgb(253, 179, 140)', boxShadow: '0px 0px 8px 2px rgba(0, 0, 0, 0.1)'}}>
              <Image src={temp2} layout={"fixed"} height={windowSize.width * 0.35} width={windowSize.width * 0.35}/>
              <div style={{display: 'block', width: '100%', marginTop: '10px', textAlign: 'right', marginLeft: '10px'}}>
                <div style={{display: 'inline-flex', backgroundColor: 'rgba(253, 179, 140, 0.3)', borderRadius: '5px'}}>
                  <p style={{margin: '0px 5px'}}>김형국 | </p>
                  <AiFillLike size="1rem" color="black"/>
                  <p style={{margin: '0px 5px'}}> 7</p>
                </div>
              </div>
            </div>  
          </div>
          <div style={{display: 'flex', width: '100%', marginBottom: windowSize.width * 0.15, justifyContent: 'space-between'}}>
            <div style={{display: 'inline', width: windowSize.width * 0.35, height: windowSize.width * 0.35, justifyContent: 'center', alignItems:' center', border: '10px ridge rgb(253, 179, 140)', boxShadow: '0px 0px 8px 2px rgba(0, 0, 0, 0.1)'}}>
              <Image src={temp3} layout={"fixed"} height={windowSize.width * 0.35} width={windowSize.width * 0.35}/>
              <div style={{display: 'block', width: '100%', marginTop: '10px', textAlign: 'right', marginLeft: '10px'}}>
                <div style={{display: 'inline-flex', backgroundColor: 'rgba(253, 179, 140, 0.3)', borderRadius: '5px'}}>
                  <p style={{margin: '0px 5px'}}>구정민 | </p>
                  <AiFillLike size="1rem" color="black"/>
                  <p style={{margin: '0px 5px'}}> 5</p>
                </div>
              </div>
            </div>
            <div style={{display: 'inline', width: windowSize.width * 0.35, height: windowSize.width * 0.35, justifyContent: 'center', alignItems:' center', border: '10px ridge rgb(253, 179, 140)', boxShadow: '0px 0px 8px 2px rgba(0, 0, 0, 0.1)'}}>
              <Image src={temp1} layout={"fixed"} height={windowSize.width * 0.35} width={windowSize.width * 0.35}/>
              <div style={{display: 'block', width: '100%', marginTop: '10px', textAlign: 'right', marginLeft: '10px'}}>
                <div style={{display: 'inline-flex', backgroundColor: 'rgba(253, 179, 140, 0.3)', borderRadius: '5px'}}>
                  <p style={{margin: '0px 5px'}}>박해주 | </p>
                  <AiFillLike size="1rem" color="black"/>
                  <p style={{margin: '0px 5px'}}> 4</p>
                </div>
              </div>
            </div>  
          </div>
          <div style={{display: 'flex', width: '100%', marginBottom: windowSize.width * 0.15, justifyContent: 'space-between'}}>
            <div style={{display: 'inline', width: windowSize.width * 0.35, height: windowSize.width * 0.35, justifyContent: 'center', alignItems:' center', border: '10px ridge rgb(253, 179, 140)', boxShadow: '0px 0px 8px 2px rgba(0, 0, 0, 0.1)'}}>
              <Image src={temp2} layout={"fixed"} height={windowSize.width * 0.35} width={windowSize.width * 0.35}/>
              <div style={{display: 'block', width: '100%', marginTop: '10px', textAlign: 'right', marginLeft: '10px'}}>
                <div style={{display: 'inline-flex', backgroundColor: 'rgba(253, 179, 140, 0.3)', borderRadius: '5px'}}>
                  <p style={{margin: '0px 5px'}}>채문주 | </p>
                  <AiFillLike size="1rem" color="black"/>
                  <p style={{margin: '0px 5px'}}> 2</p>
                </div>
              </div>
            </div>
            <div style={{display: 'inline', width: windowSize.width * 0.35, height: windowSize.width * 0.35, justifyContent: 'center', alignItems:' center', border: '10px ridge rgb(253, 179, 140)', boxShadow: '0px 0px 8px 2px rgba(0, 0, 0, 0.1)'}}>
              <Image src={temp3} layout={"fixed"} height={windowSize.width * 0.35} width={windowSize.width * 0.35}/>
              <div style={{display: 'block', width: '100%', marginTop: '10px', textAlign: 'right', marginLeft: '10px'}}>
                <div style={{display: 'inline-flex', backgroundColor: 'rgba(253, 179, 140, 0.3)', borderRadius: '5px'}}>
                  <p style={{margin: '0px 5px'}}>김건휘 | </p>
                  <AiFillLike size="1rem" color="black"/>
                  <p style={{margin: '0px 5px'}}> 1</p>
                </div>
              </div>
            </div>  
          </div>
          */}
        </article>
      </div>
      <header className={styles.Header}>
        <div style={{display: 'flex', width: windowSize.width, height: '100%', justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: '80px', borderBottomRightRadius: '80px', backgroundColor: 'rgb(253, 179, 140)', boxShadow: '0px 0px 20px 5px rgba(0, 0, 0, 0.4)',}}>
          <h2 style={{display: 'inline', margin: '0px', fontFamily: "SEBANG_Gothic_Bold, cursive", fontSize: '2.2rem', color: "white", textAlign: 'center', textShadow: '2px 2px 5px black'}}>{userName} 미술관</h2>     
        </div>
      </header>
      <div style={{position: 'fixed', width: windowSize.width, height: windowSize.height * 0.2, bottom: 0, zIndex: 3, margin: '-1px 0px',}}>
        <Image src={footer} width={windowSize.width} height={windowSize.height * 0.2}/>
      </div>
      <footer style={{position: 'fixed', bottom: 0, width: windowSize.width * 0.75 + 60, height: '20%', color: 'white', fontWeight: 'bold', justifyContent: 'right', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0)', zIndex: 4}}>
        <div style={{display: 'block', textAlign: 'right', marginTop: '30px'}}>
          <button
            className={styles.buttonStyle}
            onClick={() => router.push('/MyCanvas')}>
            <p style={{margin: '0px 0px', fontSize: '1.15rem'}}>그림 그리기</p>
          </button>
        </div>
        <div style={{display: 'block', textAlign: 'right', marginTop: '5px'}}>
          <button className={styles.buttonStyle}>
            <p style={{margin: '0px 0px', fontSize: '1.15rem'}}>새로운 미술관 만들기</p>
          </button>
        </div>
      </footer>
      <style jsx>
        {`
   
        `}
      </style>
    </div>
  );
};

export default mygallery;
