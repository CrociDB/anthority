class TimeInfo extends Widget{
    constructor(scheduler, timefunc) {
        super();
        this.scheduler = scheduler;
        this.timefunc = timefunc;
        this.init();
    }

    getHTML() {
        let str = "<div class=\"timeinfo\">This will take about <span>00</span> hours.</div>";
        return str;
    }

    init(container) {
        this.elem = cEl(this.getHTML());

        this.hour = this.elem.querySelector("span");
        this.uc = this.update.bind(this);
        this.scheduler.addUpdateCallback(this.uc);
    }
    
    update() {
        this.hour.innerText = fmt(Math.ceil(this.timefunc()), "00");
    }
    
    destroy() {
        this.scheduler.removeUpdateCallback(this.uc);
    }
}