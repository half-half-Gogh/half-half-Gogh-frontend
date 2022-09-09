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
import { TiHeartOutline, TiHeartFullOutline, TiTimes } from "react-icons/ti";
import axios from "axios";
import Modal from "react-modal";
import classnames from "classnames";
import { emit } from "process";
import LoginModal from "../../components/loginModal";

type resultType = {
  src: string;
  drawer: string;
  like: string[];
};

//const SERVER = "http://211.62.179.135:4000/";
//const IMAGE_PATH = "public/images/";
const SERVER = "";
const IMAGE_PATH = "";

const mygallery = ({
  result,
  galleryName,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  //const mygallery = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const router = useRouter();
  const [nowPic, setNowPic] = useState<any>();
  const [bigpic, setBigPic] = useState<boolean>(false);
  const [loginStatus, setLoginStatus] = useState<string>("");
  const [loginUserId, setLoginUserId] = useState<string>("");
  const [loginUserName, setLoginUserName] = useState<string>("");
  const [results, setResults] = useState<resultType[]>(result);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loginFail, setLoginFail] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const status: any = sessionStorage.getItem("loginStatus");
      const userName: any = sessionStorage.getItem("loginUserName");
      const userId: any = sessionStorage.getItem("loginUserId");
      setLoginStatus(status);
      setLoginUserName(userName);
      setLoginUserId(userId);
    }
    console.log(loginStatus);
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
    console.log(results);
  }, []);

  const sendLike = (pictureName: string, index: number) => {
    if (loginStatus == "true") {
      if (results[index].like.includes(loginUserId)) {
      } else {
        /*
        axios
          .post(`${SERVER}im/pressLike`, {
            galleryName: galleryName,
            imgId: pictureName,
            liker: loginUserId,
          })
          .then((response) => {
            console.log(response);
            let copied: resultType[] = [...results];
            copied[index].like.push(loginUserId);
            setResults(copied);
          })
          .catch((error) => {
            console.error(error);
          });*/
        let copied: resultType[] = [...results];
        copied[index].like.push(loginUserId);
        setResults(copied);
      }
    } else {
      //setModalOpen(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("waitingLike", "true");

        router.push({
          pathname: `/main`,
        });
      }
    }
  };

  const rendering = () => {
    const galleryRender = [];
    for (let i = 0; i < results.length; i++) {
      if (i == 0) {
        galleryRender.push(
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
                src={SERVER + IMAGE_PATH + results[i].src}
                layout={"fixed"}
                height={windowSize.width * 0.7}
                width={windowSize.width * 0.7}
                unoptimized={true}
              />
            </div>
            <div
              style={{
                display: "block",
                width: "100%",
                marginTop: "15px",
                textAlign: "right",
                marginBottom: windowSize.width * 0.15,
              }}
            >
              <div
                className={styles.nameTagBig}
                onClick={() => {
                  if (loginStatus == "true") {
                    sendLike(results[i].src, i);
                  } else {
                    if (typeof window !== "undefined") {
                      const id = router.query.id;
                      sessionStorage.setItem("waitingPath", `/gallery/${id}`);
                      router.push({
                        pathname: `/main`,
                      });
                    }
                  }
                }}
              >
                <p
                  style={{
                    marginTop: "5px",
                    marginBottom: "5px",
                    marginLeft: "10px",
                    marginRight: "5px",
                    color: "rgb(161, 121, 97)",
                    fontSize: "1.3rem",
                    fontWeight: 800,
                  }}
                >
                  {results[i].drawer}
                </p>
                <p
                  style={{
                    marginTop: "5px",
                    marginBottom: "5px",
                    marginLeft: "5px",
                    marginRight: "5px",
                    color: "rgb(161, 121, 97)",
                    fontSize: "1.5rem",
                    fontWeight: 800,
                  }}
                >
                  |
                </p>
                {results[i].like.includes(loginUserId) ? (
                  <TiHeartFullOutline
                    size="1.5rem"
                    color="rgb(161, 121, 97)"
                    style={{
                      marginTop: "6px",
                      marginBottom: "5px",
                      marginLeft: "5px",
                      marginRight: "2px",
                      fontWeight: 800,
                    }}
                  />
                ) : (
                  <TiHeartOutline
                    size="1.5rem"
                    color="rgb(161, 121, 97)"
                    style={{
                      marginTop: "6px",
                      marginBottom: "5px",
                      marginLeft: "5px",
                      marginRight: "2px",
                      fontWeight: 800,
                    }}
                  />
                )}
                <p
                  style={{
                    marginTop: "6px",
                    marginBottom: "5px",
                    marginLeft: "2px",
                    marginRight: "10px",
                    color: "rgb(161, 121, 97)",
                    fontSize: "1.3rem",
                    fontWeight: 800,
                  }}
                >
                  {results[i].like.length}
                </p>
              </div>
            </div>
          </>
        );
      } else if (i != results.length - 1) {
        i++;
        galleryRender.push(
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
                  border: "12px ridge rgb(253, 179, 140)",
                  boxShadow: "0px 0px 8px 2px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Image
                  src={SERVER + IMAGE_PATH + results[i - 1].src}
                  layout={"fixed"}
                  height={windowSize.width * 0.35}
                  width={windowSize.width * 0.35}
                  unoptimized={true}
                  onClick={() => {
                    setNowPic(SERVER + IMAGE_PATH + results[i - 1].src);
                    setBigPic(true);
                  }}
                />
                <div
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: "16px",
                    textAlign: "right",
                    marginLeft: "10px",
                  }}
                >
                  <div
                    className={styles.nameTagSmall}
                    onClick={() => sendLike(results[i - 1].src, i - 1)}
                  >
                    <p
                      style={{
                        marginTop: "3px",
                        marginBottom: "3px",
                        marginLeft: "10px",
                        marginRight: "3px",
                        color: "rgb(161, 121, 97)",
                        fontSize: "1rem",
                      }}
                    >
                      {results[i - 1].drawer}
                    </p>
                    <p
                      style={{
                        marginTop: "3px",
                        marginBottom: "3px",
                        marginLeft: "3px",
                        marginRight: "3px",
                        color: "rgb(161, 121, 97)",
                        fontSize: "1.1rem",
                      }}
                    >
                      |
                    </p>
                    {results[i - 1].like.includes(loginUserId) ? (
                      <TiHeartFullOutline
                        size="1.1rem"
                        color="rgb(161, 121, 97)"
                        style={{
                          marginTop: "4px",
                          marginBottom: "3px",
                          marginLeft: "3px",
                          marginRight: "2px",
                        }}
                      />
                    ) : (
                      <TiHeartOutline
                        size="1.1rem"
                        color="rgb(161, 121, 97)"
                        style={{
                          marginTop: "4px",
                          marginBottom: "3px",
                          marginLeft: "3px",
                          marginRight: "2px",
                        }}
                      />
                    )}
                    <p
                      style={{
                        marginTop: "4px",
                        marginBottom: "3px",
                        marginLeft: "2px",
                        marginRight: "10px",
                        color: "rgb(161, 121, 97)",
                        fontSize: "1rem",
                      }}
                    >
                      {results[i - 1].like.length}
                    </p>
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
                  border: "12px ridge rgb(253, 179, 140)",
                  boxShadow: "0px 0px 8px 2px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Image
                  src={SERVER + IMAGE_PATH + results[i].src}
                  layout={"fixed"}
                  height={windowSize.width * 0.35}
                  width={windowSize.width * 0.35}
                  unoptimized={true}
                  onClick={() => {
                    setNowPic(SERVER + IMAGE_PATH + results[i].src);
                    setBigPic(true);
                  }}
                />
                <div
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: "16px",
                    textAlign: "right",
                    marginLeft: "10px",
                  }}
                >
                  <div
                    className={styles.nameTagSmall}
                    onClick={() => sendLike(results[i].src, i)}
                  >
                    <p
                      style={{
                        marginTop: "3px",
                        marginBottom: "3px",
                        marginLeft: "10px",
                        marginRight: "3px",
                        color: "rgb(161, 121, 97)",
                        fontSize: "1rem",
                      }}
                    >
                      {results[i].drawer}
                    </p>
                    <p
                      style={{
                        marginTop: "3px",
                        marginBottom: "3px",
                        marginLeft: "3px",
                        marginRight: "3px",
                        color: "rgb(161, 121, 97)",
                        fontSize: "1.1rem",
                      }}
                    >
                      |
                    </p>
                    {results[i].like.includes(loginUserId) ? (
                      <TiHeartFullOutline
                        size="1.1rem"
                        color="rgb(161, 121, 97)"
                        style={{
                          marginTop: "4px",
                          marginBottom: "3px",
                          marginLeft: "3px",
                          marginRight: "2px",
                        }}
                      />
                    ) : (
                      <TiHeartOutline
                        size="1.1rem"
                        color="rgb(161, 121, 97)"
                        style={{
                          marginTop: "4px",
                          marginBottom: "3px",
                          marginLeft: "3px",
                          marginRight: "2px",
                        }}
                      />
                    )}
                    <p
                      style={{
                        marginTop: "4px",
                        marginBottom: "3px",
                        marginLeft: "2px",
                        marginRight: "10px",
                        color: "rgb(161, 121, 97)",
                        fontSize: "1rem",
                      }}
                    >
                      {results[i].like.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      } else {
        galleryRender.push(
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
                  src={SERVER + IMAGE_PATH + results[i].src}
                  layout={"fixed"}
                  height={windowSize.width * 0.35}
                  width={windowSize.width * 0.35}
                  unoptimized={true}
                  onClick={() => {
                    setNowPic(SERVER + IMAGE_PATH + results[i].src);
                    setBigPic(true);
                  }}
                />
                <div
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: "16px",
                    textAlign: "right",
                    marginLeft: "10px",
                  }}
                >
                  <div
                    className={styles.nameTagSmall}
                    onClick={() => sendLike(results[i].src, i)}
                  >
                    <p
                      style={{
                        marginTop: "3px",
                        marginBottom: "3px",
                        marginLeft: "10px",
                        marginRight: "3px",
                        color: "rgb(161, 121, 97)",
                        fontSize: "1rem",
                      }}
                    >
                      {results[i].drawer}
                    </p>
                    <p
                      style={{
                        marginTop: "3px",
                        marginBottom: "3px",
                        marginLeft: "3px",
                        marginRight: "3px",
                        color: "rgb(161, 121, 97)",
                        fontSize: "1.1rem",
                      }}
                    >
                      |
                    </p>
                    {results[i].like.includes(loginUserId) ? (
                      <TiHeartFullOutline
                        size="1.1rem"
                        color="rgb(161, 121, 97)"
                        style={{
                          marginTop: "4px",
                          marginBottom: "3px",
                          marginLeft: "3px",
                          marginRight: "2px",
                        }}
                      />
                    ) : (
                      <TiHeartOutline
                        size="1.1rem"
                        color="rgb(161, 121, 97)"
                        style={{
                          marginTop: "4px",
                          marginBottom: "3px",
                          marginLeft: "3px",
                          marginRight: "2px",
                        }}
                      />
                    )}
                    <p
                      style={{
                        marginTop: "4px",
                        marginBottom: "3px",
                        marginLeft: "2px",
                        marginRight: "10px",
                        color: "rgb(161, 121, 97)",
                        fontSize: "1rem",
                      }}
                    >
                      {results[i].like.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }
    }
    return galleryRender;
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
            {galleryName} 미술관
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
          <button
            className={styles.buttonStyle}
            onClick={() => {
              if (loginStatus == "true") {
                router.push({
                  pathname: `/gallery/${loginUserName}`,
                  query: { username: loginUserName },
                });
              } else {
                router.push({
                  pathname: `/main/`,
                });
              }
            }}
          >
            <p style={{ margin: "0px 0px", fontSize: "1.15rem" }}>
              {loginStatus === "true" ? "내 미술관 가기" : "내 미술관 만들기"}
            </p>
          </button>
          <button
            className={styles.buttonStyle}
            onClick={() => {
              sessionStorage.setItem("loginStatus", "true");
              sessionStorage.setItem("loginUserName", "밤톨이");
              sessionStorage.setItem("loginUserId", "hi");
            }}
          >
            <p style={{ margin: "0px 0px", fontSize: "1.15rem" }}>
              임시 버튼입니다.
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
          base: classnames(styles.contentBase, {
            width: windowSize.width * 0.7 + 60,
            height: windowSize.width * 0.7 + 60,
          }),
          afterOpen: classnames(styles.contentAfter, {
            width: windowSize.width * 0.7 + 60,
            height: windowSize.width * 0.7 + 60,
          }),
          beforeClose: styles.contentBefore,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            onClick={() => setBigPic(false)}
            style={{
              display: "flex-inline",
              width: "100px",
              height: "40px",
              marginLeft: windowSize.width * 0.7 - 40,
              backgroundColor: "white",
              borderTopLeftRadius: "50px",
              borderTopRightRadius: "50px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TiTimes
              size="2rem"
              color="rgb(161, 121, 97)"
              style={{ marginTop: "6px" }}
            />
          </div>
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
              src={nowPic}
              layout={"fixed"}
              height={windowSize.width * 0.7}
              width={windowSize.width * 0.7}
              unoptimized={true}
            />
          </div>
        </div>
      </Modal>
      <LoginModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        loginFail={loginFail}
        setLoginFail={setLoginFail}
      />
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
  /*
  var result: resultType[] = [];
  await axios
    .post("http://211.62.179.135:4000/im/imgResponse", {
      galleryName: `${context.params.id}`,
    })
    .then((res) => {
      //setPictures((pictures) => [...pictures, ...res.data.pResult]);
      //const { results } = res.data.pResult;
      result = res.data.pResult;
      //console.log(result[0].like[0] + "sdadads");
      //return {
      //  props: {
      //    results: res.data.pResult,
      //  },
      //};
      results = result.sort(function (a, b) {
        return b.like.length - a.like.length;
      });
    })
    .catch((err) => {
      console.error(err);
    });
*/

  const result: resultType[] = [
    {
      src: "/images/Paint12.jpeg",
      like: ["1", "2", "3"],
      drawer: "김형국",
    },
    {
      src: "/images/Paint13.jpeg",
      like: ["3", "2", "4", "hi", "hihi"],
      drawer: "조준영",
    },
    {
      src: "/images/Paint11.jpeg",
      like: ["7"],
      drawer: "서창희",
    },
    {
      src: "/images/Paint14.jpeg",
      like: ["1", "2", "3", "11", "4", "6"],
      drawer: "구정민",
    },
    {
      src: "/images/Paint15.jpeg",
      like: ["4", "5", "6", "hi"],
      drawer: "보리",
    },
    {
      src: "/images/Paint11.jpeg",
      like: ["4", "5"],
      drawer: "하이",
    },
  ];

  let results: resultType[] = [];
  results = result.sort(function (a, b) {
    return b.like.length - a.like.length;
  });

  return {
    props: {
      result: results,
      galleryName: context.params.id,
    },
  };
};
export default mygallery;
