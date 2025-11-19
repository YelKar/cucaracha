let SLIPPER = {
    x: -500,
    y: 0,
    xDefault: -500,
    yDefault: 0,
    radius: 200,
    currentRadius: 100,
    swingFramesCount: 40,
    hitSpeed: 140,
    color: "#950",
    img: loadImg("./src/slipper.png"),
    audio: new Audio("./src/slap.mp3"),
    currentHit: false,
    shadow: {
        x: 0,
        y: 0,
        radius: 0,
        swing(x, y, maxRadius, framesBeforeHit) {
            this.x = x;
            this.y = y;
            let radius = maxRadius * (1 - (Math.abs(framesBeforeHit) / SLIPPER.swingFramesCount));
            if (radius > 0) {
                this.radius = radius;
            } else {
                this.radius = 0;
            }
        },
        update() {
            if (SLIPPER.currentHit) {
                this.radius += this.radiusChange;
            }
        },
        draw() {
            ctx.fillStyle = "#0005";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    },
    setup() {
        
    },
    draw() {
        this.shadow.draw()
        if (this.img.loaded) {
            ctx.drawImage(
                this.img, 
                this.x - this.currentRadius, 
                this.y - this.currentRadius,
                this.currentRadius * 2,
                this.currentRadius * 4
            );
        } else {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.currentRadius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
        }
    },
    swing(x, y) {
        if (this.currentHit) {
            return;
        }
        this.currentHit = true;
        let framesBeforeHit = this.swingFramesCount;
        let xDirection = randInt(-1, 1);
        let g = () => {
            framesBeforeHit --;
            this.currentRadius = this.radius + Math.abs(framesBeforeHit) * this.hitSpeed / 1.8;
            this.x = x + Math.abs(framesBeforeHit) * this.hitSpeed * xDirection;
            this.y = y + Math.abs(framesBeforeHit) * this.hitSpeed;

            this.shadow.swing(x, y, this.radius, framesBeforeHit);

            if (Math.abs(framesBeforeHit) < this.swingFramesCount) {
                requestAnimationFrame(g);
            } else {
                this.currentHit = false;
            }
            if (framesBeforeHit == 0) {
                this.hit();
            }
        }
        g();
    },
    update() {
        
    },
    hit() {
        if (this.inside(Cockroach)) {
            Cockroach.hit()
        }
        this.audio.play();
    },
    inside(obj) {
        let distanceToCenter = Math.sqrt(
            Math.pow(Math.abs(this.x - obj.x), 2) +
            Math.pow(Math.abs(this.y - obj.y), 2)
        );
        return this.radius >= distanceToCenter;
    }
}