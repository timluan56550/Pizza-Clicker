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
const popupStack = document.getElementById("popup-Stack")
//move target
function moveTarget(){
const randomUp = Math.floor(Math.random()*120)+80;
const randomLeft = Math.floor(Math.random()*140);
targetImage.style.top=randomUp+"px";
targetImage.style.left=randomLeft+"px";


}
//satisfying screen shake
function screenShake(){
const container= document.getElementById("pizzaStuff");
container.classList.remove("shake");
void container.offsetWidth;
container.classList.add("shake");
 setTimeout(()=>{
container.classList.remove("shake");

 },150 );
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
const isCrit=Math.random()<0.3;
const critMultiplier =isCrit ?10:1;

const pizzaRectangle=pizzaStuff.getBoundingClientRect();


const gain=amountPerClick*multiplier*critMultiplier;
score+=gain;
if(isCrit){
const topX=pizzaRectangle.left+pizzaRectangle.width/2-140;
const topY =pizzaRectangle.top+30;


spawnFloatingText("💥 CRITICAL 10x! +"+gain.toFixed(1), topX, topY, true);
screenShake();
}else{
  spawnPopupStack("+" + gain.toFixed(1));
}
updateUI();
});
function spawnPopupStack(text){
    const popup=document.createElement("div");
    popup.className="stackedPopup";
    popup.textContent=text;
    popupStack.appendChild(popup)
    setTimeout(() => {
        popup.remove();
    }, 1000);
}





function spawnFloatingText(text, x,y, isCrit=false, customStyle=""){
const popup=document.createElement("div");
popup.className = "popup-text" + (isCrit ? " crit" : "") +(customStyle?" "+customStyle:"");
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

const gain=(amountPerClick*multiplier*3)
score+=gain;

const pizzaRectangle=pizzaStuff.getBoundingClientRect();
spawnFloatingText("+"+gain.toFixed(1), e.pageX,e.pageY,false);
const bottomX=pizzaRectangle.left+(pizzaRectangle.width/2)-40;
const bottomY =pizzaRectangle.bottom +15;

spawnFloatingText("Combo x" + combo, bottomX, bottomY, false, "stationary-combo");
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