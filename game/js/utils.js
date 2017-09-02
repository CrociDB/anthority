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

const fmt = (value, f) => { return (f + value).slice(-f.length); };
const clamp = (val, min, max) => { return Math.min(Math.max(val, min), max); };

const randnum = (v = 1) => Math.random() * v;
const randint = (v) => Math.round(randnum(v));
const randsig = () => randint(10) % 2 == 0 ? 1 : -1;
const randweight = (c, p) => {
    let sum = c.map(p).reduce((l, r) => l + r);
    let rand = randint(sum);
    return c.filter(e => {
        rand = rand - p(e);
        return rand <= 0;
    })[0];
};
const randweightsqrd = (c, p) => randweight(c, v => p(v) * p(v));

const TIME_SCALE = 5.0; // Every time unit should multiply this
const TIME_PACE = 20; // This is hours by minute
const TIME_INTERVAL = 32;
