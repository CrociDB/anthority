class Messenger {
    constructor() {
        this.initUI();
    }

    initUI() {
        this.container = gId("messenger");
        this.list = qSel("#messenger ul");
        this.continue = gId("btnContinue");
    }

    hide() {
        this.container.classList.add("screenhidden");
    }
    
    show() {
        this.container.classList.remove("screenhidden");
    }
    
    resetList() {
        this.list.innerHTML = "";
    }

    addMessage(t) {
        this.list.appendChild(cEl(repltxt("<li><span></span><p>%1</p></li>", [t])));
        this.list.scrollTop = this.list.scrollHeight;
        playaudio(SOUNDS.message);
    }

    activateContinue(callback) {
        this.continue.classList.remove("disabled");
        this.continue.onclick = callback;
    }

    // Initial routine
    
    playIntro() {
        this.resetList();
        this.show();
        co((function*() {
            yield 1;
            for (let [m, t] of MESSAGE_INTRO) {
                this.addMessage(m);
                yield t;
            }
            
            this.activateContinue(this.startGame.bind(this));
            playaudio(SOUNDS.warn);
        }).bind(this));
    }
    
    startGame() {
        co((function*() {
            yield .2;
            fadeOut();
            yield 1;
            this.hide();
            game.play();
            yield .1;
            fadeIn();
        }).bind(this));
    }

    // Initial routine
    
    playGameOver() {
        this.resetList();
        this.show();
        co((function*() {
            yield 1;
            for (let [m, t] of MESSAGE_GAMEOVER) {
                this.addMessage(m);
                yield t;
            }
            
            this.activateContinue(this.endGame.bind(this));
            playaudio(SOUNDS.warn);
        }).bind(this));
    }

    endGame() {
        co((function*() {
            yield .2;
            fadeOut();
            yield 1;
            window.location.reload();
        }).bind(this));
    }
}
