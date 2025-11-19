let __cssStyles = getComputedStyle(document.body);

function CSSVar(name) {
    return __cssStyles.getPropertyValue(name);
}


function degToRad(deg) {
    return deg * (Math.PI / 180.0);
}

function randInt(from, to) {
    return Math.round(
        Math.random() * (to - from)
    ) + from;
}

function loadImg(path) {
    let img = new Image();
    img.src = path;
    img.loaded = false;
    img.addEventListener("load", e => {
        img.loaded = true;
    });
    return img;
}
