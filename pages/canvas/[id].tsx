import React, { useRef, useEffect, useState } from "react";
import { CirclePicker } from "react-color";
import styles from "../../styles/MyCanvas.module.css";
import Picker from "../../components/Picker";
import SaveModal from "../../components/SaveModal";
import Modal from "react-modal";
import axios from "axios";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import { getRandomString } from "../../components/getRandomString";
import Loading from "../../components/Loading";
import {
  FaSave,
  FaPaintBrush,
  FaEraser,
  FaTrashAlt,
  FaUndoAlt,
} from "react-icons/fa";

type Props = {
  userId: string;
  galleryName: string;
  userToken: string;
};

const MyCanvas = ({
  userId,
  galleryName,
  userToken,
}: InferGetServerSidePropsType<Props>) => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [down, setDown] = useState<boolean>(false);
  const [up, setUp] = useState<boolean>(false);
  const [strokeWidth, setStrokeWidth] = useState<number>(10);
  const [isStroke, setIsStroke] = useState(true);
  const [pickerColor, setPickerColor] = useState<string>("black");
  const [pickerOpen, setPickerOpen] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [previousColor, setPreviousColor] = useState<string>("black");
  const [modalOpen, setModalOpen] = useState(false);
  const rangeRef = useRef<HTMLInputElement>(null);
  let array: { x: number; y: number }[] = [];
  const [drawer, setDrawer] = useState("");
  const router = useRouter();
  const [failModal, setFailModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const prevent = (event: any) => {
    event.preventDefault();
    event.returnValue = "";
  };
  const [path, setPath] = useState<typeof array[]>([
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ],
  ]);
  const [widthArray, setWidthArray] = useState<number[]>([0]);
  const [colorArray, setColorArray] = useState<string[]>(["black"]);

  useEffect(() => {
    window.addEventListener("beforeunload", prevent);

    if (rangeRef.current) {
      rangeRef.current.min = "1";
      rangeRef.current.max = "20";
      rangeRef.current.step = "1";
      rangeRef.current.value = "10";
    }
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!context || !windowSize) return;
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    context.lineWidth = strokeWidth;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.fillStyle = "white";
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    setCtx(context);
  }, []);
  useEffect(() => {
    if (!ctx) return;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    setCtx(ctx);
  }, [windowSize]);
  useEffect(() => {
    let tmpctx: CanvasRenderingContext2D | null = ctx;
    if (tmpctx) {
      tmpctx.strokeStyle = pickerColor;
      setCtx(tmpctx);
    }
  }, [pickerColor]);
  useEffect(() => {
    if (!isStroke) {
      setPreviousColor(pickerColor);
      setPickerColor("white");
    } else {
      setPickerColor(previousColor);
    }
  }, [isStroke]);
  const pickerChange = (color: string) => {
    setPickerColor(color);
  };
  const changeWidth = (linewidth: string) => {
    let tmpctx: CanvasRenderingContext2D | null = ctx;
    if (tmpctx) {
      tmpctx.lineWidth = Number(linewidth);
      setStrokeWidth(tmpctx.lineWidth);
      setCtx(tmpctx);
    }
  };
  const clearCanvas = () => {
    if (!ctx || !windowSize) return;
    ctx.save();
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, windowSize.width, windowSize.height);
    ctx.restore();
  };
  const saveImage = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob(function (blob) {
      setLoading(true);
      const formData = new FormData();
      const fileName = getRandomString(10);
      formData.append("halfhalfgogh", blob!, `${fileName}.png`);
      // Post via axios or other transport method
      axios
        .post("/api/im/upload", formData)
        .then(function (response) {
          axios.post("/api/im/imgInfo", {
            loginUserId: userId,
            drawer: drawer,
            imgId: response.data.fileName,
          });
          setLoading(false);
          setTimeout(() => setLoading(true), 500);
          setTimeout(() => setLoading(false), 4000);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  const canvasMouseEventListener = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    type: string
  ) => {
    if (!ctx) return;
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    const canvasElement = event.currentTarget as HTMLCanvasElement;
    let x: number = event.clientX - canvasElement.offsetLeft;
    let y: number = event.clientY - canvasElement.offsetTop;
    if (type === "move" && down) {
      if (array.length === 0) {
        array.push({ x, y });
      } else {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(array[array.length - 1].x, array[array.length - 1].y);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
        array.push({ x, y });
      }
    } else if (type === "Up") {
      setPath(path?.concat([array]));
      setWidthArray(widthArray?.concat(strokeWidth));
      setColorArray(colorArray?.concat(pickerColor));
    }
  };
  const canvasTouchEventListener = (
    event: React.TouchEvent<HTMLCanvasElement>,
    type: string
  ) => {
    if (!ctx) return;
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    const canvasElement = event.currentTarget as HTMLCanvasElement;

    if (type === "move" && down) {
      let x: number = event.touches[0].clientX - canvasElement.offsetLeft;
      let y: number = event.touches[0].clientY - canvasElement.offsetTop;
      if (array.length === 0) {
        array.push({ x, y });
      } else {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(array[array.length - 1].x, array[array.length - 1].y);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
        array.push({ x, y });
        window.scrollbars;
      }
    } else if (type === "leave") {
      setPath(path?.concat([array]));
      setWidthArray(widthArray?.concat(strokeWidth));
      setColorArray(colorArray?.concat(pickerColor));
    }
  };
  const undo = () => {
    path.splice(-1, 1);
    widthArray.splice(-1, 1);
    colorArray.splice(-1, 1);
    drawPaths();
  };
  const drawPaths = () => {
    console.log(path.length + "dsd" + widthArray.length);
    clearCanvas();
    console.log(path);
    if (!path) return;
    path.forEach((p, index) => {
      if (!ctx) return;
      ctx.lineWidth = widthArray[index];
      ctx.strokeStyle = colorArray[index];
      ctx.beginPath();
      ctx.moveTo(p[0].x, p[0].y);
      for (let i = 1; i < p.length; i++) {
        ctx.lineTo(p[i].x, p[i].y);
      }
      ctx.stroke();
    });
  };

  return (
    <div>
      {loading && <Loading />}
      <div>
        <div className={styles.background}>
          <header className={styles.Header}>
            <div
              style={{
                display: "flex",
                width: "100%",
                maxWidth: "500px",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderBottomLeftRadius: "80px",
                borderBottomRightRadius: "80px",
                backgroundColor: "#ffc3c3",
                boxShadow: "0px 0px 20px 5px rgba(0, 0, 0, 0.4)",
              }}
            >
              <h2
                style={{
                  display: "inline",
                  margin: "0px",
                  fontFamily: "SEBANG_Gothic_Bold, cursive",
                  fontSize: "2rem",
                  color: "white",
                  textAlign: "center",
                  textShadow: "2px 2px 5px black",
                }}
              >
                {galleryName} 미술관
              </h2>
            </div>
          </header>
          <div className={styles.container}>
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
                  display: "inline",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  fontSize: "1.5rem",
                  width: "100%",
                  height: "80%",
                }}
              >
                <p
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: "1.3rem",
                    marginLeft: "7%",
                  }}
                >
                  화가 이름을 입력해주세요 !
                </p>
                <div className={"btnZone"}>
                  <button
                    className={"failBtn"}
                    onClick={() => {
                      setFailModal(false);
                    }}
                  >
                    확인
                  </button>
                </div>
              </div>
            </Modal>
            <SaveModal
              modalOpen={modalOpen}
              saveImage={saveImage}
              setModalOpen={setModalOpen}
              userToken={String(userToken)}
              drawer={String(drawer)}
              setLoading={setLoading}
            ></SaveModal>
            <div className={styles.content}>
              <div className={"inputZone"}>
                <input
                  value={drawer}
                  onChange={(e) => setDrawer(e.target.value)}
                  className={"drawerInput"}
                  spellCheck={false}
                  maxLength={6}
                ></input>
                {"      "}님의 그림
              </div>
              <div>
                <canvas
                  width={windowSize.width > 500 ? 430 : windowSize.width / 1.2}
                  height={windowSize.width > 500 ? 430 : windowSize.width / 1.2}
                  ref={canvasRef}
                  className={styles.myCanvas}
                  onMouseDown={(event) => {
                    setDown(true);
                    setUp(false);
                  }}
                  onMouseMove={(event) => {
                    canvasMouseEventListener(event, "move");
                  }}
                  onMouseLeave={(event) => {
                    canvasMouseEventListener(event, "leave");
                    setDown(false);
                    setUp(true);
                  }}
                  onMouseUp={(event) => {
                    canvasMouseEventListener(event, "Up");
                    setDown(false);
                    setUp(true);
                  }}
                  onTouchStart={(event) => {
                    setDown(true);
                    setUp(false);
                  }}
                  onTouchMove={(event) => {
                    canvasTouchEventListener(event, "move");
                  }}
                  onTouchEnd={(event) => {
                    canvasTouchEventListener(event, "leave");
                    setDown(false);
                    setUp(true);
                  }}
                ></canvas>
              </div>
              <div className={styles.optionZone}>
                <div className={styles.strokeZone}>
                  <div className={styles.colorZone}>
                    <p>색상 : </p>

                    {"   "}
                    <div
                      className={styles.swatch}
                      onClick={() => {
                        if (isStroke) setPickerOpen(true);
                      }}
                    >
                      <div
                        style={{
                          width: "1rem",
                          height: "1.1rem",
                          borderRadius: "2px",
                          backgroundColor: pickerColor,
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.widthZone}>
                    {pickerOpen ? (
                      <Picker
                        setPickerOpen={setPickerOpen}
                        pickerColor={pickerColor}
                        pickerChange={pickerChange}
                      ></Picker>
                    ) : (
                      <>
                        <div className="strokeDiv">
                          <p>{strokeWidth}</p>
                        </div>

                        <input
                          className={styles.rangeStyle}
                          ref={rangeRef}
                          min={0}
                          max={20}
                          onChange={() => {
                            if (rangeRef.current)
                              changeWidth(rangeRef.current.value);
                          }}
                          type="range"
                        ></input>
                      </>
                    )}
                  </div>
                </div>

                <div className={styles.btnZone}>
                  <button className={styles.btn} onClick={() => clearCanvas()}>
                    <FaTrashAlt size="1.1rem" color="#cd5c5c" />
                  </button>
                  <button
                    className={styles.btn}
                    onClick={() => {
                      setIsStroke(!isStroke);
                    }}
                  >
                    {isStroke ? (
                      <FaPaintBrush size="1.1rem" color="#cd5c5c" />
                    ) : (
                      <FaEraser size="1.1rem" color="#cd5c5c" />
                    )}
                  </button>
                  <button className={styles.btn} onClick={() => undo()}>
                    <FaUndoAlt size="1.1rem" color="#cd5c5c" />
                  </button>
                  <button
                    className={styles.btn}
                    onClick={() => {
                      if (drawer.length <= 0) {
                        setFailModal(true);
                      } else {
                        setModalOpen(true);
                      }
                    }}
                  >
                    <FaSave size="1.1rem" color="#cd5c5c" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>
          {`
            p {
              margin-right: 10%;
              font-size: 1.5rem;
              text-align: center;
              color: #3e4356;
            }
            .inputZone {
              margin-top: 15%;
              font-size: 2rem;
              color: #3e4356;
              margin-bottom: 5%;
            }
            .drawerInput {
              width: 30%;
              height: 7%;
              font-size: 15px;
              border: 0;
              border-radius: 8px;
              outline: none;
              padding-left: 10px;
              background-color: rgba(255, 255, 255, 0.5);
              color: #494949;
              text-align: center;
              font-size: 2rem;
              font-family: "KOTRAHOPE", cursive;
            }
            .strokeDiv {
              width: 15%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
            }
            div {
            }
            .failBtn {
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
              margin-bottom: 20%;
            }
            .btnZone {
              width: 100%;
              height: 80%;
              margintop: 10%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          `}
        </style>
      </div>
    </div>
  );
};
export const getServerSideProps = async (context: any) => {
  let userName: string = "";
  let userId: string = "";
  await axios
    .post(`${process.env.SERVER_URL}im/responseUserName`, {
      loginToken: `${context.params.id}`,
    })
    .then((res) => {
      userName = res.data.userName;
      userId = res.data.loginUserId;
    })
    .catch((err) => {
      console.error(err);
    });
  return {
    props: {
      userId: userId,
      galleryName: userName,
      userToken: context.params.id,
    },
  };
};
export default MyCanvas;
