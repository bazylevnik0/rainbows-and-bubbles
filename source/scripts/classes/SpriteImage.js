class SpriteImage {
    constructor (src) {
        this.image = new Image();
        this.image.src = src;
        this.timer = 0;
        this.shift = {x:0,y:0};
        this.loaded = false;
    }
}