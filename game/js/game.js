class Game {
    constructor() {
        this.energy = 10;
        this.ants = 10;
        this.defense = 1.0;

        this.balance = new GameBalance();
        this.time = new TimeSchedule();
        this.time.addUpdateCallback(this.timeUpdate.bind(this));

        this.initUI();
        this.initMap();
    }
    
    initUI() {
        this.actionFindFood = gId("btnScout");
        this.actionHatchEggs = gId("btnHatch");
        this.actionBuildRoom = gId("btnBuildRoom");

        this.header = gId("header");
        this.labelEnergy = gId("energy");
        this.labelAnts = gId("ants");
        this.labelDefense = gId("defense");
        this.labelHour = gId("hour");
        this.labelDay = gId("day");

        this.statusContainer = qSel("#status ul");
    
        this.actionFindFood.onclick = this.doFindFood.bind(this);
        this.actionHatchEggs.onclick = this.doHatchEggs.bind(this);
        this.actionBuildRoom.onclick = this.doBuildRoom.bind(this);

        this.updateUI();
    }
    
    updateUI() {
        this.labelEnergy.innerText = this.energy;
        this.labelAnts.innerText = this.ants;
        
        this.header.classList.remove("hhighlight");
        this.header.offsetWidth;
        this.header.classList.add("hhighlight");
    }

    disableButton(elem) {
        elem.classList.add("disabled");
    }

    enableButton(elem) {
        elem.classList.remove("disabled");
    }

    timeUpdate() {
        this.labelHour.innerText = fmt(this.time.hour, "00");
        this.labelDay.innerText = this.time.day;
    }

    initMap() {
        this.map = new Map();
        this.map.init(MAP, "mapcanvas");
    }

    // Actions
    doFindFood() {
        let dist = new Range(10, 100, 5, "Distance");
        let ants = new Range(1, this.ants, 1, "Scouts");
        let info = new TimeInfo(this.time, this.balance.time_find_food.bind(null, dist, ants));

        showDialogWidget("Find Food", "<p>How far?</p><p>You'll need... </p>", [
            dist, ants, info], this.sendScouts.bind(this), false);
    }
    
    doHatchEggs() {
        showDialogWidget("Hatch Eggs", "<div><p>How many eggs you want to hatch?</p><p><strong>Remember:</strong> you'll need one ant per egg!</p></div>", [
            new Range(1, this.ants, 1, "Eggs")], this.hatchEggs.bind(this));
    }
    
    doBuildRoom() {
        showDialogOk("Build Room", "<p>You'll need X ants to build this room.</p>", () => {});
    }

    // Create jobs
    sendScouts(values) {
        const dist = values[0];
        const ants = values[1];
        const info = values[2];

        info.destroy();

        let progress = new Progress(this.time, "Scouts", 
            this.balance.time_find_food(dist, ants),
            this.evaluateScouts.bind(this, dist.val, ants.val));
        this.addProgress(progress);

        this.ants -= ants.val;
        this.updateUI();
    }

    hatchEggs(values) {
        let eggs = values[0].val;

        const time = 48 + eggs / 2;

        let progress = new Progress(this.time, "Hatching Eggs", time, this.evaluateEggs.bind(this, eggs));
        this.addProgress(progress);

        this.disableButton(this.actionHatchEggs);

        this.ants -= eggs;
        this.updateUI();
    }
    
    addProgress(p) {
        this.statusContainer.appendChild(p.elem);
    }
    
    play() {
        
    }
    
    // Evaluation methods
    evaluateScouts(dist, ants) {
        const r = this.balance.evaluateScouts(dist, ants);
        this.ants += r.ants;
        
        showDialogWidget(
            "Scout Result", 
            repltxt(TEXTS.scoutFound, [r.ants, r.dist, r.source.n, r.source.e]),
            [new Range(1, this.ants, 1, "Ants")], 
            this.goGetFood.bind(this, r));
        
        this.updateUI();
    }

    evaluateEggs(eggs) {
        let r = this.balance.evaluateEggs(eggs);

        console.log(r);

        showDialogOk("Hatch Eggs", repltxt(TEXTS.hatchResults, [r.eggsHatched]), (() => {
            this.ants += r.ants + r.eggsHatched;
            this.enableButton(this.actionHatchEggs);
            this.updateUI();
        }).bind(this));
        
    }

    evaluateResources(v) {
        this.ants += v.ants;
        this.energy += v.source.e;
        this.updateUI();
    }
    
    goGetFood(v) {
        console.log(v);

        let time = (v.dist * (5 / v.ants)) * (v.source.e / (v.ants * 5));

        let progress = new Progress(this.time, "Bringing Resources", time, this.evaluateResources.bind(this, v));
        this.addProgress(progress);

        this.ants -= v.ants;
        this.updateUI();
    }

}
let game = null;
(function() {
    game = new Game();
    game.play();
})();



