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
        this.container = gId("game");

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

    hide() {
        this.container.classList.add("screenhidden");
    }
    
    show() {
        this.container.classList.remove("screenhidden");
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
        let eggs = new Range(1, this.ants, 1, "Eggs");
        let info = new TimeInfo(this.time, this.balance.time_hatch_egg.bind(null, eggs));

        showDialogWidget("Hatch Eggs", "<div><p>How many eggs you want to hatch?</p><p><strong>Remember:</strong> you'll need one ant per egg!</p></div>", 
        [eggs, info], this.hatchEggs.bind(this));
    }
    
    doBuildRoom() {
        const e = this.balance.value_room_energy(this.map.ownedRooms);
        const a = this.balance.value_room_ants(this.map.ownedRooms);
        const t = this.balance.time_build_room();

        if (e > this.energy || a > this.ants) {
            const txt = "<div>"+ TEXTS.buildRoomError + repltxt(TEXTS.buildRoomPrompt, [e, a, t]) + "</div>";
            showDialogOk("Error: Build Room", txt, () => {});
        } else {
            showDialogOk("Build Room", repltxt(TEXTS.buildRoomPrompt, [e, a, t]), this.buildRoom.bind(this, e, a, t));
        }
    }

    // Create jobs
    sendScouts([dist, ants, info]) {
        info.destroy();

        let progress = new Progress(this.time, "Scouts", 
            this.balance.time_find_food(dist, ants),
            this.evaluateScouts.bind(this, dist.val, ants.val));
        this.addProgress(progress);

        this.ants -= ants.val;
        this.updateUI();
    }

    hatchEggs(values) {
        let eggs = values[0];
        values[1].destroy();

        let progress = new Progress(this.time, "Hatching Eggs", 
            this.balance.time_hatch_egg(eggs),
            this.evaluateEggs.bind(this, eggs.val));
        this.addProgress(progress);

        this.disableButton(this.actionHatchEggs);

        this.ants -= eggs.val;
        this.updateUI();
    }

    buildRoom(energy, ants, time) {
        let progress = new Progress(this.time, "Building a Room", 
            time,
            this.placeRoom.bind(this, ants));
        this.addProgress(progress);

        this.disableButton(this.actionBuildRoom);

        this.energy -= energy;
        this.ants -= ants;
        this.updateUI();
    }
    
    addProgress(p) {
        this.statusContainer.appendChild(p.elem);
    }
    
    play() {
        this.show();
        this.time.play();
    }
    
    // Evaluation methods
    evaluateScouts(dist, ants) {
        const r = this.balance.evaluateScouts(dist, ants);
        this.ants += r.ants;

        let rants = new Range(1, this.ants, 1, "Ants");
        let info = new TimeInfo(this.time, this.balance.time_get_food.bind(null, r.dist, rants, r.source.e));
        
        showDialogWidget(
            "Scout Result",
            repltxt(TEXTS.scoutFound, [r.ants, r.dist, r.source.n, r.source.e]),
            [rants, info], 
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

    placeRoom(ants) {
        showDialogOk("Build Room", TEXTS.buildRoomResult, (() => {
            this.ants += ants;
            this.enableButton(this.actionBuildRoom);
            this.map.buildRoom();
            this.updateUI();
        }).bind(this));
    }
    
    goGetFood(v, values) {
        values[1].destroy();

        let progress = new Progress(this.time, "Bringing Resources", 
            this.balance.time_get_food(v.dist, values[0], v.source.e),
            this.evaluateResources.bind(this, v));
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



