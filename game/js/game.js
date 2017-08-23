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

        this.statusContainer = qSel("#status ul");
    
        this.actionFindFood.onclick = this.findFood.bind(this);
        this.actionHatchEggs.onclick = this.hatchEggs.bind(this);
        this.actionBuildRoom.onclick = this.buildRoom.bind(this);
    }

    findFood() {
        showDialogWidget("Find Food", "<p>How far?</p><p>You'll need... </p>", [
            new Range(5, 85, 5, "Distance"),
            new Range(1, 5, 1, "Scouts")], this.sendScouts.bind(this), false);
    }
    
    hatchEggs() {
        showDialogOk("Hatch Eggs", "<p>How many eggs you want to hatch?</p>", () => {});
    }
    
    buildRoom() {
        showDialogOk("Build Room", "<p>You'll need X ants to build this room.</p>", () => {});
    }

    sendScouts(values) {
        let dist = values[0].val;
        let ants = values[1].val;

        let progress = new Progress("Scouts");
        this.addProgress(progress);
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



