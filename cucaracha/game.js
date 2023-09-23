let GAME = {
    width: 800,
    height: 500,
    scale: 0.5,
    bgc: "#444",
    img: new Image(),
    border: {
        color: "#000",
        width: 5
    },
    setup() {
        this.img.src = "./floor.jpg";
        this.img.loaded = false;
        this.img.addEventListener("load", e => {
            this.img.loaded = true;
        });
    },
    draw() {
        ctx.fillStyle = this.bgc;
        ctx.lineWidth = this.border.width;
        ctx.strokeStyle = this.border.color;
        if (this.img.loaded) {
            ctx.drawImage(
                this.img, 0, 0, 
                this.width / this.scale, 
                this.height / this.scale,
            );
        } else {
            ctx.fillRect(
                0, 0, 
                this.width / this.scale, 
                this.height / this.scale,
            );
        }
    },
    clear() {
        ctx.clearRect(0, 0, this.width, this.height);
    }
}