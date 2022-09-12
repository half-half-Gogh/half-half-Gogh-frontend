import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../styles/main.module.css";
import Image from "next/image";
import title from "/public/images/title_img.png";
import { TiKey, TiUser } from "react-icons/ti";
import { BsClipboardPlus } from "react-icons/bs";
import axios from "axios";

const main = () => {
  const router = useRouter();
  const [signUpModal, setSignUpModal] = useState<boolean>(false);
  const [loginMode, setLoginMode] = useState<boolean>(false);
  const [checkLogin, setCheckLogin] = useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userLink, setUserLink] = useState<string>("http://www.half-go.io/");
  const [copyMessage, setCopyMessage] =
    useState<string>("링크를 눌러 친구들에게 홍보하자!");
  const [loginID, setLoginID] = useState<string>("");
  const [loginPW, setLoginPW] = useState<string>("");
  const [galleryName, setGalleryName] = useState<string>("");
  const [signUpID, setSignUpID] = useState<string>("");
  const [idCheck, setIdCheck] = useState<boolean>(false);
  const [signUpPW, setSignUpPW] = useState<string>("");
  const [signUpPWCheck, setSignUpPWCheck] = useState<string>("");
  const [checkCorrect, setCheckCorrect] = useState<boolean>(false);
  const [disallowSignUp, setDisallowSignUp] = useState<boolean>(true);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [failModal, setFailModal] = useState(false);
  const [loginFail, setLoginFail] = useState(false);
  const [waitingPath, setWatingPath] = useState<string>("");
  const [errorStr, setErrorStr] = useState("");
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage("링크 복사 성공!");
    } catch (error) {
      setCopyMessage("복사 재시도");
    }
  };

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  const login = async () => {
    await axios
      .post("http://211.62.179.135:4000/user/signin", {
        id: loginID,
        password: loginPW,
      })
      .then(function (response) {
        if (
          response.data.signinStatus === "true" ||
          response.data.signinStatus === true
        ) {
          setUserName(response.data.signinUserName);
          setUserId(response.data.signinUserId);
          console.log(response.data);
          if (typeof window !== "undefined") {
            sessionStorage.removeItem("loginStatus");
            sessionStorage.setItem("loginStatus", "true");
            sessionStorage.setItem("loginUserId", response.data.signinUserId);
            sessionStorage.setItem(
              "loginUserName",
              response.data.signinUserName
            );
          }
          setLoginSuccess(true);
          setLoginFail(false);
          if (!(waitingPath === "")) {
            router.push({
              pathname: waitingPath,
            });
          }
        } else {
          if (response.data.signinError.includes("password")) {
            setErrorStr("잘못된 패스워드 입니다.");
          } else if (response.data.signinError.includes("identifier")) {
            setErrorStr("잘못된 이메일 입니다.");
          } else if (response.data.signinError.includes("address")) {
            setErrorStr("이메일 형식이 아닙니다.");
          } else {
            setErrorStr("로그인 오류 입니다.");
          }
          setLoginFail(true);
        }
      })
      .catch(function (error) {
        console.error(error);
        setErrorStr("다시 시도해주세요.");
        setLoginFail(true);
      });
  };

  const signUp = async () => {
    await axios
      .post("http://211.62.179.135:4000/user/signup", {
        id: signUpID,
        password: signUpPWCheck,
        username: galleryName,
      })
      .then(function (response) {
        console.log(response.data);
        if (
          response.data.signupStatus === "ture" ||
          response.data.signupStatus
        ) {
          setSignUpSuccess(true);
        } else {
          if (response.data.signupError.includes("already in use")) {
            setErrorStr("이미 가입된 이메일입니다.");
          } else {
            setErrorStr("회원가입 오류 입니다.");
          }
          setLoginFail(true);
        }
      })
      .catch(function (error) {
        console.error(error);
        setErrorStr("다시 시도해주세요.");
        setLoginFail(true);
      });
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        !(
          sessionStorage.getItem("loginStatus") === "true" ||
          sessionStorage.getItem("loginStatus")
        )
      ) {
        sessionStorage.setItem("loginStatus", "false");
      }
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
    const reg_email =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (!reg_email.test(signUpID)) {
      setIdCheck(false);
    } else {
      setIdCheck(true);
    }
  }, [signUpID]);

  useEffect(() => {
    if (idCheck && galleryName != "" && signUpPW.length >= 6 && checkCorrect) {
      setDisallowSignUp(false);
    }
  }, [signUpID, galleryName, signUpPW, checkCorrect]);

  return (
    <div className={"container"}>
      <div>
        <Image src={title} />
        {windowSize.width < 363 ? (
          windowSize.width < 281 ? (
            <h1
              style={{
                fontSize: "2.8rem",
                color: "#3e4356",
                marginTop: "-5px",
                fontFamily: "SEBANG_Gothic_Bold, cursive",
              }}
            >
              반의반고흐
            </h1>
          ) : (
            <h1
              style={{
                fontSize: "3.8rem",
                color: "#3e4356",
                marginTop: "-7px",
                fontFamily: "SEBANG_Gothic_Bold, cursive",
              }}
            >
              반의반고흐
            </h1>
          )
        ) : (
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
        )}
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
                fontFamily: "KOTRAHOPE, cursive",
                fontSize: "1rem",
              }}
              placeholder="이메일"
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
                fontFamily: "KOTRAHOPE, cursive",
                fontSize: "1rem",
              }}
              type="password"
              placeholder="패스워드"
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
          <p>{errorStr}</p>
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
                <p>회원가입에 성공했습니다 !</p>
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
                    onClick={() => {
                      setSignUpID("");
                      setSignUpPW("");
                      setGalleryName("");
                      setDisallowSignUp(true);
                      setCheckCorrect(false);
                      setSignUpModal(false);
                      setSignUpSuccess(false);
                    }}
                  >
                    확인
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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ fontSize: "1rem", margin: "0px 0px" }}>
                    미술관 이름 (5자 이하)
                  </p>
                  {galleryName != "" ? (
                    <p
                      style={{
                        display: "inline",
                        fontSize: "0.7rem",
                        margin: "0px 0px",
                      }}
                    >
                      ✔️
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
                <input
                  style={{
                    border: "2px solid #575757",
                    height: "70%",
                    background: "#ece7e2",
                    borderRadius: "5px",
                    fontFamily: "KOTRAHOPE, cursive",
                    fontSize: "1rem",
                    paddingLeft: "5px",
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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ fontSize: "1rem", margin: "0px 0px" }}>이메일</p>
                  {idCheck ? (
                    <p
                      style={{
                        display: "inline",
                        fontSize: "0.7rem",
                        margin: "0px 0px",
                      }}
                    >
                      ✔️
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
                <input
                  style={{
                    border: "2px solid #575757",
                    height: "70%",
                    background: "#ece7e2",
                    borderRadius: "5px",
                    fontFamily: "KOTRAHOPE, cursive",
                    fontSize: "1rem",
                    paddingLeft: "5px",
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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ fontSize: "1rem", margin: "0px 0px" }}>
                    패스워드 (6자 이상)
                  </p>
                  {signUpPW.length >= 6 ? (
                    <p
                      style={{
                        display: "inline",
                        fontSize: "0.7rem",
                        margin: "0px 0px",
                      }}
                    >
                      ✔️
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
                <input
                  style={{
                    border: "2px solid #575757",
                    height: "70%",
                    background: "#ece7e2",
                    borderRadius: "5px",
                    fontFamily: "KOTRAHOPE, cursive",
                    fontSize: "1rem",
                    paddingLeft: "5px",
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
                    패스워드 확인
                  </p>
                  {checkCorrect ? (
                    <p
                      style={{
                        display: "inline",
                        fontSize: "0.7rem",
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
                    fontFamily: "KOTRAHOPE, cursive",
                    fontSize: "1rem",
                    paddingLeft: "5px",
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
                    disabled={disallowSignUp}
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
          base: styles.loginOverlayBase,
          afterOpen: styles.loginOverlayAfter,
          beforeClose: styles.loginOverlayBefore,
        }}
        className={{
          base: styles.loginContentBase,
          afterOpen: styles.loginContentAfter,
          beforeClose: styles.loginContentBefore,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "20%",
              backgroundColor: "#f3c5c5",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              style={{
                display: "inline",
                color: "#CD5C5C",
                fontSize: "1.5rem",
              }}
            >
              {userName}님의 미술관
            </span>
          </div>
          <div
            style={{
              height: "80%",
              width: "100%",
              backgroundColor: "#f6e7d8",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              justifyContent: "center",
              alignItems: "center",
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
              <div
                style={{
                  display: "grid",
                  width: "100%",
                  height: "35%",
                  justifyContent: "center",
                  alignContent: "center",
                  // border: "1px solid black",
                }}
              >
                <input
                  readOnly
                  value={userLink}
                  onClick={() => handleCopyClipBoard(userLink)}
                  style={{
                    display: "block",
                    height: "1.5rem",
                    fontSize: "1rem",
                    border: "3px solid #3e4356",
                    fontFamily: "KOTRAHOPE, cursive",
                    color: "#3e4356",
                    borderRadius: "5px",
                    paddingLeft: "5px",
                    paddingTop: "2px",
                    paddingBottom: "2px",
                    marginTop: "3px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "20%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    display: "inline",
                    fontSize: "1rem",
                    width: "100%",
                    margin: "0px 0px",
                    color: "#3e4356",
                  }}
                >
                  {copyMessage}
                </p>
              </div>
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
          </div>
        </div>
      </Modal>

      <style jsx>
        {`
          body {
            background-color: #f6e7d8;
            overflow-y: auto;
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
            overflow-y: auto;
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
