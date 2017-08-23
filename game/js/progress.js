class Progress extends Widget{
    constructor(label) {
        super();
        this.label = label;
        this.value = 0;
    }

    getHTML() {
        let str = "<li id=\"wprog%1\" class=\"wprogress\"><p>%2</p><progress value=\"0\" max=\"100\"></progress></li>";
        return str.replace("%1", this.index).replace("%2", this.label);
    }

    init(container) {
        this.container = container;
        this.elem = qSel("#wprog" + this.index);
        this.prog = qSel("#wprog" + this.index + " progress");
        this.interval = setInterval(this.update.bind(this), 10);
    }
    
    update() {
        this.value += 0.05;
        this.prog.value = this.value;

        if (this.value > 100) {
            this.destroy();
        }
    }

    destroy() {
        clearInterval(this.interval);
        
        if (this.container) {
            this.container.removeChild(this.elem);
        }
    }
}
