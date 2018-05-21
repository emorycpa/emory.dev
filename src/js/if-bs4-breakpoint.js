function checkIfBlock(s) {
    var s = "block" == $(s).css("display");
    return s
}

function checkSize() {
    xs = checkIfBlock(".breakpoint-check .xs"), sm = checkIfBlock(".breakpoint-check .sm"), md = checkIfBlock(".breakpoint-check .md"), lg = checkIfBlock(".breakpoint-check .lg"), xl = checkIfBlock(".breakpoint-check .xl"), console.clear(), 1 == xs && (breakpoint = "xs - <576px", console.log(breakpoint), $("body").removeClass("xs sm md lg xl").addClass("xs")), 1 == sm && (breakpoint = "sm - ≥576px", console.log(breakpoint), $("body").removeClass("xs sm md lg xl").addClass("sm")), 1 == md && (breakpoint = "md - ≥768px", console.log(breakpoint), $("body").removeClass("xs sm md lg xl").addClass("md")), 1 == lg && (breakpoint = "lg - ≥992px", console.log(breakpoint), $("body").removeClass("xs sm md lg xl").addClass("lg")), 1 == xl && (breakpoint = "xl - ≥1200px", console.log(breakpoint), $("body").removeClass("xs sm md lg xl").addClass("xl"))
}
var xs, sm, md, lg, xl, breakpoint;
$(document).ready(function () {
    $("body").append("<div style='display:none;' class='breakpoint-check'><span class='xs d-block d-sm-inline'></span><span class='sm d-sm-block d-md-inline'></span><span class='md d-md-block d-lg-inline'></span><span class='lg d-lg-block d-xl-inline'></span><span class='xl d-xl-block'></span></div>"), checkSize()
}), $(window).resize(function () {
    checkSize()
});