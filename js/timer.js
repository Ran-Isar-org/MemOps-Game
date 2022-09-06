var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
let inter

export function StartTimer() {
  inter = setInterval(setTime, 1000);
}

export function StopTimer() {
  clearInterval(inter);
  console.log("stop timer");
}

// isar todo
export function ResetTimer() {
}

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}



function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}