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

const showDialogWidget = (title, section, widgets, okCallback, bottom = true) => {
    let rhtml = "";
    widgets.forEach(o => {
        rhtml += o.getHTML();
    });
    
    section = bottom ? (section + rhtml) : (rhtml + section);

    if (dialog.active) {
        dialog.dialogQueue.push({ title: title, section: section, okCallback: okCallback.bind(null, widgets) });
    } else {
        createDialogOk(title, section, okCallback.bind(null, widgets));
    }
    widgets.forEach(r => r.init());
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


