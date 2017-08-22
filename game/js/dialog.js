const createRangeHTML = (obj, i) => {
    let str = "<div id=\"range%1\" class=\"range\"><h1>%2</h1><div class=\"range-controls\"><a href=\"javascript:;\" class=\"button inline-button small-button\">-</a><span>0</span><a href=\"javascript:;\" class=\"button inline-button small-button\">+</a></div></div>";
    return str.replace("%1", i).replace("%2", obj.t);
};

class Range {
    constructor(i, min, max, step) {
        this.index = i;
        this.min = min;
        this.max = max;
        this.val = Math.round((min + max) / 2);
        this.step = step;
    }

    init() {
        this.valLabel = qSel("#range" + this.index + " span");
        qSel("#range" + this.index + " .button:first-child").onclick = this.less.bind(this);
        qSel("#range" + this.index + " .button:last-child").onclick = this.more.bind(this);
        this.update();
    }

    less() {
        this.val = clamp(this.val - this.step, this.min, this.max);
        this.update();
    }
    
    more() {
        this.val = clamp(this.val + this.step, this.min, this.max);
        this.update();
    }

    update() {
        this.valLabel.innerText = this.val;
    }
}

let dialog = { 
    bg: gId("dialogDiv"), 
    dw: gId("dialogWindow"),
    title: gId("dialogTitle"),
    section: gId("dialogSection"),
    ok: gId("dialogOk"),
    cancel: gId("dialogCancel"),
    hide() { 
        this.bg.style = "visibility: hidden";
        this.dw.style = "visibility: hidden";
        this.section.innerHTML = "";
        this.active = false;

        setTimeout(this.checkQueue.bind(this), 100);
    },
    show() {
        this.bg.style = "visibility: visible";
        this.dw.style = "visibility: visible";
        this.active = true;
    },
    onOk: null,
    okCancel: null,
    checkQueue() {
        if (this.dialogQueue.length > 0) {
            var d = this.dialogQueue.pop();
            createDialogOk(d.title, d.section, d.okCallback);
        }
    },
    active: false,
    dialogQueue: [] 
};

const showDialogOkRange = (title, section, ranges, okCallback, bottom = true) => {
    let i = 0;
    let rhtml = "";
    let r = ranges.map(o => {
        rhtml += createRangeHTML(o, i);
        return new Range(i++, o.min, o.max, o.step || 1);
    });
    
    section = bottom ? (section + rhtml) : (rhtml + section);

    if (dialog.active) {
        dialog.dialogQueue.push({ title: title, section: section, okCallback: okCallback.bind(null, r) });
    } else {
        createDialogOk(title, section, okCallback.bind(null, r));
    }
    r.forEach(r => r.init());
};

const showDialogOk = (title, section, okCallback) => {
    if (dialog.active) {
        dialog.dialogQueue.push({ title: title, section: section, okCallback: okCallback });
    } else {
        createDialogOk(title, section, okCallback);
    }
};

const createDialogOk = (title, section, okCallback) => {
    dialog.title.innerHTML = title;
    dialog.section.innerHTML = section;
    dialog.onOk = function () {
        dialog.hide();
        okCallback();
    };
    dialog.onCancel = function () {
        dialog.hide();
    };
    dialog.show();
};


