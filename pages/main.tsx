import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import styles from "../styles/main.module.css";
import Image from 'next/image';
import title from '/public/images/title_img.png';
import cloud from '/public/images/cloud.png';

const main = () => {
  const router = useRouter();
  const [signUpModal, setSignUpModal] = useState<boolean>(false);
  const [checkLogin, setCheckLogin] = useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("밤톨이멍멍");
  const [userLink, setUserLink] = useState<string>("http://www.half-go.io/?username=123");
  const [copyMessage, setCopyMessage] = useState<string>("미술관을 친구들에게 홍보하자!");

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage('링크 복사 성공!');
    } catch (error) {
      setCopyMessage('복사 재시도');
    }
  };
  
  return (
    <div className={"container"}>
      <div style={{marginTop: "150px"}}>
        <Image src={title} />
        <h1 style={{fontSize: "5.2rem", color: "#3e4356", marginTop: "-10px", fontFamily: "SEBANG_Gothic_Bold, cursive"}}>반의반고흐</h1>
      </div>
      <div className={"btnZone"}>
        <button className={"btn"} onClick={() => setSignUpModal(true)}>
          회원가입
        </button>
      </div>
      <div className={"btnZone"}>
        {checkLogin ? 
          <div style={{display: 'inline'}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <div style={{display: 'block', width: '20%'}}>
                <p style={{fontSize: '1.2rem'}}>ID : </p>
              </div>
              <input style={{width: '60%'}}/>
            </div>
      
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <div style={{width: '20%'}}>
                <p style={{fontSize: '1.2rem'}}>PW : </p>
              </div>
              <input style={{width: '60%'}}/>
            </div>
          </div> : <div></div> }
        <button className={"btn"} onClick={() => {checkLogin ? setLoginSuccess(true) : setCheckLogin(true)}}>
          로그인
        </button>
      </div>
      <Modal
      isOpen={signUpModal}
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
          <p style={{display: 'inline', lineHeight: 3}}>회원가입</p>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: '30%'}}>
              <p style={{fontSize: '1.2rem'}}>닉네임 : </p>
            </div>
            <div style={{width: '60%'}}>
              <input />
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: '30%'}}>
              <p style={{fontSize: '1.2rem'}}>이메일 : </p>
            </div>
            <div style={{width: '60%'}}>
              <input />
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: '30%'}}>
              <p style={{fontSize: '1.2rem'}}>비밀번호 : </p>
            </div>
            <div style={{width: '60%'}}>
              <input />
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className={"btnZone"}>
              <button className={"modalBtn"}>
                가입하기
              </button>
            </div>
            <div className={"btnZone"} onClick={() => setSignUpModal(false)}>
              <button className={"modalBtn"}>
                메인으로
              </button>
            </div>
          </div>
        </div>
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
          <p style={{display: 'inline', lineHeight: 3}}>{userName}님의 미술관</p>
          <div style={{display :'flex', justifyContent: 'center'}}>
            <input readOnly value={userLink}/>
            <button onClick={() => handleCopyClipBoard(userLink)}>
              copy
            </button>
          </div>
          <p style={{fontSize : '1rem'}}>{copyMessage}</p>
          <div className={"btnZone"}>
            <button className={"modalBtn"} onClick={() => router.push({pathname: '/mygallery', query: { username: userName}})}>
              내 미술관으로
            </button>
          </div>
        </div>
      </Modal>

      <style jsx>
        {`
          h1 {
            font-size: 6rem;
            font-weight: 500;
            line-height: 1;
          }
          .container {
            position: absolute;
            width: 90%;
            top: 40%;
            left: 50%;
            transform: translate(-50%,-50%);
            justify-content: center;
            align-items: center;
            text-align: center;
          }
          .temp {
            display: flex;
          }
          .btnZone {
            width: 100%;
            height: 40%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .btn {
            display: block;
            position: relative;
            float: left;
            width: 25%;
            height: 80%;
            padding: 0;
            margin: 2% 3% 1% 3%;
            font-weight: 200;
            text-align: center;
            line-height: 50px;
            color: #CD5C5C;
            border-radius: 5%;
            transition: all 0.2s;
            box-shadow: 0px 5px 0px 0px #f3c5c5;
            background: #ffc3c3;
            font-family: 'KOTRAHOPE', cursive;
            font-size: 1.6rem;
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
            padding: 0;
            margin: 2% 3% 1% 3%;
            font-weight: 200;
            text-align: center;
            line-height: 50px;
            color: black;
            border-radius: 5%;
            transition: all 0.2s;
            box-shadow: 0px 5px 0px 0px #f3c5c5;
            background: #ffc3c3;
            font-family: 'Kirang Haerang', cursive;
            font-size: 1rem;
          }
          .modalBtn:active {
            box-shadow: 0px 0px 0px 0px #f3c5c5;
            margin-top: 15px;
            margin-bottom: 5px;
          }
        `}
      </style>
    </div>
  );
}

export default main;