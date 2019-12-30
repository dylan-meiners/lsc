window.$ = window.jQuery = require('jquery')

var on_time = null

var socket = io.connect('http://localhost:3000')
socket.emit("message", "vj")

socket.on("message", function(sender, msg) {
    console.log("JAVASCRIPT CONSOLE MESSAGE: " + msg)
})

socket.on("update_on_time", function(sender, msg) {
    on_time = (msg == "true")
    console.log(on_time)
})

var old_active_a = ".dashboard_a"
loadPage("../html/dashboard.html")

$(document).ready(function() {
    setInterval(update, 1000)

    $(".nav a").click(function() {
        $(old_active_a).removeClass("nav_active")
        old_active_a = "." + $(this).attr("class")
        $(this).addClass("nav_active")
        if (old_active_a == ".dashboard_a") loadPage("../html/dashboard.html")
        else if (old_active_a == ".schedule_a") loadPage("../html/schedule.html")
        else if (old_active_a == ".sequencing_a") loadPage("../html/sequencing.html")
        else (console.log("Page invalid"))
    })
})

function loadPage(page) {
    $(".content").load(page, function() {setUpListeners(page)})
}

function setUpListeners(page) {
    if (page == "../html/dashboard.html") {}
    else if (page == "../html/schedule.html") {
        $(".time_selector").on("click", function() {
        }).focus(function() {
            $(this).parent().children("p").css("color", "#fff")
        }).blur(function() {
            $(this).parent().children("p").css("color", "#898989")
            //if value is not empty, and if value is an integer, and if value is 8 characters in length
            if ($(this).val() != "" && Number.isInteger(Number($(this).val())) && $(this).val().length == 8){
                socket.emit("message", "p" + "set_time" + "-" + $(this).attr("class").split(' ')[1] + "." + $(this).val())
            }
        })
    }
    else if (page == "../html/sequencing.html") {}
    else {console.log("Invalid page")}
}

function update() {
    socket.emit("message", "p" + "check_time" + "-")
}