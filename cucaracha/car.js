let CAR = {
    width: 40,
    height: 80,
    x: 100,
    y: 100,
    angle: 30,
    color: "red",
    fSpeed: 0,
    maxSpeed: 15,

    states: {
        forward: false,
        backward: false,
        right: false,
        left: false,
    },
    img: new Image(),
    setup() {
        this.img.src = "./cucaracha.png";
        this.img.loaded = false;
        this.img.addEventListener("load", e => {
            this.img.loaded = true;
        });
    },
    draw() {
        ctx.save();

        ctx.fillStyle = this.color;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle * Math.PI / 180);
        // ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
        
        ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width * 2, this.height * 1.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    },
    update() {
        this.fSpeed += (this.states.forward - this.states.backward) / 1.2;
        this.y += -this.fSpeed * Math.cos(degToRad(this.angle));
        this.x += this.fSpeed * Math.sin(degToRad(this.angle));

        this.angle += (this.states.right - this.states.left) * Math.abs(this.fSpeed) / 4;
        
        if (this.states.forward == this.states.backward && this.fSpeed) {
            this.fSpeed -= Math.sign(this.fSpeed) * 2;
        }
        
        if (Math.abs(this.fSpeed) > this.maxSpeed) {
            this.fSpeed = this.maxSpeed * Math.sign(this.fSpeed);
        }
    },
    addEventListeners() {
        window.addEventListener("keydown", e => {
            console.log(3)
            switch (e.key.toUpperCase()) {
                case "W":
                    this.states.forward = true;
                    break;
                case "S":
                    this.states.backward = true;
                    break;
                case "A":
                    this.states.left = true;
                    break;
                case "D":
                    this.states.right = true;
                    break;
            }
        });
        window.addEventListener("keyup", e => {
            console.log(3)
            switch (e.key.toUpperCase()) {
                case "W":
                    this.states.forward = false;
                    break;
                case "S":
                    this.states.backward = false;
                    break;
                case "A":
                    this.states.left = false;
                    break;
                case "D":
                    this.states.right = false;
                    break;
            }
        });
    }
}