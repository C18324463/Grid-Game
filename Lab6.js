$(document).ready(function() {
    $(".Btn").click( function() {
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
                grid.style.width = "90px";
                grid.style.height = "90px";
                grid.style.background = random;
                grid.className = "cell";
                grid.style.border ="solid 2px black";
                grid.style.display = "inline-block";
                document.body.appendChild(grid); 
                $("<div class='col-2'></div>").appendTo("#cell");
                grid.addEventListener("click", function() {
                    if (this.style.backgroundColor == "black") {
                        $("#colourDisplay").css("color", "black").html("Colour had already been selected!");
                        $(this).css("backgroundColor", "black");
                        elementPicked = null;
                    }
                    else {
                        if (elementPicked == this){
                            $("colourDisplay").css("color", "black").html("You cannot click the same square twice");
                            elementPicked = null;
                        }
                        else if (elementPicked == null) {
                            elementPicked = this;
                            $("#colourDisplay").css("color", this.style.backgroundColor).html("The colour is " + this.style.backgroundColor);
                        }
                        else if (elementPicked.style.backgroundColor == this.style.backgroundColor) {
                            $("#colourDisplay").css("color", this.style.backgroundColor).html("The colour is " + this.style.backgroundColor);
                            $(this).css("backgroundColor", "black");
                            $(elementPicked).css("backgroundColor", "black");
                            elementPicked = null;
                            count = count + 2;
                        }
                        else {
                            $("#colourDisplay").css("color", "black").html("The 2 colours selected do not match");
                        }
                    } 
                    if (count == 36){
                        $("#format").html("GAME OVER!"); 
                        var name = document.getElementById("Name").value;
                        console.log(name, hours, minutes, seconds); 
                        let resultsTable = `
                            <table id="resultsTable" class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Hour</th>
                                        <th scope="col">Minute</th>
                                        <th scope="col">Second</th>
                                    </tr>
                                </thead>
                                <tbody>`;
                                    resultsTable += `<tr> <td> ${name}</td>`
                                    resultsTable += `<td>${hours}</td>`
                                    resultsTable += `<td>${minutes}</td>`
                                    resultsTable += `<td>${seconds}</td></tr>`
                                    resultsTable += `
                                </tbody>
                            </table>`;
                            $(resultsTable).appendTo('#leadertable');
                        $("#colourDisplay").css("visibility", "hidden");
                        $("#Btn").css("visibility", "hidden");
                        stop_timer();
                    }
                });     
            }
            document.body.appendChild(document.createElement("br"));
        }
        $(".Btn").css("visibility", "hidden");
        $("#save").css("visibility", "hidden");
    })
    var seconds = 0;
    var minutes = 0;
    var hours = 0;
    var timer = -1;
    function tick(){
        if (timer == 1) {
            seconds++;
        }
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
    $(".Btn").click( function() {
        tick();
        myTimer = setInterval(tick, 1000);
        timer = 1;
    })
    function stop_timer() {
        if(timer != -1){
            clearInterval(myTimer);
            timer = -1;
        }
    }
})

