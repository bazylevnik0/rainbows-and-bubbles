const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class GameScene {
    constructor (name, sprites) {
        this.name = name;
        this.sprites = sprites;
    }
    load   () {
        for (let sprite in this.sprites) {
            if (sprite.image) { // if it is a regular sprite
                sprite.image.onload = ()=> { // if loaded
                    sprite.loaded = true;    // set "the checker" as loaded
                }
            } else if (Array.isArray(sprite)) { // if it array of sprites
                for (let i = 0; i < sprite.length; i++) {
                    sprite[i].image.onload = ()=> { // if loaded
                        sprite.loaded = true;       // set "the checker" as loaded
                    }
                }
            }
          }
        
          // Check all sprites - are they loaded
          this.sprites.interval_load = setInterval(()=>{
            let check = true;
            for (let sprite in this.sprites) {
                if (sprite.image) { // if regular sprite
                    if (sprite.loaded == false) check = false;
                } else if (Array.isArray(sprite)) { // if 
                    for (let i = 0; i < sprite.length; i++) {
                        if (sprite[i].loaded == false) check = false;
                    }
                }
            } this.sprites.loaded = check;
        
            // If they loaded, finish the loading and start drawing the game
            if (this.sprites.loaded == true) {
                this.draw();
               clearInterval(this.sprites.interval_load);
            }
          },10); 
        
        // Attach control to the scene
        canvas.addEventListener("mousemove", this.control_mousemove);
    }
    draw   () {}
    control_mousemove (event) {
        console.log("mousemove");
    }
    unload () {
        canvas.removeEventListener("mousemove", control_mousemove);
    }
}

class SpriteImage {
    constructor (src) {
        this.image = new Image();
        this.image.src = src;
        this.timer = 0;
        this.shift = {x:0,y:0};
    }
}


// Create the common object for sprites
let sprites = {};
sprites.loaded = false; // when all sprites inside loaded - it true

// Create sprites images (also trigger onload in the image object)
sprites.click_to_start = new SpriteImage("./data/sprites/click-to-start.svg");
sprites.logo           = new SpriteImage("./data/sprites/logo.svg"); 
sprites.background     = [];
sprites.background.timer = 0; // in array possible to set the common parameter as in object
for (let i = 0; i < 5; i++) {
    sprites.background[i] = new SpriteImage("./data/sprites/background" + i + ".svg");
}


let scenes = {};
    scenes["start_screen"] = new GameScene("start_screen", sprites);

// Draw sprites and the game
scenes.start_screen.draw = function () {
     scenes.start_screen.sprites.logo.interval = setInterval( ()=>{
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 800, 600);
        ctx.drawImage(scenes.start_screen.sprites.background[scenes.start_screen.sprites.background.timer].image, 0, 0, 800, 600);
        ctx.drawImage(scenes.start_screen.sprites.logo.image, 0 + scenes.start_screen.sprites.logo.shift.x, 0  + scenes.start_screen.sprites.logo.shift.y, 800, 600);
        if (scenes.start_screen.sprites.click_to_start.timer >= 0 && scenes.start_screen.sprites.click_to_start.timer < 5) {
                ctx.drawImage(scenes.start_screen.sprites.click_to_start.image, 325, 500, 150, 20);
        }
        scenes.start_screen.sprites.click_to_start.timer++;
        scenes.start_screen.sprites.background.timer++;
        if (scenes.start_screen.sprites.click_to_start.timer > 10) scenes.start_screen.sprites.click_to_start.timer = 0;
        if (scenes.start_screen.sprites.background.timer > 4) scenes.start_screen.sprites.background.timer = 0;
     },100);
};


scenes.start_screen.control_mousemove = function (event) {
    if (event.clientX-canvas.offsetLeft > 400) {
        scenes.start_screen.sprites.logo.shift.x -= 1;
    } else scenes.start_screen.sprites.logo.shift.x += 1;
    if (event.clientY-canvas.offsetTop > 300) {
        scenes.start_screen.sprites.logo.shift.y -= 1;
} else scenes.start_screen.sprites.logo.shift.y += 1;
    if (scenes.start_screen.sprites.logo.shift.x >  10) scenes.start_screen.sprites.logo.shift.x =  10;
    if (scenes.start_screen.sprites.logo.shift.x < -10) scenes.start_screen.sprites.logo.shift.x = -10;
    if (scenes.start_screen.sprites.logo.shift.y >  5)  scenes.start_screen.sprites.logo.shift.y =  5;
    if (scenes.start_screen.sprites.logo.shift.y < -5)  scenes.start_screen.sprites.logo.shift.y = -5;
}

scenes.start_screen.load();