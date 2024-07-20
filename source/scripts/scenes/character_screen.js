// Create the common object for sprites
sprites = {};
sprites.loaded = false; // when all sprites inside loaded - it true

// Create sprites images (also trigger onload in the image object)
sprites.text = new SpriteImage("./data/sprites/character_screen/text.svg");
sprites.plus = new SpriteImage("./data/sprites/character_screen/plus.svg");
sprites.plus_hover = new SpriteImage("./data/sprites/character_screen/plus_hover.svg");
sprites.plus_click = new SpriteImage("./data/sprites/character_screen/plus_click.svg");

// Create the scene
scenes["character_screen"] = new GameScene("character_screen", sprites);

let plus_state = "plus";
scenes.character_screen.draw = function () {
    scenes.character_screen.sprites.interval = setInterval( ()=>{
       ctx.fillStyle = "white";
       ctx.fillRect(0, 0, 800, 600);
       ctx.drawImage(scenes.character_screen.sprites.text.image, 0, 0, 800, 600);
       ctx.drawImage(scenes.character_screen.sprites[plus_state].image, 650, 130, 20, 20);
    },100);
};

scenes.character_screen.control_mousemove = function (event) {
    if ( (event.clientX-canvas.offsetLeft > 650 && event.clientX-canvas.offsetLeft < 670 ) && 
         (event.clientY-canvas.offsetTop  > 130 && event.clientY-canvas.offsetTop < 150 ) ) {
            plus_state = "plus_hover";
    } else  plus_state = "plus";
}

scenes.character_screen.control_mouseclick = function (event) {
    if ( (event.clientX-canvas.offsetLeft > 650 && event.clientX-canvas.offsetLeft < 670 ) && 
         (event.clientY-canvas.offsetTop  > 130 && event.clientY-canvas.offsetTop < 150 ) ) {
            plus_state = "plus_click";
            setTimeout(()=>plus_state="plus",250);
    }
}