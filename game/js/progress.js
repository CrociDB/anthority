class Progress extends Widget{
    constructor(label, time, callback) {
        super();
        this.label = label;
        this.time = time | 1;
        this.value = 0;
        this.callback = callback;
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
        
        if (this.callback) {
            this.callback();
        }
        
        if (this.elem.parentNode) {
            this.elem.parentNode.removeChild(this.elem);
        }
    }
}
