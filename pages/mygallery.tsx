import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import temp1 from "/public/images/Paint12.jpeg";
import temp2 from "/public/images/Paint11.jpeg";
import temp3 from "/public/images/Paint13.jpeg";
import temp4 from "/public/images/Paint14.jpeg";
import frame from "/public/images/frame3.png";
import crown from "/public/images/crown.png";
import Image from "next/image";
import styles from "../styles/mygallery.module.css";
import { AiFillLike } from "react-icons/ai";

const DIVIDER_HEIGHT = 5;

const mygallery = () => {
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

  useEffect(() => {
    console.log(windowSize.width, windowSize.height);
  }, [windowSize]);

  return (
    <div className={styles.App}>
      <div style={{ width: "100%", margin: "13vh 0px" }}>
        <article
          style={{
            width: windowSize.width * 0.75 + 40,
            justifyContent: "center",
            alignItems: " center",
            marginLeft: windowSize.width * 0.125 - 20,
          }}
        >
          <div style={{ marginBottom: "-16px" }}>
            <Image
              src={crown}
              layout={"fixed"}
              height={windowSize.width * 0.2}
              width={windowSize.width * 0.2}
            />
          </div>
          <div
            style={{
              width: windowSize.width * 0.75,
              height: windowSize.width * 0.75,
              justifyContent: "center",
              alignItems: "center",
              border: "20px solid #ffc3c3",
              boxShadow: "0px 0px 5px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Image
              src={temp4}
              layout={"fixed"}
              height={windowSize.width * 0.75}
              width={windowSize.width * 0.75}
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
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                borderRadius: "5px",
              }}
            >
              <p style={{ margin: "0px 5px" }}>서창희 | </p>
              <AiFillLike size="1rem" color="black" />
              <p style={{ margin: "0px 5px" }}> 14</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              marginBottom: windowSize.width * 0.1,
            }}
          >
            <div
              style={{
                display: "inline",
                width: windowSize.width * 0.35,
                height: windowSize.width * 0.35,
                justifyContent: "center",
                alignItems: " center",
                border: "10px solid #ffc3c3",
                marginRight: windowSize.width * 0.1 - 20,
                boxShadow: "0px 0px 2px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Image
                src={temp1}
                layout={"fixed"}
                height={windowSize.width * 0.35}
                width={windowSize.width * 0.35}
              />
              <div
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: "10px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "5px",
                  }}
                >
                  <p style={{ margin: "0px 5px" }}>조준영 | </p>
                  <AiFillLike size="1rem" color="black" />
                  <p style={{ margin: "0px 5px" }}> 9</p>
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
                border: "10px solid #ffc3c3",
                boxShadow: "0px 0px 2px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Image
                src={temp2}
                layout={"fixed"}
                height={windowSize.width * 0.35}
                width={windowSize.width * 0.35}
              />
              <div
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: "10px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "5px",
                  }}
                >
                  <p style={{ margin: "0px 5px" }}>김형국 | </p>
                  <AiFillLike size="1rem" color="black" />
                  <p style={{ margin: "0px 5px" }}> 7</p>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              marginBottom: windowSize.width * 0.1,
            }}
          >
            <div
              style={{
                display: "inline",
                width: windowSize.width * 0.35,
                height: windowSize.width * 0.35,
                justifyContent: "center",
                alignItems: " center",
                border: "10px solid #ffc3c3",
                marginRight: windowSize.width * 0.1 - 20,
                boxShadow: "0px 0px 2px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Image
                src={temp3}
                layout={"fixed"}
                height={windowSize.width * 0.35}
                width={windowSize.width * 0.35}
              />
              <div
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: "10px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "5px",
                  }}
                >
                  <p style={{ margin: "0px 5px" }}>구정민 | </p>
                  <AiFillLike size="1rem" color="black" />
                  <p style={{ margin: "0px 5px" }}> 5</p>
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
                border: "10px solid #ffc3c3",
                boxShadow: "0px 0px 2px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Image
                src={temp1}
                layout={"fixed"}
                height={windowSize.width * 0.35}
                width={windowSize.width * 0.35}
              />
              <div
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: "10px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "5px",
                  }}
                >
                  <p style={{ margin: "0px 5px" }}>박해주 | </p>
                  <AiFillLike size="1rem" color="black" />
                  <p style={{ margin: "0px 5px" }}> 4</p>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              marginBottom: windowSize.width * 0.1,
            }}
          >
            <div
              style={{
                display: "inline",
                width: windowSize.width * 0.35,
                height: windowSize.width * 0.35,
                justifyContent: "center",
                alignItems: " center",
                border: "10px solid #ffc3c3",
                marginRight: windowSize.width * 0.1 - 20,
                boxShadow: "0px 0px 2px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Image
                src={temp2}
                layout={"fixed"}
                height={windowSize.width * 0.35}
                width={windowSize.width * 0.35}
              />
              <div
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: "10px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "5px",
                  }}
                >
                  <p style={{ margin: "0px 5px" }}>채문주 | </p>
                  <AiFillLike size="1rem" color="black" />
                  <p style={{ margin: "0px 5px" }}> 2</p>
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
                border: "10px solid #ffc3c3",
                boxShadow: "0px 0px 2px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Image
                src={temp3}
                layout={"fixed"}
                height={windowSize.width * 0.35}
                width={windowSize.width * 0.35}
              />
              <div
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: "10px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "5px",
                  }}
                >
                  <p style={{ margin: "0px 5px" }}>김건휘 | </p>
                  <AiFillLike size="1rem" color="black" />
                  <p style={{ margin: "0px 5px" }}> 1</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
      <header className={styles.Header}>
        <div className={styles.titleBox}>
          <div
            style={{
              border: "2px solid white",
              width: "90%",
              marginLeft: "5%",
            }}
          ></div>
          <h2
            style={{
              margin: "5px 0px",
              fontFamily: "SEBANG_Gothic_Bold, cursive",
              color: "white",
              textAlign: "center",
              textShadow: "2px 2px 2px gray",
            }}
          >
            {userName} 미술관
          </h2>
        </div>
      </header>
      <footer className={styles.footer}>
        <button
          className={styles.buttonStyle}
          onClick={() =>
            router.push({
              //pathname: "/mygallery",
              pathname: `/canvas/${userName}`,
              query: { username: userName },
            })
          }
        >
          그림 그리기
        </button>
        <button className={styles.buttonStyle}>새로운 미술관 만들기</button>
      </footer>

      <style jsx>{``}</style>
    </div>
  );
};

export default mygallery;
