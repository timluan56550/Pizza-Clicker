let score=0;
let amountPerClick=1;
let combo=0;
let multiplier=1;
let isComboLocked=false;
const pizzaImage=document.getElementById("pizza")
const targetImage=document.getElementById("target")
const scoreDisplay=document.getElementById("score")
const comboDisplay=document.getElementById("combo")
const multiplierDisplay=document.getElementById("multiplier")
const lockCombo=document.getElementById("lockCombo");
//move target
function moveTarget(){
const randomUp = Math.floor(Math.random()*120)+80;
const randomLeft = Math.floor(Math.random()*140);
targetImage.style.top=randomUp+"px";
targetImage.style.left=randomLeft+"px";


}

//combo lock
lockCombo.addEventListener("click",function(){
isComboLocked=!isComboLocked;
if (isComboLocked){
    lockCombo.src="images/locked.png";
} else {
    lockCombo.src="images/unlock.png";
}

});

pizzaImage.addEventListener("click", function(e) {
if(!isComboLocked) {
    combo=0;
multiplier=1;
}
const gain=amountPerClick*multiplier;

score+=gain;
spawnFloatingText("+"+gain.toFixed(1), e.pageX,e.pageY);
updateUI();
});
function spawnFloatingText(text, x,y){
const popup=document.createElement("div");
popup.className="popup-text";
popup.textContent=text;
popup.style.left=x+"px"
popup.style.top=y+"px"
document.body.appendChild(popup);
setTimeout(()=>{
popup.remove();
},1000);
}



targetImage.addEventListener("click", function(e) {
e.stopPropagation();
if(!isComboLocked){
    combo+=1;
multiplier=1+Math.log(1+combo*0.1);

const gain=(amountPerClick*multiplier)
score+=gain;
spawnFloatingText("+"+gain.toFixed(1), e.pageX,e.pageY);
spawnFloatingText("(Combo x"+combo+")", e.pageX,e.pageY);
moveTarget();
updateUI();
}
});

function updateUI(){
scoreDisplay.textContent=score.toFixed(1);
comboDisplay.textContent=combo;
multiplierDisplay.textContent=multiplier.toFixed(2);


}
moveTarget();