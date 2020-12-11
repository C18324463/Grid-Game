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
                        $("#colourDisplay").css("visibility", "hidden");
                        $("#Btn").css("visibility", "hidden");
                        stop_timer();
                        const data = {
                            email: $('#Email')[0].value,
                            name: $('#Name')[0].value,
                            score: parseInt(String(hours) + String(minutes) + String(seconds))
                        }
                        $("#format").css("color", "Black").html("Well Done " + $('#Name')[0].value + "!, you scored " + parseInt(String(hours) + String(minutes) + String(seconds)));
                        const post = $.post('http://localhost:3000/board', data);
                        post.done(buildBoard);
                        post.fail(displayErrorMsg);
                    }
                });     
            }
            document.body.appendChild(document.createElement("br"));
        }
        $(".Btn").css("visibility", "hidden");
        $("#save").css("visibility", "hidden");
        $("#mail").css("visibility", "hidden");
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
    function buildBoard(rows, status, xhr) {
        var name = document.getElementById("Name").value;
        var email = document.getElementById("Email").value;
        var score = parseInt(String(hours) + String(minutes) + String(seconds));

        const data = {
            name: $('#Name')[0].value,
            email: $('#Email')[0].value,
            score: parseInt(String(hours) + String(minutes) + String(seconds))
        }

        console.log(data); 
        console.log(rows[1]);
        let resultsTable = `
            <table id="resultsTable" class="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Score</th>
                    </tr>
                </thead>
            <tbody>`;
            for (let i=0; i<5; i++){
                if (JSON.stringify(rows[i]) == JSON.stringify(data)){
                    resultsTable += `<tr style="background-color:chartreuse;"> <td> ${rows[i].name}</td>`;
                    resultsTable += `<td>${rows[i].email}</td>`;
                    resultsTable += `<td>${rows[i].score}</td>`;
                    console.log("wtf");
                }
                else{
                    resultsTable += `<tr> <td> ${rows[i].name}</td>`;
                    resultsTable += `<td>${rows[i].email}</td>`;
                    resultsTable += `<td>${rows[i].score}</td>`;
                }
                resultsTable += `</tr>`
            }
            resultsTable += 
            `</tbody>
        </table>`;
        $(resultsTable).appendTo('#leaderboard');

    }

    function displayErrorMsg(response, status, xhr) {
        console.log(response);
        const errors = response.responseJSON.errors;
        for (let i = 0; i < errors.length; i++) {
            $(`<div>${JSON.stringify(errors[i])}</div>`).appendTo('.container');
        }
    }
    /*
    $('#form').validate({
        rules: {
            name: {
                required: true,
                minlength: 3,
                maxlength: 50
            },
            email: {
                required: true,
                minlength: 3,
                maxlength: 50
            },
        },
        messages: {
            name: {
                required: 'Name must be 3 or more letters and less than 50.',
            },
            email: {
                required: 'Email must be 3 or more letters and less than 50.',
            },
        },
        submitHandler: createAjaxPostUser
    });
    
    function createAjaxPostUser() {
        const data = {
            email: $('#Email')[0].value,
            name: $('#Name')[0].value,
            score: parseInt(String(hours) + String(minutes) + String(seconds))
        }
        const post = $.post('http://localhost:3000/board', data);
        post.done(buildBoard);
        post.fail(displayErrorMsg);
    }
    */
})
