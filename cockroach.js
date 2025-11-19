let Cockroach = {
    width: 80,
    height: 100,
    x: 0,
    y: 0,
    angle: 0,
    color: "red",
    fSpeed: 0,
    maxSpeed: 15,
    audio: new Audio("./src/run3.mp3"),
    get alive() {
        return this.health.score > 0;
    },
    get center() {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2,
        }
    },
    set center(val) {
        this.x = val.x - this.width / 2;
        this.y = val.y - this.height / 2;
    },
    health: {
        score: 0,
        default: 3,
        x: GAME.width / GAME.scale - 50,
        firstY: 50,
        radius: 30,
        color: "#0008",
        spaceBetween: 20,
        img: loadImg("./src/crumb.png")
    },
    actions: {
        forward: false,
        backward: false,
        right: false,
        left: false,
    },
    img: loadImg("./src/cockroach.png"),
    setup() {
        this.center = {
            x: (GAME.width / GAME.scale) / 2,
            y: (GAME.height / GAME.scale) / 2
        }
    },
    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle * Math.PI / 180);

        if (this.img.loaded) {
            ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
        } else {
            ctx.fillStyle = this.color;
            ctx.strokeStyle = "black";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
        ctx.restore();

        // drawHealth
        let health = this.health;
        for (let i = 0; i < this.health.score; i++) {
            if (this.health.img.loaded) {
                
                ctx.drawImage(
                    this.health.img,
                    health.x - health.radius,
                    health.firstY + i * (health.radius * 2 + health.spaceBetween) - health.radius,
                    health.radius * 2,
                    health.radius * 2
                );
            } else {
                ctx.fillStyle = this.health.color;
                ctx.beginPath();
                ctx.arc(
                    health.x, 
                    health.firstY + i * (health.radius * 2 + health.spaceBetween),
                    health.radius,
                    0, 2 * Math.PI
                )
                ctx.closePath();
                ctx.fill();
            }
        }
    },
    update() {
        this.fSpeed += (this.actions.forward - this.actions.backward);
        this.y += -this.fSpeed * Math.cos(degToRad(this.angle));
        this.x += this.fSpeed * Math.sin(degToRad(this.angle));


        if (
            this.center.x < 0 
            || this.center.y < 0
            || this.center.x > GAME.width / GAME.scale
            || this.center.y > GAME.height / GAME.scale
        ) {
            this.x -= this.fSpeed * Math.sin(degToRad(this.angle));
            this.y += this.fSpeed * Math.cos(degToRad(this.angle));
            this.fSpeed = 0;
        }

        this.angle += (this.actions.right - this.actions.left) * this.fSpeed / 4;
        
        if (this.actions.forward == this.actions.backward && this.fSpeed) {
            this.fSpeed -= Math.sign(this.fSpeed) * 2;
        }
        
        if (Math.abs(this.fSpeed) > this.maxSpeed) {
            this.fSpeed = this.maxSpeed * Math.sign(this.fSpeed);
        }
        if (this.audio.paused && Math.abs(this.fSpeed) > 1) {
            this.audio.play();
        } else if (!this.audio.paused && Math.abs(this.fSpeed) <= 1 || !this.alive) {
            this.audio.pause();
        }
    },
    addEventListeners() {
        window.addEventListener("keydown", e => {
            switch (e.code) {
                case "KeyW":
                    this.actions.forward = true;
                    break;
                case "KeyS":
                    this.actions.backward = true;
                    break;
                case "KeyA":
                    this.actions.left = true;
                    break;
                case "KeyD":
                    this.actions.right = true;
                    break;
                case "KeyK":
                    this.kill();
                    break;
            }
        });
        window.addEventListener("keyup", e => {
            switch (e.code) {
                case "KeyW":
                    this.actions.forward = false;
                    break;
                case "KeyS":
                    this.actions.backward = false;
                    break;
                case "KeyA":
                    this.actions.left = false;
                    break;
                case "KeyD":
                    this.actions.right = false;
                    break;
            }
        });
    },
    hit() {
        this.health.score --;
        if (!this.alive) {
            this.audio.pause();
        }
    },
    kill() {
        this.health.score = 0;
    },
    start() {
        this.health.score = this.health.default;
    },
}