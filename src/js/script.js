window.$ = window.jQuery = require('jquery')

var socket = io.connect('http://localhost:3000')

var old_active_a = ".dashboard_a"
loadPage("../html/dashboard.html")

$(".nav a").click(function() {
    $(old_active_a).removeClass("nav_active")
    old_active_a = "." + $(this).attr("class")
    console.log(old_active_a)
    $(this).addClass("nav_active")
    if (old_active_a == ".dashboard_a") loadPage("../html/dashboard.html")
    else if (old_active_a == ".schedule_a") loadPage("../html/schedule.html")
    else if (old_active_a == ".sequencing_a") loadPage("../html/sequencing.html")
    else (console.log("Page invalid"))
})

function loadPage(page) {
    $(".content").load(page)
}