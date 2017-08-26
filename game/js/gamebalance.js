class GameBalance {
    constructor() {

    }

    evaluateScouts(dist, ants) {
        let randdist = randnum(dist / 3) * randsig();
        let totaldist = dist + randdist;

        let places = PLACES.filter(p => p.d <= totaldist);
        let place = randweightsqrd(places, p => p.d);

        let lostants = 0;
        if (randnum() < .03)
        {
            lostants++;
        }

        return {
            dist: dist,
            ants: ants - lostants,
            lostants: lostants,
            source: place
        };
    }
}
