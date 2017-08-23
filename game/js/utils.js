const gId = t => document.getElementById(t);
const qSel = t => document.querySelector(t);
const qSelA = t => document.querySelectorAll(t);
const cEl = s => {
    let template = document.createElement("template");
    template.innerHTML = s;
    return template.content.firstChild;
};

const fmt = (value, format) => { return (format + value).slice(-4); };
const clamp =(val, min, max) => { return Math.min(Math.max(val, min), max); };
