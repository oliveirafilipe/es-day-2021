var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var step = 2 * Math.PI / 360;
var radius = 120;

var dragStart = false;
var angle = 0;
var speed = 7;
document.getElementById("svalue").innerHTML = speed;
ctx.strokeStyle = getComputedStyle(document.querySelector("#spinner")).color;
ctx.fillStyle = getComputedStyle(document.querySelector("body")).backgroundColor;
ctx.lineWidth = radius / 5.5;

function spin() {
    speed = 20;
}

function verifyorder() {
    var rawSpeed = document.getElementById('value').value.trim();
    if (!rawSpeed.match(/^[0-9]+$/)) return;
    speed = rawSpeed;
    document.getElementById("svalue").innerHTML = speed;
}


canvas.addEventListener('mousedown', function (event) {
  var clientX = event.clientX;
  var clientY = event.clientY;

  dragStart = { clientX: clientX, clientY: clientY };
});
canvas.addEventListener('touchstart', function (event) {
  dragStart = {
    clientX: event.touches[0].pageX,
    clientY: event.touches[0].pageY
  };
});
canvas.addEventListener('mousemove', function (event) {
  var clientX = event.clientX;
  var clientY = event.clientY;
  return dragStart && function () {
    updateSpeed(dragStart, { clientX: clientX, clientY: clientY });
    dragStart = { clientX: clientX, clientY: clientY };
  }();
});
canvas.addEventListener('touchmove', function (event) {
  return dragStart && function () {
    updateSpeed(dragStart, {
      clientX: event.touches[0].pageX,
      clientY: event.touches[0].pageY
    });
    dragStart = {
      clientX: event.touches[0].pageX,
      clientY: event.touches[0].pageY
    };
  }();
});
window.addEventListener('mouseup', function () {
  dragStart = false;
});
window.addEventListener('touchend', function () {
  dragStart = false;
});

function updateSpeed(startPos, endPos) {
  speed = (Math.atan2(startPos.clientX - (canvas.offsetLeft + canvas.width / 2), startPos.clientY - (canvas.offsetTop + canvas.height / 2)) - Math.atan2(endPos.clientX - (canvas.offsetLeft + canvas.width / 2), endPos.clientY - (canvas.offsetTop + canvas.height / 2))) * radius;
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  angle += step * speed;
  speed = Math.max(speed - 0.08, Math.min(speed + 0.08, 0));
  document.getElementById("svalue").innerHTML = Math.abs(Math.round(speed)).toString();

  for (var i = 0; i < 3; i++) {
    var x = canvas.width / 2 + radius * Math.sin(angle + i * (120 * step));
    var y = canvas.height / 2 - radius * Math.cos(angle + i * (120 * step));
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(x, y, radius / 2.5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, radius / 2.5, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();

  window.requestAnimationFrame(render);
}

render();
