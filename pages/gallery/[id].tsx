import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import temp1 from "/public/images/Paint12.jpeg";
import temp2 from "/public/images/Paint11.jpeg";
import temp3 from "/public/images/Paint13.jpeg";
import temp4 from "/public/images/Paint14.jpeg";
import temp5 from "/public/images/Paint15.jpeg";
import footer from "/public/images/footer.jpeg";
import Image from "next/image";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import styles from "../../styles/mygallery.module.css";
import { AiFillLike } from "react-icons/ai";
import axios from "axios";
import Modal from "react-modal";

type Props = {
  results: string[];
};

const mygallery = ({ results }: InferGetServerSidePropsType<Props>) => {

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const router = useRouter();
  const userName = router.query.username;
  //const [pictures, setPictures] = useState<Array<string>>([]);
  const [nowPic, setNowPic] = useState<any>();
  const [bigpic, setBigPic] = useState<boolean>(false);
  
  useEffect(() => {
    if (window.innerWidth <= 500) {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    } else {
      setWindowSize({
        width: 500,
        height: window.innerHeight,
      });
    }
  }, []);

  const postText = () => {
    axios
      .post("http://175.123.140.225:4000/im/imgResponse", {
        galleryName: "조준영",
      })
      .then((res) => {
        console.log(res.data);
        //setPictures((pictures) => [...pictures, ...res.data.pResult]);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  /*
  useEffect(() => {
    postText();
  }, []);
*/
  const pictures: any = [
    // {
    //   imageSrc: temp5,
    //   like: "10",
    //   drawer: "김형국",
    // },
    // {
    //   imageSrc: temp2,
    //   like: "7",
    //   drawer: "조준영",
    // },
    // {
    //   imageSrc: temp3,
    //   like: "4",
    //   drawer: "서창희",
    // },
    {
      imageSrc: "http://211.62.179.135:4000/" + results[0],
      like: "3",
      drawer: "구정민",
    },
    {
      imageSrc: "http://211.62.179.135:4000/" + results[1],
      like: "2",
      drawer: "보리",
    },
    {
      imageSrc: "http://211.62.179.135:4000/" + results[2],
      like: "1",
      drawer: "밤톨이",
    },
  ];

  const rendering = () => {
    const result = [];
    for (let i = 0; i < pictures.length; i++) {
      if (i == 0) {
        result.push(
          <>
            <div
              style={{
                width: windowSize.width * 0.7,
                height: windowSize.width * 0.7,
                justifyContent: "center",
                alignItems: "center",
                border: "30px ridge rgb(253, 179, 140)",
                boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Image
                src={pictures[i].imageSrc}
                layout={"fixed"}
                height={windowSize.width * 0.7}
                width={windowSize.width * 0.7}
                unoptimized={true}
                onClick={() => {
                  setNowPic(pictures[i].imageSrc);
                  setBigPic(true);
                }}
              />
            </div>
            <div
              style={{
                display: "block",
                width: "100%",
                marginTop: "10px",
                textAlign: "right",
                marginBottom: windowSize.width * 0.15,
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  backgroundColor: "rgba(253, 179, 140, 0.3)",
                  borderRadius: "5px",
                }}
              >
                <p style={{ margin: "0px 5px" }}>{pictures[i].drawer} | </p>
                <AiFillLike size="1rem" color="black" />
                <p style={{ margin: "0px 5px" }}>{pictures[i].like}</p>
              </div>
            </div>
          </>
        );
      } else if (i != pictures.length - 1) {
        i++;
        result.push(
          <>
            <div
              style={{
                display: "flex",
                width: "100%",
                marginBottom: windowSize.width * 0.15,
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "inline",
                  width: windowSize.width * 0.35,
                  height: windowSize.width * 0.35,
                  justifyContent: "center",
                  alignItems: " center",
                  border: "10px ridge rgb(253, 179, 140)",
                  boxShadow: "0px 0px 8px 2px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Image
                  src={pictures[i - 1].imageSrc}
                  layout={"fixed"}
                  height={windowSize.width * 0.35}
                  width={windowSize.width * 0.35}
                  unoptimized={true}
                  onClick={() => {
                    setNowPic(pictures[i - 1].imageSrc);
                    setBigPic(true);
                  }}
                />
                <div
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: "10px",
                    textAlign: "right",
                    marginLeft: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      backgroundColor: "rgba(253, 179, 140, 0.3)",
                      borderRadius: "5px",
                    }}
                  >
                    <p style={{ margin: "0px 5px" }}>
                      {pictures[i - 1].drawer} |{" "}
                    </p>
                    <AiFillLike size="1rem" color="black" />
                    <p style={{ margin: "0px 5px" }}> {pictures[i - 1].like}</p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "inline",
                  width: windowSize.width * 0.35,
                  height: windowSize.width * 0.35,
                  justifyContent: "center",
                  alignItems: " center",
                  border: "10px ridge rgb(253, 179, 140)",
                  boxShadow: "0px 0px 8px 2px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Image
                  src={pictures[i].imageSrc}
                  layout={"fixed"}
                  height={windowSize.width * 0.35}
                  width={windowSize.width * 0.35}
                  unoptimized={true}
                  onClick={() => {
                    setNowPic(pictures[i].imageSrc);
                    setBigPic(true);
                  }}
                />
                <div
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: "10px",
                    textAlign: "right",
                    marginLeft: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      backgroundColor: "rgba(253, 179, 140, 0.3)",
                      borderRadius: "5px",
                    }}
                  >
                    <p style={{ margin: "0px 5px" }}>{pictures[i].drawer} | </p>
                    <AiFillLike size="1rem" color="black" />
                    <p style={{ margin: "0px 5px" }}> {pictures[i].like}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      } else {
        result.push(
          <>
            <div
              style={{
                display: "flex",
                width: "100%",
                marginBottom: windowSize.width * 0.15,
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "inline",
                  width: windowSize.width * 0.35,
                  height: windowSize.width * 0.35,
                  justifyContent: "center",
                  alignItems: " center",
                  border: "10px ridge rgb(253, 179, 140)",
                  boxShadow: "0px 0px 8px 2px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Image
                  src={pictures[i].imageSrc}
                  layout={"fixed"}
                  height={windowSize.width * 0.35}
                  width={windowSize.width * 0.35}
                  unoptimized={true}
                  onClick={() => {
                    setNowPic(pictures[i].imageSrc);
                    setBigPic(true);
                  }}
                />
                <div
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: "10px",
                    textAlign: "right",
                    marginLeft: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      backgroundColor: "rgba(253, 179, 140, 0.3)",
                      borderRadius: "5px",
                    }}
                  >
                    <p style={{ margin: "0px 5px" }}>{pictures[i].drawer} | </p>
                    <AiFillLike size="1rem" color="black" />
                    <p style={{ margin: "0px 5px" }}> {pictures[i].like}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }
    }
    return result;
  };

  return (
    <div className={styles.App}>
      <article>{rendering()}</article>
      <header>
        <div
          style={{
            display: "flex",
            width: windowSize.width,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderBottomLeftRadius: "80px",
            borderBottomRightRadius: "80px",
            backgroundColor: "rgb(253, 179, 140)",
            boxShadow: "0px 0px 20px 5px rgba(0, 0, 0, 0.4)",
          }}
        >
          <h2
            style={{
              display: "inline",
              margin: "0px",
              fontFamily: "SEBANG_Gothic_Bold, cursive",
              fontSize: "2.2rem",
              color: "white",
              textAlign: "center",
              textShadow: "2px 2px 5px black",
            }}
          >
            {userName} 미술관
          </h2>
        </div>
      </header>
      <footer
        style={{
          position: "fixed",
          width: windowSize.width,
          height: windowSize.height * 0.2,
          bottom: 0,
          zIndex: 3,
          margin: "-1px 0px",
          boxShadow: "0px -3px 5px 5px rgba(251, 240, 219, 1)",
        }}
      >
        <Image
          src={footer}
          width={windowSize.width}
          height={windowSize.height * 0.2}
        />
      </footer>
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          width: windowSize.width * 0.75 + 60,
          height: "20%",
          color: "white",
          fontWeight: "bold",
          justifyContent: "right",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0)",
          zIndex: 4,
        }}
      >
        <div
          style={{
            display: "block",
            textAlign: "right",
            marginTop: windowSize.height * 0.025,
          }}
        >
          <button
            className={styles.buttonStyle}
            onClick={() => router.push("/MyCanvas")}
          >
            <p style={{ margin: "0px 0px", fontSize: "1.15rem" }}>
              그림 그리기
            </p>
          </button>
        </div>
        <div style={{ display: "block", textAlign: "right", marginTop: "5px" }}>
          <button className={styles.buttonStyle}>
            <p style={{ margin: "0px 0px", fontSize: "1.15rem" }}>
              새로운 미술관 만들기
            </p>
          </button>
        </div>
      </footer>
      <Modal
        isOpen={bigpic}
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
          <div onClick={() => setBigPic(false)}>
            <p style={{ display: "inline", lineHeight: 1 }}>X</p>
          </div>
          <div>
            <Image
              src={nowPic}
              layout={"fixed"}
              height={windowSize.width * 0.7}
              width={windowSize.width * 0.7}
              unoptimized={true}
            />
          </div>
        </div>
      </Modal>
      <style jsx>
        {`
          article {
            width: windowSize.width * 0.7 + 60;
            margin: 18vh 0px;
            justify-content: center;
            align-items: center;
            text-align: center;
            z-index: 2;
          }
          header {
            position: fixed;
            top: 0;
            width: 100%;
            height: 10%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            z-index: 2;
          }
          .firstFrame {
            width: windowSize.width * 0.7;
            height: windowSize.width * 0.7;
            justify-content: center;
            align-items: center;
            border: 30px ridge rgb(253, 179, 140);
            box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
          }
          .titleBox {
            display: flex;
            width: windowSize.width;
            height: 100%;
            justify-content: center;
            align-items: center;
            border-bottom-left-radius: 80px;
            border-bottom-right-radius: 80px;
            background-color: rgb(253, 179, 140);
            box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.4);
          }
        `}
      </style>
    </div>
  );
};
export const getServerSideProps = async (context: any) => {
  //"http://175.123.140.225:4000/im/imgResponse"
  var result: any = null;
  await axios
    .post("http://211.62.179.135:4000/im/imgResponse", {
      galleryName: `${context.params.id}`,
    })
    .then((res) => {
      //setPictures((pictures) => [...pictures, ...res.data.pResult]);
      //const { results } = res.data.pResult;
      result = res.data.pResult;
      return {
        props: {
          results: res.data.pResult,
        },
      };
    })
    .catch((err) => {
      console.error(err);
    });

  return {
    props: {
      results: result,
    },
  };
};
export default mygallery;
