class Progress extends Widget{
    constructor(label, time) {
        super();
        this.label = label;
        this.time = time;
        this.value = 0;
        this.init();
    }

    getHTML() {
        let str = "<li id=\"wprog%1\" class=\"wprogress\"><p>%2</p><progress value=\"0\" max=\"1000\"></progress></li>";
        return str.replace("%1", this.index).replace("%2", this.label);
    }

    init(container) {
        this.elem = cEl(this.getHTML());

        this.container = container;
        this.prog = this.elem.querySelector("progress");
        this.interval = setInterval(this.update.bind(this), 10);
    }
    
    update() {
        this.value += 10 / this.time;
        this.prog.value = this.value;

        if (this.value > 1000) {
            this.destroy();
        }
    }

    destroy() {
        clearInterval(this.interval);
        
        if (this.elem.parentNode) {
            this.elem.parentNode.removeChild(this.elem);
        }
    }
}
