class GameScene {
    constructor (name, sprites) {
        this.name = name;
        this.sprites = sprites;
    }
    load   () {
        // Set function when loaded sprites
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