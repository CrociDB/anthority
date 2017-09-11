class Menu {
    constructor() {
        this.initUI();
    }

    initUI() {
        this.container = gId("menu");
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
}

let menu = null;
(function() {
    menu = new Menu();
    menu.play();
})();

