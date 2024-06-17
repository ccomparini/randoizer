/**
 * class Randoizer - Deterministic random integer generator.
 *
 * Generates sequences of random integers based on a seed given to the
 * constructor.  This is useful for games, fractal terrain, fuzz testing,
 * etc.
 *
 * NOTE: This is not intended for, nor should it ever be used for
 * cryptography, passwords, or any security related application.
 *
 * Usage:
 *
 *  import { Randoizer } from "https://fbmstudios.net/randoizer/randoizer.mjs";
 *
 *  // 3 independent random number generators:
 *  const rand      = new Randoizer(23);
 *  const otherRand = new Randoizer(89231);
 *  const clockSeed = new Randoizer();
 *  for(let i = 0; i < 23; i++) {
 *    console.log(`${rand.next()} ${otherRand.next()} ${clockSeed.next()}`);
 *  }
 *
 */

export class Randoizer {
  constructor(seed) {
    if(typeof seed === "undefined") {
      seed = Date.now();
    }
    this.state = seed;
  }

  next() {
    // https://en.wikipedia.org/wiki/Linear_congruential_generator
    this.state = (1103515245 * this.state + 12345) % 2147483648;
    return this.state;
  }
}

