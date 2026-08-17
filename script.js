/* ===========================================================
   CODEFARMS TECHNOLOGY LIMITED
   Website Interactions — Brand v2
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initNavigation();
    initReveal();
    initNetwork();
    initHeader();
    initYear();

});

/* MOBILE MENU */

function initNavigation(){

    const btn = document.getElementById("menuButton");
    const nav = document.querySelector(".header nav");

    if(!btn || !nav) return;

    btn.addEventListener("click", () => {

        nav.classList.toggle("mobile-open");

        btn.textContent = nav.classList.contains("mobile-open") ? "×" : "☰";

    });

    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("mobile-open");
            btn.textContent = "☰";

        });

    });

}

/* HEADER EFFECT */

function initHeader(){

    const header = document.querySelector(".header");

    if(!header) return;

    function updateHeader(){

        if(window.scrollY > 60){

            header.style.background = "rgba(4,12,8,.96)";
            header.style.boxShadow = "0 10px 32px rgba(0,0,0,.28)";

        }else{

            header.style.background = "rgba(6,16,13,.82)";
            header.style.boxShadow = "none";

        }

    }

    window.addEventListener("scroll", updateHeader, {passive:true});
    updateHeader();

}

/* SCROLL REVEAL */

function initReveal(){

    const items = document.querySelectorAll(
        ".section h2,.section-text,.card,.tech-grid span,.contact-box a,.philosophy-card"
    );

    items.forEach(el => el.classList.add("fade"));

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.classList.add("show");
                observer.unobserve(entry.target);

            }

        });

    }, {threshold:.12});

    items.forEach(el => observer.observe(el));

}

/* HERO NETWORK
   Now uses Codefarms green instead of the old blue.
*/

function initNetwork(){

    const holder = document.getElementById("networkCanvas");

    if(!holder) return;

    const canvas = document.createElement("canvas");
    holder.replaceChildren(canvas);

    const ctx = canvas.getContext("2d");

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];

    function resize(){

        w = holder.clientWidth;
        h = holder.clientHeight;

        canvas.width = Math.max(1, Math.floor(w * dpr));
        canvas.height = Math.max(1, Math.floor(h * dpr));

        canvas.style.width = w + "px";
        canvas.style.height = h + "px";

        ctx.setTransform(dpr,0,0,dpr,0,0);

    }

    window.addEventListener("resize", resize, {passive:true});
    resize();

    class Particle{

        constructor(){
            this.reset();
        }

        reset(){

            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = (Math.random() - .5) * .32;
            this.vy = (Math.random() - .5) * .32;
            this.r = 1.3 + Math.random() * 1.8;

        }

        update(){

            this.x += this.vx;
            this.y += this.vy;

            if(this.x < 0 || this.x > w) this.vx *= -1;
            if(this.y < 0 || this.y > h) this.vy *= -1;

        }

        draw(){

            ctx.beginPath();
            ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
            ctx.fillStyle = "rgba(105,239,103,.68)";
            ctx.fill();

        }

    }

    const particleCount = window.innerWidth < 700 ? 28 : 48;

    for(let i=0; i<particleCount; i++){
        particles.push(new Particle());
    }

    function connect(){

        for(let a=0; a<particles.length; a++){

            for(let b=a+1; b<particles.length; b++){

                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const dist = Math.sqrt(dx*dx + dy*dy);

                if(dist < 145){

                    const opacity = (1 - dist/145) * .18;

                    ctx.beginPath();
                    ctx.moveTo(particles[a].x,particles[a].y);
                    ctx.lineTo(particles[b].x,particles[b].y);
                    ctx.strokeStyle = `rgba(30,125,87,${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();

                }

            }

        }

    }

    function animate(){

        ctx.clearRect(0,0,w,h);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        connect();

        requestAnimationFrame(animate);

    }

    animate();

}

/* SMOOTH INTERNAL LINKS */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        const id = this.getAttribute("href");

        if(!id || id === "#") return;

        const target = document.querySelector(id);

        if(!target) return;

        e.preventDefault();

        const headerOffset = 76;
        const top =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            headerOffset;

        window.scrollTo({
            top,
            behavior:"smooth"
        });

    });

});

/* YEAR */

function initYear(){

    const year = document.getElementById("year");

    if(year){
        year.textContent = new Date().getFullYear();
    }

}

console.log("Codefarms brand v2 loaded.");
