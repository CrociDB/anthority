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

let showDialogOk = (title, section, okCallback) => {
    if (dialog.active) {
        dialog.dialogQueue.push({ title: title, section: section, okCallback: okCallback });
    } else {
        createDialogOk(title, section, okCallback);
    }
};

let createDialogOk = (title, section, okCallback) => {
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