import styles from "../styles/loginModal.module.css";
import Modal from "react-modal";
import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from "react";
import { TiKey, TiUser } from "react-icons/ti";
import axios from "axios";

type Props = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loginFail: boolean;
  setLoginFail: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginModal = ({
  modalOpen,
  setModalOpen,
  loginFail,
  setLoginFail,
}: Props) => {
  const [loginID, setLoginID] = useState<string>("");
  const [loginPW, setLoginPW] = useState<string>("");

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
          setModalOpen(false);
          setLoginFail(false);
        } else {
          setLoginFail(true);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div>
      <Modal
        isOpen={modalOpen}
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
        <div
          style={{
            display: "flex",
            width: "75%",
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
              className={styles.btn}
              onClick={() => {
                login();
              }}
            >
              로그인
            </button>
          </div>
        </div>
      </Modal>
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
    </div>
  );
};
export default LoginModal;
