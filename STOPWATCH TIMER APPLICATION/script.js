const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const millisecondsLabel = document.getElementById('milliseconds');

const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('resetBtn');

const lapList = document.getElementById('laplist');

//stopwatch variables

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;

//adding event listners

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

function startTimer(){
    interval = setInterval(updateTimer, 10);
    startButton.disabled = true;
}


function pauseTimer(){
    clearInterval(interval);
    //pauseButton.disabled = true;
    startButton.disabled = false;
}


function stopTimer(){
    clearInterval(interval);
    addToLapList();
    resetTimerData();
    startButton.disabled = false;
}


function resetTimer(){
    clearInterval(interval);
    resetTimerData();
   // resetTimerData.disabled = true;
    startButton.disabled = false;
}

function updateTimer () {
    milliseconds++;
    if(milliseconds===100){ // 1second = 1000milliseconds {but I am using 100 to end it quickly (HEHE I CAN CONTROL TIME😈)}
        milliseconds=0;
        seconds++;
        if (seconds===60){ //1 minute = 60Seconds 
            seconds=0;
            minutes++;
        }
    }
    displayTimer();

}

function displayTimer(){
    millisecondsLabel.textContent = padTime(milliseconds);
    secondsLabel.textContent = padTime(seconds);
    minutesLabel.textContent = padTime(minutes);
}

//function to make our time 2 digits

function padTime(time){
    return time.toString().padStart(2,'0');
}

//function to reset the timer

function resetTimerData(){
    minutes=0;
    seconds=0;
    milliseconds=0;
    displayTimer()
}

//function to make laplists

function addToLapList(){
    const lapTime = (`${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`);
    const listItem = document.createElement('li');
    listItem.innerHTML = (`<span>Lap ${lapList.childElementCount + 1}: </span> ${lapTime}`);
    lapList.appendChild(listItem);                      
}