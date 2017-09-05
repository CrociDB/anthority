class GameBalance {
    constructor() {
        
    }

    // Time calcs
    time_find_food(dist, ants) {
        return 1 + ((dist.val * .5) / (Math.log(ants.val) + 1));
    } 

    // Evaluations
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

    evaluateEggs(eggs) {
        return {
            ants: eggs,
            eggsHatched: eggs
        };
    }
}
