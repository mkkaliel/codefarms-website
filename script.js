/* ===========================================================
   CODEFARMS TECHNOLOGY LIMITED
   Official Website
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initNavigation();

    initReveal();

    initNetwork();

    initHeader();

});

/* ===========================================================
   MOBILE MENU
=========================================================== */

function initNavigation(){

    const btn = document.getElementById("menuButton");

    const menu = document.getElementById("menu");

    if(!btn || !menu) return;

    btn.onclick = () =>{

        if(menu.style.display==="flex"){

            menu.style.display="none";

        }else{

            menu.style.display="flex";

            menu.style.flexDirection="column";

            menu.style.position="absolute";

            menu.style.top="82px";

            menu.style.right="20px";

            menu.style.background="#08111d";

            menu.style.padding="25px";

            menu.style.borderRadius="14px";

            menu.style.boxShadow="0 20px 40px rgba(0,0,0,.35)";

        }

    };

}

/* ===========================================================
   HEADER EFFECT
=========================================================== */

function initHeader(){

    const header=document.querySelector(".header");

    window.addEventListener("scroll",()=>{

        if(window.scrollY>80){

            header.style.background="rgba(8,17,29,.95)";

            header.style.boxShadow="0 10px 30px rgba(0,0,0,.35)";

        }else{

            header.style.background="rgba(8,17,29,.72)";

            header.style.boxShadow="none";

        }

    });

}

/* ===========================================================
   SCROLL REVEAL
=========================================================== */

function initReveal(){

    const sections=document.querySelectorAll(".section,.card");

    sections.forEach(el=>{

        el.classList.add("fade");

    });

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:.15

    });

    sections.forEach(el=>observer.observe(el));

}

/* ===========================================================
   HERO NETWORK ANIMATION
=========================================================== */

function initNetwork(){

    const holder=document.getElementById("networkCanvas");

    if(!holder) return;

    const canvas=document.createElement("canvas");

    holder.appendChild(canvas);

    const ctx=canvas.getContext("2d");

    let w,h;

    let particles=[];

    function resize(){

        w=holder.offsetWidth;

        h=holder.offsetHeight;

        canvas.width=w;

        canvas.height=h;

    }

    window.addEventListener("resize",resize);

    resize();

    class Particle{

        constructor(){

            this.reset();

        }

        reset(){

            this.x=Math.random()*w;

            this.y=Math.random()*h;

            this.vx=(Math.random()-.5)*0.5;

            this.vy=(Math.random()-.5)*0.5;

            this.r=2+Math.random()*2;

        }

        update(){

            this.x+=this.vx;

            this.y+=this.vy;

            if(this.x<0||this.x>w) this.vx*=-1;

            if(this.y<0||this.y>h) this.vy*=-1;

        }

        draw(){

            ctx.beginPath();

            ctx.arc(this.x,this.y,this.r,0,Math.PI*2);

            ctx.fillStyle="rgba(96,165,250,.8)";

            ctx.fill();

        }

    }

    for(let i=0;i<55;i++){

        particles.push(new Particle());

    }

    function connect(){

        for(let a=0;a<particles.length;a++){

            for(let b=a+1;b<particles.length;b++){

                let dx=particles[a].x-particles[b].x;

                let dy=particles[a].y-particles[b].y;

                let dist=Math.sqrt(dx*dx+dy*dy);

                if(dist<150){

                    ctx.beginPath();

                    ctx.moveTo(

                        particles[a].x,

                        particles[a].y

                    );

                    ctx.lineTo(

                        particles[b].x,

                        particles[b].y

                    );

                    ctx.strokeStyle="rgba(37,99,235,"+

                        (1-dist/150)*0.25+

                        ")";

                    ctx.stroke();

                }

            }

        }

    }

    function animate(){

        ctx.clearRect(0,0,w,h);

        particles.forEach(p=>{

            p.update();

            p.draw();

        });

        connect();

        requestAnimationFrame(animate);

    }

    animate();

}

/* ===========================================================
   SMOOTH ACTIVE LINKS
=========================================================== */

document.querySelectorAll('a[href^="#"]').forEach(link=>{

    link.addEventListener("click",function(e){

        const id=this.getAttribute("href");

        if(id==="#") return;

        const target=document.querySelector(id);

        if(!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior:"smooth"

        });

    });

});

/* ===========================================================
   HERO BUTTON ANIMATION
=========================================================== */

document.querySelectorAll(".btn").forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.style.transform="translateY(-5px) scale(1.03)";

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.transform="";

    });

});

/* ===========================================================
   YEAR
=========================================================== */

const year=document.getElementById("year");

if(year){

    year.textContent=new Date().getFullYear();

}

console.log("Codefarms website loaded successfully.");
