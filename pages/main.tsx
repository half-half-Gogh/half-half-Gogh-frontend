import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import styles from "../styles/main.module.css";
import Image from 'next/image';
import title from '/public/images/title_img.png';
import { TiKey, TiUser } from "react-icons/ti";

const main = () => {
  const router = useRouter();
  const [signUpModal, setSignUpModal] = useState<boolean>(false);
  const [loginMode, setLoginMode] = useState<boolean>(false);
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
      <div>
         <Image src={title} />
         <h1 style={{fontSize: "4.5rem", color: "#3e4356", marginTop: "-10px", fontFamily: "SEBANG_Gothic_Bold, cursive"}}>반의반고흐</h1>
      </div>
      <div style={{display: 'flex', width: '75%', marginLeft: '12.5%'}}>
        <div style={{display: 'block', width: '70%', marginTop: '3px', marginRight: '3px'}}>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', border: '3px solid #ffa3a3', borderRadius: '5px', marginBottom: '5px'}}>
            <div style={{display: 'block', width: '20%'}}>
              <TiUser size="2rem" color="#ffa3a3"/>
            </div>
            <input style={{width: '80%', height: '100%', border: '0', backgroundColor: 'transparent'}} placeholder="ID"/>
          </div>
    
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', border: '3px solid #ffa3a3', borderRadius: '5px'}}>
            <div style={{width: '20%'}}>
              <TiKey size="2rem" color="#ffa3a3"/>
            </div>
            <input style={{width: '80%', height: '100%', border: '0', backgroundColor: 'transparent'}} placeholder="PW"/>
          </div>
        </div>
        <div style={{width: '30%'}}>
          <button className={"btn"} onClick={() => {setLoginSuccess(true)}}>
            로그인
          </button>
        </div>
      </div>
      <button 
        style={{marginTop: '15px', border: '0', backgroundColor: 'transparent'}}
        onClick={() => setSignUpModal(true)}
      >
        <a style={{fontSize: '1.2rem', fontFamily: 'KOTRAHOPE, cursive', color : '#ffa3a3', textDecoration: 'underline'}}>회원가입</a>
      </button>
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
        <div style={{width: '100%', height: '100%'}}>
          <div style={{height: '15%', backgroundColor: '#f3c5c5', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <span style={{display: 'inline', color: '#CD5C5C'}}>회원가입</span>  
          </div>
          <div style={{height: '85%', backgroundColor: '#f6e7d8', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}>
            <div style={{display: 'grid', textAlign: 'left', width: '90%', height: '20%', marginLeft: '5%', alignItems: 'flex-end'}}>            
              <p style={{fontSize: '1rem', margin: '0px 0px'}}>미술관 이름</p>     
              <input style={{border: '2px solid #575757', height: '70%', background: '#ece7e2', borderRadius: '5px'}}/>           
            </div>
            <div style={{display: 'grid', textAlign: 'left', width: '90%', height: '20%', marginLeft: '5%', alignItems: 'flex-end'}}>            
              <p style={{fontSize: '1rem', margin: '0px 0px'}}>아이디</p>     
              <input style={{border: '2px solid #575757', height: '70%', background: '#ece7e2', borderRadius: '5px'}}/>           
            </div>
            <div style={{display: 'grid', textAlign: 'left', width: '90%', height: '20%', marginLeft: '5%', alignItems: 'flex-end'}}>            
              <p style={{fontSize: '1rem', margin: '0px 0px'}}>비밀번호</p>     
              <input style={{border: '2px solid #575757', height: '70%', background: '#ece7e2', borderRadius: '5px'}}/>           
            </div>
            <div style={{display: 'grid', textAlign: 'left', width: '90%', height: '20%', marginLeft: '5%', alignItems: 'flex-end'}}>            
              <p style={{fontSize: '1rem', margin: '0px 0px'}}>비밀번호 확인</p>     
              <input style={{border: '2px solid #575757', height: '70%', background: '#ece7e2', borderRadius: '5px'}}/>           
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '92.5%', height: '20%', marginLeft: '3.75%'}}>
              <div className={"btnZone"}>
                <button className={"modalBtn"}>
                  <p style={{margin: '0'}}>가입하기</p>
                </button>
              </div>
              <div className={"btnZone"} onClick={() => setSignUpModal(false)}>
                <button className={"modalBtn"}>
                  메인으로
                </button>
              </div>
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
            top: 50%;
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
            height: 80%;
            marginTop: 10%;
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
            color: #CD5C5C;
            border-radius: 5%;
            transition: all 0.2s;
            box-shadow: 0px 0px 0px 0px #f3c5c5;
            background: #ffc3c3;
            font-family: 'KOTRAHOPE', cursive;
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
            color: #CD5C5C;
            border-radius: 5%;
            transition: all 0.2s;
            box-shadow: 0px 0px 0px 0px #f3c5c5;
            background: #ffc3c3;
            font-family: 'KOTRAHOPE', cursive;
            border-color: #ffc3c3;
            font-size: 1.2rem;
          }
          .modalBtn:active {
            box-shadow: 0px 0px 0px 0px #f3c5c5;
            margin-top: 15px;
            margin-bottom: 5px;
          }
          input::placeholder {
            color: #ffa3a3;
          }
        `}
      </style>
    </div>
  );
}

export default main;