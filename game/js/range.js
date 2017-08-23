class Range extends Widget{
    constructor(min, max, step, label) {
        super();
        this.min = min;
        this.max = max;
        this.val = Math.round((min + max) / 2);
        this.step = step;
        this.label = label;
    }

    getHTML() {
        let str = "<div id=\"range%1\" class=\"range\"><h1>%2</h1><div class=\"range-controls\"><a href=\"javascript:;\" class=\"button inline-button small-button\">-</a><span>0</span><a href=\"javascript:;\" class=\"button inline-button small-button\">+</a></div></div>";
        return str.replace("%1", this.index).replace("%2", this.label);
    }

    init() {
        this.valLabel = qSel("#range" + this.index + " span");
        qSel("#range" + this.index + " .button:first-child").onclick = this.less.bind(this);
        qSel("#range" + this.index + " .button:last-child").onclick = this.more.bind(this);
        this.update();
    }

    less() {
        this.val = clamp(this.val - this.step, this.min, this.max);
        this.update();
    }
    
    more() {
        this.val = clamp(this.val + this.step, this.min, this.max);
        this.update();
    }

    update() {
        this.valLabel.innerText = this.val;
    }
}
