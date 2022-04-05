const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

const colors = document.getElementsByClassName("controls__color");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 기본 배경 하얀색으로 설정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

//ctx.fillStyle = "green";
//ctx.fillRect(50, 20, 100, 49);   // 사각형 렌더링 CanvasRect.fillRect(x: number, y: number, w: number, h: number): void


let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event){
  console.log(event.target.style);
  console.log(event.target.style.backgroundColor);

  const backgroundColor = event.target.style.backgroundColor;
  ctx.strokeStyle = backgroundColor;
  ctx.fillStyle = backgroundColor;
}

function handleRangeChange(event){
  console.log(event.target.value);
  ctx.lineWidth = event.target.value;
}

function handleModeClick(){
  if (filling === true){
    filling = false;
    mode.innerText = "Fill";
  }else{
    filling = true;
    mode.innerText = "Paint";
    ctx.fillStyle = ctx.strokeStyle;
  }
}

function handleCanvasClickC(){
  if (filling === true){
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event){
  console.log(event);
  event.preventDefault();
}

function handleSaveClick(){
  const image = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = image;
  link.download = "image";  // 다운로드 파일명
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClickC);
  canvas.addEventListener("contextmenu", handleCM);     // 우클릭으로 나타나는 메뉴
}

console.log(colors);
console.log(Array.from(colors));

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range){
  range.addEventListener("input", handleRangeChange);
}

if (mode){
  mode.addEventListener("click", handleModeClick);
}

if (save){
  save.addEventListener("click", handleSaveClick);
}