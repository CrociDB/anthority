const gId = t => document.getElementById(t);
const qSel = t => document.querySelector(t);
const qSelA = t => document.querySelectorAll(t);
const cEl = s => {
    let template = document.createElement("template");
    template.innerHTML = s;
    return template.content.firstChild;
};

const repltxt = (t, vs) => {
    vs.forEach((e, i) => t = t.replace("%" + (i+1), e));
    return t;
};

const fmt = (value, format) => { return (format + value).slice(-4); };
const clamp = (val, min, max) => { return Math.min(Math.max(val, min), max); };

const randnum = (v = 1) => Math.random() * v;
const randint = (v) => Math.round(randnum(v));
const randsig = () => randint(10) % 2 == 0 ? 1 : -1;
const randweight = (c, p) => {
    let sum = c.map(n => p(n) * p(n)).reduce((l, r) => l + r);
    let rand = randint(sum);
    return c.filter(e => {
        rand = rand - (p(e) * p(e));
        return rand <= 0;
    })[0];
};

const TIME_SCALE = 10.0;
