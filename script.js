window.$ = window.jQuery = require('jquery')

var old_active_a = ".dashboard_a"
loadPage("dashboard.html")

$(".nav a").click(function() {
    $(old_active_a).removeClass("nav_active")
    old_active_a = "." + $(this).attr("class")
    console.log(old_active_a)
    $(this).addClass("nav_active")
    if (old_active_a == ".dashboard_a") loadPage("dashboard.html")
    else if (old_active_a == ".schedule_a") loadPage("schedule.html")
    else if (old_active_a == ".sequencing_a") loadPage("sequencing.html")
    else (console.log("Page invalid"))
})

function loadPage(page) {
    $(".content").load(page)
}