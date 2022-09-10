import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../styles/main.module.css";
import Image from "next/image";
import title from "/public/images/title_img.png";
import { TiKey, TiUser } from "react-icons/ti";
import axios from "axios";

const main = () => {
  const router = useRouter();
  const [signUpModal, setSignUpModal] = useState<boolean>(false);
  const [loginMode, setLoginMode] = useState<boolean>(false);
  const [checkLogin, setCheckLogin] = useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("밤톨이멍멍");
  const [userLink, setUserLink] = useState<string>("http://www.half-go.io/");
  const [copyMessage, setCopyMessage] =
    useState<string>("미술관을 친구들에게 홍보하자!");
  const [loginID, setLoginID] = useState<string>("");
  const [loginPW, setLoginPW] = useState<string>("");
  const [galleryName, setGalleryName] = useState<string>("");
  const [signUpID, setSignUpID] = useState<string>("");
  const [signUpPW, setSignUpPW] = useState<string>("");
  const [signUpPWCheck, setSignUpPWCheck] = useState<string>("");
  const [checkCorrect, setCheckCorrect] = useState<boolean>(false);
  const [permitSignUp, setPermitSignUp] = useState<boolean>(true);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [failModal, setFailModal] = useState(false);
  const [loginFail, setLoginFail] = useState(false);
  const [waitingPath, setWatingPath] = useState<string>("");
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage("링크 복사 성공!");
    } catch (error) {
      setCopyMessage("복사 재시도");
    }
  };

  const login = async () => {
    await axios
      .post("https://jmgu.loca.lt/user/login", {
        id: loginID,
        password: loginPW,
      })
      .then(function (response) {
        console.log(response.data);
        if (typeof window !== "undefined") {
          // const 응답 = response.data.뭐시기
          // const 유저닉네임 = 뭐시기
          // setUserName(뭐시기)
          // setUserLink(`http://www.half-go.io/gallery/${뭐시기}`)
          sessionStorage.setItem("loginStatus", "true");
          sessionStorage.setItem("loginUserId", `${loginID}`);
          sessionStorage.setItem("loginUserName", `${loginID}`);
          setLoginSuccess(true);
          setLoginFail(false);
          if (!(waitingPath === "")) {
            router.push({
              pathname: waitingPath,
            });
          }
        } else {
          setLoginSuccess(true);
          setLoginFail(true);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const signUp = async () => {
    await axios
      .post("https://jmgu.loca.lt/user/signin", {
        id: signUpID,
        password: signUpPWCheck,
        username: galleryName,
      })
      .then(function (response) {
        console.log(response.data);
        //if(response.data.signin == "success")
        setSignUpSuccess(true);
        setFailModal(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("loginStatus", "false");
      const path: any = sessionStorage.getItem("waitingPath");
      setWatingPath(path);
    }
  });
  useEffect(() => {
    if (signUpPWCheck == "") {
      return;
    } else if (signUpPWCheck == signUpPW) {
      setCheckCorrect(true);
    } else {
      setCheckCorrect(false);
    }
  }, [signUpPWCheck]);

  useEffect(() => {
    if (
      signUpID != "" &&
      galleryName != "" &&
      signUpPWCheck != "" &&
      checkCorrect == true
    ) {
      setPermitSignUp(false);
    }
    setLoginFail(false);
  }, [signUpID, galleryName, signUpPWCheck, checkCorrect]);

  return (
    <div className={"container"}>
      <div>
        <Image src={title} />
        <h1
          style={{
            fontSize: "4.5rem",
            color: "#3e4356",
            marginTop: "-10px",
            fontFamily: "SEBANG_Gothic_Bold, cursive",
          }}
        >
          반의반고흐
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          width: "75%",
          marginLeft: "12.5%",
        }}
      >
        <div
          style={{
            display: "block",
            width: "70%",
            marginTop: "3px",
            marginRight: "3px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "3px solid #ffa3a3",
              borderRadius: "5px",
              marginBottom: "5px",
            }}
          >
            <div style={{ display: "block", width: "20%" }}>
              <TiUser size="2rem" color="#ffa3a3" />
            </div>
            <input
              style={{
                width: "80%",
                height: "100%",
                border: "0",
                backgroundColor: "transparent",
              }}
              placeholder="아이디"
              onChange={(e) => setLoginID(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "3px solid #ffa3a3",
              borderRadius: "5px",
            }}
          >
            <div style={{ width: "20%" }}>
              <TiKey size="2rem" color="#ffa3a3" />
            </div>
            <input
              style={{
                width: "80%",
                height: "100%",
                border: "0",
                backgroundColor: "transparent",
              }}
              type="password"
              placeholder="비밀번호"
              onChange={(e) => setLoginPW(e.target.value)}
            />
          </div>
        </div>
        <div style={{ width: "30%" }}>
          <button
            className={"btn"}
            onClick={() => {
              login();
            }}
          >
            로그인
          </button>
        </div>
      </div>
      <button
        style={{
          marginTop: "15px",
          border: "0",
          backgroundColor: "transparent",
        }}
        onClick={() => setSignUpModal(true)}
      >
        <a
          style={{
            fontSize: "1.2rem",
            fontFamily: "KOTRAHOPE, cursive",
            color: "#ffa3a3",
            textDecoration: "underline",
          }}
        >
          회원가입
        </a>
      </button>
      <Modal
        isOpen={loginFail}
        closeTimeoutMS={200}
        overlayClassName={{
          base: styles.minioverlayBase,
          afterOpen: styles.minioverlayAfter,
          beforeClose: styles.minioverlayBefore,
        }}
        className={{
          base: styles.minicontentBase,
          afterOpen: styles.minicontentAfter,
          beforeClose: styles.minicontentBefore,
        }}
      >
        <div
          style={{
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            fontSize: "1.5rem",
            width: "100%",
            height: "100%",
          }}
        >
          <p>로그인 실패</p>
          <button
            className={"failBtn"}
            onClick={() => {
              setLoginFail(false);
            }}
          >
            확인
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={signUpModal}
        closeTimeoutMS={200}
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
        {signUpSuccess ? (
          <div style={{ width: "100%", height: "100%" }}>
            <div
              style={{
                height: "15%",
                backgroundColor: "#f3c5c5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span style={{ display: "inline", color: "#CD5C5C" }}>
                회원가입
              </span>
            </div>
            <div
              style={{
                height: "85%",
                width: "100%",
                backgroundColor: "#f6e7d8",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                display: "inline-block",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "grid",
                  textAlign: "center",
                  width: "90%",
                  height: "100%",
                  marginLeft: "5%",
                  alignItems: "center",
                }}
              >
                <p>로그인에 성공하셨습니다 !</p>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className={"successBtn"}
                    onClick={() => setSignUpModal(false)}
                  >
                    메인으로
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ width: "100%", height: "100%" }}>
            {
              <Modal
                isOpen={failModal}
                closeTimeoutMS={200}
                overlayClassName={{
                  base: styles.minioverlayBase,
                  afterOpen: styles.minioverlayAfter,
                  beforeClose: styles.minioverlayBefore,
                }}
                className={{
                  base: styles.minicontentBase,
                  afterOpen: styles.minicontentAfter,
                  beforeClose: styles.minicontentBefore,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: "1.5rem",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <p>가 중복 됩니다!</p>
                  <button
                    className={"failBtn"}
                    onClick={() => {
                      setFailModal(false);
                    }}
                  >
                    확인
                  </button>
                </div>
              </Modal>
            }
            <div
              style={{
                height: "15%",
                backgroundColor: "#f3c5c5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span style={{ display: "inline", color: "#CD5C5C" }}>
                회원가입
              </span>
            </div>
            <div
              style={{
                height: "85%",
                backgroundColor: "#f6e7d8",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  textAlign: "left",
                  width: "90%",
                  height: "20%",
                  marginLeft: "5%",
                  alignItems: "flex-end",
                }}
              >
                <p style={{ fontSize: "1rem", margin: "0px 0px" }}>
                  미술관 이름 (최대 5섯글자)
                </p>
                <input
                  style={{
                    border: "2px solid #575757",
                    height: "70%",
                    background: "#ece7e2",
                    borderRadius: "5px",
                  }}
                  maxLength={5}
                  onChange={(e) => setGalleryName(e.target.value)}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  textAlign: "left",
                  width: "90%",
                  height: "20%",
                  marginLeft: "5%",
                  alignItems: "flex-end",
                }}
              >
                <p style={{ fontSize: "1rem", margin: "0px 0px" }}>아이디</p>
                <input
                  style={{
                    border: "2px solid #575757",
                    height: "70%",
                    background: "#ece7e2",
                    borderRadius: "5px",
                  }}
                  onChange={(e) => setSignUpID(e.target.value)}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  textAlign: "left",
                  width: "90%",
                  height: "20%",
                  marginLeft: "5%",
                  alignItems: "flex-end",
                }}
              >
                <p style={{ fontSize: "1rem", margin: "0px 0px" }}>비밀번호</p>
                <input
                  style={{
                    border: "2px solid #575757",
                    height: "70%",
                    background: "#ece7e2",
                    borderRadius: "5px",
                  }}
                  type={"password"}
                  onChange={(e) => setSignUpPW(e.target.value)}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  textAlign: "left",
                  width: "90%",
                  height: "20%",
                  marginLeft: "5%",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p
                    style={{
                      display: "inline",
                      fontSize: "1rem",
                      margin: "0px 0px",
                    }}
                  >
                    비밀번호 확인
                  </p>
                  {checkCorrect ? (
                    <p
                      style={{
                        display: "inline",
                        fontSize: "1rem",
                        margin: "0px 0px",
                      }}
                    >
                      ✔️
                    </p>
                  ) : signUpPWCheck == "" ? (
                    <p
                      style={{
                        display: "inline",
                        fontSize: "1rem",
                        margin: "0px 0px",
                      }}
                    ></p>
                  ) : (
                    <p
                      style={{
                        display: "inline",
                        fontSize: "1rem",
                        margin: "0px 0px",
                      }}
                    >
                      불일치
                    </p>
                  )}
                </div>
                <input
                  style={{
                    border: "2px solid #575757",
                    height: "70%",
                    background: "#ece7e2",
                    borderRadius: "5px",
                  }}
                  type={"password"}
                  onChange={(e) => setSignUpPWCheck(e.target.value)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "92.5%",
                  height: "20%",
                  marginLeft: "3.75%",
                }}
              >
                <div className={"btnZone"}>
                  <button
                    className={"modalBtn"}
                    onClick={() => {
                      signUp();
                    }}
                    disabled={permitSignUp}
                  >
                    <p style={{ margin: "0" }}>가입하기</p>
                  </button>
                </div>
                <div
                  className={"btnZone"}
                  onClick={() => setSignUpModal(false)}
                >
                  <button className={"modalBtn"}>메인으로</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        isOpen={loginSuccess}
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
          <p style={{ display: "inline", lineHeight: 3 }}>
            {userName}님의 미술관
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <input readOnly value={userLink} />
            <button onClick={() => handleCopyClipBoard(userLink)}>copy</button>
          </div>
          <p style={{ fontSize: "1rem" }}>{copyMessage}</p>
          <div className={"btnZone"}>
            <button
              className={"modalBtn"}
              onClick={() =>
                router.push({
                  //pathname: "/mygallery",
                  pathname: `/gallery/${userName}`,
                  query: { username: userName },
                })
              }
            >
              내 미술관으로
            </button>
          </div>
        </div>
      </Modal>

      <style jsx>
        {`
          body {
            background-color: #f6e7d8;
          }
          h1 {
            font-size: 6rem;
            font-weight: 500;
            line-height: 1;
          }
          .container {
            max-width: 500px;
            max-height: 900px;
            position: absolute;
            width: 90%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            justify-content: center;
            align-items: center;
            text-align: center;
          }
          .temp {
            display: flex;
          }
          .btnZone {
            width: 100%;
            height: 80%;
            margintop: 10%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .btn {
            display: block;
            float: left;
            width: 100%;
            height: 100%;
            padding: 0;
            font-weight: 200;
            text-align: center;
            line-height: 50px;
            color: #cd5c5c;
            border-radius: 5px;
            transition: all 0.2s;
            box-shadow: 0px 0px 0px 0px #f3c5c5;
            background: #ffc3c3;
            font-family: "KOTRAHOPE", cursive;
            font-size: 1.6rem;
            border-color: #ffc3c3;
          }
          .btn:active {
            box-shadow: 0px 0px 0px 0px #f3c5c5;
            margin-top: 15px;
            margin-bottom: 5px;
          }
          .modalBtn {
            display: block;
            position: relative;
            float: left;
            width: 100%;
            height: 80%;
            margin: 2% 3% 1% 3%;
            font-weight: 200;
            text-align: center;
            color: #cd5c5c;
            border-radius: 5%;
            transition: all 0.2s;
            box-shadow: 0px 0px 0px 0px #f3c5c5;
            background: #ffc3c3;
            font-family: "KOTRAHOPE", cursive;
            border-color: #ffc3c3;
            font-size: 1.2rem;
          }
          .modalBtn:active {
            box-shadow: 0px 0px 0px 0px #f3c5c5;
            margin-top: 15px;
            margin-bottom: 5px;
          }
          .successBtn {
            display: block;
            position: relative;
            float: left;
            width: 50%;
            height: 40%;
            margin: 2% 3% 1% 3%;
            font-weight: 200;
            text-align: center;
            color: #cd5c5c;
            border-radius: 5%;
            transition: all 0.2s;
            box-shadow: 0px 0px 0px 0px #f3c5c5;
            background: #ffc3c3;
            font-family: "KOTRAHOPE", cursive;
            border-color: #ffc3c3;
            font-size: 1.2rem;
          }
          .successBtn:active {
            box-shadow: 0px 0px 0px 0px #f3c5c5;
            margin-top: 15px;
            margin-bottom: 5px;
          }
          .failBtn {
            display: block;
            position: relative;
            float: left;
            width: 100%;
            height: 70%;
            margin: 2% 3% 1% 3%;
            font-weight: 200;
            text-align: center;
            color: #cd5c5c;
            border-radius: 5%;
            transition: all 0.2s;
            box-shadow: 0px 0px 0px 0px #f3c5c5;
            background: #ffc3c3;
            font-family: "KOTRAHOPE", cursive;
            border-color: #ffc3c3;
            font-size: 1.2rem;
            margin-bottom: 20%;
          }
          .failBtn:active {
            box-shadow: 0px 0px 0px 0px #f3c5c5;
            margin-bottom: 5px;
          }
          input::placeholder {
            color: #ffa3a3;
          }
        `}
      </style>
    </div>
  );
};

export default main;
