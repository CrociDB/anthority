class TimeInfo extends Widget{
    constructor(scheduler, timefunc) {
        super();
        this.scheduler = scheduler;
        this.timefunc = timefunc;
        this.init();
    }

    getHTML() {
        let str = "<div class=\"msghighlight\"></div>";
        return str;
    }

    init() {
        this.elem = cEl(this.getHTML());
        this.uc = this.update.bind(this);
        this.scheduler.addUpdateCallback(this.uc);
    }
    
    update() {
        let hours = Math.ceil(this.timefunc());

        if (hours <= 24) {
            this.elem.innerHTML = repltxt("This will take about <b>%1</b> hours.", [hours]);
        } else {
            let days = Math.floor(hours / 24);
            hours = Math.floor(hours % 24);
            this.elem.innerHTML = repltxt("This will take about <b>%1</b> days and <b>%2</b> hours.", [days, hours]);
        }
    }
    
    destroy() {
        this.scheduler.removeUpdateCallback(this.uc);
    }
}