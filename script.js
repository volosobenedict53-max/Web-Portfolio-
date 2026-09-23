const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

let particles = [];

let mouse = {
    x: null,
    y: null
};


function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();


window.addEventListener("resize", function() {

    resizeCanvas();
    createParticles();

});


window.addEventListener("mousemove", function(event) {

    mouse.x = event.clientX;
    mouse.y = event.clientY;

});


window.addEventListener("mouseout", function() {

    mouse.x = null;
    mouse.y = null;

});


class Particle {

    constructor() {

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 1.8 + 0.4;

        this.speedX = (Math.random() - 0.5) * 0.25;
        this.speedY = (Math.random() - 0.5) * 0.25;

        this.opacity = Math.random() * 0.4 + 0.1;

    }


    update() {

        this.x += this.speedX;
        this.y += this.speedY;


        if (this.x < 0 || this.x > canvas.width) {
            this.speedX *= -1;
        }


        if (this.y < 0 || this.y > canvas.height) {
            this.speedY *= -1;
        }


        if (mouse.x !== null && mouse.y !== null) {

            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;

            const distance = Math.sqrt(
                dx * dx + dy * dy
            );


            if (distance < 130) {

                const force = (130 - distance) / 130;

                this.x -=
                    (dx / distance) *
                    force *
                    0.35;

                this.y -=
                    (dy / distance) *
                    force *
                    0.35;

            }

        }

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            rgba(90, 155, 200, ${this.opacity});

        ctx.fill();

    }

}


function createParticles() {

    particles = [];

    const amount = Math.min(
        Math.floor(
            (canvas.width * canvas.height) / 17000
        ),
        90
    );


    for (let i = 0; i < amount; i++) {

        particles.push(
            new Particle()
        );

    }

}


function connectParticles() {

    for (let i = 0; i < particles.length; i++) {

        for (let j = i + 1; j < particles.length; j++) {

            const dx =
                particles[i].x -
                particles[j].x;

            const dy =
                particles[i].y -
                particles[j].y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);


            if (distance < 125) {

                const opacity =
                    0.12 *
                    (1 - distance / 125);


                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.strokeStyle =
                    rgba(80, 145, 190, ${opacity});

                ctx.lineWidth = 0.5;

                ctx.stroke();

            }

        }

    }

}


function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(function(particle) {

        particle.update();
        particle.draw();

    });


    connectParticles();

    requestAnimationFrame(animate);

}


createParticles();
animate();



const sections =
    document.querySelectorAll("section");

const navigationLinks =
    document.querySelectorAll(".navigation a");


const observer =
    new IntersectionObserver(
        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    navigationLinks.forEach(function(link) {

                        link.classList.remove("active");

                    });


                    const activeLink =
                        document.querySelector(
                            .navigation a[href="#${entry.target.id}"]
                        );


                    if (activeLink) {

                        activeLink.classList.add("active");

                    }

                }

            });

        },
        {
            threshold: 0.35
        }
    );


sections.forEach(function(section) {

    observer.observe(section);

});
