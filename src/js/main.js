function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// color magenta #D23800 rgb(210, 56, 0)
// color cyan    #00C0C0 rgb(0, 192, 192)
// color gray    #00C0C0 rgb(192, 192, 192)

const canvas = document.getElementById('canvas');

const backgroundColorPicker = new iro.ColorPicker("#backgroundColorPicker", {
  width: 150,
  color: "rgb(192, 192, 192)",
  borderWidth: 1,
  borderColor: "#fff",
});
backgroundColorPicker.on(["color:init", "color:change"], function (color) {
  document.getElementById("backgroundRed").value = color.red;
  document.getElementById("backgroundGreen").value = color.green;
  document.getElementById("backgroundBlue").value = color.blue;
});
backgroundColorPicker.on(["color:change"], function (color) {
  draw();
});
document.getElementById("backgroundRed").addEventListener('change', function () {
  backgroundColorPicker.color.red = this.value;
});
document.getElementById("backgroundGreen").addEventListener('change', function () {
  backgroundColorPicker.color.green = this.value;
});
document.getElementById("backgroundBlue").addEventListener('change', function () {
  backgroundColorPicker.color.blue = this.value;
});

const topColorPicker = new iro.ColorPicker("#topColorPicker", {
  width: 150,
  color: "rgb(210, 56, 0)",
  borderWidth: 1,
  borderColor: "#fff",
});
topColorPicker.on(["color:init", "color:change"], function (color) {
  document.getElementById("topRed").value = color.red;
  document.getElementById("topGreen").value = color.green;
  document.getElementById("topBlue").value = color.blue;
});
topColorPicker.on(["color:change"], function (color) {
  draw();
})
document.getElementById("topRed").addEventListener('change', function () {
  topColorPicker.color.red = this.value;
});
document.getElementById("topGreen").addEventListener('change', function () {
  topColorPicker.color.green = this.value;
});
document.getElementById("topBlue").addEventListener('change', function () {
  topColorPicker.color.blue = this.value;
});

const bottomColorPicker = new iro.ColorPicker("#bottomColorPicker", {
  width: 150,
  color: "rgb(0, 192, 192)",
  borderWidth: 1,
  borderColor: "#fff",
});
bottomColorPicker.on(["color:init", "color:change"], function (color) {
  document.getElementById("bottomRed").value = color.red;
  document.getElementById("bottomGreen").value = color.green;
  document.getElementById("bottomBlue").value = color.blue;
});
bottomColorPicker.on(["color:change"], function (color) {
  draw();
})
document.getElementById("bottomRed").addEventListener('change', function () {
  bottomColorPicker.color.red = this.value;
});
document.getElementById("bottomGreen").addEventListener('change', function () {
  bottomColorPicker.color.green = this.value;
});
document.getElementById("bottomBlue").addEventListener('change', function () {
  bottomColorPicker.color.blue = this.value;
});

document.getElementById("initialDiameter").addEventListener('change', function () {
  draw();
});

document.getElementById("distance").addEventListener('change', function () {
  draw();
});

document.getElementById("deltaPx").addEventListener('change', function () {
  draw();
});

document.getElementById("rotate").addEventListener('change', function () {
  draw();
});

document.getElementById("button-show-settings-screen").addEventListener('click', function () {
  document.getElementById('settings-screen').style.display = "block";
  document.getElementById("test-screen-settings").style.visibility = "hidden";
  setCanvasSize();
});

document.getElementById("button-show-test-screen").addEventListener('click', function () {

  document.getElementById("deltaPx").value = 0;
  draw();

  document.getElementById('settings-screen').style.display = "none";
  document.getElementById('test-screen').style.display = "block";
  document.getElementById("test-screen-settings").style.visibility = "visible";
  setCanvasSize();
});

function draw() {
  const canvas = document.getElementById('canvas');
  const rotate = parseInt(document.getElementById("rotate").value);

  const offsetForAngle = {
    0: {
      x: 0,
      y: parseInt(document.getElementById("distance").value) / 2
    },
    90: {
      x: parseInt(document.getElementById("distance").value) / 2,
      y: 0
    },
    180: {
      x: 0,
      y: -parseInt(document.getElementById("distance").value) / 2
    },
    270: {
      x: -parseInt(document.getElementById("distance").value) / 2,
      y: 0
    },
  }


  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.fillStyle = backgroundColorPicker.color.rgbString;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = topColorPicker.color.rgbString;
    ctx.arc(canvas.width / 2 + offsetForAngle[rotate].x,
      canvas.height / 2 - offsetForAngle[rotate].y,
      document.getElementById("initialDiameter").value / 2,
      (Math.PI / 180) * (180
        + parseInt(document.getElementById("rotate").value)),
      (Math.PI / 180) * (0
        + parseInt(document.getElementById("rotate").value)),
      false);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = bottomColorPicker.color.rgbString;
    ctx.arc(canvas.width / 2 - offsetForAngle[rotate].x,
      canvas.height / 2 + offsetForAngle[rotate].y,
      document.getElementById("initialDiameter").value / 2 +
      parseInt(document.getElementById("deltaPx").value),
      (Math.PI / 180) * (0
        + parseInt(document.getElementById("rotate").value)),
      (Math.PI / 180) * (180
        + parseInt(document.getElementById("rotate").value)),
      false);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.lineWidth = 10;
    ctx.arc(canvas.width / 2,
      canvas.height / 2,
      10,
      (Math.PI / 180) * 0, (Math.PI / 180) * 360, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = backgroundColorPicker.color.rgbString;
    ctx.arc(canvas.width / 2,
      canvas.height / 2,
      5,
      (Math.PI / 180) * 0, (Math.PI / 180) * 360, false);
    ctx.fill();
  }
}

function setCanvasSize() {
  canvas.style.display = "none";
  canvas.width = canvas.parentNode.offsetWidth;
  canvas.height = canvas.parentNode.offsetHeight;
  canvas.style.display = "block";
  draw();
}

ready(() => {
  setCanvasSize();
  document.getElementById("test-screen-settings").style.visibility = "hidden";
});

window.addEventListener("resize", () => { setCanvasSize() });

document.addEventListener('keydown', function (event) {
  // const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"    

  // console.log(event.key);
  // console.log(event);

  // console.log(event.target);

  if (event.target.nodeName === "BODY") {
    const elem = document.getElementById("deltaPx");

    const up = () => {
      //console.log("up");
      elem.value = parseInt(elem.value)
        + parseInt(document.getElementById("stepDelta").value);
      draw();
    };

    const down = () => {
      //console.log("down");
      elem.value = parseInt(elem.value)
        - parseInt(document.getElementById("stepDelta").value)
      draw();
    };

    const callback = {
      "ArrowUp": up,
      "w": up,
      "W": up,
      "ArrowUp": up,
      "ArrowDown": down,
      "s": down,
      "S": down,
    }[event.key];
    callback?.();
  }

});

