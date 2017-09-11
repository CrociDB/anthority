class Menu {
    constructor() {
        this.initUI();
    }

    initUI() {
        this.container = gId("menu");
        this.actionPlay = gId("btnPlay");
        this.actionPlay.onclick = this.startGame.bind(this);
    }

    hide() {
        this.container.classList.add("screenhidden");
    }
    
    show() {
        this.container.classList.remove("screenhidden");
    }

    play() {
        this.show();
    }

    startGame() {
        this.hide();
        game.play();
    }
}

let menu = new Menu();
(function() {
    menu.play();
})();

