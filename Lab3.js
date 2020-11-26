function grid() {
    var total = 6;
    var colours = ["blue", "red", "green", "orange", "purple", "pink"];
    var colourChosen = {
        "blue": 0,
        "red": 0,
        "green": 0,
        "orange": 0,
        "purple": 0,
        "pink": 0
    };
    var elementPicked = null;
    var count = 0;
    var num = 0;
    for (i = 0; i < 6; i++) {
        for (j = 0; j < 6; j++) { 
            for (num = 0; num < 1; num = num) {
                var random = colours[Math.floor(Math.random() * colours.length)];
                if (colourChosen[random] != total){
                    num = 1;
                }
            }
            colourChosen[random]++;
            grid = document.createElement("grid");
            grid.style.width = "80px";
            grid.style.height = "80px";
            grid.style.background = random;
            grid.className = "cell";
            grid.style.border ="solid 2px black"
            grid.style.display = "inline-block";
            document.body.appendChild(grid);
            grid.addEventListener("click", function() {
                if (this.style.backgroundColor == "black") {
                    document.getElementById("colourDisplay").style.color = this.style.backgroundColor;
                    document.getElementById("colourDisplay").innerHTML = ("Colour had already been selected!");
                    this.style.backgroundColor = "black";
                    elementPicked = null;
                }
                else {
                    if (elementPicked == this){
                        document.getElementById("colourDisplay").style.color = "black";
                        document.getElementById("colourDisplay").innerHTML = "You cannot click the same square twice";
                        elementPicked = null;
                    }
                    else if (elementPicked == null) {
                        elementPicked = this;
                    }
                    else if (elementPicked.style.backgroundColor == this.style.backgroundColor) {
                        document.getElementById("colourDisplay").style.color = this.style.backgroundColor;
                        document.getElementById("colourDisplay").innerHTML = "The colour is " + this.style.backgroundColor;
                        this.style.backgroundColor = "black";
                        elementPicked.style.backgroundColor = "black";
                        elementPicked = null;
                        count = count + 2;
                    }
                    else {
                        document.getElementById("colourDisplay").style.color = "black";
                        document.getElementById("colourDisplay").innerHTML = "The 2 colours selected do not match";
                        elementPicked = null;
                    }
                } 
                if (count == 36){
                    stop_timer();
                    document.getElementById("format").innerHTML = "GAME OVER! TIME IS " +  hours + ":" + minutes + ":" + seconds;
                    document.getElementById("colourDisplay").style.visibility = "hidden";
                    document.getElementById("Btn").style.visibility = "hidden";
                }
            });     
        }
        document.body.appendChild(document.createElement("br"));
    }
    document.getElementById("Btn").style.visibility = "hidden";
}

var seconds = 0;
var minutes = 0;
var hours = 0;
var timer = -1;

function tick(){
    seconds++;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes == 60) {
        minutes = 0;
        hours++;
    }
    document.getElementById('format').innerHTML = hours + ':' + minutes + ':' + seconds;
}

function start() {
    tick();
    myTimer = setInterval(tick, 1000);
    timer = 1
}

function stop_timer() {
    if(timer != -1){
        clearInterval(timer)
        timer = -1
    }
}