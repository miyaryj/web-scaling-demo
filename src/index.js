import ClientPos from "./ClientPos";
import { systemRatioByResolution, systemRatioByFullscreen } from "./Ratio";
import RatioIndependentPos from "./RatioIndependentPos";
import WindowIndependentPos from "./WindowIndependentPos";
import RatioWindowIndependentPos from "./RatioWindowIndependentPos";
import RatioViewportIndependentPos, {
  setMouseEvent,
} from "./RatioViewportIndependentPos";

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth + window.scrollX;
canvas.height = window.innerHeight + window.scrollY;

const ctx = canvas.getContext("2d");
let w = canvas.width;
let h = canvas.height;
ctx.lineWidth = 0.5;
ctx.strokeStyle = "rgba(252, 17, 201, 1)";

const scalingForm = document.getElementById("scaling-form");
const ratioForm = document.getElementById("ratio-form");
const deviceWidth = document.getElementById("device-width");
let pos;

ratioForm.addEventListener("change", () => {
  const ratioOption = ratioForm.elements["ratio-option"].value;
  deviceWidth.disabled = ratioOption !== "resolution";
});

canvas.addEventListener("mouseup", (event) => {
  console.log(event.screenX, event.screenY);
  let systemRatio;
  const ratioOption = ratioForm.elements["ratio-option"].value;
  switch (ratioOption) {
    case "resolution":
      systemRatio = systemRatioByResolution(Number(deviceWidth.value));
      break;
    case "fullscreen":
      systemRatio = systemRatioByFullscreen();
      break;
  }

  const scalingOption = scalingForm.elements["scaling-option"].value;
  switch (scalingOption) {
    case "client":
      pos = new ClientPos(event.clientX, event.clientY);
      break;
    case "ratio":
      pos = new RatioIndependentPos(event.clientX, event.clientY, systemRatio);
      break;
    case "window":
      pos = new WindowIndependentPos(event.clientX, event.clientY, systemRatio);
      break;
    case "ratio-window":
      pos = new RatioWindowIndependentPos(
        event.clientX,
        event.clientY,
        systemRatio
      );
      break;
    case "ratio-viewport":
      pos = new RatioViewportIndependentPos(
        event.clientX,
        event.clientY,
        systemRatio
      );
      break;
  }
});

const draw = () => {
  if (pos) {
    const { x, y } = pos.restore();
    if (x != null && y != null) {
      ctx.clearRect(0, 0, w, h);
      ctx.beginPath();
      ctx.ellipse(x, y, 20, 20, 0, 0, Math.PI * 2);
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
  }
  window.requestAnimationFrame(draw);
};

window.requestAnimationFrame(draw);

window.addEventListener("mousemove", (event) => {
  setMouseEvent(event);
});

const requestFullscreen = document.getElementById("request-fullscreen");
requestFullscreen.addEventListener("click", () => {
  document.documentElement.requestFullscreen();
});

const exitFullscreen = document.getElementById("exit-fullscreen");
exitFullscreen.addEventListener("click", () => {
  document.exitFullscreen();
});
