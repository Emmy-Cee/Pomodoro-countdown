let timeValues = {
	eHour: document.querySelector(".hour"),
	eMinutes: document.querySelector(".minutes"),
	eSeconds: document.querySelector(".seconds")
};
let interval = "";
let startBtn = document.querySelector(".start-btn");
let resetBtn = document.querySelector(".reset-btn");
let sessionType = "work"; // "work" or "break"
let workDuration = 25 * 60; // 25 minutes in seconds
let shortBreakDuration = 5 * 60; // 5 minutes in seconds
let longBreakDuration = 15 * 60; // 15 minutes in seconds
let countdownTime = workDuration;
let sessionCount = 0;

function startCounting() {
	startBtn.innerHTML = "Stop";
	if (interval) {
		clearInterval(interval);
	}

	function timeFunction() {
		if (countdownTime <= 0) {
			clearInterval(interval);
			sessionCount++;
			if (sessionType === "work") {
				sessionType = sessionCount % 4 === 0 ? "LongBreak" : "shortBreak";
				countdownTime =
					sessionType === "LongBreak" ? longBreakDuration : shortBreakDuration;
			} else {
				sessionType = "work";
				countdownTime = workDuration;
			}
			startCounting();
			return;
		}

		let hour = Math.floor(countdownTime / 3600)
			.toString()
			.padStart(2, "0");
		let minutes = Math.floor(countdownTime / 60)
			.toString()
			.padStart(2, "0");
		let seconds = Math.floor(countdownTime % 60)
			.toString()
			.padStart(2, "0");
		timeValues.eHour.textContent = `${hour} :`;
		timeValues.eMinutes.textContent = ` ${minutes} :`;
		timeValues.eSeconds.textContent = ` ${seconds}`;
		countdownTime--;
	}

	interval = setInterval(timeFunction, 1000);
}

function stopCounting() {
	startBtn.innerHTML = "Start";
	clearInterval(interval);
	interval = null;
}

function click() {
	if (interval) {
		stopCounting();
	} else {
		startCounting();
	}
}

startBtn.addEventListener("click", click);

function resetCounting() {
	startBtn.innerHTML = "Start";
	if (interval) {
		clearInterval(interval);
	}
	interval = null;
	sessionType = "work";
	countdownTime = workDuration;
	timeValues.eHour.innerHTML = "00:";
	timeValues.eMinutes.innerHTML = "00:";
	timeValues.eSeconds.innerHTML = "00";
}

resetBtn.addEventListener("click", resetCounting);
