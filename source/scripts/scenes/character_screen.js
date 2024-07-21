// Create the common object for sprites
sprites = {};
sprites.loaded = false; // when all sprites inside loaded - it true

// Create sprites images (also trigger onload in the image object)
sprites.text = new SpriteImage("./data/sprites/character_screen/text.svg");
sprites.char1 = new SpriteImage("./data/sprites/character_screen/char1.svg");
sprites.char2 = new SpriteImage("./data/sprites/character_screen/char2.svg");
sprites.plus = new SpriteImage("./data/sprites/character_screen/plus.svg");
sprites.plus_hover = new SpriteImage("./data/sprites/character_screen/plus_hover.svg");
sprites.plus_click = new SpriteImage("./data/sprites/character_screen/plus_click.svg");
sprites.number0 = new SpriteImage("./data/sprites/common/numbers/0.svg");
sprites.number1 = new SpriteImage("./data/sprites/common/numbers/1.svg");
sprites.number2 = new SpriteImage("./data/sprites/common/numbers/2.svg");
sprites.number3 = new SpriteImage("./data/sprites/common/numbers/3.svg");
sprites.number4 = new SpriteImage("./data/sprites/common/numbers/4.svg");
sprites.number5 = new SpriteImage("./data/sprites/common/numbers/5.svg");
sprites.number6 = new SpriteImage("./data/sprites/common/numbers/6.svg");
sprites.number7 = new SpriteImage("./data/sprites/common/numbers/7.svg");
sprites.number8 = new SpriteImage("./data/sprites/common/numbers/8.svg");
sprites.number9 = new SpriteImage("./data/sprites/common/numbers/9.svg");

// Create the scene
scenes["character_screen"] = new GameScene("character_screen", sprites);

let player_memory_plus_state = "plus";
let player_focus_plus_state  = "plus";
let player_imagination_plus_state = "plus";

let i = 1;
scenes.character_screen.draw = function () {
    scenes.character_screen.sprites.interval = setInterval( ()=>{
       ctx.fillStyle = "white";
       ctx.fillRect(0, 0, 800, 600);
       ctx.drawImage(scenes.character_screen.sprites.text.image, 0, 0, 800, 600);
       ctx.drawImage(scenes.character_screen.sprites[player_memory_plus_state].image, 575, 50, 75, 75);
       ctx.drawImage(scenes.character_screen.sprites["number"+player.memory].image, 535, 60, 30, 40);
       ctx.drawImage(scenes.character_screen.sprites[player_focus_plus_state].image, 575, 110, 75, 75);
       ctx.drawImage(scenes.character_screen.sprites["number"+player.focus].image, 535, 125, 30, 40);
       ctx.drawImage(scenes.character_screen.sprites[player_imagination_plus_state].image, 575, 170, 75, 75);
       ctx.drawImage(scenes.character_screen.sprites["number"+player.imagination].image, 535, 190, 30, 40);
       if (i == 1) {
         ctx.drawImage(scenes.character_screen.sprites.char1.image, 288, 280, 225, 300);
         i = 2;
       } else if (i == 2) {
         ctx.drawImage(scenes.character_screen.sprites.char2.image, 288, 280, 225, 300);
         i = 1; 
       }
    },100);
};

scenes.character_screen.control_mousemove = function (event) {
    // Memory
    if ( (event.clientX-canvas.offsetLeft > 575 && event.clientX-canvas.offsetLeft < 650 ) && 
         (event.clientY-canvas.offsetTop  > 50 && event.clientY-canvas.offsetTop < 110 ) ) {
            player_memory_plus_state = "plus_hover";
    } else  player_memory_plus_state = "plus";
    // Focus
    if ( (event.clientX-canvas.offsetLeft > 575 && event.clientX-canvas.offsetLeft < 650 ) && 
     (event.clientY-canvas.offsetTop  > 110 && event.clientY-canvas.offsetTop < 170 ) ) {
        player_focus_plus_state = "plus_hover";
    } else  player_focus_plus_state = "plus";
    // Imagination
    if ( (event.clientX-canvas.offsetLeft > 575 && event.clientX-canvas.offsetLeft < 650 ) && 
     (event.clientY-canvas.offsetTop  > 170 && event.clientY-canvas.offsetTop < 230 ) ) {
        player_imagination_plus_state = "plus_hover";
    } else  player_imagination_plus_state = "plus";
}

scenes.character_screen.control_mouseclick = function (event) {
    //Memory
    if ( (event.clientX-canvas.offsetLeft > 575 && event.clientX-canvas.offsetLeft < 650 ) && 
         (event.clientY-canvas.offsetTop  > 50 && event.clientY-canvas.offsetTop < 110 ) ) {
            player.memory++
            if (player.memory > 9) player.memory = 9;
            player_memory_plus_state = "plus_click";
            setTimeout(()=>player_memory_plus_state="plus",250);
    }
    // Focus
    if ( (event.clientX-canvas.offsetLeft > 575 && event.clientX-canvas.offsetLeft < 650 ) && 
     (event.clientY-canvas.offsetTop  > 110 && event.clientY-canvas.offsetTop < 170 ) ) {
        player.focus++
        if (player.focus > 9) player.focus = 9;
        player_focus_plus_state = "plus_click";
        setTimeout(()=>player_focus_plus_state="plus",250);
     }
    // Imagination
    if ( (event.clientX-canvas.offsetLeft > 575 && event.clientX-canvas.offsetLeft < 650 ) && 
    (event.clientY-canvas.offsetTop  > 170 && event.clientY-canvas.offsetTop < 230 ) ) {
        player.imagination++
        if (player.imagination > 9) player.imagination = 9;
        player_imagination_plus_state = "plus_click";
        setTimeout(()=>player_imagination_plus_state="plus",250);
    }
}