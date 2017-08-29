const SYMBOLS = {
    energy: "&#x26E8;",
    ants: "&#x265F;",
}

const TEXTS = {
    scoutFound: "<div><p>After sending <b>%1</b> ants to scout a radius of <b>%2m</b> after food:</p><p class=\"msghighlight\">You've found <b>%3</b>. There's about (e) <b>%4</b> energy in this resource.</p><p>How many ants do you wish to send to pick the resource?</p></div>"
};

const PLACES = [
    { d: 5, n: "Shattered Soda Can", e: 5 },
    { d: 10, n: "Smashed Candy", e: 10 },
    { d: 25, n: "Fallen Ice Cream", e: 50  },
    { d: 40, n: "Piece of Chocolate", e: 70  }
];

const MAP_COLUMNS = 7;
const MAP = [
    [{c: 3}],
    [{c: 1, l: [0]}, {c: 5, l: [0]}],
    [{c: 2, l: [1]}, {c: 6, l: [2]}],
    [{c: 0, l: [3]}, {c: 2, l: [3]}, {c: 4, l: [4]}, {c: 6, l: [4]}],
    // [{c: 1}, {c: 4}]
];
