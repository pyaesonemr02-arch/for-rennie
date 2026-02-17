/* =========================================
   CONFETTI SYSTEM
========================================= */

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

class Confetti {
    constructor() {
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.size = Math.random()*8+2;
        this.speed = Math.random()*3+2;
        this.color = `hsl(${Math.random()*360},100%,70%)`;
    }

    update() {
        this.y += this.speed;
        if(this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.size,this.size);
    }
}

function triggerConfetti() {
    confetti = [];
    for(let i=0;i<150;i++) {
        confetti.push(new Confetti());
    }

    let duration = 3000;
    let start = Date.now();

    function animate() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        confetti.forEach(c=>{
            c.update();
            c.draw();
        });

        if(Date.now() - start < duration) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0,0,canvas.width,canvas.height);
        }
    }

    animate();
}