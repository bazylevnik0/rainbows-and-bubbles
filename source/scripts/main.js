const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class SpriteImage {
    constructor (src) {
        this.image = new Image();
        this.image.src = src;
    }
}

let click_to_start = new SpriteImage("./data/sprites/click-to-start.svg");
let logo = new SpriteImage("./data/sprites/logo.svg");

click_to_start.timer = 0;
logo.shift  = {};
logo.shift.x = 0;
logo.shift.y = 0;

canvas.addEventListener("mousemove", (event) => {
    if (event.clientX-canvas.offsetLeft > 400) {
           logo.shift.x -= 1;
    } else logo.shift.x += 1;
    if (event.clientY-canvas.offsetTop > 300) {
        logo.shift.y -= 1;
 } else logo.shift.y += 1;
    if (logo.shift.x >  10) logo.shift.x =  10;
    if (logo.shift.x < -10) logo.shift.x = -10;
    if (logo.shift.y >  5)  logo.shift.y =  5;
    if (logo.shift.y < -5)  logo.shift.y = -5;
});

logo.image.onload = function(){
     logo.interval = setInterval( ()=>{
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 800, 600);
        ctx.drawImage(logo.image, 0 + logo.shift.x, 0  + logo.shift.y, 800, 600);
        if (click_to_start.timer >= 0 && click_to_start.timer < 5) {
                ctx.drawImage(click_to_start.image, 325, 500, 150, 20);
        }
        click_to_start.timer++;
        if (click_to_start.timer > 10) click_to_start.timer = 0;
     },100);
};