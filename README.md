# randoizer

Pseudo-random number generator for games and the like.

**Not to be used for crypto or anything security related.**


Usage:

    import { Randoizer } from "./randoizer.mjs";

    // 3 independent random number generators:
    const rand      = new Randoizer(23);
    const otherRand = new Randoizer(89231);
    const clockSeed = new Randoizer();
    for(let i = 0; i < 23; i++) {
        console.log(`${rand.next()} ${otherRand.next()} ${clockSeed.next()}`);
    }

