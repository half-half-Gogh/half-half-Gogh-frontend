import React, { useRef, useEffect, useState } from "react";
import { CirclePicker } from "react-color";
import styles from "../../styles/MyCanvas.module.css";
import Picker from "../../components/Picker";
import SaveModal from "../../components/SaveModal";
import axios from "axios";

const MyCanvas = () => {
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
  const array: { x: number; y: number }[] = [];
  const [nickName, setNickName] = useState("");
  useEffect(() => {
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
    context.lineJoin = "round";
    context.lineWidth = strokeWidth;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.fillStyle = "white";
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    setCtx(context);
    console.log(window.innerWidth, window.innerHeight);
  }, []);
  useEffect(() => {
    if (!ctx) return;
    ctx.lineJoin = "round";
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
    setPickerOpen(false);
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
    // const image = canvasRef.current.toDataURL("image/jpeg");
    // const link = document.createElement("a");

    // link.href = image;
    // link.download = "Paint";
    // link.click();
    canvasRef.current.toBlob(function (blob) {
      const formData = new FormData();
      formData.append("hello", blob!, "hello.png");

      // Post via axios or other transport method
      axios
        .post("https://alexjun12.loca.lt/im/upload", formData)
        .then(function (response) {
          console.log(response);
          axios.post("https://alexjun12.loca.lt/im/upload", {
            userid: response.data.userid,
            writername: response.data.writername,
          });
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
    }
  };
  const canvasTouchEventListener = (
    event: React.TouchEvent<HTMLCanvasElement>,
    type: string
  ) => {
    if (!ctx) return;
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
    }
  };
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <SaveModal
          modalOpen={modalOpen}
          saveImage={saveImage}
          setModalOpen={setModalOpen}
        ></SaveModal>
        <div className={styles.content}>
          <div className={"inputZone"}>
            <input
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              className={"nickNameInput"}
              spellCheck={false}
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
                    setPickerOpen(true);
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
                {pickerOpen ? (
                  <Picker
                    setPickerOpen={setPickerOpen}
                    pickerColor={pickerColor}
                    pickerChange={pickerChange}
                  ></Picker>
                ) : null}
              </div>
              <div className={styles.widthZone}>
                <div className="strokeDiv">
                  <p>{strokeWidth}</p>
                </div>

                <input
                  className={styles.rangeStyle}
                  ref={rangeRef}
                  onChange={() => {
                    if (rangeRef.current) changeWidth(rangeRef.current.value);
                  }}
                  type="range"
                ></input>
              </div>
            </div>

            <div className={styles.btnZone}>
              <button className={styles.btn} onClick={() => clearCanvas()}>
                초기화
              </button>
              <button
                className={styles.btn}
                onClick={() => {
                  setIsStroke(!isStroke);
                }}
              >
                {isStroke ? "지우개" : "붓"}
              </button>
              <button className={styles.btn} onClick={() => setModalOpen(true)}>
                그림 저장
              </button>
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
          }
          .inputZone {
            margin-top: 15%;
            font-size: 2rem;
            margin-bottom: 5%;
          }
          .nickNameInput {
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
        `}
      </style>
    </div>
  );
};
export default MyCanvas;
