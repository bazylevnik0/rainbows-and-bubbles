const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let sprites = {}; // temporary, need to clear before using
let scenes  = {}; // store permanently

let player = {
    memory: 1,
    focus : 1,
    imagination: 1
} // start skills