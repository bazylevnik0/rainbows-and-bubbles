const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class SpriteImage {
    constructor (src) {
        this.image = new Image();
        this.image.src = src;
        this.timer = 0;
        this.shift = {x:0,y:0};
    }
}

let sprites = {};
    sprites.loaded = false;

sprites.click_to_start = new SpriteImage("./data/sprites/click-to-start.svg");
sprites.logo           = new SpriteImage("./data/sprites/logo.svg");
sprites.background     = [];
sprites.background.timer = 0;
for (let i = 0; i < 5; i++) {
    sprites.background[i] = new SpriteImage("./data/sprites/background" + i + ".svg");
}

canvas.addEventListener("mousemove", (event) => {
    if (event.clientX-canvas.offsetLeft > 400) {
        sprites.logo.shift.x -= 1;
    } else sprites.logo.shift.x += 1;
    if (event.clientY-canvas.offsetTop > 300) {
        sprites.logo.shift.y -= 1;
 } else sprites.logo.shift.y += 1;
    if (sprites.logo.shift.x >  10) sprites.logo.shift.x =  10;
    if (sprites.logo.shift.x < -10) sprites.logo.shift.x = -10;
    if (sprites.logo.shift.y >  5)  sprites.logo.shift.y =  5;
    if (sprites.logo.shift.y < -5)  sprites.logo.shift.y = -5;
});

function load () {
  for (let sprite in sprites) {
    if (sprite.image) {
        sprite.image.onload = ()=> {
            sprite.loaded = true; 
        }
    } else if (Array.isArray(sprite)) {
        for (let i = 0; i < sprite.length; i++) {
            sprite[i].image.onload = ()=> {
                sprite.loaded = true; 
            }
        }
    }
  }
    
  sprites.interval_load = setInterval(()=>{
    let check = true;
    for (let sprite in sprites) {
        if (sprite.image) {
            if (sprite.loaded == false) check = false;
        } else if (Array.isArray(sprite)) {
            for (let i = 0; i < sprite.length; i++) {
                if (sprite[i].loaded == false) check = false;
            }
        }
    } sprites.loaded = check;

    if (sprites.loaded == true) {
       draw();
       clearInterval(sprites.interval_load);
    }
  },10);
}
function draw (){
     sprites.logo.interval = setInterval( ()=>{
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 800, 600);
        ctx.drawImage(sprites.background[sprites.background.timer].image, 0, 0, 800, 600);
        ctx.drawImage(sprites.logo.image, 0 + sprites.logo.shift.x, 0  + sprites.logo.shift.y, 800, 600);
        if (sprites.click_to_start.timer >= 0 && sprites.click_to_start.timer < 5) {
                ctx.drawImage(sprites.click_to_start.image, 325, 500, 150, 20);
        }
        sprites.click_to_start.timer++;
        sprites.background.timer++;
        if (sprites.click_to_start.timer > 10) sprites.click_to_start.timer = 0;
        if (sprites.background.timer > 4) sprites.background.timer = 0;
     },100);
};
load();