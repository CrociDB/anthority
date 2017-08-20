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
    
        this.actionFindFood.onclick = this.findFood.bind(this);
        this.actionHatchEggs.onclick = this.hatchEggs.bind(this);
        this.actionBuildRoom.onclick = this.buildRoom.bind(this);
    }

    findFood() {
        createDialogOk("Find Food", "<p>How far?</p>", () => {});
    }
    
    hatchEggs() {
        createDialogOk("Hatch Eggs", "<p>How many eggs you want to hatch?</p>", () => {});
    }
    
    buildRoom() {
        createDialogOk("Build Room", "<p>You'll need X ants to build this room.</p>", () => {});
    }

    play() {
    }
}

(function() {
    let game = new Game();
    game.play();
})();



