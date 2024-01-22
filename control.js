let clock = document.getElementById("clock");
let time = document.getElementById("time");
let tens = document.getElementById("tens");
let alarm = document.getElementById("alarm");
let container = document.getElementById("container");
let spans = document.querySelectorAll(".days > span");
let audio = document.getElementById("audio");
let setTimeoutAlarm;
Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

Date.prototype.addMinuts = function (m) {
  this.setTime(this.getTime() + m * 60 * 1000);
  return this;
};

Date.prototype.addSecond = function (s) {
  this.setTime(this.getTime() + s * 1000);
  return this;
};

setInterval(dateNow, 1000);

function dateNow() {
  let date = new Date();
  let hours = date.getHours();
  let minut = date.getMinutes();
  tens.innerHTML = hours >= 12 ? "PM" : "AM";
  if (hours > 12) hours = hours - 12;
  else if (hours == 0 && minut <= 1) {
    clearDays();
  } else if (hours == 0) hours = 12;
  spans[date.getDay() - 1].style.color = "#333";

  time.innerHTML = `${hours}: ${minut} :${date.getSeconds()}`;
}

function clearDays() {
  for (var i = 0, len = spans.length; i < len; i++) {
    spans[i].style.color = "#bbb";
  }
}

dateNow();

alarm.onclick = function () {
  let code_setAlarm = `
  <div id="set-alarm-form" class="set-alarm-form">
  <button class="btn btn-cancel" id="btn-cancel" onclick="cancelSetForm()" type="button">X</button>
    <h3>SET ALARM AFTER</h3>
    <div class="inputstime">
        <div class="hour">
            <label for="set-hour">HOURS</label>
            <input type="number" id="set-hour" value="0"  min="0" max="11">
        </div>
        <div class="minut">
            <label for="set-minut">MINUTS</label>
            <input type="number" id="set-minut" value="0"  min="0" max="59">
        </div>
        <div class="second">
            <label for="set-second">SECONDS</label>
            <input type="number" id="set-second" value="0"  min="0" max="59">
        </div>
    </div>
    <div class="btn-control">
        <button class="btn" id="btn-set" onclick="setAlarm()" type="button">Set</button>
        <button class="btn" id="btn-clear" onclick="clearAlarm()" type="button">Clear</button>
    </div>
    </div>`;

  container.insertAdjacentHTML("afterbegin", code_setAlarm);
};

function setAlarm() {
  let hour = document.getElementById("set-hour").value;
  let minut = document.getElementById("set-minut").value;
  let second = document.getElementById("set-second").value;
  let date1 = new Date();
  let date2 = new Date();
  date1.addHours(hour);
  date1.addMinuts(minut);
  date1.addSecond(second);
  alert(`You wake up after ${hour}h : ${minut}m : ${second}s `);
  let timeWake = Math.abs(date1.getTime() - date2.getTime());
  if (timeWake != 0) {
    setTimeoutAlarm = setTimeout(timeWakeUp, timeWake);
  }
}

function timeWakeUp() {
  audio.play();
}

function cancelSetForm() {
  let setForm = document.getElementById("set-alarm-form");
  setForm.remove();
}

function clearAlarm() {
  let hour = document.getElementById("set-hour");
  let minut = document.getElementById("set-minut");
  let second = document.getElementById("set-second");
  hour.value = "0";
  minut.value = "0";
  second.value = "0";
  alert(`You delete alarm`);
  clearTimeout(setTimeoutAlarm);
}
