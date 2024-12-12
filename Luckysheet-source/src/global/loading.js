export function showloading(txt) {
    $("#luckysheet-cell-loading").find("span").text(txt).end().show();
};

export function setloadingtext(txt) {
    $("#luckysheet-cell-loading").find("span").text(txt);
};

export function setloadingcolor(color) {
    $(".luckysheet-cell-loading-inner").css("color", color);
};

export function hideloading() {
    $("#luckysheet-cell-loading").hide();
};