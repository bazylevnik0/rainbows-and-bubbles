const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


let image_click_to_start = new Image();
    image_click_to_start.src = "./data/sprites/click-to-start.svg";
let image_logo = new Image();
    image_logo.src = "./data/sprites/logo.svg";

let check_click_to_start = false;
image_logo.onload = function(){
     
     let interval_click_to_start = setInterval( ()=>{
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 800, 600);
        ctx.drawImage(image_logo, 0, 0, 800, 600);
        if (check_click_to_start) {
            ctx.drawImage(image_click_to_start, 325, 500, 150, 20);
            check_click_to_start = false;
        } else {
            check_click_to_start = true;        
        }
     },500);
};