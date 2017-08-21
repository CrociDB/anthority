const gId = t => { return document.getElementById(t); };
const qSel = t => { return document.querySelector(t); };
const qSelA = t => { return document.querySelectorAll(t); };

const fmt = (value, format) => { return (format + value).slice(-4); };
const clamp =(val, min, max) => { return Math.min(Math.max(val, min), max); };
