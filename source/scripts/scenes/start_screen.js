// Create the common object for sprites
sprites = {};
sprites.loaded = false; // when all sprites inside loaded - it true

// Create sprites images (also trigger onload in the image object)
sprites.click_to_start = new SpriteImage("./data/sprites/start_screen/click-to-start.svg");
sprites.logo           = new SpriteImage("./data/sprites/start_screen/logo.svg"); 
sprites.background     = [];
sprites.background.timer = 0; // in array possible to set the common parameter as in object
for (let i = 0; i < 5; i++) {
    sprites.background[i] = new SpriteImage("./data/sprites/start_screen/background" + i + ".svg");
}

// Create the scene
scenes["start_screen"] = new GameScene("start_screen", sprites);

// Draw sprites and the game
scenes.start_screen.draw = function () {
     scenes.start_screen.sprites.interval = setInterval( ()=>{
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

scenes.start_screen.control_mouseclick = function (event) {
    clearInterval(scenes.start_screen.sprites.interval);
    scenes.start_screen.unload();
    scenes.character_screen.load();
}