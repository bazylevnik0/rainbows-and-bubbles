// Create the common object for sprites
sprites = {};
sprites.loaded = false; // when all sprites inside loaded - it true

// Create sprites images (also trigger onload in the image object)
sprites.text = new SpriteImage("./data/sprites/character_screen/text.svg");

// Create the scene
scenes["character_screen"] = new GameScene("character_screen", sprites);

scenes.character_screen.draw = function () {
    scenes.character_screen.sprites.interval = setInterval( ()=>{
       ctx.fillStyle = "white";
       ctx.fillRect(0, 0, 800, 600);
       ctx.drawImage(scenes.character_screen.sprites.text.image, 0, 0, 800, 600);
    },100);
};
