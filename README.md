# randoizer

Pseudo-random number generator for things like games, fuzz testing,
fractal landscapes, etc.

Features/differences from Math.random():
  - You can specify the seed, which means you can reproduce a given
    sequence from whatever seed.
  - You can have more than one generator at once, each with its own
    position in the sequence.
  - Generates integers (FIXME in what range?) and not floats.

The algorithm is from [Wikipedia](https://en.wikipedia.org/wiki/Linear_congruential_generator).
The distributions look reasonable to me, but I haven't analyzed it
thoroughly for anything else.

**Not to be used for crypto or anything security related.**

Usage:

    import { Randoizer } from "https://fbmstudios.net/lib/randoizer.mjs";

    // 3 independent random number generators:
    const rand      = new Randoizer(23);
    const otherRand = new Randoizer(89231);
    const clockSeed = new Randoizer();
    for(let i = 0; i < 23; i++) {
        console.log(`${rand.next()} ${otherRand.next()} ${clockSeed.next()}`);
    }

Methods:
  * next()       - returns the next random number in the sequence.
  * reseed(seed) - resets the random seed.  passing a prior result of next() rewinds to that point in the sequence.
