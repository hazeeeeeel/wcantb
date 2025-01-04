const container = document.getElementById("container");
const default_background = "./assets/background-3.png";
const buy_background = "./assets/";
const be_background = "";

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === "ArrowRight") {
        if (rightPressed == false) {
            container.style.backgroundImage = buy_background;
            rightPressed = true;
        }

    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        if (leftPressed == false) {
            container.style.backgroundImage = be_background;
            leftPressed = true;
        }

    }

}
function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}
