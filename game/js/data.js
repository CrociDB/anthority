const SYMBOLS = {
    energy: "&#x26E8;",
    ants: "&#x265F;",
}

const TEXTS = {
    scoutFound: "<div><p>After sending <b>%1</b> ants to scout a radius of <b>%2m</b> after food:</p><p class=\"msghighlight\">You've found <b>%3</b>. There's about (e) <b>%4</b> energy in this resource.</p><p>How many ants do you wish to send to pick the resource?</p></div>",
    hatchResults: "<p>You successfully hatched <b>%1</b> eggs!</p>",
    buildRoomPrompt: "<p>To build another room in the colony you'll need <b>%1</b> energy and <b>%2</b> ants to complete in about <b>%3</b> days.</p>",
    buildRoomError: "<p class=\"msgerror\">Ops, you can't do that right now.</p>",
    buildRoomResult: "<p class=\"msghighlight\">You successfully built another room in your colony.</p>"
};

const PLACES = [
    { d: 5, n: "Shattered Soda Can", e: 5 },
    { d: 10, n: "Smashed Candy", e: 10 },
    { d: 25, n: "Fallen Ice Cream", e: 50  },
    { d: 40, n: "Piece of Chocolate", e: 70  }
];

const SOUNDS = {
    progress_start: jsfxr([2,,0.09,,0.49,0.34,,0.0525,,,,0.28,0.29,,,,,,1,,,,,0.28]),
    dialog_open: jsfxr([3,,0.0346,,0.1453,0.5152,,-0.86,-0.26,,,-0.38,,,,,,,1,,,,,0.3]),
    dialog_close: jsfxr([3,,0.0346,,0.1453,0.5152,,-0.86,-0.26,,,-0.84,,,,,,,1,,,,,0.3])
};

const MAP_COLUMNS = 7;
const MAP = [
    [{c: 3}],
    [{c: 1, l: [0]}, {c: 5, l: [0]}],
    [{c: 2, l: [1]}, {c: 6, l: [2]}],
    [{c: 0, l: [3]}, {c: 2, l: [3]}, {c: 4, l: [4]}, {c: 6, l: [4]}],
    // [{c: 1}, {c: 4}]
];
