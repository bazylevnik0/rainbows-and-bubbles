const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let sprites = {}; // temporary, need to clear before using
let scenes  = {}; // store permanently