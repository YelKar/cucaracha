let clumb = {
    x: -100,
    y: -100,
    defaultX: -100,
    defaultY: -100,
    radius: 30,
    color: "#0008",
    img: loadImg("./src/crumb.png"),
    draw() {
        if (this.img.loaded) {
            ctx.drawImage(
                this.img,
                this.x - this.radius,
                this.y - this.radius,
                this.radius * 2,
                this.radius * 2
            );
        } else {
            ctx.beginPath();
            ctx.arc(
                this.x, this.y, this.radius,
                0, Math.PI * 2
            );
            ctx.closePath();
            ctx.fill();
        }
    },
    update() {
        if (this.eat()) {  // remove clump from the floor
            Cockroach.health.score++;
            this.x = this.defaultX;
            this.y = this.defaultY;
        }
    },
    eat() {  // is cockroach touch the clumb
        let distanceToCenter = Math.sqrt(
            Math.pow(Math.abs(this.x - Cockroach.center.x), 2) +
            Math.pow(Math.abs(this.y - Cockroach.center.y), 2)
        );
        return this.radius * 2 >= distanceToCenter;
    },
    set() {  // put clump to the floor
        this.x = randInt(this.radius, GAME.width / GAME.scale - this.radius);
        this.y = randInt(this.radius, GAME.height / GAME.scale - this.radius);
    }
}