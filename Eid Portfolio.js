window.onload = () => {
  setTimeout(() => {
    document.getElementById('splash').style.display='none';

    const photo = document.getElementById('front-photo');
    const form = document.getElementById('form-container');

    photo.style.opacity = '1';
    photo.style.transform = 'translateY(0)';

    form.style.display = 'block';
    setTimeout(()=>{
      form.style.opacity='1';
      form.style.transform='translateY(0)';
    },500);

  },3000);
};

// Fireworks
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize",()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let particles=[];
class Particle{
  constructor(x,y,color){
    this.x=x; this.y=y; this.color=color;
    this.radius=Math.random()*6;
    this.speedX=(Math.random()-0.5)*6;
    this.speedY=(Math.random()-0.5)*6;
    this.alpha=1;
    this.z=Math.random()*5;
  }
  update(){
    this.x+=this.speedX; this.y+=this.speedY;
    this.speedY+=0.05;
    this.alpha-=0.01;
  }
  draw(){
    ctx.globalAlpha=this.alpha;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius+this.z,0,Math.PI*2);
    ctx.fillStyle=this.color;
    ctx.fill();
  }
}
function createFirework(){
  let x=Math.random()*canvas.width;
  let y=Math.random()*canvas.height/2;
  let color=`hsl(${Math.random()*360},100%,50%)`;
  for(let i=0;i<50;i++){ particles.push(new Particle(x,y,color)); }
}
function animate(){
  ctx.fillStyle="rgba(0,0,0,0.2)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  particles.forEach((p,i)=>{
    if(p.alpha<=0) particles.splice(i,1);
    else p.update(),p.draw();
  });
  requestAnimationFrame(animate);
}
animate();
setInterval(createFirework,1000);

// Confetti
const confCanvas = document.getElementById("confetti");
const confCtx = confCanvas.getContext("2d");
confCanvas.width = window.innerWidth;
confCanvas.height = window.innerHeight;

let confettis = [];
class Confetti{
  constructor(){
    this.x = Math.random()*confCanvas.width;
    this.y = Math.random()*-confCanvas.height;
    this.size = Math.random()*10+5;
    this.speed = Math.random()*3+2;
    this.color = `hsl(${Math.random()*360},100%,50%)`;
  }
  update(){
    this.y += this.speed;
    if(this.y>confCanvas.height) this.y = -this.size;
  }
  draw(){
    confCtx.fillStyle=this.color;
    confCtx.fillRect(this.x,this.y,this.size,this.size);
  }
}
for(let i=0;i<150;i++) confettis.push(new Confetti());
function confettiAnimate(){
  confCtx.clearRect(0,0,confCanvas.width,confCanvas.height);
  confettis.forEach(c=>{ c.update(); c.draw(); });
  requestAnimationFrame(confettiAnimate);
}
confettiAnimate();

// Form logic
document.getElementById('submitBtn').addEventListener('click',showEidi);

function showEidi(){
  const name = document.getElementById('name').value.trim();
  const age = parseInt(document.getElementById('age').value);

  if(!name || isNaN(age)){
    alert("Enter valid details"); return;
  }

  document.getElementById('form-container').style.display='none';
  const resultDiv = document.getElementById('result');
  resultDiv.style.opacity='0';
  resultDiv.style.display='block';
  document.getElementById('eid-music').play("E:\assembly\WhatsApp Audio 2026-02-28 at 1.42.57 PM.mpeg");

  let html = `<h2>Abdullah ki taraf se Eid Mubarak ${name}! 🎉</h2>`;
  if(age>20){
    html+=`<p>Eidi do Bhai, jaldi karo 💸</p>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt4WNhzs9Sp4ce6jW6fSEdf1MEhCUpxK0nrA&s">`;
  } else {
    html+=`<p>Ya lo apni EIDI, Enjoy karo 💰</p>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0A7m9O0hKe56mc6shgmoAF_om_99nfMRiaQ&s">`;
  }


  
  html+=`<br><button onclick="showBlessing()">Something For You</button>`;
  resultDiv.innerHTML = html;

  setTimeout(()=>{ resultDiv.style.opacity='1'; },50);
}

function showBlessing(){
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML="<h2>Allah Pak apko hamesha khush rakhay aur apki zindagi khushiyon se bhar de.May this Eid bring joy, peace, and happiness to you and your loved ones Ameen 🌙✨</h2>";
  resultDiv.innerHTML += `<img class="flower" src="https://kalee.pk/wp-content/uploads/2025/03/Best-Flower-Shop-in-Karachi-kalee-pk-Flowers-Bouquet-1461_1742521567945.webp" alt="Flower">`;
  resultDiv.style.opacity='1';
}