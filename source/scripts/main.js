const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


let image_click_to_start = new Image();
    image_click_to_start.src = "./data/sprites/click-to-start.svg";
let image_logo = new Image();
    image_logo.src = "./data/sprites/logo.svg";

let check_click_to_start = false;
let parameter_logo_x = 0;
let parameter_logo_y = 0;

canvas.addEventListener("mousemove", (event) => {
    console.log(event.clientX-canvas.offsetLeft);
    if(event.clientX-canvas.offsetLeft>400){
           parameter_logo_x -= 1;
    } else parameter_logo_x += 1;
    if(event.clientY-canvas.offsetTop>300){
        parameter_logo_y -= 1;
 } else parameter_logo_y += 1;
    if (parameter_logo_x >  10) parameter_logo_x =  10;
    if (parameter_logo_x < -10) parameter_logo_x = -10;
    if (parameter_logo_y >  5) parameter_logo_y =  5;
    if (parameter_logo_y < -5) parameter_logo_y = -5;
});
let i = 0;
image_logo.onload = function(){
     
     let interval_click_to_start = setInterval( ()=>{
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 800, 600);
        ctx.drawImage(image_logo, 0 + parameter_logo_x, 0  + parameter_logo_y, 800, 600);
        if (i > 0 && i < 5) {
                ctx.drawImage(image_click_to_start, 325, 500, 150, 20);
        }
        i++;
        if (i > 10) i = 0;
     },100);
};