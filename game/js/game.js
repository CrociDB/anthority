class Game {
    constructor() {
        this.energy = 10;
        this.ants = 10;

        this.initUI();
    }
    
    initUI() {
        this.actionFindFood = gId("btnScout");
        this.actionHatchEggs = gId("btnHatch");
        this.actionBuildRoom = gId("btnBuildRoom");

        this.labelEnergy = gId("energy");
        this.labelAnts = gId("ants");

        this.statusContainer = qSel("#status ul");
    
        this.actionFindFood.onclick = this.doFindFood.bind(this);
        this.actionHatchEggs.onclick = this.doHatchEggs.bind(this);
        this.actionBuildRoom.onclick = this.doBuildRoom.bind(this);

        this.updateUI();
    }

    updateUI() {
        this.labelEnergy.innerText = this.energy;
        this.labelAnts.innerText = this.ants;
    }

    doFindFood() {
        showDialogWidget("Find Food", "<p>How far?</p><p>You'll need... </p>", [
            new Range(5, 85, 5, "Distance"),
            new Range(1, this.ants, 1, "Scouts")], this.sendScouts.bind(this), false);
    }
    
    doHatchEggs() {
        showDialogWidget("Hatch Eggs", "<div><p>How many eggs you want to hatch?</p><p><strong>Remember:</strong> you'll need one ant per egg!</p></div>", [
            new Range(1, this.ants, 1, "Eggs")], this.hatchEggs.bind(this));
    }
    
    doBuildRoom() {
        showDialogOk("Build Room", "<p>You'll need X ants to build this room.</p>", () => {});
    }

    sendScouts(values) {
        let dist = values[0].val;
        let ants = values[1].val;

        let progress = new Progress("Scouts");
        this.addProgress(progress);

        this.ants -= ants;
        this.updateUI();
    }

    hatchEggs(values) {
        let eggs = values[0].val;

        let progress = new Progress("Hatching Eggs");
        this.addProgress(progress);

        this.ants -= eggs;
        this.updateUI();
    }

    addProgress(p) {
        this.statusContainer.appendChild(p.elem);
    }

    play() {

    }
}

(function() {
    let game = new Game();
    game.play();
})();



