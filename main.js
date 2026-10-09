let score=0;
let amountPerClick=1;
let combo=0;
let multiplier=1;
const pizzaImage=document.getElementById("pizza")
const targetImage=document.getElementById("target")
const scoreDisplay=document.getElementById("score")
const comboDisplay=document.getElementById("combo")
const multiplierDisplay=document.getElementById("multiplier")
//add combo code 

pizzaImage.addEventListener("click", function() {
score+=amountPerClick;
scoreDisplay.textContent=score;
});