let relaxAudio = new Audio("./src/relaxing.mp3");


let menu = {
    width: GAME.width / GAME.scale,
    height: GAME.height / GAME.scale,
    bgc: CSSVar("--headerColor"),
    textColor: CSSVar("--bgc"),
    textSize: 80,
    x: 0,
    y: 0,
    header: "Menu",
    padding: 40,
    opened: false,
    btnsStyle: {
        textColor: CSSVar("--headerColor"),
        bgc: CSSVar("--bgc"),
        height: 80,
        spaceBetween: 40
    },
    btns: [
        {
            text: "Начать",
            onclick: () => {
                start();
                menu.opened = false;
            },
        }, {
            text: "Перезагрузить",
            onclick: () => window.location.reload()
        }, {
            text: "Расслабиться",
            onclick: () => {
                if (relaxAudio.paused) {
                    relaxAudio.play()
                } else {
                    relaxAudio.pause()
                }
            }
        }
    ],
    setup() {
        let firstBtnY = 
            this.height / 2 
            - (this.btnsStyle.height + this.btnsStyle.spaceBetween) * this.btns.length / 2;
        for (let i = 0; i < this.btns.length; i++) {
            
            let onclick = this.btns[i].onclick;
            this.btns[i] = new Button(
                this.btns[i].text,
                this.padding,
                firstBtnY + (this.btnsStyle.spaceBetween + this.btnsStyle.height) * i,
                this.width / 2,
                this.btnsStyle.height,
                this.btnsStyle.textColor,
                this.btnsStyle.bgc,
                () => {
                    if (this.opened) {
                        onclick()
                    }
                }
            );
            this.btns[i].listenClick();
        }
    },
    draw(header=this.header) {
        ctx.fillStyle = menu.bgc;
        ctx.beginPath();
        ctx.rect(
            this.x, this.y,
            this.width, this.height,
        );
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = menu.textColor;
        ctx.font = `${this.textSize}px NokiaKokia`;
        ctx.fillText(
            header,
            this.padding, this.padding + this.textSize
        )
        
        for (let btn of this.btns) {
            btn.draw();
        }
        this.opened = true;
    }
}


class Button {
    constructor(text, x, y, width, height, color="black", bgc="white", onclick=()=>{}) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.bgc = bgc;
        this.padding = this.height / 4;
        this.onclick = onclick;
    }
    draw() {
        ctx.fillStyle = this.bgc;
        ctx.beginPath();
        ctx.roundRect(
            this.x,
            this.y,
            this.width,
            this.height,
            10
        )
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = this.color;
        ctx.font = `${this.height / 1.6}px NokiaKokia`;
        ctx.fillText(
            this.text, 
            this.x + this.padding, 
            this.y + this.height - this.padding
        );
    }
    listenClick() {
        canvas.addEventListener("click", (e) => this.listener(e));
    }
    listener(e) {
        let x = e.offsetX / GAME.scale, 
            y = e.offsetY / GAME.scale;
        if (this.contains(x, y)) {
            this.onclick();
        }
    }
    contains(x, y) {
        return this.x <= x && x <= this.x + this.width
            && this.y <= y && y <= this.y + this.height
    }
}
